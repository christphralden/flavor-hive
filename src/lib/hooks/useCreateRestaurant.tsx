import { CreateRestaurantContext, CreateRestaurantContextType } from "@context/create-restaurant-context";
import { useContext } from "react";

export const useCreateRestaurant : () => CreateRestaurantContextType = () => useContext(CreateRestaurantContext)