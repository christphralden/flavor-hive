"use client";
import { login } from "@service/auth";
import React from "react";
import { useForm } from "react-hook-form";

export default function loginPage() {
  //   login function
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(login)}>
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
