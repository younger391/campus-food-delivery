Page({go(e:WechatMiniprogram.BaseEvent){const url=e.currentTarget.dataset.url;url.startsWith('/pages/orders')?wx.switchTab({url}):wx.navigateTo({url})}})
