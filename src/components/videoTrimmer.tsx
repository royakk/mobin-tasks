import  { useState, useCallback, useMemo } from "react";
import { Button, Card, Alert, Space } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import Timeline from "./timeline";
import type { VideoCut, VideoTrimmerProps } from "../types";
import { twMerge } from "tailwind-merge";
import { useToast } from "../hooks/useToast";

const VideoTrimmer = ({
  totalDuration = 220,
  initialCuts = [],
  onCutsChange,
}: VideoTrimmerProps) => {
  const { showMessage,showModal } = useToast();
  const [cuts, setCuts] = useState<VideoCut[]>(
    initialCuts.length > 0
      ? initialCuts
      : [
          {
            id: "1",
            startTime: 20,
            endTime: 80,
            label: "برش ۱",
          },
          {
            id: "2",
            startTime: 100,
            endTime: 160,
            label: "برش ۲",
          },
          {
            id: "3",
            startTime: 180,
            endTime: 210,
            label: "برش ۳",
          },
        ]
  );

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds} ثانیه`;
    }
    const mins = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    if (remainingSecs === 0) {
      return `${mins} دقیقه`;
    }
    return `${mins} دقیقه و ${remainingSecs} ثانیه`;
  };

  const hasOverlaps = useMemo(() => {
    const overlaps = new Set<string>();

    for (let i = 0; i < cuts.length; i++) {
      for (let j = i + 1; j < cuts.length; j++) {
        const cut1 = cuts[i];
        const cut2 = cuts[j];

        const overlap =
          (cut1.startTime >= cut2.startTime && cut1.startTime < cut2.endTime) ||
          (cut1.endTime > cut2.startTime && cut1.endTime <= cut2.endTime) ||
          (cut1.startTime <= cut2.startTime && cut1.endTime >= cut2.endTime);

        if (overlap) {
          overlaps.add(cut1.id);
          overlaps.add(cut2.id);
        }
      }
    }

    return overlaps;
  }, [cuts]);

  const addNewCut = useCallback(() => {
    const newCutNumber = cuts.length + 1;
    const newCut: VideoCut = {
      id: Date.now().toString(),
      startTime: 0,
      endTime: Math.min(60, totalDuration),
      label: `برش ${newCutNumber}`,
    };

    const updatedCuts = [...cuts, newCut];
    setCuts(updatedCuts);
    onCutsChange?.(updatedCuts);
    showMessage("برش جدید اضافه شد","success")
  }, [cuts, totalDuration, onCutsChange,]);

  const updateCut = useCallback(
    (cutId: string, updates: Partial<VideoCut>) => {
      const updatedCuts = cuts.map((cut) =>
        cut.id === cutId ? { ...cut, ...updates } : cut
      );
      setCuts(updatedCuts);
      onCutsChange?.(updatedCuts);
    },
    [cuts, onCutsChange]
  );

  const deleteCut = useCallback(
    (cutId: string) => {
      const updatedCuts = cuts.filter((cut) => cut.id !== cutId);
      setCuts(updatedCuts);
      onCutsChange?.(updatedCuts);
    showMessage("برش حذف شد","info")
    },
    [cuts, onCutsChange]
  );
  const totalCutDuration = cuts.reduce(
    (total, cut) => total + (cut.endTime - cut.startTime),
    0
  );
  const handleConfirm = () => {
    showModal(`مجموع زمان برش شده :${formatDuration(totalCutDuration)}`,"info")
  };

  return (
    <div className="w-full  mx-auto p-6 space-y-6" dir="rtl">
      <Card
        title={
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold m-0">ایجاد برش</h2>
            <div className="text-lg text-gray-600">
              زمان کل {formatDuration(totalDuration)}
            </div>
          </div>
        }
        className="shadow-lg"
      >
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex justify-start">
            <Button icon={<PlusOutlined />} onClick={addNewCut} size="large">
              افزودن برش جدید
            </Button>
          </div>
          <Space direction="vertical" className="w-full">
            {cuts.map((cut) => (
              <Timeline
                key={cut.id}
                cut={cut}
                totalDuration={totalDuration}
                onUpdateCut={updateCut}
                onDeleteCut={deleteCut}
                hasOverlap={hasOverlaps.has(cut.id)}
              />
            ))}
          </Space>

          {hasOverlaps.size > 0 && (
            <Alert
              message="زمان ها با هم تداخل دارند!"
              type="error"
              showIcon
              className="text-center"
            />
          )}

          <div className="flex justify-center pt-4">
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleConfirm}
              disabled={hasOverlaps.size > 0}
              className={twMerge(
                "px-12 py-3 h-auto",
                hasOverlaps.size > 0 && "opacity-50"
              )}
            >
              <span>تایید</span>
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default VideoTrimmer;
