const express = require('express');
const { authCheck } = require('../middlewares/authCheck');
const router = express.Router();

// Controller ที่จะใช้ในการจัดการต่างๆ
const { getOrderAdmin, changeOrderStatus, deleteUser } = require('../controllers/admin');

// Route สำหรับเปลี่ยนสถานะคำสั่งซื้อ
router.put('/admin/order-status', authCheck, changeOrderStatus);

// Route สำหรับดึงข้อมูลคำสั่งซื้อทั้งหมด
router.get('/admin/orders', authCheck, getOrderAdmin);

// Route สำหรับลบผู้ใช้งาน
router.delete('/api/users/:id', authCheck, deleteUser);  // URL นี้จะรับ :id ของผู้ใช้งานที่ต้องการลบ

module.exports = router;
