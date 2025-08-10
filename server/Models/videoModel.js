
import mongoose, { Schema } from "mongoose";

const videoSchema =  new mongoose.Schema({
    userId:String,
    videoId: Number,
    progress: Number,
    watchTime: [Number],
},{timestamps: true} );

const videoModel =  mongoose.model('Videos', videoSchema);

export default videoModel;