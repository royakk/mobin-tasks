import React from "react";
import { Collapse, Button, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Poll } from "../../types";

const { Panel } = Collapse;

interface PollItemProps {
  poll: Poll;
  onEdit: (poll: Poll) => void;
  onDelete: (pollId: string) => void;
  index: number;
}

export const PollItem = ({ poll, onEdit, onDelete, index }: PollItemProps) => {
  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit(poll);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(poll.id);
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between w-full ">
      <div className="flex items-center space-x-3 ">
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={handleDeleteClick}
          className="p-1 text-red-500 hover:text-red-700"
        />
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={handleEditClick}
          className="p-1 text-blue-500 hover:text-blue-700"
        />
      </div>
      <div className="text-lg font-medium text-right flex-1 mr-4">
        {poll.question}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-3 mt-4">
      {poll.options.map((item) => (
        <div key={item.id} className="flex items-center">
          <Input
            value={item.text}
            readOnly
            className="text-right"
            style={{ direction: "rtl" }}
            size="large"
          />
        </div>
      ))}
    </div>
  );

  return (
    <Collapse ghost={true} expandIconPosition="end" className="[&_.ant-collapse-header]:!flex [&_.ant-collapse-header]:!items-center">
      <Panel
        className={
          index % 2 === 0 ? "bg-gray-200 " : "bg-white"
        }
        header={renderHeader()}
        key={poll.id}
      >
        {renderContent()}
      </Panel>
    </Collapse>
  );
};
