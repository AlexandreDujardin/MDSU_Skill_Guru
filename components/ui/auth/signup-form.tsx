'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AuthLayout } from '@/components/ui/auth/AuthLayout';
import { Eye, EyeOff, ChevronRight, ChevronLeft } from 'lucide-react';

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [codeUai, setCodeUai] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleNextStep = () => {
    if (!firstname || !lastname || !email || !phone || !role) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (role === 'Campus' && !codeUai) {
      setErrorMessage('Veuillez entrer votre code UAI.');
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstname, lastname, role, code_uai: role === 'Campus' ? codeUai : null },
      },
    });

    if (error) {
      setErrorMessage("Erreur lors de l'inscription. Vérifiez vos informations.");
      console.error("Erreur d'inscription :", error);
      return;
    }

    router.push('/auth/verify-email');
  };

  return (
    <AuthLayout
      imageSrc={step === 1 ? "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/auth/image-background-connexion-etape-1.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdXRoL2ltYWdlLWJhY2tncm91bmQtY29ubmV4aW9uLWV0YXBlLTEuc3ZnIiwiaWF0IjoxNzQyMTAwMDQxLCJleHAiOjE3NzM2MzYwNDF9.6_80vkSUTpet4-nXjVekggMfzLJn2VMeRbxK2lRw1RE" : "https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/auth/image-background-connexion-etape-2.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdXRoL2ltYWdlLWJhY2tncm91bmQtY29ubmV4aW9uLWV0YXBlLTIuc3ZnIiwiaWF0IjoxNzQyMTAwMDEwLCJleHAiOjE3NzM2MzYwMTB9.7hWhEvsnKxv7XeLz5GddVVUKp-ebqOdU02D5Yy7QopQ"}
    >
      <div className="max-w-lg mx-auto">
        <h2 className="text-4xl font-bold text-text-primary mb-2">Créer un compte</h2>
        <p className="text-text-primary mb-6">
          {step === 1
            ? "Afin de souscrire à un abonnement, vous devez d’abord créer un compte sur notre plateforme."
            : "Définissez un mot de passe sécurisé pour protéger votre compte."}
        </p>

        {errorMessage && <p className="text-text-error mb-4">{errorMessage}</p>}

        {step === 1 ? (
          /* Step 1: User Information */
          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-12 px-4 border-2 border-gray-300 rounded-md text-text-tertiary focus:border-primary focus:ring-primary focus:outline-none"
                required
              >
                <option value="">Je suis...</option>
                <option value="Formateur">Formateur</option>
                <option value="Campus">Campus</option>
              </select>
            </div>

            {/* Name Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Prénom*</Label>
                <Input value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder='Prénom' required />
              </div>
              <div>
                <Label>Nom*</Label>
                <Input value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder='Nom' required />
              </div>
            </div>

            {/* Phone & Email */}
            <div>
              <Label>Numéro de téléphone*</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='00 00 00 00 00' required />
            </div>

            <div>
              <Label>Email professionnel*</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email professionnel' required />
            </div>

            {/* UAI Code (only for Campus) */}
            {role === 'Campus' && (
              <div>
                <Label>Code UAI*</Label>
                <Input value={codeUai} onChange={(e) => setCodeUai(e.target.value)} placeholder='Code UAI' required />
              </div>
            )}

            {/* Next Button (Aligned Right) */}
            <div className="flex justify-end">
              <Button onClick={handleNextStep} className="flex items-center gap-2">
                Je m'inscris <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        ) : (
          /* Step 2: Password */
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Password Input */}
            <div>
              <Label>Mot de passe*</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Mot de passe'
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <Label>Confirmer le mot de passe*</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Mot de passe'
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button onClick={() => setStep(1)}  className="flex items-center gap-2">
                <ChevronLeft size={18} /> Retour
              </Button>
              <Button variantType="primary" className="flex items-center gap-2">
                Créer mon compte <ChevronRight size={18} />
              </Button>
            </div>
          </form>
        )}

        {/* Sign-in Link */}
        <div className="flex justify-end mt-4 text-text-tertiary">
          <span>Déjà inscrit ?</span>
          <Link href="/auth/sign-in" className="font-medium ml-1 hover:underline">
            Connectez-vous ici
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
