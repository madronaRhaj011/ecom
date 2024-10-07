const User = require('../model/userModel');
const bcrypt = require('bcrypt');

const index = {
    index: (req, res) => {
        res.render('index');
    },
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    },
    shop: (req, res) => {
        Promise.all([
            User.getAll(),
            User.getCategory(),
            User.totalrecords()
        ]).then(([productList, categoryList, totalrec]) =>{
            res.render('shop-detail', {
                user: req.session.user,
                product : productList,
                category: categoryList,
                totalrec: totalrec,
                currentPage: 'shop-detail'
            });
        }).catch(err => {
            throw err;
        });
    },

    home: (req, res) => {
        Promise.all([
            User.getAll(),
            User.getCategory(),
            User.getVege(),
            User.getFruit(),
            User.getMeat(),
            User.getBread(),
            User.totalrecords()
        ]).then(([productList, categoryList, vegeList, fruitList, meatList, breadList, totalrec]) =>{
            res.render('dashboard', {
                user: req.session.user,
                product: productList,
                category: categoryList,
                vege: vegeList,
                fruit: fruitList,
                meat: meatList,
                bread: breadList,
                totalrec: totalrec,
                currentPage: 'home'
            });
        }).catch(err => {
            throw err;
        })
    },
    shopProduct: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page -1) * limit;
        Promise.all([
            User.getAllPage(limit, offset),
            User.getCategory(),
            User.totalrecords()
        ]).then(([productList, categoryList, totalrec]) =>{
            res.render('shop-product', {
                user: req.session.user,
                product : productList,
                category: categoryList,
                totalrec: totalrec,
                currentPage: 'shop-product',
                currentPageNumber: page
            });
        }).catch(err => {
            throw err;
        });
    },
    cart: (req, res) => {
        Promise.all([
            User.getAll(),
            User.getCategory(),
            User.getProducts(),
            User.totalrecords(),
            User.totalPrice()
        ]).then(([productList, categoryList, cartList, totalrec, totalPrice]) =>{
            res.render('cart', {
                user: req.session.user,
                product : productList,
                category: categoryList,
                cart: cartList,
                totalrec: totalrec,
                totalPrice: totalPrice,
                currentPage: 'cart'
            });
        }).catch(err => {
            throw err;
        });
    },
    checkout: (req, res) => {
        Promise.all([
            User.getAll(),
            User.getCategory(),
            User.getProducts(),
            User.totalrecords(),
            User.totalPrice(),
            User.getAllbilling()
        ]).then(([productList, categoryList, cartList, totalrec, totalPrice, billingList]) =>{
            res.render('checkout', {
                user: req.session.user,
                product : productList,
                category: categoryList,
                cart: cartList,
                totalrec: totalrec,
                totalPrice: totalPrice,
                billing: billingList,
                currentPage: 'checkout'
            });
        }).catch(err => {
            throw err;
        });
    },
    user: (req, res) => {
        Promise.all([
            User.getAll(),
            User.getCategory(),
            User.getProducts(),
            User.totalrecords(),
            User.totalPrice(),
            User.getAllbilling()
        ]).then(([productList, categoryList, cartList, totalrec, totalPrice, billingList]) =>{
            res.render('user', {
                user :req.session.user,
                product : productList,
                category: categoryList,
                cart: cartList,
                totalrec: totalrec,
                totalPrice: totalPrice,
                billing: billingList,
                currentPage: 'user'
            });
        }).catch(err => {
            throw err;
        });
    },
    contact: (req, res) => {
        Promise.all([
            User.getAll(),
            User.getCategory(),
            User.getProducts(),
            User.totalrecords(),
            User.totalPrice(),
        ]).then(([productList, categoryList, cartList, totalrec, totalPrice]) =>{
            res.render('contact', {
                user :req.session.user,
                product : productList,
                category: categoryList,
                cart: cartList,
                totalrec: totalrec,
                totalPrice: totalPrice,
                currentPage: 'contact'
            });
        }).catch(err => {
            throw err;
        });
    },
    logout:(req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('An error occurred');
            }
            res.redirect('/login');
        });
    }


    
    
};

const crud = {
    register: (req, res) => {
        const { username, email, password, confirmPassword } = req.body;

        // Validation logic
        let errors = [];

        if (!username || !email || !password || !confirmPassword) {
            errors.push({ msg: 'All fields are required' });
        }

        if (password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters long' });
        }

        if (password !== confirmPassword) {
            errors.push({ msg: 'Passwords do not match' });
        }

        if (errors.length > 0) {
            // If errors exist, render the form again with error messages
            return res.render('register', { errors, username, email, password, confirmPassword });
        }

        // If validation passes, proceed to register user
        User.register({ username, email, password }, (err) => {
            if (err) {
                return res.status(500).send('Error registering user');
            }
            res.redirect('/login');
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;
        if(email === "admin@gmail.com" && password === 'adminako'){
            Promise.all([
                User.getCategory(),
            ]).then(([ categoryList]) =>{
                res.render('adminpage', {
                    user: req.session.user,
                    category: categoryList,
                    currentPage: 'admin'
                });
            }).catch(err => {
                throw err;
            });
        }

        // Validation logic
        let errors = [];

        if (!email || !password) {
            errors.push({ msg: 'Both email and password are required' });
        }

        if (errors.length > 0) {
            // If validation fails, re-render the login form with errors
            return res.render('login', { errors, email, password });
        }

        // If validation passes, proceed to authenticate user
        User.authenticate(email, password, (err, user) => {
            if (err) {
                return res.status(500).send('Error during authentication');
            }
            if (!user) {
                return res.status(400).render('login', { errors: [{ msg: 'Invalid credentials' }], email });
            }

            console.log(user);
            
            // Set user session
            req.session.user = user;
            if (req.session.user) {
                Promise.all([
                    User.getAll(),
                    User.getCategory(),
                    User.getVege(),
                    User.getFruit(),
                    User.getMeat(),
                    User.getBread(),
                    User.totalrecords()
                ]).then(([productList, categoryList, vegeList, fruitList, meatList, breadList, totalrec]) =>{
                    res.render('dashboard', {
                        user: req.session.user,
                        product: productList,
                        category: categoryList,
                        vege: vegeList,
                        fruit: fruitList,
                        meat: meatList,
                        bread: breadList,
                        totalrec: totalrec,
                        currentPage: 'home'
                    });
                }).catch(err => {
                    throw err;
                })


                // Fetch products and render dashboard
                // User.getAll((err, results) => {
                //     if (err) {
                //         return res.status(500).send('Error fetching products');
                //     }
                //     console.log(results);
                //     res.render('dashboard', { user: req.session.user, product: results });
                // });
            } else {
                res.redirect('/login'); // If not logged in, redirect to login
            }
        });
    },
    addToCart: (req, res) => {
        const { name, price, quantity, total, productId } = req.body;

        // Call model to insert data into the cart table
        User.addToCart({ name, price, quantity, total, productId }, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Failed to add to cart' });
            }

            res.status(200).json({ success: true, message: 'Product added to cart' });
        });
    },
    delete:(req, res) =>{
        const id = req.params.id;
        User.delete(id, (err) =>{
           if(err) throw err;
           res.redirect('/cart' ,{ user: req.session.user });
        })
   },
   updateQuantity: (req, res) => {
    const id = req.body.id;       // Get the cart item ID
    const quantity = req.body.quantity; // Get the updated quantity

    // Update the quantity in the database
    User.updateCartQuantity(id, quantity, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to update quantity' });
        }

        res.status(200).json({ success: true });
    });
    },
    saveAccountDetail:(req, res) =>{
        const id = req.params.id;
            const data = req.body;
            User.saveAccountDetails(id, data, (err) => {
                if(err) throw err;
                res.redirect('/user');
            });
             
    },
    placeorder:(req, res) =>{
            User.placeorder((err) => {
                if(err) throw err;
                res.redirect('/home');
            });
             
    },
    

};

const admin = {
    adminuser: (req, res) => {
        Promise.all([
            User.getCategory(),
            User.getAlluser(),
        ]).then(([ categoryList, userList]) =>{
            res.render('adminpage', {
                user: req.session.user,
                category: categoryList,
                user: userList,
                currentPage: 'admin'
            });
        }).catch(err => {
            throw err;
        });
    },
    edit:(req, res) => {
        const id = req.params.id;
        User.getAllInfoById(id,(err, results) => {
            if(err) throw err;
            res.render('adminedit', {categ: results[0]});
        });
    },
    update:(req, res) =>{
        const id = req.params.id;
        const data = req.body;
        User.update(id, data, (err) => {
            if(err) throw err;
            res.redirect('/adminuser');
        });
    },
    delete:(req, res) =>{
        const id = req.params.id;
        User.delete(id, (err) =>{
           if(err) throw err;
           res.redirect('/adminuser');
        })
   },
   save:(req, res) =>{
    const data = req.body;
    User.save(data, (err) => {
        if(err) throw err;
        res.redirect('/adminuser');
        
    }); 
},
    add:(req, res) =>{
        res.render('adminadd');
    }

}

const adminU = {
    adminuser: (req, res) => {
        Promise.all([
            User.getCategory(),
            User.getAlluser()
        ]).then(([ categoryList, userList]) =>{
            res.render('adminpage', {
                user: req.session.user,
                category: categoryList,
                user: userList,
                currentPage: 'admin'
            });
        }).catch(err => {
            throw err;
        });
    },
    edit:(req, res) => {
        const id = req.params.id;
        User.ggetAllInfoById(id,(err, results) => {
            if(err) throw err;
            res.render('aadminedit', {user: results[0]});
        });
    },
    update:(req, res) =>{
        const id = req.params.id;
        const data = req.body;
        User.uupdate(id, data, (err) => {
            if(err) throw err;
            res.redirect('/adminuser');
        });
    },
    delete:(req, res) =>{
        const id = req.params.id;
        User.ddelete(id, (err) =>{
           if(err) throw err;
           res.redirect('/adminuser');
        })
   },
   save:(req, res) =>{
    const data = req.body;
    User.ssave(data, (err) => {
        if(err) throw err;
        res.redirect('/adminuser');
        
    }); 
},
    add:(req, res) =>{
        res.render('aadminadd');
    }

}


module.exports = { index, crud, admin, adminU};
