import React from "react";
import { useForm } from "react-hook-form";
import { LoginFormValues, LoginRequestBody, LoginResponse } from "@/types";
import serverSideProps from "@/lib/getPageProps";
import { useRouter } from "next/router";

let appHeaders = new Headers({
  "Content-Type": "application/json",
});

const getCredentials = (loginRequestBody: LoginRequestBody) => {
  return fetch("/auth", {
    method: "POST",
    headers: appHeaders,
    body: JSON.stringify(loginRequestBody),
  }).then((data) => {
    return data.json();
  });
};


const postToken = (loginResponse: LoginResponse) => {
  return  fetch('/api/saveSession', {
    method: 'POST',
    headers: appHeaders,
    body: JSON.stringify({
      token: loginResponse.token
    })
  }).then((data) => {
    return data.json();
  });
}

const Login  = () => {
  
  const router = useRouter();
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
        await postToken(credentials);
        router.push('/');
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
        <button type="submit">
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

export const getServerSideProps = serverSideProps;
