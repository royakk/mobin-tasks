import React from "react";

import VideoTrimmer from "../../components/videoTrimmer";

export const VideoTrimmerPage: React.FC = () => {
  const handleCutsChange = (cuts: any[]) => {
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <VideoTrimmer totalDuration={220} onCutsChange={handleCutsChange} />
    </div>
  );
};
