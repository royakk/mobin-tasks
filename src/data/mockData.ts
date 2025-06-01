import type { Poll } from "../types";

export const initialPolls: Poll[] = [
  {
    id: "1",
    question: "بهترین بازیکن  بازی ایران قطر از نظر شما کیست؟",
    options: [
      { id: "1", text: "مهدی طالبی" },
      { id: "2", text: "وحید امیری" },
      { id: "3", text: "علی کریمی" },
      { id: "4", text: "علیرضا جهانبخش" },
    ],
    
  },
  {
    id: "2",
    question: "بهترین بازیکن  بازی ایران قطر از نظر شما کیست؟",
    options: [
      { id: "1", text: " رویا کریمی" },
      { id: "2", text: " رویا کریمی" },
    ],
   
  },
  {
    id: "3",
    question: "بهترین بازیکن بازی ایران قطر از نظر شما کیست؟",
    options: [
      { id: "1", text: "گزینه اول" },
      { id: "2", text: "گزینه دوم" },
      { id: "3", text: "گزینه سوم" },
    ],
   
  },
];
export const defaultCuts =[
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