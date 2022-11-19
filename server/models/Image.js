const mongoose = require('mongoose' ) ;
const { Schema } = mongoose;


const imageSchema = new Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    name: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true
    },
    cloudinary_id:{
        type: String,
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports=  mongoose.model('image', imageSchema)