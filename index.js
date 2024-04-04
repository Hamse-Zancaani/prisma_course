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


//get data and fetch it

app.get('/get-user', async(req, res) => {
    const users = await Prisma.user.findMany();
    res.status(200).json(users);
    });
    
    //update data

    app.patch('/update-user/:id', async(req, res) => {
        const id = parseInt(req.params.id);
        const {name,age,email} = req.body;
    
        const updatedUser = await Prisma.user.update({
            where:{
                id
            },
            data:{
                name,
                age,
                email
            }
        })
    
        res.status(200).json("User updated successfully");
    });

    //
    app.delete('/delete-user/:id', async(req, res) => {
        const id = parseInt(req.params.id);
    
        const deletedUser = await Prisma.user.delete({
            where:{
                id
            }
        })
    
        res.status(200).json("User deleted successfully");
    });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });