import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './Login.css'

function Login(props) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({});

  const history = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    const response = await fetch("http://localhost:7000/api/auth/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })

    });
    const json = await response.json();

    if (json.success) {

      localStorage.setItem('token', json.authtoken);
      history("/home");
      props.showAlert("success", "Logged in successfully");
    } else {
      if (json.errors) {
        json.errors.map((err) => {
          if (err.param === 'password') {
            setErrors((prev) => ({ ...prev, password: err.msg }))
          } else {
            setErrors((prev) => ({ ...prev, email: err.msg }))
          }
        })
      }
      if (json.ValidationError) {
        props.showAlert('error', json.ValidationError)
      }
    }

  }

  return (
    <>
      <form className='form-container' onSubmit={handleSubmit}>
        <h1 className='form-title'> Welcome Back!</h1>

        <p className='form-subtitle'>
          Please Enter your details to continue.
        </p>

        <label htmlFor="email">
          <span className='label-text'>Email</span>
          <input
            id="email"
            name='email'
            type='text'
            placeholder='Enter your email here'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <span className='error'><ErrorOutlineIcon fontSize='small' /> {errors.email}</span>}
        </label>

        <label htmlFor="password">
          <span className='label-text'> Password</span>
          <input
            id="password"
            name='password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
          />
          <IconButton
            className='visibility-btn'
            onClick={handleClickShowPassword}
          // onMouseDown={handleMouseDownPassword}
          >
            {values.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          {errors.password && <span className='error'><ErrorOutlineIcon fontSize='small' /> {errors.password}</span>}
        </label>

        <button type="submit" className='btn'>Login</button>

      </form>
    </>
  )
}

export default Login