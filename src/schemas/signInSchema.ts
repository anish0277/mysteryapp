import {z} from 'zod'

export const signUpSchema={
    identifier:z.string(),
    password:z.string()
}