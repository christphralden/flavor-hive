import { z } from "zod";


export const fileSchema = z.instanceof(File);
export const fileArraySchema = z.array(fileSchema);
export const dateStringSchema = z.union([z.string(), z.string().transform((str) => new Date(str))]);
