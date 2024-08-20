"use strict";
const router  = require('express').Router();
const {productController} = require('../controllers/productController.js');
const adminAuthentication = require('../middlewares/adminAuthentication.js');

router.route("/")
.get(productController.list)
.post(adminAuthentication ,productController.create);

router.route('/:id')
.get(productController.read)
.delete(adminAuthentication ,productController.delete)
.put(adminAuthentication ,productController.update)
.patch(adminAuthentication ,productController.patchUpdate)


module.exports = router;