import VideoTrimmer from "../../components/videoTrimmer/videoTrimmer";
import { App as AntdApp } from "antd";
export const VideoTrimmerPage = () => {
  const handleCutsChange = (cuts: any[]) => {
    console.log("cuttingTimes", cuts);
  };

  return (
    <AntdApp>
      <div className="min-h-screen bg-gray-50 py-8">
        <VideoTrimmer totalDuration={220} onCutsChange={handleCutsChange} />
      </div>
    </AntdApp>
  );
};
