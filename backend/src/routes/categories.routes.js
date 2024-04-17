import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get("/categories", async (req, res) => {
    const categories =  await prisma.category.findMany()

    res.json(categories)
})


router.post("/categories", async (req, res) => {
    const exist =  await prisma.category.findUnique({
        where: {
            name: req.body.name,
        }
    })
    if(!exist){
        const newCat = await prisma.category.create({
            data: {
                name: req.body.name,
            }
        })
        res.json(newCat)
    }else {
        res.status(400).json(exist)
    }
})



export default router