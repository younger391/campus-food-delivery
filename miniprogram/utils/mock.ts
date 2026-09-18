export interface Product { id: number; merchantId: number; name: string; price: number; description: string; image: string; sold: number; status?: boolean }
export interface Merchant { id: number; name: string; category: string; notice: string; deliveryFee: number; minOrder: number; score: number; image: string; business: boolean; products: Product[] }
export const categories = ['全部', '快餐便当', '奶茶饮品', '面食粉类', '甜品烘焙', '水果生鲜']
export const merchants: Merchant[] = [
 { id:1,name:'食光简餐',category:'快餐便当',notice:'现做现送，午高峰请耐心等待',deliveryFee:2,minOrder:15,score:4.8,image:'🍱',business:true,products:[{id:101,merchantId:1,name:'招牌黄焖鸡米饭',price:18,description:'鲜嫩鸡腿肉，配时蔬和米饭',image:'🍛',sold:328},{id:102,merchantId:1,name:'黑椒牛肉饭',price:22,description:'黑椒牛肉搭配西兰花',image:'🥘',sold:196}] },
 { id:2,name:'一杯好茶',category:'奶茶饮品',notice:'第二杯半价，支持少冰少糖',deliveryFee:1,minOrder:10,score:4.9,image:'🧋',business:true,products:[{id:201,merchantId:2,name:'招牌珍珠奶茶',price:12,description:'醇厚奶香，Q弹珍珠',image:'🧋',sold:552},{id:202,merchantId:2,name:'芝芝莓莓',price:16,description:'新鲜草莓与芝士奶盖',image:'🍓',sold:231}] },
 { id:3,name:'阿姨手工面',category:'面食粉类',notice:'手工现擀，汤底每日熬制',deliveryFee:2,minOrder:12,score:4.7,image:'🍜',business:false,products:[{id:301,merchantId:3,name:'红烧牛肉面',price:19,description:'大块牛肉，劲道手工面',image:'🍜',sold:179}] }
]
export const getMerchant = (id: number) => merchants.find(item => item.id === id)
export const getProduct = (id: number) => merchants.flatMap(item => item.products).find(item => item.id === id)
