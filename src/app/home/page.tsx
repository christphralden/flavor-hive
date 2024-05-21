'use client'
import { AuthContext } from "@context/auth-context";
import { useAuth } from "@hooks/useAuth";
import pb from "@service/pocketbase";
import React, { useContext } from "react";

export default function Home() {
  

  const {user, isLoading, logout} = useAuth()
  
  if(isLoading)return null
  return <div>
    <h1>Welcome, {`${user?.email}`}</h1>
    <button onClick={()=>logout()}>LGOUT</button>
  </div>;
}
