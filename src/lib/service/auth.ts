import pb from "@/lib/service/pocketbase";

// login
async function login(data: any) {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(data.email, data.password);
  } catch (e) {
    alert(e);
  }
}

//logout
function logout() {
  pb.authStore.clear();
}

export {login, logout}
