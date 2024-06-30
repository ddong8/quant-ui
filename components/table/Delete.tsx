import {
  Divider,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // 选择一个样式，可以根据需要更换
import { toast } from "react-hot-toast";

import { TaskConfig } from "@/types";
import { DeleteIcon } from "./icon/DeleteIcon";

interface MyProps {
  taskId: string;
  taskConfig: TaskConfig;
}

export const DeleteTask: React.FC<MyProps> = ({ taskId, taskConfig }) => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const taskConfigString = `
\`\`\`json 
${JSON.stringify(taskConfig, null, 2)} 
\`\`\`
`;
  const [isDisabled2, setIsDisabled2] = useState(false);

  // 处理启动按钮点击事件
  const handleDeleteButtonClick = async () => {
    setIsDisabled2(true); // 设置按钮状态为disable
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/future/cancel_task`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            { User: session?.user, task_id: taskId },
            null,
            2
          ),
        }
      );
      const jsonData = await resp.json();
      toast.success("任务删除成功!");
    } catch (error) {
      toast.error(`任务删除失败! 详情: ${error}`);
    } finally {
      setIsDisabled2(false); // 请求结束，恢复按钮状态为enable
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <DeleteIcon onClick={onOpen}>删除任务</DeleteIcon>
      <Modal
        size="md"
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                删除任务
              </ModalHeader>
              <ModalBody>
                <div>
                  <Divider />
                  <span>任务ID: </span>
                  <br />
                  <span style={{ color: "red" }}>{taskId}</span>
                  <Divider />
                  <span>任务配置:</span>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {taskConfigString}
                  </ReactMarkdown>
                  <Divider />
                  <span>确定要删除吗?</span>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  取消
                </Button>
                <Button
                  isDisabled={isDisabled2}
                  onPress={onClose}
                  onClick={handleDeleteButtonClick}
                  color="primary"
                >
                  删除
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
