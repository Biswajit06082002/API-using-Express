const express = require('express');
const mongoose = require('mongoose');

const app = express();
const mongoString= 'mongodb+srv://bwubts20069:bwubts20069@cluster0.y4iiqhe.mongodb.net/donordata';
const Model = require('./donor.js');
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());

//Post Method
app.post('/addDonor', async (req, res)=>{
    const donorData = new Model({
        userid: req.body.userid,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        contact: req.body.contact,
        address: req.body.address,
        pincode: req.body.pincode,
        blood_group: req.body.blood_group
    })
    try{
        const dataToSave = await donorData.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Get method
app.get('/getAllDonors', async (req, res)=>{
    const donorData = await Model.find();
    res.send(donorData);
})
app.get('/getByEmail/:email', async(req, res)=>{
    const query = {email: req.params.email};
    try{
    const donorData = await Model.find(query);
    res.send(donorData);
}
catch(error){
    res.status(500).json({message: error.message})
}
})
app.get('/donorLogIn/:email&:password', async(req, res)=>{
    const query = {email: req.params.email, password: req.params.password};
    try{
        const donorData = await Model.find(query);
        res.send(donorData);
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
app.get('/sortDonor/:blood_group&:pincode', async(req, res)=>{
    const query = {blood_group: req.params.blood_group, pincode: req.params.pincode};
    try{
        const donorData = await Model.find(query);
        res.send(donorData);
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
// Patch Method
app.patch('/updateDonorData/:id', async (req, res) => {
    const id = req.params.id;
    const updatedDonorData = req.body;
    const options = {new: true};
    try{
        const updateData = await Model.findByIdAndUpdate(id, updatedDonorData, options);
        res.send(updateData);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
// Delete Method
app.delete('/deleteDonorData/:id', async(req, res) => {
    try{
        const deletedDonorData = await Model.findByIdAndDelete(req.params.id);
        res.send(deletedDonorData);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})




app.listen(6000, ()=>{
    console.log("server Started at 6000 port");
})