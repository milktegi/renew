const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useMongoClient:true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Material } = require('./models/material');
const { Product } = require('./models/product');

// middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

// =============================
// 					 PRODUCTS
// =============================

app.get('/api/product/articles', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? req.query.limit : 100;

  Product.find()
    .populate('brand')
    .populate('wood')
    .sort([ [ sortBy, order ] ])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});

app.get('/api/product/articles_by_id', (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  if (type === 'array') {
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }
  Product.find({ _id: { $in: items } }).populate('brand').populate('wood');
  exec((err, docs) => {
    return res.status(200).send(docs);
  });
});

app.post('/api/product/article', auth, admin, (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc
    });
  });
});

// =============================
// 						WOODS
// =============================

app.post('/api/product/material', auth, admin, (req, res) => {
  const material = new Material(req.body);
  material.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      material: doc
    });
  });
});

app.get('/api/product/materials', (req, res) => {
  Material.find({}, (err, materials) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(materials);
  });
});

// =============================
// 						BRAND
// =============================

app.post('/api/product/brand', auth, admin, (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc
    });
  });
});

app.get('/api/product/get_brands', auth, admin, (req, res) => {
  // 브랜드에서 다 찾는다
  Brand.find({}, (err, brands) => {
    // 에러 처리
    if (err) return res.json({ success: false, err });
    // 모든 브랜드 데이터베이스에서 가져오기
    res.status(200).send(brands);
  });
});

// =============================
// 						USERS
// =============================

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    // user: req.user
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    nickname: req.user.nickname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      userdata: doc
    });
  });
});

app.post('/api/users/login', (req, res) => {
  // find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ loginSuccess: false, message: 'auth failed' });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'wrong password' });

      ///
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true
        });
      });
    });
  });

  // check password

  // generate a token
});

const port = process.env.PORT || 3011;

app.listen(port, () => {
  console.log(`서버는 ${port}를 듣고있음`);
});
