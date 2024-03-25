
```
api
├─ admin
│  ├─ category
│  │  ├─ [id]
│  │  │  └─ route.js
│  │  └─ route.js
│  ├─ chart
│  │  └─ route.js
│  ├─ orders
│  │  ├─ [orderId]
│  │  │  └─ route.js
│  │  └─ route.js
│  ├─ product
│  │  ├─ [id]
│  │  │  └─ route.js
│  │  ├─ reviews
│  │  │  └─ remove
│  │  └─ route.js
│  ├─ tag
│  │  ├─ [id]
│  │  │  └─ route.js
│  │  └─ route.js
│  └─ upload
│     └─ image
│        └─ route.js
├─ auth
│  └─ [...nextauth]
│     └─ route.js
├─ categories
│  └─ route.js
├─ category
│  └─ [slug]
│     └─ route.js
├─ product
│  ├─ [slug]
│  │  └─ route.js
│  ├─ brands
│  │  └─ route.js
│  ├─ brandsByCategory
│  │  └─ route.js
│  ├─ filter
│  │  └─ route.js
│  └─ route.js
├─ register
│  └─ route.js
├─ route.js
├─ search
│  └─ products
│     └─ route.js
├─ shop
│  └─ route.js
├─ stripe
│  └─ coupon
│     └─ route.js
├─ tag
│  └─ [slug]
│     └─ route.js
├─ tags
│  └─ route.js
├─ user
│  ├─ chart
│  │  └─ route.js
│  ├─ orders
│  │  ├─ refund
│  │  │  └─ route.js
│  │  └─ route.js
│  ├─ product
│  │  ├─ like
│  │  │  └─ route.js
│  │  ├─ rating
│  │  │  └─ route.js
│  │  ├─ reviews
│  │  └─ unlike
│  │     └─ route.js
│  └─ stripe
│     └─ session
│        └─ route.js
└─ webhook
   └─ route.js

```