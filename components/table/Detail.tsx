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
import { EyeIcon } from "./icon/EyeIcon";
import { useSession } from "next-auth/react";
import { TaskConfig } from "@/types";
import { socket } from "../../app/socket";

interface MyProps {
  taskId: string;
  taskConfig: TaskConfig;
}

interface RealTimeMessage {
  task_id: string;
  message: string;
}

export const DetailTask: React.FC<MyProps> = ({ taskId, taskConfig }) => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [realTimeMessage, setRealTimeMessage] = useState<RealTimeMessage>();

  useEffect(() => {
    const onConnect = () => {
      socket.emit("join_room", session?.user?.name);
    };

    const onMessage = (message: any) => {
      if (typeof message === "object" && !message.hasOwnProperty("length")) {
        if (message.task_id === taskId) {
          setRealTimeMessage(message);
        }
      }
    };

    const onDisconnect = () => {
      socket.emit("leave_room", session?.user?.name);
    };

    // 如果 socket 已连接，则立即触发 onConnect
    if (socket.connected) {
      onConnect();
    }

    // 注册事件处理函数
    socket.on("connect", onConnect);
    socket.on("message", onMessage);
    socket.on("disconnect", onDisconnect);

    // 清理函数，注销事件处理函数
    return () => {
      socket.off("connect", onConnect);
      socket.off("message", onMessage);
      socket.off("disconnect", onDisconnect);
    };
  }, [session, taskId]); // 依赖数组中只需包含 session

  return (
    <>
      <EyeIcon onClick={onOpen}>
        <span>任务详情</span>
      </EyeIcon>
      <Modal
        size="xs"
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
                  <span>{JSON.stringify(taskConfig, null, 2)}</span>
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
