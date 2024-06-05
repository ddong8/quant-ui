import React, { useState, useEffect } from "react";
import {
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // 选择一个样式，可以根据需要更换

import { EyeIcon } from "./icon/EyeIcon";
import { TaskConfig } from "@/types";

interface MyProps {
  taskId: string;
  taskConfig: TaskConfig;
  websocket: any;
}

interface RealTimeMessage {
  task_id: string;
  message: string;
}

export const DetailTask: React.FC<MyProps> = ({
  taskId,
  taskConfig,
  websocket,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [realTimeMessage, setRealTimeMessage] = useState<RealTimeMessage>();
  const jsonTemplate = `\`\`\`json JsonData \`\`\``;

  useEffect(() => {
    const onMessage = (message: any) => {
      if (typeof message === "object" && !message.hasOwnProperty("length")) {
        if (message.task_id === taskId) {
          setRealTimeMessage(message);
        }
      }
    };

    // 注册事件处理函数
    websocket.on("message", onMessage);

    // 清理函数，注销事件处理函数
    return () => {
      websocket.off("message", onMessage);
    };
  }, [websocket, taskId]); // 依赖数组中需包含 websocket, taskId

  return (
    <>
      <EyeIcon onClick={onOpen}>
        <span>任务详情</span>
      </EyeIcon>
      <Modal
        size="md"
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                任务详情:
              </ModalHeader>
              <ModalBody>
                <div>
                  <span>{taskId}</span>
                  <Divider />
                  <span>
                    {realTimeMessage ? realTimeMessage.message : "N/A"}
                  </span>
                  <Divider />
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {jsonTemplate.replace(
                      "JsonData",
                      JSON.stringify(taskConfig, null, 2)
                    )}
                  </ReactMarkdown>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  关闭
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
