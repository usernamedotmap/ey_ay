import { SignUp } from '@clerk/clerk-react'
import './Signup.css'

const Signup = () => {
  return (
    <div className='signUpPage'> 
      <SignUp path='/sign-up' signInUrl='/sign-in' />
    </div>
  )
}

export default Signup