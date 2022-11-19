const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
let fetchuser = require('../middleware/fetchuser');
const cloudinary = require("../cloudinary");
const upload = require("../middleware/multer");


//Route 1: Add new image using POST
router.post('/addimage', fetchuser, upload.single("file"),

    async (req, res) => {

        try {
            const result = await cloudinary.uploader.unsigned_upload(req.file.path, 'image-bucket', {folder:"bucket"});
            const image = await Image.create({
                user: req.user.id,
                name: req.body.name,
                imageURL: result.secure_url,
                cloudinary_id: result.public_id,
            })
            res.json(image)
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error has occured")
        }
    })
    

//Route 2: fetch all images of a user using GET
router.get('/fetchallimages', fetchuser,
    async (req, res) => {
        try {
            //fetch all the images linked with the user id
            const image = await Image.find({ user: req.user.id })
            res.json(image)
        } catch (error) {
            res.status(500).send("Internal server error has occured")
        }
    })

    
//Route 3: Delete an existing image using DELETE
router.delete('/deleteimage/:id', fetchuser,
async (req, res) => {
       try{ 
        //find the image to be deleted 

        let image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send("Not Found");
        }
        //allow deletion only if user owns this image
        if (image.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }
       
        await cloudinary.uploader.destroy(image.cloudinary_id);
        await Image.findByIdAndDelete(req.params.id);
        res.json("Successfully deleted")
      
    } catch (error) {
        res.status(500).send("Internal server error has occured")
    }
 
})


module.exports = router;