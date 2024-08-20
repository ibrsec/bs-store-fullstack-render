
"user strict";
const router = require('express').Router();
const {categoryController} = require('../controllers/categoryController');
const adminAuthentication = require('../middlewares/adminAuthentication');
router.route("/")
.get(categoryController.list)
.post(adminAuthentication ,categoryController.create);

router.route('/:id')
.get(categoryController.read)
.delete(adminAuthentication ,categoryController.delete)
.put(adminAuthentication ,categoryController.update)
.patch(adminAuthentication ,categoryController.update)

module.exports = router;