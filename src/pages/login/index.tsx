import React from "react";
import { useForm } from "react-hook-form";
import { LoginFormValues, LoginRequestBody, LoginResponse } from "@/types";

const getCredentials = (loginRequestBody: LoginRequestBody) => {
  let appHeaders = new Headers({
    "Content-Type": "application/json",
  });

  return fetch("/auth", {
    method: "POST",
    headers: appHeaders,
    body: JSON.stringify(loginRequestBody),
  }).then((data) => {
    return data.json();
  });
};

const Login  = () => {
 

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, touchedFields },
  } = useForm<LoginFormValues>();

  const handleReset = () => {
    reset();
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
        const credentials: LoginResponse = await getCredentials(data);
      } catch (error) {
        alert(`Not able to login`);
        console.error(error);
      }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Login page
      <div>
        <div>
          <label htmlFor="un">Username</label>
          <input id="un" type="text" {...register("username", {required: true})} />
        </div>
        <div>
          <label htmlFor="ps">Password</label>
          <input type="text" id="ps" {...register("password", {required: true }) } />
        </div>
        <button type="submit"  >
          Login
        </button>

        <button type="reset" onClick={handleReset}>
          Reset
        </button>
        {touchedFields.username && errors.username && (<div> The `username` is required </div>)}
        {touchedFields.password && errors.password && (<div> The `password` is required </div>)}
      </div>
    </form>
  );
};

export default Login;
