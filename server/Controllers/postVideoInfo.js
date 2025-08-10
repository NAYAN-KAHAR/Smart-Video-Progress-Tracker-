import videoModel from '../Models/videoModel.js'

const postVideoInfo = async (req, res) => {
    const { userId, videoId, progress, watchTime } = req.body;
    try{
        const updated = await videoModel.findOneAndUpdate(
            { userId, videoId },
            { progress, watchTime },
            { upsert: true, new: true } // it will create a new document if no data is found
          );
        
          res.status(200).json({message:'sucessfully posted data', updated});
    }catch(err){
        console.log('error', err);
        res.status(500).json({status:500, error:err});
    }
}

export default postVideoInfo;