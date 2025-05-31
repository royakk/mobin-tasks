export interface VideoCut {
  id: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  label: string;
}

export interface TimelineProps {
  cut: VideoCut;
  totalDuration: number;
  onUpdateCut: (cutId: string, updates: Partial<VideoCut>) => void;
  onDeleteCut: (cutId: string) => void;
  hasOverlap?: boolean;
}

export interface VideoTrimmerProps {
  totalDuration?: number;
  initialCuts?: VideoCut[];
  onCutsChange?: (cuts: VideoCut[]) => void;
}

export interface TimePosition {
  seconds: number;
  percentage: number;
}