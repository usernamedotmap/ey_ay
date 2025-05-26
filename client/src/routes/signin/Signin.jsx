import { SignIn } from '@clerk/clerk-react'
import './Signin.css'

export const Signin = () => {
  return (
    <div className='signInPage'>
      <SignIn path='/sign-in' signUpUrl='/sign-up' forceRedirectUrl="/dashboard"/>
    </div>
  )
}
