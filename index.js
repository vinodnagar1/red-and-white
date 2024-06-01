import dotenv from "dotenv"
import express from 'express'
import mongoose from 'mongoose'
dotenv.config({path:"./.env"})
import cors from 'cors'
import userrouter from "./routes/user.routes.js"
import cartrouter from "./routes/cart.routes.js"
import cookieParser from "cookie-parser"
import { conn } from "./db/index.js"
import bodyParser from "body-parser"
const server=express()

server.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))




server.use(cookieParser())
server.use(express.json())
server.use(express.urlencoded({extended: true, limit: "16kb"}))
server.use(express.static("./middlewares/test/"));






server.use("/api/users",userrouter)
server.use("/api/cart",cartrouter)


conn()
server.listen(process.env.PORT||8000,()=>{
    console.log("server started")
})

