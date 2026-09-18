Page({data:{business:true},change(e:WechatMiniprogram.BaseEvent){this.setData({business:e.detail.value});wx.showToast({title:e.detail.value?'已开启营业':'已暂停营业'})}})
