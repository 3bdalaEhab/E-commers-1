import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.module.css";
import { FallingLines } from "react-loader-spinner";

export default function Register() {
  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  async function register(value) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        value
      );
      if (data.message === "success") {
        setMessage(data.message)
        setIsLoading(true);
        console.log(data);
        setTimeout(() => {
          navigate('/Login');
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);

      console.log("error in Api", error);
      setMessage(error.response.data.message);

    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name min length is 3")
      .max(15, "name max length is 10")
      .required("name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone is invalid")
      .required("phone is valid"),
    password: Yup.string()
      .matches(/^[A-Z][a-z 0-9]{5,12}$/, "password start with uppercase min char 5 max char 12")
      .required("password is required").max(12).min(5)
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword should match password")
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (value) => register(value),
  });
  return (
    <>
      <div className="container my-5 py-3">
        <form onSubmit={formik.handleSubmit} className="w-75 m-auto my-5 ">
          
          {message === ""?"":message ==="fail"?<div className=" fw-bold h5 alert-danger alert m-auto py-2 w-50 text-center">Value is invalid</div> : message ==='success'?  <div className=" fw-bold h5 alert-success alert m-auto py-2 w-50 text-center">{message}</div>
          :
          <div className=" fw-bold h5 alert-danger alert m-auto py-2 w-50 text-center">{message}</div>
        }



          <h2 className="mb-4 fw-bold">Register Now:</h2>
          <div className="mb-2 ">
            <label htmlFor="name">name</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              className="form-control "
              id="name"
              onBlur={formik.handleBlur}
              type="text"
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert my-1 py-2 alert-danger">
                {formik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="mb-2 ">
            <label htmlFor="email">email</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              className="form-control "
              id="email"
              onBlur={formik.handleBlur}
              type="email"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert my-1 py-2 alert-danger">
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-2 ">
            <label htmlFor="Password">Password</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              className="form-control "
              id="Password"
              onBlur={formik.handleBlur}
              type="password"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert my-1 py-2 alert-danger">
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-2 ">
            <label htmlFor="rePassword">rePassword</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              name="rePassword"
              className="form-control "
              id="rePassword"
              onBlur={formik.handleBlur}
              type="password"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert my-1 py-2 alert-danger">
                {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-2 ">
            <label htmlFor="phone">phone</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              className="form-control "
              id="phone"
              onBlur={formik.handleBlur}
              type="tel"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert my-1 py-2 alert-danger">
                {formik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className={`btn bg-main text-white my-2 $'}`}
          >
            {isLoading ? (
              <FallingLines
                color="#fff"
                width="40"
                height="25"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
