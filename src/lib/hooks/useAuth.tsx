import { AuthContext, AuthContextType } from "@context/auth-context";
import { useContext } from "react";

export const useAuth : () => AuthContextType = () => useContext(AuthContext)