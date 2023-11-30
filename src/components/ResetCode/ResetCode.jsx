import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetCode() {
  const navigate = useNavigate();

  async function handleVerification(values) {
    try {
      const { data } = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        values
      );
      console.log(data);
      if (data.token) {
        navigate('/Login');
      }
    } catch (error) {
      console.error('Error during verification:', error);
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),

    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,8}$/, "password start with uppercase")
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      "email": "",
      "newPassword": "",
    },validationSchema,
    onSubmit: (values) => handleVerification(values),
  });

  return (
    <div className='d-flex h-75'>
      <form
        onSubmit={formik.handleSubmit}
        className='w-75 m-auto rounded-5 bg-light shadow p-5'
      >
        <h2>Reset Your Password</h2>
        <label htmlFor="email">Your Email</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              className="form-control "
              id="email"
              onBlur={formik.handleBlur}
              type="email"
            />
        <label htmlFor="Password">New Password</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              name="newPassword"
              className="form-control mb-1 "
              id="Password"
              onBlur={formik.handleBlur}
              type="password"
            />
            
        <button
          disabled={!(formik.isValid && formik.dirty)}
          className='btn bg-main text-white mt-2'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
