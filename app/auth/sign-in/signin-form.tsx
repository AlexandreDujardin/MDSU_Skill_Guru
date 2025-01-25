'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AuthLayout } from '@/components/ui/AuthLayout';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout imageSrc="https://www.presse-citron.net/app/uploads/2020/12/test-cyberpunk-2077-1.jpg">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      <p className="mb-6 text-gray-600">
        Veuillez renseigner votre email et mot de passe pour accéder à votre espace Skill Guru.
      </p>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <Label>Email professionnel*</Label>
          <Input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Mot de passe*</Label>
          <Input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Chargement...' : 'Je me connecte'}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link href="/auth/sign-up" className="text-primary hover:underline">
          Pas de compte ? Inscrivez-vous en cliquant ici
        </Link>
      </div>
    </AuthLayout>
  );
}
