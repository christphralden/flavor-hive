"use client"
import pb from "@service/pocketbase";
import React, { useEffect, useState } from "react";

export default function home() {
  
  //logout function
  function logout() {
    pb.authStore.clear();
  }

  const [user, setUser] = useState<any|null>(null);

  useEffect(() => {
    if(pb.authStore.model){
      setUser(pb.authStore.model)
    }
  

  }, [])
  

  return <div>
    <h1>Welcome, {`${user?.email}`}</h1>
  </div>;
}
