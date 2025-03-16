'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AuthLayout } from '@/components/ui/auth/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrorMessage('Email ou mot de passe incorrect.');
        } else {
          setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        }
        return;
      }

      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout imageSrc="/images/auth/image-background-connexion.svg">
      <h2 className="text-4xl font-bold mb-4">Connexion</h2>
      <p className="mb-6 text-text-primary">
        Veuillez renseigner votre email et mot de passe pour accéder à votre espace Skill Guru.
      </p>
      <form onSubmit={handleSignIn} className="space-y-4">
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md text-sm">
            {errorMessage}
          </div>
        )}
        <div>
          <Label>Email professionnel*</Label>
          <Input
            type="email"
            placeholder="Email professionnel"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          <Label>Mot de passe*</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className='flex justify-end'>
          <Button variantType="primary" className="flex items-center gap-2" disabled={loading}>
            {loading ? 'Chargement...' : 'Me connecter'}
          </Button>
        </div>
      </form>
      <div className="flex justify-end mt-4 text-text-tertiary">
        <span>Pas encore de compte ? </span>
        <Link href="/auth/sign-up" className="font-medium ml-1 hover:underline">
          Créez le dès maintenant
        </Link>
      </div>
    </AuthLayout>
  );
}
