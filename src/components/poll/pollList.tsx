import  { useState } from "react";
import { Button, Space, Typography, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { Poll, PollFormData } from "../../types";
import { PollItem } from "./pollItem";
import { PollModal } from "./modal";
import { initialPolls } from "../../data/mockData";


const { Title } = Typography;

export const PollList = () => {
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPoll, setEditingPoll] = useState<Poll | null>(null);

  const handleAddPoll = () => {
    setEditingPoll(null);
    setModalVisible(true);
  };

  const handleEditPoll = (poll: Poll) => {
    setEditingPoll(poll);
    setModalVisible(true);
  };

  const handleDeletePoll = (pollId: string) => {
    setPolls(polls.filter((poll) => poll.id !== pollId));
  };

  const handleModalSubmit = (formData: PollFormData) => {
    if (editingPoll) {
      setPolls(
        polls.map((poll) =>
          poll.id === editingPoll.id
            ? {
                ...poll,
                question: formData.question,
                options: formData.options.map((opt, index) => ({
                  id: poll.options[index]?.id || `${poll.id}-${index}`,
                  text: opt.text,
                })),
               
              }
            : poll,
        ),
      );
    } else {
      const newPoll: Poll = {
        id: Date.now().toString(),
        question: formData.question,
        options: formData.options.map((opt, index) => ({
          id: `${Date.now()}-${index}`,
          text: opt.text,
        })),
        
      };
      setPolls([newPoll, ...polls]);
    }
    setModalVisible(false);
    setEditingPoll(null);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingPoll(null);
  };

  return (
    <div className="bg-white min-h-screen rounded-lg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8" dir="rtl">
          <Space align="center" className="text-right">
            <Title level={3} className="m-0">
              لیست الگوها
            </Title>
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddPoll}
            size="large"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <span> افزودن الگو</span>
          </Button>
        </div>

        <div className="space-y-4">
          {polls.length === 0 ? (
            <Empty
              description={<span dir="rtl">هیچ الگو وجود ندارد</span>}
              className="mt-16"
            />
          ) : (
            polls.map((poll,index) => (
              <PollItem
                index={index}
                key={poll.id}
                poll={poll}
                onEdit={handleEditPoll}
                onDelete={handleDeletePoll}
              />
            ))
          )}
        </div>

        <PollModal
          visible={modalVisible}
          poll={editingPoll}
          onCancel={handleModalCancel}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
};
