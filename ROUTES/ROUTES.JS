const express = require('express');
const location = require('../MODELS/location');
const viewpoint = require('../MODELS/viewpoint');

const router = express.Router()

//Post Method
router.post('/ujGyarto', async (req, res) => {
    const ujGyarto = new MobilGyarto({
        _id: req.body.id,
        nev: req.body.nev,
        alapitva: req.body.alapitva,
        elnok: req.body.elnok
    })

    try{
        const ujGyartoMentes = await ujGyarto.save();
        res.status(201).json({"_id": ujGyarto._id})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Post Method
router.post('/ujMobil', async (req, res) => {
    const ujMobil = new MobilGyarto({
        nev: req.body.nev,
        ar: req.body.ar,
        szin: req.body.szin,
        gyarto: req.body.gyarto
    })

    try{
        const ujTelefonMentes = await ujMobil.save();
        res.status(201).json({"_id": ujMobil._id})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getGyartok', async (req, res) => {
    try{
        const data = await MobilGyarto.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getTelefonok', async (req, res) => {
    try{
        const data = await Telefon.find().populate('gyarto', '-_id');
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/locations/:locationName/viewpoints', async (req, res) => {
        const data = await viewpoint.find({"location": req.params._id})
        .populate('locationName', '-_id') // ha ki akarok szedni valamit az: ''
        if (data.length !== 0) {
            res.json(data)
        } else {
            res.status(404).json({message: 'Ebben a hegységben nem találtam kilátót.'})
        }
    
    
})

//Update by ID Method
router.patch('/viewpoints/:id', async (req, res) => {
    try {
        const id = req.params._id;
        const updatedData = req.body;
        const options = { new: true, runValidators: true }; 
        // hogy a frissítés utáni dokumentumot kapjuk vissza
        const result = await viewpoint.findByIdAndUpdate(
            id, updatedData, options
        )
        if (result) {
            res.send(result).status(200) //státuszkód
        } else {
            res.status(404).json({ message: `${id} azonosítóval nem létezik telefon!`  })
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Telefon.findByIdAndDelete(id)
        res.send(`A ${data.nev} nevű telefon törölve lett.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;