import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json())

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users)
});

app.get("/users/:id",async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            id: Number(req.params.id)
        }
    })

    return res.json(user)
})


app.post("/users", async (req, res) => {
    const {name, email} = req.body;

    const user = await prisma.user.create({
        data: {
            name,
            email
        }
    })
    return res.json(user)
})

app.put("/users/:id", async (req, res) => {
    const {name, email} = req.body;
    const user = await prisma.user.update({
        data: {
            name,
            email,
        },
        where: {
            id: Number(req.params.id)
        }
    })
    return res.json(user)
})

app.delete("/users/:id", async (req, res) => {
    await prisma.user.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    return res.status(204).send()
})

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});

