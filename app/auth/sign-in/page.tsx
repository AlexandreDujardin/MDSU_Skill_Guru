import { Navbar } from '../../../components/navbar'
import { SignInForm } from './signin-form'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <SignInForm />
      </div>
    </div>
  )
}

