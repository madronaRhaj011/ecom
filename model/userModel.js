const db = require('../config/db'); // Assuming you have a DB connection setup
const bcrypt = require('bcrypt'); // For password hashing

const User = {
    // Function to register a new user
    register: async (data, callback) => {
        try {
            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(query, [data.username, data.email, hashedPassword], callback);
        } catch (error) {
            callback(error);
        }
    },

    // Function to authenticate user login
    authenticate: (email, password, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, false); // No user found

            // Compare passwords
            const match = await bcrypt.compare(password, results[0].password);
            if (match) {
                callback(null, results[0]); // User authenticated
            } else {
                callback(null, false); // Incorrect password
            }
        });
    },

    getAll:() => {
        return new Promise((resolve, reject) => {
            const query = 'select * from products';
            db.query(query, (err, result)=>{
                if(err){    
                    return reject (err);
                }
                resolve(result); 
            }); 
        })
       
    },
    getAllPage: (limit, offset) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM products LIMIT ? OFFSET ?';
            db.query(query, [limit, offset], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },

    getCategory:() => {
        return new Promise((resolve, reject) =>{
            const query = 'select * from categories';
            db.query(query, (err, result) =>{
                if(err){
                    return reject (err);
                }
                resolve(result);
            });
        })

    },
    getFruit:() =>{
        return new Promise((resolve, reject) =>{
            const query = 'select * from products where category_id = 1';
            db.query(query, (err, result) =>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    },
    getVege:() =>{
        return new Promise((resolve, reject) =>{
            const query = 'select * from products where category_id = 2';
            db.query(query, (err, result) =>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    },
    getMeat:() =>{
        return new Promise((resolve, reject) =>{
            const query = 'select * from products where category_id = 3';
            db.query(query, (err, result) =>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    },
    getBread:() =>{
        return new Promise((resolve, reject) =>{
            const query = 'select * from products where category_id = 4';
            db.query(query, (err, result) =>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    },
    addToCart: (data, callback) => {
        const query = 'INSERT INTO cart (name, price, quantity, total, product_id) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [data.name, data.price, data.quantity, data.total, data.productId], callback);
    },
    getProducts:() =>{
        return new Promise((resolve, reject) =>{
            const query = 'select * from cart';
            db.query(query, (err, result) =>{
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    },
    totalrecords:() =>{
        return new Promise((resolve, reject) =>{
            const query = 'SELECT COUNT(*) AS total_records FROM cart';
            db.query(query, (err, result) =>{
                if(err){
                    return reject(err);
                }
                resolve(result[0].total_records);
            })
        })
    },
    delete:(id, callback) =>{
        const q = "delete from cart where id=?";
        db.query(q, [id], callback);
    },
    updateCartQuantity: (id, quantity, callback) => {
        const query = 'UPDATE cart SET quantity = ? WHERE id = ?';
        db.query(query, [quantity, id], callback);
    },
    totalPrice:() =>{
        return new Promise((resolve, reject) =>{
            const query = 'SELECT SUM(total) AS total FROM cart';
            db.query(query, (err, result) =>{
                if(err){
                    return reject(err);
                }
                resolve(result[0].total);
            })
        })
    },
    saveAccountDetails: (id, data, callback) => {
        const query = 'UPDATE billing SET firstName = ?, lastName = ?, address = ?, city = ?, country = ?, zipCode = ?, mobile = ?, paymentMethod = ? where id = ?';
        db.query(query, [data.firstName, data.lastName, data.address, data.city, data.country, data.zipcode, data.mobile, data.payment_method, id], callback);
    },
    getAllbilling:() => {
        return new Promise((resolve, reject) => {
            const query = 'select * from billing';
            db.query(query, (err, result)=>{
                if(err){    
                    return reject (err);
                }
                resolve(result); 
            }); 
        })
    },
    placeorder: (callback) => {
        const query = `
            INSERT INTO productorder (name, price, quantity, total)
            SELECT name, price, quantity, total FROM cart;
            TRUNCATE TABLE cart;
        `;
        db.query(query, callback);
    },
    

    getAllInfoById:(id, callback) => {
        const query = 'select * from categories where category_id = ?';
        db.query(query,[id], callback);
    },
    update:(id, data, callback) =>{
        const query = "update categories set category_id = ?, name = ?, description = ? where category_id= ?";
        db.query(query, [data.categid, data.name, data.description, id], callback);

    },
    delete:(id, callback) =>{
        const q = "delete from categories where category_id= ?";
        db.query(q, [id], callback);
    },
    save:(data, callback) => {
        const query = "insert into categories (name, description) values (?,?)";
        db.query(query, [data.name, data.description], callback);
    },
    getAlluser:() => {
        return new Promise((resolve, reject) => {
            const query = 'select * from users';
            db.query(query, (err, result)=>{
                if(err){    
                    return reject (err);
                }
                resolve(result); 
            }); 
        })
       
    },

    ggetAllInfoById:(id, callback) => {
        const query = 'select * from users where id = ?';
        db.query(query,[id], callback);
    },
    uupdate:(id, data, callback) =>{
        const query = "update users set id = ?, username = ?, email = ? , password = ?, status = ?  where id= ?";
        db.query(query, [data.userid, data.username, data.email, data.password, data.status, id], callback);

    },
    ddelete:(id, callback) =>{
        const q = "delete from users where id= ?";
        db.query(q, [id], callback);
    },
    ssave:(data, callback) => {
        const query = "insert into users (username, email, password, status) values (?,?,?,?)";
        db.query(query, [data.username, data.email, data.password, data.status], callback);
    },
    ggetAlluser:() => {
        return new Promise((resolve, reject) => {
            const query = 'select * from users';
            db.query(query, (err, result)=>{
                if(err){    
                    return reject (err);
                }
                resolve(result); 
            }); 
        })
       
    },
    
};


module.exports = User;
