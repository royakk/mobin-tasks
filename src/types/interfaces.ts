export interface VideoCut {
  id: string;
  startTime: number; 
  endTime: number; 
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
export interface PollOption {
  id: string;
  text: string;
  votes?: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  isExpanded?: boolean;
  maxCharacters?: number;
}

export interface PollFormData {
  question: string;
  options: { text: string }[];
}
