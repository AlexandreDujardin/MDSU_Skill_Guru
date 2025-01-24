'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [codeUai, setCodeUai] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For success message
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstname,
          lastname,
          phone,
          role,
          code_uai: role === 'Campus' ? codeUai : null,
        },
      },
    });

    if (error) {
      console.error('Error signing up:', error);
      return;
    }

    // Set success message if no error occurs
    setSuccessMessage(
      `Inscription réussie ! Un email de confirmation a été envoyé à ${email}. Veuillez vérifier votre boîte de réception.`
    );

    // Optionally redirect after a delay (e.g., 3 seconds)
    setTimeout(() => {
      router.push('/auth/sign-in');
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>
          Découvrez tout le potentiel de notre plateforme gratuitement pendant 30 jours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Display success message */}
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSignUp} className="grid grid-cols-2 gap-4">
          <div>
            <Label>Nom</Label>
            <Input value={lastname} onChange={(e) => setLastname(e.target.value)} required />
          </div>
          <div>
            <Label>Je suis</Label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Sélectionnez</option>
              <option value="Formateur">Formateur</option>
              <option value="Campus">Campus</option>
            </select>
          </div>
          <div>
            <Label>Prénom</Label>
            <Input value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
          </div>
          <div>
            <Label>Numéro de téléphone</Label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <Label>Email professionnel</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label>Mot de passe</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {role === 'Campus' && (
            <div className="col-span-2">
              <Label>Code UAI</Label>
              <Input value={codeUai} onChange={(e) => setCodeUai(e.target.value)} required />
            </div>
          )}
          <div className="col-span-2">
            <Button type="submit">Créer mon compte</Button>
          </div>
        </form>
        <Link href="/auth/sign-in">Déjà inscrit ? Connectez-vous en cliquant ici</Link>
      </CardContent>
    </Card>
  );
}
