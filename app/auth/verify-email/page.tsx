import Link from 'next/link';
import { AuthLayout } from '@/components/ui/auth/AuthLayout';

export default function VerifyEmail() {
  return (
    <AuthLayout imageSrc="/images/auth/image-background-connexion-etape-2.svg">
      <h2 className="text-2xl font-bold mb-4">Vérification de votre mail</h2>
      <p className="mb-6 text-text-primary">
        Votre demande d’inscription a bien été prise en compte. Merci de vérifier votre mail afin
        de confirmer la création de votre compte en cliquant sur le lien que nous vous avons envoyé.
      </p>
      <p className="text-text-primary">
        Vous n’avez pas reçu d’email ? Pensez à vérifier dans vos indésirables. Si vous ne l’avez
        toujours pas reçu après 5 minutes,{' '}
        <Link href="#" className="text-primary hover:underline">
          cliquez ici pour renvoyer le mail
        </Link>.
      </p>
      <div className="mt-6">
        <Link href="/auth/sign-in">
          <button className="w-full py-2 px-4 bg-black text-white rounded-md">
            Continuer
          </button>
        </Link>
      </div>
    </AuthLayout>
  );
}
