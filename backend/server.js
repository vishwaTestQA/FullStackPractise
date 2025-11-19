import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import userRoute from './routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// const http = require('http')
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'content-type': "text/plain"})
//     res.end('Hello')
// })

// server.listen(4500,() => {
//    console.log("connected")
// });

const app = express();

app.listen(4500, ()=>{
    console.log('connected')
})

app.use(express.json())
app.use(cookieParser())

// app.use(cors())  

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }))



// app.use('/user',(req, res)=>{
//   console.log(req.body.name)   //untill we log req.body the cors issue wont come but when accessing prop from body it comes
// })


app.use('/user', userRoute)


const filename = fileURLToPath(import.meta.url)
const dirName = path.dirname(filename)
console.log("==========",path.join(dirName, 'views', '404.html'))

// app.all('*', (req, res)=>{
//   res.status(404); //assigning the status as 404
//   if(req.accepts("html")){
//     return res.sendFile(path.join(dirName, 'views', '404.html'))//  __dirname wont work in ESM 
//   }
//   else if(req.accepts("json")){
//    return res.send({"error": "404 not found"})
//   }else{
//     res.type('txt').send("404 not found")
//   }
// })




// import cluster from "cluster";
// import os from "os";
// import app from "./app.js";

// const numCPUs = os.cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary process ${process.pid} is running`);
  
//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   // Restart worker if it crashes
//   cluster.on("exit", () => cluster.fork());
  
// } else {
//   // Worker process runs Express server
//   app.listen(3000, () => {
//     console.log(`Worker ${process.pid} started`);
//   });
// }
