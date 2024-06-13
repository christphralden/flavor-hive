import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price:number):string{
  return Intl.NumberFormat("id",{
		style:'currency',
		currency: "IDR",
		maximumFractionDigits:0
	}).format(price)
}

export const round = (value:number) =>{
	return (value % 1 !== 0) ? value.toFixed(2) : value
}