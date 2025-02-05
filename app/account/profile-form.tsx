'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import type { User } from '@supabase/supabase-js';

interface ProfileFormProps {
  initialProfile: any;
  user: User;
}

export function ProfileForm({ initialProfile, user }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(initialProfile || {});
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
    }

    fetchProfile();
  }, [user.id, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone,
          role: profile.role,
          code_uai: profile.role === "Campus" ? profile.code_uai : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil</CardTitle>
        <CardDescription>Mettez à jour vos informations personnelles.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">Prénom</Label>
              <Input
                id="first_name"
                value={profile.first_name || ''}
                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Nom</Label>
              <Input
                id="last_name"
                value={profile.last_name || ''}
                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Je suis</Label>
            <select
              id="role"
              value={profile.role || ''}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full border rounded-md p-2"
            >
              <option value="">Sélectionnez</option>
              <option value="Formateur">Formateur</option>
              <option value="Campus">Campus</option>
            </select>
          </div>

          {profile.role === "Campus" && (
            <div className="space-y-2">
              <Label htmlFor="code_uai">Code UAI</Label>
              <Input
                id="code_uai"
                value={profile.code_uai || ''}
                onChange={(e) => setProfile({ ...profile, code_uai: e.target.value })}
              />
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Enregistrement...' : 'Sauvegarder'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
