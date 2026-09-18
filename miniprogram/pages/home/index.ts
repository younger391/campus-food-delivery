import { categories, merchants } from '../../utils/mock'
Page({ data:{categories, merchants:merchants.slice(0,2), campus:'清华大学'}, goMerchants(){wx.switchTab({url:'/pages/merchants/index'})}, goMerchant(e:WechatMiniprogram.BaseEvent){wx.navigateTo({url:`/pages/merchant-detail/index?id=${e.currentTarget.dataset.id}`})} })
