import {z} from "zod"

export const usernameValidation=z.
    string()
    .min(2,'Username must have atleast 2 characters')
    .max(20,'Username cannot have more than 20 characters')
    .regex(/[^A-Za-z0-9]/,'Username must contain special Character')



export const signUpSchema={
    username:usernameValidation,
    email:z.string().email({message:'invalid email address'}),
    password:z.string().min(6,{message:'password must be atleast 6 character'})
}
