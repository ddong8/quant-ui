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
  const taskConfigString = `
\`\`\`json 
${JSON.stringify(taskConfig, null, 2)} 
\`\`\`
`;

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
    <div className="flex flex-col gap-2">
      <EyeIcon onClick={onOpen}>任务详情</EyeIcon>
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
                  <Divider />
                  <span>任务ID: </span>
                  <br />
                  <span style={{ color: "red" }}>{taskId}</span>
                  <Divider />
                  <span>实时盈亏: </span>
                  <br />
                  <span style={{ color: "green" }}>
                    {realTimeMessage ? realTimeMessage.message : "N/A"}
                  </span>
                  <Divider />
                  <span>任务配置:</span>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {taskConfigString}
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
    </div>
  );
};
