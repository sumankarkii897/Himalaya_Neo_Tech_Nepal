import {z} from 'zod'

export const CreateSolutionSchema = z.object({
  name: z.string().min(1,"Name is required").min(2,"Name must be at least 2 characters long").max(100,"Name must be not be greater than 100 characters long"),
  description: z.string().min(1,"Description is required").min(10,"Description must be at least 10 characters long").max(200,"Description must be not be greater than 200 characters long"),
  category: z.string().min(1,"Category is required").min(2,"Category must be at least 2 characters long").max(50,"Category must be not be greater than 50 characters long"),
  price: z.number().min(1,"Price is required").positive("Price must be a positive number")
})