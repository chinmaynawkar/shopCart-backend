import express from 'express'
import ProductController from '../Controllers/productController'

const router = express.Router();

// defining the routes

router.post('/add', ProductController.addProduct);
router.get('/', ProductController.getProduct);
router.get('/:id', ProductController.getProductById);
router.put('/update/:id', ProductController.updateProduct);
router.patch('/:id', ProductController.partialUpdateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);

export default router;











// const express = require("express");
// const productRoute = express();

// const bodyParser = require("body-parser");
// productRoute.use(bodyParser.json());
// productRoute.use(bodyParser.urlencoded({ extended: true })); // this encodes the URL

// const multer = require("multer");
// const path = require("path");
// productRoute.use(express.static("public")); // use the public folder to store images

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "../public/productImg"), function(err) {
//             if(err) {
//                 throw err;
//             }
//         });
//     },
//     filename: function (req, file, cb) {
//         const name = Date.now() + "-" + file.originalname;
//         cb(null, name, function(err) {
//             if(err) {
//                 throw err;
//             }
//         });
//     }
    
//     });

//     const upload = multer({ storage: storage }); // to use Storage defined above
