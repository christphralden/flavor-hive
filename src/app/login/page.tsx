"use client";
import { useAuth } from "@hooks/useAuth";
import { login } from "@service/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();

  const {login} = useAuth();

  const handleLogin = async (data: any) => {
		const loginData: UserLogin = {
			email: data.email,
			password: data.password,
		};
		await login(loginData);
	};

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input className="text-black" type="text" placeholder="email" {...register("email")}></input>
        <input
          className="text-black"
          type="password"
          placeholder="password"
          {...register("password")}
        ></input>
        <button>Login</button>
      </form>
    </div>
  );
}
