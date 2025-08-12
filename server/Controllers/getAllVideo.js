
import videoUploadModel from '../Models/videoUploadModel.js'

const getAllVideo  = async (req, res) => {
    try{
        const data = await videoUploadModel.find();
        res.json(data || {});
    }catch(err){
        console.log('error', err);
        res.status(500).json({status:500, error:err});
    }
}

export default getAllVideo;