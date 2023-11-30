import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { useContext } from 'react';
import { CartContext } from '../CounterContext/CartContext';

const Checkout = () => {
  const { onlinePayment } = useContext(CartContext);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    details: Yup.string().required('Details are required'),
    phone: Yup.number().required('Phone number is required'),
    city: Yup.string().required('City is required'),
  });

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await payment(values);
    },
  });

  const payment = async (values) => {
    try {
      const { data } = await onlinePayment(values);
      console.log(data);
      window.location.href = data.session.url;
    } catch (error) {
      console.error('Error initiating payment:', error);
      // Handle error, show a toast, or provide user feedback
    }
  };

  return (
    <div className="container">
      <div className="mx-auto bg-main-light p-5">
        <h2>Shipping Address</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="details">Details</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              className={`form-control ${formik.touched.details && formik.errors.details ? 'is-invalid' : ''}`}
              id="details"
              name="details"
              type="text"
            />
            {formik.touched.details && formik.errors.details ? (
              <div className="invalid-feedback">{formik.errors.details}</div>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              name="phone"
              type="text"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="city">City</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
              id="city"
              name="city"
              type="text"
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="invalid-feedback">{formik.errors.city}</div>
            ) : null}
          </div>
          <button type="submit" className="btn bg-main w-100 text-white">
            Pay now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
