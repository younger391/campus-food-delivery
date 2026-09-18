import { Product } from './mock'
export interface CartItem extends Product { count: number }
const KEY = 'campus_cart'
export const getCart = (): CartItem[] => wx.getStorageSync(KEY) || []
export const saveCart = (items: CartItem[]) => { wx.setStorageSync(KEY, items); wx.setTabBarBadge({ index: 2, text: items.reduce((n, i) => n + i.count, 0).toString() }) }
export const addCart = (product: Product) => { const items = getCart(); const found = items.find(i => i.id === product.id); if(found) found.count++; else items.push({...product,count:1}); saveCart(items); wx.showToast({title:'已加入购物车',icon:'success'}) }
export const clearCart = () => saveCart([])
