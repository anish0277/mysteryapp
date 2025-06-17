import {z} from 'zod'

export const messageSchema={
    content:z.string().min(10,{message:'content must have min 10 characters'}).max(300,{message:'content cannot have more than 300 characters'})
}