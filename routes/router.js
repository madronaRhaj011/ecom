const express = require('express');
const router = express.Router();
const Mcontroller = require('../controller/mcontroller');

router.get('/', Mcontroller.index.index);
router.get('/login', Mcontroller.index.login);
router.get('/register', Mcontroller.index.register);
router.get('/shop-detail', Mcontroller.index.shop);
router.get('/home', Mcontroller.index.home);
router.get('/shop-product', Mcontroller.index.shopProduct);
router.get('/cart', Mcontroller.index.cart);
router.get('/checkout', Mcontroller.index.checkout);
router.get('/delete/:id', Mcontroller.crud.delete);
router.get('/user', Mcontroller.index.user);
router.get('/contact', Mcontroller.index.contact);
router.get('/logout', Mcontroller.index.logout);


router.get('/adminuser', Mcontroller.admin.adminuser)
router.get('/edit/:id', Mcontroller.admin.edit);
router.get('/add', Mcontroller.admin.add);
router.post('/update/:id', Mcontroller.admin.update);
router.post('/save', Mcontroller.admin.save);
router.get('/delete/:id', Mcontroller.admin.delete);
//user eto asa baba
router.get('/aadminuser', Mcontroller.adminU.adminuser)
router.get('/eedit/:id', Mcontroller.adminU.edit);
router.get('/aadd', Mcontroller.adminU.add);
router.post('/uupdate/:id', Mcontroller.adminU.update);
router.post('/ssave', Mcontroller.adminU.save);
router.get('/ddelete/:id', Mcontroller.adminU.delete);





router.post('/register', Mcontroller.crud.register);
router.post('/login', Mcontroller.crud.login);
router.post('/add-to-cart', Mcontroller.crud.addToCart);
router.post('/update-quantity', Mcontroller.crud.updateQuantity);
router.post('/saveAccountDetail/:id', Mcontroller.crud.saveAccountDetail);
router.post('/placeorder', Mcontroller.crud.placeorder);





module.exports = router;