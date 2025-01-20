const prisma = require("../config/prisma")

exports.create = async(req,res)=>{
    try{
        // code
        const { name } = req.body
        const category = await prisma.category.create({
            data:{
                name: name
            }
        })
        res.send(category)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}
exports.list = async(req,res)=>{
    try{
        // code
        const category = await prisma.category.findMany()
        res.send(category)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}
exports.remove = async(req,res)=>{
    try{
        // code
        const { id } = req.params
        const category = await prisma.category.delete({
            where:{ 
                id: Number(id)
             }
        })
        res.send(category)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params; // รับ ID จากพารามิเตอร์
        const { name } = req.body; // รับข้อมูล name จาก body

        if (!id || !name) {
            return res.status(400).json({ message: "ID and name are required" });
        }

        // อัปเดต Category ในฐานข้อมูล
        const category = await prisma.category.update({
            where: { id: Number(id) },
            data: { name: name },
        });

        res.send(category); // ส่งข้อมูลที่อัปเดตกลับไป
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

