'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createOrUpdatePlaylist(formData: FormData) {
  const supabase = createClient();
  const name = formData.get('name') as string;
  const playlistId = formData.get('playlistId') as string | null;

  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.user) throw new Error('Not authenticated');

  if (playlistId) {
    // Update an existing playlist
    const { error } = await supabase
      .from('playlists')
      .update({ name })
      .eq('id', playlistId)
      .eq('user_id', session.user.id);
    
    if (error) throw error;
  } else {
    // Create a new playlist
    const { error } = await supabase
      .from('playlists')
      .insert({
        name,
        user_id: session.user.id,
      });

    if (error) throw error;
  }

  revalidatePath('/playlists');
}

export async function deletePlaylist(playlistId: string) {
  const supabase = createClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.user) throw new Error('Not authenticated');

  // Check if the playlist is "Favorites"
  const { data: playlist, error: fetchError } = await supabase
    .from('playlists')
    .select('is_favorite')
    .eq('id', playlistId)
    .eq('user_id', session.user.id)
    .single();

  if (fetchError || !playlist) throw new Error('Playlist not found');
  if (playlist.is_favorite) throw new Error('Cannot delete the Favorites playlist.');

  // Delete the playlist
  const { error } = await supabase
    .from('playlists')
    .delete()
    .eq('id', playlistId);

  if (error) throw error;

  revalidatePath('/playlists');
}

export async function addGameToPlaylist(playlistId: string, gameId: string) {
  const supabase = createClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session?.user) throw new Error("Not authenticated");

  // Check if the game is already in the playlist
  const { data: existingGame } = await supabase
    .from("playlist_games")
    .select("id")
    .eq("playlist_id", playlistId)
    .eq("game_id", gameId)
    .single();

  if (existingGame) throw new Error("Game is already in this playlist.");

  // ✅ Allow adding games even if it's the Favorites playlist
  const { error } = await supabase
    .from("playlist_games")
    .insert({
      playlist_id: playlistId,
      game_id: gameId,
    });

  if (error) throw error;

  revalidatePath("/playlists");
}


export async function removeGameFromPlaylist(playlistId: string, gameId: string) {
  const supabase = createClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.user) throw new Error('Not authenticated');

  // Remove the game from the playlist
  const { error } = await supabase
    .from('playlist_games')
    .delete()
    .eq('playlist_id', playlistId)
    .eq('game_id', gameId);

  if (error) throw error;

  revalidatePath('/playlists');
}
