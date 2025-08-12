import { useEffect, useState, useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMenuOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import axios from "axios";
import dotenv from 'dotenv';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videoRef = useRef(null);
  const [watchTime, setWatchTime] = useState(new Set());
  const [videoDuration, setVideoDuration] = useState(1); // Default to 1 to avoid division by zero
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


useEffect(() => {
  const fetchVideoDetails = async () => {
    try{
      const res = await axios.get(`${import.meta.env.VITE_SERVAR_URL}/api/allvideo`);
      console.log(res.data);
       const allVideos = res.data;
      setVideos(allVideos);
      // ✅ Set first video as selected
      if (allVideos.length > 0) {
        setSelectedVideo(allVideos[0]);
      }

    }catch(err){
      console.log(err)
    }
  }
  fetchVideoDetails();
},[]);

  // Fetch and track progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selectedVideo) return;

    const userId = "user123";
    let lastTime = 0;
    let intervalSet = new Set();

    const fetchProgress = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVAR_URL}/api/${userId}/${selectedVideo.id}`);
        const savedProgress = res.data?.progress || 0;
        intervalSet = new Set(res.data?.watchTime || []);
        video.currentTime = savedProgress;
        setWatchTime(new Set(intervalSet));
      } catch (err) {
        console.error("Failed to fetch progress", err);
      }
    };

    const handleTimeUpdate = async () => {
      const currentSec = Math.floor(video.currentTime);
      if (!video.seeking && Math.abs(currentSec - lastTime) < 1.5) {
        intervalSet.add(currentSec);
        setWatchTime(new Set(intervalSet));

        const watchedSeconds = [...intervalSet].length;
        const newProgress = Math.floor((watchedSeconds / video.duration) * 100);
        setProgressMap(prev => ({ ...prev, [selectedVideo.id]: newProgress }));

        try {
          await axios.post(`${import.meta.env.VITE_SERVAR_URL}/api/`, {
            userId,
            videoId: selectedVideo.id,
            progress: video.currentTime,
            watchTime: [...intervalSet],
          });
        } catch (err) {
          console.error("Failed to update progress", err);
        }
      }
      lastTime = currentSec;
    };

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration || 1);
    };

    fetchProgress();

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [selectedVideo]);

  const getProgressPercent = () => {
    return progressMap[selectedVideo.id] || 0;
  };

  return (
    <div className={`flex ${isMobile ? "flex-col" : "flex-row"} w-full h-screen`}>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <div className="p-4 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? <MdClose size={30} /> : <IoMenuOutline size={30} />}
          </div>
        </div>
      )}

      {/* Sidebar */}
      {(openMenu || !isMobile) && (
        <div className={`z-10 ${isMobile ? "absolute top-0 left-0 w-full bg-white h-auto p-4 shadow-md" : "w-[25%] h-full border-r border-zinc-300 overflow-y-auto"}`}>
          <div className="p-2">
            <div className="p-2 px-2 shadow-sm bg-gray-100 flex items-center justify-start gap-2 rounded cursor-pointer" onClick={() => setOpenMenu(false)}>
              <FaArrowLeftLong size={20} />
              <span className="font-semibold">Back</span>
            </div>

            <div className="mt-4">
              {videos.map((video) => (
                <div key={video.id}>
                  <div onClick={() => { setSelectedVideo(video); if (isMobile) setOpenMenu(false);}}
                    className={`p-2 px-4 mb-2 cursor-pointer rounded 
                    ${selectedVideo && selectedVideo.id === video.id ? "bg-gray-300" : "hover:bg-gray-200"}`}>
                    <h3 className="text-lg font-semibold">{video.title}</h3>
                  </div>
                  <div className="px-4 flex items-center gap-2 mb-4">
                    <CiVideoOn />
                    <div>{progressMap[video.id] || 0}%</div>
                    <span className="text-sm font-semibold">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Player */}
      <div className={`${isMobile ? "w-full" : "w-[75%]"} h-full p-4`}>
        <div className="px-1 mx-auto w-full h-6 flex justify-between lg:w-60 items-center bg-gray-300 rounded-lg overflow-hidden">
          <div className="bg-red-500 h-full transition-all duration-200 text-sm font-semibold"
            style={{ width: `${getProgressPercent()}%` }} >  &nbsp;</div>
          <div className="text-sm font-semibold">{getProgressPercent()}%</div>
        </div>

        {selectedVideo && (
          <div className="relative w-full pt-[56.25%] mt-7">
            <video ref={videoRef} src={selectedVideo.videoUrl} controls
              controlsList="nodownload"
              className="absolute top-0 left-0 w-full h-full rounded shadow-lg"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;

