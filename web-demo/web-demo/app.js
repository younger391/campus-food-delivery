const merchants = [
  {
    id: 1,
    name: '食光简餐',
    category: '快餐便当',
    notice: '现做现送，午高峰请耐心等待',
    deliveryFee: 2,
    minOrder: 15,
    score: 4.8,
    image: '🍱',
    business: true,
    products: [
      {
        id: 101,
        name: '招牌黄焖鸡米饭',
        price: 18,
        description: '鲜嫩鸡腿肉，配时蔬和米饭',
        image: '🍛',
        sold: 328
      },
      {
        id: 102,
        name: '黑椒牛肉饭',
        price: 22,
        description: '黑椒牛肉搭配西兰花',
        image: '🥘',
        sold: 196
      }
    ]
  },
  {
    id: 2,
    name: '一杯好茶',
    category: '奶茶饮品',
    notice: '第二杯半价，支持少冰少糖',
    deliveryFee: 1,
    minOrder: 10,
    score: 4.9,
    image: '🧋',
    business: true,
    products: [
      {
        id: 201,
        name: '招牌珍珠奶茶',
        price: 12,
        description: '醇厚奶香，Q弹珍珠',
        image: '🧋',
        sold: 552
      },
      {
        id: 202,
        name: '芝芝莓莓',
        price: 16,
        description: '新鲜草莓与芝士奶盖',
        image: '🍓',
        sold: 231
      }
    ]
  },
  {
    id: 3,
    name: '阿姨手工面',
    category: '面食粉类',
    notice: '手工现擀，汤底每日熬制',
    deliveryFee: 2,
    minOrder: 12,
    score: 4.7,
    image: '🍜',
    business: false,
    products: [
      {
        id: 301,
        name: '红烧牛肉面',
        price: 19,
        description: '大块牛肉，劲道手工面',
        image: '🍜',
        sold: 179
      }
    ]
  }
];

const categories = [
  '全部',
  '快餐便当',
  '奶茶饮品',
  '面食粉类',
  '甜品烘焙',
  '水果生鲜'
];

const app = document.querySelector('#app');
const title = document.querySelector('#page-title');
const subtitle = document.querySelector('#page-subtitle');

const state = {
  page: 'home',
  history: [],
  merchantId: null,
  productId: null,
  category: '全部',
  cart: [],
  orders: [
    {
      id: 'MVP20260918001',
      status: '已完成',
      time: '今天 12:20',
      total: 20,
      items: [
        {
          name: '招牌黄焖鸡米饭',
          count: 1,
          price: 18
        }
      ]
    }
  ]
};

const productById = id =>
  merchants
    .flatMap(m =>
      m.products.map(p => ({
        ...p,
        merchant: m
      }))
    )
    .find(p => p.id === Number(id));

const money = value =>
  `¥${Number(value).toFixed(value % 1 ? 1 : 0)}`;

const total = () =>
  state.cart.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

const setPage = (page, payload = {}) => {
  if (state.page !== page) {
    state.history.push(state.page);
  }

  Object.assign(state, payload, {
    page
  });

  render();
};

const back = () => {
  const prior = state.history.pop();

  if (prior) {
    state.page = prior;
    render();
  } else if (state.page !== 'home') {
    state.page = 'home';
    render();
  }
};

const merchantCard = merchant => `
  <article
    class="card merchant"
    data-action="merchant"
    data-id="${merchant.id}"
  >
    <div class="merchant-icon">${merchant.image}</div>

    <div class="merchant-info">
      <div class="merchant-name">
        ${merchant.name}
        ${
          merchant.business
            ? ''
            : '<span class="pill closed">已打烊</span>'
        }
      </div>

      <div class="merchant-meta">
        ${merchant.category} · ${merchant.score}分 ·
        起送${money(merchant.minOrder)}
      </div>

      <div class="merchant-meta notice">
        ${merchant.notice}
      </div>
    </div>
  </article>
`;

const productRow = product => `
  <article class="card product">

    <button
      class="dish-icon"
      data-action="product"
      data-id="${product.id}"
    >
      ${product.image}
    </button>

    <div
      class="product-copy"
      data-action="product"
      data-id="${product.id}"
    >
      <h3>${product.name}</h3>

      <div class="muted">
        ${product.description}
      </div>

      <div class="price">
        ${money(product.price)}
        <span class="muted">
          月售${product.sold}
        </span>
      </div>
    </div>

    <button
      class="add"
      data-action="add"
      data-id="${product.id}"
      aria-label="加入购物车"
    >
      +
    </button>

  </article>
`;

function renderHome() {
  title.textContent = '校园食堂';
  subtitle.textContent = '清华大学 · 校园外卖';

  app.innerHTML = `
    <section class="hero">
      <h1>清华大学 · 校园外卖</h1>
      <p>好好吃饭，准时送到宿舍楼下</p>
    </section>

    <div class="section-heading">
      热门分类
    </div>

    <section class="category-grid">
      ${categories
        .slice(1)
        .map(
          (item, index) => `
            <button
              class="category"
              data-action="category"
              data-category="${item}"
            >
              <b>
                ${['🍱', '🧋', '🍜', '🍰', '🍎'][index]}
              </b>
              ${item}
            </button>
          `
        )
        .join('')}
    </section>

    <div class="section-heading">
      附近好店

      <button
        class="link"
        data-action="tab"
        data-tab="merchants"
      >
        查看全部 ›
      </button>
    </div>

    ${merchants
      .slice(0, 2)
      .map(merchantCard)
      .join('')}
  `;
}

function renderMerchants() {
  title.textContent = '商家列表';
  subtitle.textContent = '发现校园好味道';

  const list =
    state.category === '全部'
      ? merchants
      : merchants.filter(
          m => m.category === state.category
        );

  app.innerHTML = `
    <div class="tabs">
      ${categories
        .map(
          c => `
            <button
              data-action="category"
              data-category="${c}"
              class="${c === state.category ? 'active' : ''}"
            >
              ${c}
            </button>
          `
        )
        .join('')}
    </div>

    <div class="section-heading">
      ${state.category === '全部' ? '全部商家' : state.category}
    </div>

    ${
      list.length
        ? list.map(merchantCard).join('')
        : `
          <div class="empty">
            <b>🍽️</b>
            暂未找到该分类商家
          </div>
        `
    }
  `;
}

function renderMerchant() {
  const merchant = merchants.find(
    m => m.id === state.merchantId
  );

  title.textContent = '商家详情';
  subtitle.textContent = merchant.name;

  app.innerHTML = `
    <section class="shop-hero">

      <div class="merchant-icon">
        ${merchant.image}
      </div>

      <div>
        <h2>${merchant.name}</h2>

        <div class="merchant-meta">
          ${merchant.score}分 ·
          起送${money(merchant.minOrder)} ·
          配送${money(merchant.deliveryFee)}
        </div>

        <div class="merchant-meta">
          ${merchant.notice}
        </div>
      </div>

    </section>

    <h2 class="shop-products-title">
      商品
    </h2>

    ${merchant.products
      .map(productRow)
      .join('')}
  `;
}

function renderProduct() {
  const product = productById(
    state.productId
  );

  title.textContent = '商品详情';
  subtitle.textContent = product.merchant.name;

  app.innerHTML = `
    <article class="card detail">

      <span class="large-icon">
        ${product.image}
      </span>

      <h1>${product.name}</h1>

      <div class="price">
        ${money(product.price)}
      </div>

      <div class="muted">
        月售 ${product.sold}
      </div>

      <p class="description">
        ${product.description}
      </p>

    </article>

    <button
      class="fixed-action"
      data-action="add"
      data-id="${product.id}"
    >
      加入购物车
    </button>
  `;
}

function renderCart() {
  title.textContent = '购物车';
  subtitle.textContent = state.cart.length
    ? '已选商品可随时调整'
    : '还没有选购商品';

  if (!state.cart.length) {
    app.innerHTML = `
      <div class="empty">
        <b>🛒</b>
        购物车还是空的
        <br>

        <button
          class="link"
          data-action="tab"
          data-tab="merchants"
        >
          去挑选喜欢的美食
        </button>
      </div>
    `;

    return;
  }

  app.innerHTML = `
    <section class="card">

      ${state.cart
        .map(
          item => `
            <div class="cart-row">

              <div class="dish-icon">
                ${item.image}
              </div>

              <div class="cart-copy">
                <strong>${item.name}</strong>

                <div class="price">
                  ${money(item.price)}
                </div>
              </div>

              <div class="quantity">

                <button
                  data-action="quantity"
                  data-id="${item.id}"
                  data-step="-1"
                >
                  −
                </button>

                <span>${item.count}</span>

                <button
                  data-action="quantity"
                  data-id="${item.id}"
                  data-step="1"
                >
                  +
                </button>

              </div>

            </div>
          `
        )
        .join('')}

    </section>

    <div class="checkout-bar">

      <div>
        合计
        <strong class="price">
          ${money(total())}
        </strong>
      </div>

      <button data-action="checkout">
        去结算
      </button>

    </div>
  `;
}

function renderCheckout() {
  title.textContent = '提交订单';
  subtitle.textContent = '确认模拟订单';

  if (!state.cart.length) {
    setPage('cart');
    return;
  }

  app.innerHTML = `
    <section class="card address">

      <div>
        <strong>
          张同学 138****8888
        </strong>

        <div class="muted">
          清华大学 · 紫荆公寓 3 号楼 201
        </div>
      </div>

      <span>›</span>

    </section>

    <section class="card">

      ${state.cart
        .map(
          i => `
            <div class="order-line">
              <span>
                ${i.name} × ${i.count}
              </span>

              <span>
                ${money(i.price * i.count)}
              </span>
            </div>
          `
        )
        .join('')}

      <div class="order-line total">
        <span>合计</span>

        <span class="price">
          ${money(total())}
        </span>
      </div>

    </section>

    <p class="tip">
      这是浏览器模拟订单，不会跳转真实微信支付。
    </p>

    <button
      class="fixed-action"
      data-action="submit-order"
    >
      提交订单
    </button>
  `;
}

function renderOrders() {
  title.textContent = '我的订单';
  subtitle.textContent = '查看订单状态';

  app.innerHTML = state.orders.length
    ? state.orders
        .map(
          order => `
            <article class="card order-card">

              <div class="order-head">
                <span>校园外卖订单</span>
                <span class="pill">
                  ${order.status}
                </span>
              </div>

              ${order.items
                .map(
                  i => `
                    <div class="muted">
                      ${i.name} × ${i.count}
                    </div>
                  `
                )
                .join('')}

              <div class="order-line">
                <span class="muted">
                  ${order.time}
                </span>

                <span>
                  实付
                  <b class="price">
                    ${money(order.total)}
                  </b>
                </span>
              </div>

            </article>
          `
        )
        .join('')
    : `
      <div class="empty">
        <b>📋</b>
        暂无订单
      </div>
    `;
}

function renderProfile() {
  title.textContent = '个人中心';
  subtitle.textContent = '校园同学';

  app.innerHTML = `
    <section class="profile-head">

      <div class="avatar">
        👩‍🎓
      </div>

      <div>
        <h2>校园同学</h2>
        <div>138****8888</div>
      </div>

    </section>

    <section class="card">

      <button
        class="menu-item"
        data-action="tab"
        data-tab="orders"
      >
        <span>我的订单</span>
        <span>›</span>
      </button>

      <button
        class="menu-item"
        data-action="notice"
      >
        <span>收货地址</span>
        <span>›</span>
      </button>

    </section>

    <section class="card">

      <button
        class="menu-item"
        data-action="notice"
      >
        <span>
          我是商家（小程序版可用）
        </span>

        <span>›</span>
      </button>

    </section>
  `;
}

function render() {
  const views = {
    home: renderHome,
    merchants: renderMerchants,
    merchant: renderMerchant,
    product: renderProduct,
    cart: renderCart,
    checkout: renderCheckout,
    orders: renderOrders,
    profile: renderProfile
  };

  views[state.page]();

  document
    .querySelectorAll('[data-tab]')
    .forEach(button => {
      button.classList.toggle(
        'active',
        button.dataset.tab === state.page
      );
    });

  const count = state.cart.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const badge =
    document.querySelector('#cart-badge');

  badge.textContent = count;
  badge.style.display = count
    ? 'block'
    : 'none';

  document.querySelector(
    '#back-button'
  ).style.visibility =
    [
      'home',
      'merchants',
      'cart',
      'orders',
      'profile'
    ].includes(state.page)
      ? 'hidden'
      : 'visible';
}

function toast(message) {
  const el = document.createElement('div');

  el.className = 'toast';
  el.textContent = message;

  document
    .querySelector('.phone-shell')
    .append(el);

  setTimeout(() => el.remove(), 1400);
}

function addProduct(id) {
  const product = productById(id);

  const item = state.cart.find(
    i => i.id === product.id
  );

  if (item) {
    item.count += 1;
  } else {
    state.cart.push({
      ...product,
      count: 1
    });
  }

  toast('已加入购物车');

  render();
}

document.addEventListener(
  'click',
  event => {
    const el = event.target.closest(
      '[data-action], [data-tab]'
    );

    if (!el) return;

    const action = el.dataset.action;

    if (el.dataset.tab) {
      state.history = [];
      state.page = el.dataset.tab;
      render();
      return;
    }

    if (action === 'merchant') {
      setPage('merchant', {
        merchantId: Number(el.dataset.id)
      });
    }

    if (action === 'product') {
      setPage('product', {
        productId: Number(el.dataset.id)
      });
    }

    if (action === 'category') {
      state.category = el.dataset.category;
      setPage('merchants');
    }

    if (action === 'add') {
      addProduct(
        Number(el.dataset.id)
      );
    }

    if (action === 'quantity') {
      const item = state.cart.find(
        i => i.id === Number(el.dataset.id)
      );

      item.count += Number(
        el.dataset.step
      );

      state.cart = state.cart.filter(
        i => i.count > 0
      );

      render();
    }

    if (action === 'checkout') {
      setPage('checkout');
    }

    if (action === 'submit-order') {
      state.orders.unshift({
        id: `MVP${Date.now()}`,
        status: '待接单',
        time: '刚刚',
        total: total(),
        items: state.cart.map(i => ({
          ...i
        }))
      });

      state.cart = [];
      state.history = [];
      state.page = 'orders';

      toast('订单已提交（模拟）');

      render();
    }

    if (action === 'notice') {
      toast(
        '浏览器演示暂未开放此入口'
      );
    }
  }
);

document
  .querySelector('#back-button')
  .addEventListener('click', back);

render();
