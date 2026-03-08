const express = require('express');
const multer = require('multer');
const { 
  createOrder, 
  getOrders, 
  getMyOrders, 
  updateOrder 
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(protect);

router
  .route('/')
  .post(upload.single('image'), createOrder)
  .get(authorize('admin'), getOrders);

router.get('/myorders', getMyOrders);

router.put('/:id', authorize('admin'), updateOrder);

module.exports = router;
