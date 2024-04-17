import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const router = Router()

router.get("/notes", async (req, res) => {
    const notes = await prisma.note.findMany({include: {categories: true}})
    res.json(notes)
})

router.post("/notes", async (req, res) => {
    const newNote = await prisma.note.create({
        data: {
            title: req.body.title,
            content: req.body.content,
            categories: {
                connect: req.body.categories.map(category => ({
                    id: category.id,
                }))            
            },
            archived:  req.body?.archived
        }
    })
     res.json(newNote)
})

router.put("/notes", async (req, res) => {
    const updatedNote = await prisma.note.update({
        where: {
            id: req.body.id,
          },
        data: {
            title: req.body.title,
            content: req.body.content,
            categories: {
                set: req.body.categories.map(category => ({
                    id: category.id,
                    name: category.name
                }))            },
            archived:  req.body?.archived
        }
    })
     res.json(updatedNote)
})

router.delete("/notes", async (req, res) => {
    const deletedNote = await prisma.note.delete({
        where: {
          id: req.body.id,
        },
      })
    res.json(deletedNote)
})

export default router