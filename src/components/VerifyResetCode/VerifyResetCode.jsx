import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyResetCode() {
  const navigate = useNavigate();

  async function handleVerification(values) {
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/VerifyResetCode',
        values
      );
      if (data.status === 'Success') {
        navigate('/ResetCode');
      }
    } catch (error) {
      console.error('Error during verification:', error);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: (values) => handleVerification(values),
  });

  return (
    <div className='d-flex h-75'>
      <form
        onSubmit={formik.handleSubmit}
        className='w-75 m-auto rounded-5 bg-light shadow p-5'
      >
        <h2>Verify Reset Code</h2>
        <div className='my-3'>
          <input
            placeholder='Code...'
            onChange={formik.handleChange}
            value={formik.values.resetCode}
            name='resetCode'  // Update field name to match initialValues
            className='form-control'
            id='code'
            onBlur={formik.handleBlur}
            type='tel'
          />
        </div>
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
