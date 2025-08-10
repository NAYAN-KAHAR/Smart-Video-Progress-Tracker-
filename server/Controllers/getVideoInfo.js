


import videoModel from '../Models/videoModel.js'

const getVideoInfo  = async (req, res) => {
    const { userId, videoId } = req.params;
    try{
        const data = await videoModel.findOne({ userId, videoId });
        res.json(data || {});
    }catch(err){
        console.log('error', err);
        res.status(500).json({status:500, error:err});
    }
}

export default getVideoInfo;