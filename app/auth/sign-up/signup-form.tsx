'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AuthLayout } from '@/components/ui/AuthLayout';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');
  const [codeUai, setCodeUai] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstname, lastname, role, code_uai: role === 'Campus' ? codeUai : null },
      },
    });

    if (error) {
      console.error("Erreur pour l'inscription :", error);
      return;
    }

    setTimeout(() => {
      router.push('/auth/verify-email');
    }, 3000);
  };

  return (
    <AuthLayout imageSrc="https://www.presse-citron.net/app/uploads/2020/12/test-cyberpunk-2077-1.jpg">
      <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
      <p className="mb-6 text-gray-600">
        Pour souscrire à un abonnement, vous devez avoir un compte Skill Guru.
      </p>
      {successMessage && (
        <div className="mb-4 text-green-600">{successMessage}</div>
      )}
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <Label>Prénom*</Label>
          <Input value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
        </div>
        <div>
          <Label>Nom*</Label>
          <Input value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        </div>
        <div>
          <Label>Email professionnel*</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label>Mot de passe*</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Je suis*</Label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full rounded border-gray-300"
            required
          >
            <option value="">Sélectionnez</option>
            <option value="Formateur">Formateur</option>
            <option value="Campus">Campus</option>
          </select>
        </div>
        {role === 'Campus' && (
          <div>
            <Label>Code UAI*</Label>
            <Input value={codeUai} onChange={(e) => setCodeUai(e.target.value)} required />
          </div>
        )}
        <Button type="submit" className="w-full">
          Créer mon compte
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link href="/auth/sign-in" className="text-primary hover:underline">
          Déjà inscrit ? Connectez-vous ici
        </Link>
      </div>
    </AuthLayout>
  );
}
