import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './signup.css'

function SignUp(props) {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  const history = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors((prev)=>({...prev, [e.target.name]:''}))
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = values;

    const response = await fetch("http://localhost:7000/api/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password })

    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      history("/home");
      props.showAlert("success", "Account created successfully");
    }
    else {
      if (json.errors) {
        json.errors.map((err) => {
          if (err.param === 'firstName') {
            setErrors((prev) => ({ ...prev, firstName: err.msg }))
          } else if (err.param === 'lastName') {
            setErrors((prev) => ({ ...prev, lastName: err.msg }))
          } else if (err.param === 'email') {
            setErrors((prev) => ({ ...prev, email: err.msg }))
          } else {
            setErrors((prev) => ({ ...prev, password: err.msg }))
          }
        })
      }
      if (json.validationError) {
        console.log("called")
        props.showAlert('error', json.validationError)
      }
    }

  }
  console.log(errors)
  return (
    <>
      <form onSubmit={handleSignup} className='form-container'>
        <h1 className='form-title'>Begin your new journey!</h1>

        <p className='form-subtitle'>
          Get started by creating your account.
        </p>
        <div className='input-container'>
          <label htmlFor="firstName">
            <span className='label-text'>First name:</span>
            <input id="firstName" name='firstName' type='text' placeholder='Enter your full name' value={values.firstName} onChange={handleChange} />
            {errors.firstName && <span className='error'><ErrorOutlineIcon fontSize='small' /> {errors.firstName}</span>}
          </label>

          <label htmlFor="lastName">
            <span className='label-text'>Last name:</span>
            <input id="lastName" name='lastName' type='text' placeholder='Enter your full name' value={values.lastName} onChange={handleChange} />
            {errors.lastName && <span className='error'><ErrorOutlineIcon fontSize='small' /> {errors.lastName}</span>}
          </label>
        </div>

        <div className='input-container'>
          <label htmlFor="email">
            <span className='label-text'>Email:</span>
            <input id="email" name='email' type='text' placeholder='Ex. abc@gmail.com' value={values.email} onChange={handleChange} />
            {errors.email && <span className='error'><ErrorOutlineIcon fontSize='small' /> {errors.email}</span>}
          </label>

          <label htmlFor="password">
            <span className='label-text'> Password:</span>
            <input id="password" name='password' type={values.showPassword ? 'text' : 'password'} value={values.password} onChange={handleChange} />
            <IconButton
              className='visibility-btn'
              onClick={handleClickShowPassword}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            {errors.password && <span className='error'><ErrorOutlineIcon fontSize='small' /> {errors.password}</span>}
          </label>
        </div>
        <button type="submit" className='btn'>Signup</button>

      </form>
    </>
  )
}

export default SignUp