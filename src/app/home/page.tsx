import pb from "@/lib/service/pocketbase";
import React from "react";

export default function home() {
  //logout function
  function logout() {
    pb.authStore.clear();
  }


  return <div>

    <h1>Welcome, {pb.authStore.model?.email}</h1>
  </div>;
}
