const express = require('express');
const router = express.Router();
const { create, list, remove, update } = require('../controllers/category'); // เพิ่ม update
const { authCheck, adminCheck } = require('../middlewares/authCheck');

// @ENDPOINT https://comdiy-api.vercel.app/api/category
router.post('/category', authCheck, adminCheck, create);
router.get('/category', list);
router.delete('/category/:id', authCheck, adminCheck, remove);
router.put('/category/:id', authCheck, adminCheck, update); // เส้นทางสำหรับอัปเดต

module.exports = router;
