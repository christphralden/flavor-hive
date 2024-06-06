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