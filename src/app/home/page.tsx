'use client'
import { useAuth } from "@hooks/useAuth";
import React from "react";

export default function Home() {
  

  const {user, isLoading, logout} = useAuth()
  
  if(isLoading)return <>loading jag</>
  return <div>
    <h1>Welcome, {`${user?.email}`}</h1>
    <button onClick={()=>logout()}>LGOUT</button>
  </div>;
}
