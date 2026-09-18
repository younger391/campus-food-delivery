import {Router} from 'express'; import {merchants,products,orders} from '../data/mock.js';
export const studentRouter=Router();
studentRouter.get('/merchants',(_req,res)=>res.json({data:merchants}));
studentRouter.get('/merchants/:id',(req,res)=>{const merchant=merchants.find(m=>m.id===Number(req.params.id)); if(!merchant)return res.status(404).json({message:'商家不存在'});res.json({data:{...merchant,products:products.filter(p=>p.merchantId===merchant.id)}})});
studentRouter.get('/products/:id',(req,res)=>{const product=products.find(p=>p.id===Number(req.params.id));if(!product)return res.status(404).json({message:'商品不存在'});res.json({data:product})});
studentRouter.get('/orders',(_req,res)=>res.json({data:orders}));
studentRouter.post('/orders',(req,res)=>res.status(201).json({data:{id:Date.now(),status:'PENDING',...req.body},message:'模拟订单创建成功'}));
