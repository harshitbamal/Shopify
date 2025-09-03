import React from 'react'
import { Link } from 'react-router-dom'
import "../CSS/Login.css"
const Login = () => {
  return (
    <div className='login'>
      <div className="login-container">
        <h1>Login</h1>
        <div className='login-fields'>
          <input type='email' placeholder='Email Address'/>
          <input type='password' placeholder='Password'/>
          <button>Continue</button>
        </div>

        <p className="login-loginSignup">
           Don't have an account?{' '}
           <Link to="/signup" style={{color: 'red', textDecoration: 'none'}}>
                SignUp here
           </Link>

        </p>
        
      </div>
    </div>
  )
}

export default Login