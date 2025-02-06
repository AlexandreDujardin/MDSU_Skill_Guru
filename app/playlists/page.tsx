import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { PageLayout } from '@/components/PageLayout';
import { PlaylistList } from '@/components/ui/playlists/PlaylistList';
import { AddEditPlaylist } from '@/components/ui/playlists/AddEditPlaylist';

export default async function PlaylistsPage() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const { data: playlists } = await supabase
    .from('playlists')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Mes Playlists</h1>
        <AddEditPlaylist />
      </div>
      <PlaylistList playlists={playlists || []} />
    </PageLayout>
  );
}
