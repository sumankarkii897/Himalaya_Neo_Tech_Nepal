import {z} from 'zod'

export const RegisterSchema = z.object({
    username : z.string().nonempty("Username is required").min(3, "Username must be greater than 3 characters"),
    email : z.string().nonempty("Email is required").email("Invalid email address"),
    password : z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters length"),
})