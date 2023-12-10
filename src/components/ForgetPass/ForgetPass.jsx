import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgetPass() {
  let navigate = useNavigate();

  async function register(value) {
    const { data } = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      value
    );
    if (data.statusMsg === 'success') {
      navigate('/VerifyResetCode');
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (value) => register(value),
  });

  return (
    <div className='d-flex h-75'>
      <form onSubmit={formik.handleSubmit} className='w-75 m-auto rounded-5 bg-light shadow p-5'>
        <h2>Forgot password</h2>
        <div className='my-1'>
          <label htmlFor='email'>Email</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            name='email'
            className='form-control'
            id='email'
            onBlur={formik.handleBlur}
            type='email'
          />
        </div>
        <p>We’ll send a verification code to this email</p>
        <button
          disabled={!(formik.isValid && formik.dirty)}
          className='btn bg-main text-white mt-2'
          type='submit'
        >
          Verify
        </button>
      </form>
    </div>
  );
}
