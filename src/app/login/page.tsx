"use client";
import React from "react";
import pb from "@/lib/service/pocketbase";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function login() {
  const router = useRouter();
  //   login function
  const { register, handleSubmit } = useForm();
  async function login(data: any) {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);
    } catch (e) {
      alert(e);
    }
    router.push("/home");
  }

  //logout
  function logout (){
    pb.authStore.clear();
  }

  // if(!pb.authStore.model)return null
  return (
    <div>
      <h1>Login</h1>
      <h1>Welcome, {pb.authStore.model?.email}</h1>
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
      <button onClick={logout}>logout</button>
    </div>
  );
}
