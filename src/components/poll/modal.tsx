import { useEffect } from "react";
import { Modal, Input, Button, Space, Card } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import type { Poll, PollFormData } from "../../types";

interface PollModalProps {
  visible: boolean;
  poll: Poll | null;
  onCancel: () => void;
  onSubmit: (data: PollFormData) => void;
}

export const PollModal = ({
  visible,
  poll,
  onCancel,
  onSubmit,
}: PollModalProps) => {
  const { control, handleSubmit, reset } = useForm<PollFormData>({
    defaultValues: {
      question: "",
      options: [{ text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  useEffect(() => {
    if (poll) {
      reset({
        question: poll.question,
        options: poll.options.map((opt) => ({ text: opt.text })),
      });
    } else {
      reset({
        question: "",
        options: [{ text: "" }],
      });
    }
  }, [poll, reset]);

  const handleAddOption = () => {
    append({ text: "" });
  };

  const handleRemoveOption = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onFormSubmit = (data: PollFormData) => {
    const filteredData = {
      ...data,
      options: data.options.filter((option) => option.text.trim() !== ""),
    };
    onSubmit(filteredData);
  };

  return (
    <Modal
      title={<div>{poll ? "ویرایش نظرسنجی" : "نظرسنجی جدید"}</div>}
      destroyOnHidden
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div dir="rtl">
          <label className="block text-sm mb-2">سوال (حداکثر ۷۲ کاراکتر)</label>
          <Controller
            name="question"
            control={control}
            rules={{
              required: "سوال الزامی ",
              maxLength: { value: 72, message: "حداکثر ۷۲ کاراکتر مجاز است" },
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <Input
                  {...field}
                  placeholder="How Are You ?"
                  className="text-right"
                  maxLength={72}
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  {error && (
                    <span className="text-red-500">{error.message}</span>
                  )}
                </div>
              </div>
            )}
          />
        </div>

        <div dir="rtl">
          <label className="block text-sm font-medium mb-2">
            پاسخ ها (حداکثر ۴۲ کاراکتر)
          </label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 ">
                <Controller
                  name={`options.${index}.text`}
                  control={control}
                  rules={{
                    required: index < 2 ? " فیلد الزامی " : false,
                    maxLength: { value: 42, message: "حداکثر ۴۲ کاراکتر" },
                  }}
                  render={({ field: inputField, fieldState: { error } }) => (
                    <div className="flex-1">
                      <Input
                        {...inputField}
                        className="text-right"
                        maxLength={42}
                      />
                      <div className="flex justify-between mt-1">
                        {error && (
                          <span className="text-xs text-red-500">
                            {error.message}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                />
                {fields.length > 1 && (
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => handleRemoveOption(index)}
                    className="text-red-500 hover:text-red-700"
                  />
                )}
              </div>
            ))}

            <Card
              className="!border-3 !border-dashed flex justify-center items-center !border-blue-300 bg-blue-50 hover:bg-blue-100 cursor-pointer"
              onClick={handleAddOption}
              style={{ textAlign: "center" }}
            >
              <Space>
                <PlusOutlined className="!text-blue-500 text-lg" />
                <span className="text-blue-600 font-medium">
                  افزودن پاسخ جدید
                </span>
              </Space>
            </Card>
          </div>
        </div>

        <div className="flex justify-between pt-4" dir="rtl">
          <Button onClick={onCancel} className="px-8">
            انصراف
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="px-8 bg-blue-500 hover:bg-blue-600"
          >
            {poll ? "ویرایش نظرسنجی" : "ایجاد نظرسنجی"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
