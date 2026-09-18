import {Router} from 'express'; import {merchants,products,orders} from '../data/mock.js';
export const merchantRouter=Router();
merchantRouter.post('/login',(_req,res)=>res.json({data:{token:'mock-merchant-token',merchant:merchants[0]}}));
merchantRouter.get('/products',(_req,res)=>res.json({data:products.filter(p=>p.merchantId===1)}));
merchantRouter.patch('/products/:id/status',(req,res)=>res.json({data:{id:Number(req.params.id),status:req.body.status},message:'商品状态已更新'}));
merchantRouter.get('/orders',(_req,res)=>res.json({data:orders.filter(o=>o.merchantId===1)}));
merchantRouter.patch('/orders/:id',(req,res)=>res.json({data:{id:Number(req.params.id),status:req.body.status},message:'订单状态已更新'}));
merchantRouter.patch('/profile/business',(req,res)=>res.json({data:{business:req.body.business},message:'营业状态已更新'}));
