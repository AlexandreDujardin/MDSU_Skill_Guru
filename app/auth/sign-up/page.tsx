import { Navbar } from '../../../components/navbar'
import { SignUpForm } from './signup-form'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <SignUpForm />
      </div>
    </div>
  )
}

