import Link from 'next/link';
import { AuthLayout } from '@/components/ui/auth/AuthLayout';
import { Button } from '@/components/ui/button';

export default function VerifyEmail() {
  return (
    <AuthLayout imageSrc="/images/auth/image-background-connexion-etape-2.svg">
      <h1 className="text-text-primary text-h1-d font-bold mb-4">Pensez à confirmer votre inscription depuis votre email</h1>
      <span className='text-h2-m text-text-primary'>
          Votre demande d’inscription a bien été prise en compte.
        </span>
      <p className="mb-6 text-text-primary">
        Merci de vérifier votre mail afin
        de confirmer la création de votre compte en cliquant sur le lien que nous vous avons envoyé.
      </p>
      <span className='text-h3-m text-text-primary'>Vous n’avez pas reçu d’email ?</span>
      <p className="text-text-primary">
        Pensez à vérifier dans vos indésirables. Si vous ne l’avez
        toujours pas reçu après 5 minutes,{' '}
        <Link href="#" className="text-primary hover:underline">
          cliquez ici pour renvoyer le mail
        </Link>.
      </p>
      <div className="flex justify-between mt-6">
        <Link href="#">
          <Button variantType="secondary">
            Renvoyer le mail
          </Button>
        </Link>
        <Link href="/auth/sign-in">
          <Button variantType="primary">
            Retour à la page de connexion
          </Button>
        </Link>
      </div>
    </AuthLayout>
  );
}
