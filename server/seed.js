const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

const MONGO_URI = 'mongodb://localhost:27017/shopez';

const sampleProducts = [
  {
    name: 'Apple iPhone 14 Pro',
    description: '6.1-inch display, A16 Bionic chip, Pro camera system',
    price: 999,
    category: 'Electronics',
    images: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1660753619946'],
    stock: 10,
    brand: 'Apple',
    sku: 'IP14PRO',
    featured: true
  },
  {
    name: 'Nike Air Max 270',
    description: 'Breathable mesh upper, Max Air unit for comfort',
    price: 150,
    category: 'Clothing',
    images: ['https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/6b2e2e2e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/air-max-270-mens-shoes-KkLcGR.png'],
    stock: 25,
    brand: 'Nike',
    sku: 'NA270',
    featured: true
  },
  {
    name: 'The Lean Startup',
    description: 'Book by Eric Ries about startups and innovation',
    price: 20,
    category: 'Books',
    images: ['https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg'],
    stock: 50,
    brand: 'Crown Business',
    sku: 'TLSBOOK',
    featured: false
  }
];

const products = [
  // Existing products...
  {
    name: 'Apple iPhone 14 Pro',
    description: 'Latest Apple flagship smartphone',
    price: 999,
    category: 'Electronics',
    images: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1660753619946'],
    countInStock: 10,
    sku: 'SKU-001'
  },
  // ...
  // Add 15 more products with valid categories
  {
    name: 'Samsung Galaxy S23',
    description: 'Flagship Samsung smartphone',
    price: 899,
    category: 'Electronics',
    images: ['https://images.samsung.com/is/image/samsung/p6pim/in/sm-s911bzvdinu/gallery/in-galaxy-s23-s911-sm-s911bzvdinu-thumb-535678073?$650_519_PNG$'],
    countInStock: 15,
    sku: 'SKU-002'
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Noise Cancelling Headphones',
    price: 349,
    category: 'Electronics',
    images: ['https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg'],
    countInStock: 20,
    sku: 'SKU-003'
  },
  {
    name: 'Dell XPS 13',
    description: 'Premium Ultrabook Laptop',
    price: 1199,
    category: 'Electronics',
    images: ['https://i.dell.com/sites/csimages/Video_Imagery/all/xps-13-9300-laptop.jpg'],
    countInStock: 8,
    sku: 'SKU-004'
  },
  {
    name: 'Nike Air Max 270',
    description: 'Popular running shoes',
    price: 150,
    category: 'Clothing',
    images: ['https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/6b7e2e2e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/air-max-270-mens-shoes-KkLcGR.png'],
    countInStock: 25,
    sku: 'SKU-005'
  },
  {
    name: 'The Lean Startup',
    description: 'Book by Eric Ries',
    price: 20,
    category: 'Books',
    images: ['https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg'],
    countInStock: 30,
    sku: 'SKU-006'
  },
  {
    name: 'Logitech MX Master 3',
    description: 'Advanced Wireless Mouse',
    price: 99,
    category: 'Electronics',
    images: ['https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3/gallery/mx-master-3-top-view.png?v=1'],
    countInStock: 18,
    sku: 'SKU-007'
  },
  {
    name: 'Canon EOS R6',
    description: 'Mirrorless Camera',
    price: 2499,
    category: 'Electronics',
    images: ['https://www.canon.co.uk/media/eos-r6-front_tcm14-1916627.png'],
    countInStock: 5,
    sku: 'SKU-008'
  },
  {
    name: 'Apple MacBook Air M2',
    description: 'Apple Silicon Laptop',
    price: 1299,
    category: 'Electronics',
    images: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-m2-202206-gallery1?wid=2000&hei=1536&fmt=jpeg&qlt=95&.v=1653493200207'],
    countInStock: 12,
    sku: 'SKU-009'
  },
  {
    name: 'Adidas Ultraboost',
    description: 'High-performance running shoes',
    price: 180,
    category: 'Clothing',
    images: ['https://assets.adidas.com/images/w_600,f_auto,q_auto/6e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e_9366/Ultraboost_21_Shoes_White_FY0377_01_standard.jpg'],
    countInStock: 22,
    sku: 'SKU-010'
  },
  {
    name: 'Google Pixel 7',
    description: 'Google flagship smartphone',
    price: 799,
    category: 'Electronics',
    images: ['https://store.google.com/product/images/phone_pixel_7_1.png'],
    countInStock: 14,
    sku: 'SKU-011'
  },
  {
    name: 'HP Envy 15',
    description: 'Powerful laptop for creators',
    price: 1099,
    category: 'Electronics',
    images: ['https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06524192.png'],
    countInStock: 10,
    sku: 'SKU-012'
  },
  {
    name: 'Sony PlayStation 5',
    description: 'Next-gen gaming console',
    price: 499,
    category: 'Electronics',
    images: ['https://www.sony.com/image/ps5-console.png'],
    countInStock: 7,
    sku: 'SKU-013'
  },
  {
    name: 'Apple Watch Series 8',
    description: 'Latest Apple smartwatch',
    price: 399,
    category: 'Electronics',
    images: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MNJT3_VW_34FR+watch-44-alum-silver-nc-8s_VW_34FR_WF_CO_GEO_US?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1660778403922'],
    countInStock: 16,
    sku: 'SKU-014'
  },
  {
    name: 'Kindle Paperwhite',
    description: 'E-reader with high-res display',
    price: 129,
    category: 'Electronics',
    images: ['https://images-na.ssl-images-amazon.com/images/I/61nR1V1bQPL._AC_SL1000_.jpg'],
    countInStock: 20,
    sku: 'SKU-015'
  },
  {
    name: 'Bose QuietComfort Earbuds',
    description: 'Noise cancelling earbuds',
    price: 279,
    category: 'Electronics',
    images: ['https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/quietcomfort_earbuds/product_silo_images/qc_earbuds_triple_black_EC_hero.psd/jcr:content/renditions/cq5dam.web.320.320.png'],
    countInStock: 13,
    sku: 'SKU-016'
  },
  {
    name: 'Instant Pot Duo',
    description: '7-in-1 Electric Pressure Cooker',
    price: 89,
    category: 'Home & Garden',
    images: ['https://m.media-amazon.com/images/I/81i6r2p1KLL._AC_SL1500_.jpg'],
    countInStock: 25,
    sku: 'SKU-017'
  },
  {
    name: 'Fitbit Charge 5',
    description: 'Advanced fitness tracker',
    price: 149,
    category: 'Electronics',
    images: ['https://static-01.daraz.pk/p/6e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e_9366/fitbit-charge-5-advanced-fitness-tracker.jpg'],
    countInStock: 19,
    sku: 'SKU-018'
  }
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');

    // Create default admin user
    const adminEmail = 'admin@shopez.com';
    const adminPassword = 'admin';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = new User({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        isActive: true
      });
      await admin.save();
      console.log('Default admin user created:', adminEmail, '/', adminPassword);
    } else {
      admin.password = adminPassword;
      await admin.save();
      console.log('Admin user password reset to:', adminPassword);
    }

    // Add sample products
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Sample products added');

    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed(); 