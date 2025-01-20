const prisma = require("../config/prisma")

exports.changeOrderStatus = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body
        // console.log(orderId, orderStatus)
        const orderUpdate = await prisma.order.update({
            where: { id: orderId },
            data: { orderStatus: orderStatus }
        })

        res.json(orderUpdate)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
exports.getOrderAdmin = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products: {
                    include: {
                        product: true
                    }
                },
                orderedBy: {
                    select: {
                        id: true,
                        email: true,
                        address: true,
                    }
                }
            }
        })
        res.json(orders)
    } catch (err) {
        console.log(errr)
        res.status(500).json({ message: "Server error" })
    }
}


// แก้ไขฝั่ง Server (Admin Controller)
exports.deleteUser = async (req, res) => {
    console.log('Received DELETE request for user with ID:', req.params.id);  // เพิ่ม log นี้
    const userId = Number(req.params.id);  // แปลงให้เป็นตัวเลข
console.log('Deleting user with ID:', userId);  // ตรวจสอบค่า

    try {
        const userId = req.params.id;
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) }
        });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        await prisma.user.delete({
            where: { id: Number(userId) }
        });
        

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting user' });
    }
};

  



  

  
