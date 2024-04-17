import express from "express"
import cors from "cors"
import NotesRoutes from "./routes/notes.routes.js"
import CategoriesRoutes from "./routes/categories.routes.js"

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors());

app.use("/api", NotesRoutes)
app.use("/api", CategoriesRoutes)

app.listen(PORT)
console.log(`Server running on port ${PORT}` )