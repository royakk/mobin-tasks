import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button, Flex, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import type { TimelineProps } from "../types";

const Timeline = ({
  cut,
  totalDuration,
  onUpdateCut,
  onDeleteCut,
  hasOverlap = false,
}: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const positionTimeLine = (time: number): number => {
    return Math.min(100, Math.max(0, (time / totalDuration) * 100));
  };

  const getTimeFromPosition = (clientX: number): number => {
    if (!timelineRef.current) return 0;

    const rect = timelineRef.current.getBoundingClientRect();
    const percentage = Math.min(
      1,
      Math.max(0, (clientX - rect.left) / rect.width)
    );
    return percentage * totalDuration;
  };

  const handleMouseDown = useCallback(
    (type: "start" | "end") => (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(type);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newTime = getTimeFromPosition(e.clientX);

      if (isDragging === "start") {
        const newStartTime = Math.min(newTime, cut.endTime - 1);
        onUpdateCut(cut.id, { startTime: Math.max(0, newStartTime) });
      } else {
        const newEndTime = Math.max(newTime, cut.startTime + 1);
        onUpdateCut(cut.id, { endTime: Math.min(totalDuration, newEndTime) });
      }
    },
    [isDragging, cut, onUpdateCut, totalDuration]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const startPercentage = positionTimeLine(cut.startTime);
  const endPercentage = positionTimeLine(cut.endTime);
  const widthPercentage = endPercentage - startPercentage;

  return (
    <Flex
      className={twMerge("flex-col", hasOverlap && "border-red-400 bg-red-50")}
    >
      <Flex align="center">
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDeleteCut(cut.id)}
          className="flex items-center justify-center"
          size="small"
        />
        <div className="flex-1">
          <div
            ref={timelineRef}
            className="relative h-10 bg-blue-100 rounded-md border cursor-pointer select-none"
          >
            <div className="absolute inset-x-0 bottom-0 flex">
              {Array.from({ length: 24 }, () => (
                <img src="/assets/Group.svg" width={22} />
              ))}
            </div>
            <div
              className="absolute top-0 h-full bg-blue-500 opacity-60 rounded"
              style={{
                left: `${startPercentage}%`,
                width: `${widthPercentage}%`,
              }}
            />
            <div
              className="absolute top-0 w-3 h-full bg-blue-600 cursor-ew-resize rounded-l hover:bg-blue-700 transition-colors"
              style={{ left: `calc(${startPercentage}% )` }}
              onMouseDown={handleMouseDown("start")}
            />
            <div
              className="absolute top-0 w-3 h-full bg-blue-600 cursor-ew-resize rounded-r hover:bg-blue-700 transition-colors"
              style={{ left: `calc(${endPercentage}% - 11px)` }}
              onMouseDown={handleMouseDown("end")}
            />
          </div>
        </div>
      </Flex>
      <div className="flex gap-3 py-5 items-center  text-sm">
        <div className="text-sm font-medium min-w-[60px] text-right">
          {cut.label}
        </div>
        <span className="whitespace-nowrap">زمان برش از ثانیه</span>
        <Input
          value={formatTime(cut.startTime)}
          className="w-16 text-center"
          dir="ltr"
          size="small"
        />
        <span>تا</span>
        <Input
          value={formatTime(cut.endTime)}
          className="w-16 text-center"
          dir="ltr"
          size="small"
        />
      </div>
    </Flex>
  );
};

export default Timeline;
