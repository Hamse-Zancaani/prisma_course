import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3000;

app.use(express.json());

const Prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.post('/add-user', async(req, res) => {

    const {name,age,email} = req.body;

    const newUser= await Prisma.user.create({
        data:{
            name,
            age,
            email
        }
    })

    res.status(200).json("User added successfully");


});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });