# 中国多商家校园外卖微信小程序（MVP）

面向中国大学校园的多商家点餐/外卖 MVP。当前版本专注于可演示的前后端骨架：学生端与商家端均使用模拟数据，**不会接入微信支付、真实配送、短信验证或其他第三方账号服务**。

## 项目结构

```text
.
├── miniprogram/             # 微信小程序原生 TypeScript 前端
│   ├── pages/               # 学生端、商家端页面
│   └── utils/               # 模拟商家数据、购物车本地存储
├── server/                  # Node.js + TypeScript + Express API
│   └── src/routes/          # student / merchant 路由
├── database/schema.sql      # MySQL 8.0 数据库设计
└── README.md
```

## 已实现功能

### 学生端

- 首页、热门分类、商家列表和分类筛选
- 商家详情、商品详情、加入购物车、购物车数量与金额计算
- 收货地址、新增地址、模拟提交订单
- 我的订单、订单详情、个人中心

### 商家端（演示入口在“我的 → 我是商家”）

- 模拟商家登录
- 商品管理及商品上下架开关
- 待处理订单列表、接单/拒单
- 营业状态开关

## 前端运行（微信开发者工具）

1. 安装并打开微信开发者工具。
2. 选择 **导入项目**，项目目录选择仓库中的 `miniprogram` 目录。
3. AppID 可使用测试号或项目配置中的 `touristappid`；本 MVP 不依赖云开发。
4. 点击编译，在模拟器中体验学生端；从“我的 → 我是商家”进入商家端演示。

前端采用原生小程序 TypeScript；如需在命令行做类型检查，可安装 `miniprogram-api-typings` 后执行 `npx tsc -p miniprogram/tsconfig.json`。

## 后端运行

要求 Node.js 20+：

```bash
cd server
npm install
npm run dev
```

服务默认监听 `http://localhost:3000`。健康检查：

```bash
curl http://localhost:3000/health
```

主要模拟接口：

- `GET /api/student/merchants`
- `GET /api/student/merchants/:id`
- `GET, POST /api/student/orders`
- `POST /api/merchant/login`
- `GET /api/merchant/products`
- `PATCH /api/merchant/products/:id/status`
- `GET /api/merchant/orders`
- `PATCH /api/merchant/orders/:id`
- `PATCH /api/merchant/profile/business`

## 数据库

MySQL 8.0+ 中执行：

```bash
mysql -u root -p < database/schema.sql
```

Schema 覆盖用户、商家、商品、地址、订单和订单商品，并建立学生订单与商家订单的查询索引。当前 Express 服务尚未连接数据库，路由使用 `server/src/data/mock.ts` 中的模拟数据；下一阶段可引入数据库访问层并按该 Schema 落库。

## 下一阶段建议

1. 将小程序页面请求切换到 API，并加入统一请求、错误处理和环境配置。
2. 实现 MySQL 数据访问、鉴权与商家数据隔离。
3. 补充规格/加料、库存、订单状态机、评价与管理后台。
4. 在具备资质和真实账号后，再评估微信登录、支付、配送与通知能力。
