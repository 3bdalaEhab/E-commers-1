import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import "./Login.module.css";
import { FallingLines } from "react-loader-spinner";
import { tokenContext } from "../CounterContext/TokenContext";

export default function Login() {
   const {setToken} = useContext(tokenContext)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function register(value) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        value
      );
      if (data.message === "success") {
        // setMessage(data.message);
        setIsLoading(true);
        setTimeout(() => {
          
          localStorage.setItem("userToken",data.token)
          setToken(data.token)
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);

      console.log("error in Api", error);
      setMessage(error.response.data.message);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),

    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,8}$/, "password start with uppercase")
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
          {message === "" ? "" :  <div className=" fw-bold h5 alert-danger alert m-auto py-2 w-50 text-center">
              {message}
            </div>
          }

          <h2 className="mb-4 fw-bold">Login Now:</h2>

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
              className="form-control mb-1 "
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
              <Link className="fw-bold" to={'/ForgetPas'}>Forget Password ?</Link>
          </div>

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className={`btn bg-main text-white my-2 $'}`}
          >
            {isLoading ? (
              <FallingLines
                color="#fff"
                width="35"
                height="22"
                visible={true}
                ariaLabel="falling-lines-loading"
              ></FallingLines>
            ) : (
              "Login"
            )}
          </button>

        </form>
      </div>
    </>
  );
}
