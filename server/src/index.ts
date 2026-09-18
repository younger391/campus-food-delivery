import cors from 'cors'; import express from 'express'; import {studentRouter} from './routes/student.js'; import {merchantRouter} from './routes/merchant.js';
const app=express(); app.use(cors()); app.use(express.json()); app.get('/health',(_req,res)=>res.json({status:'ok',mode:'mock'})); app.use('/api/student',studentRouter); app.use('/api/merchant',merchantRouter);
const port=Number(process.env.PORT)||3000; app.listen(port,()=>console.log(`Campus delivery API running at http://localhost:${port}`));
