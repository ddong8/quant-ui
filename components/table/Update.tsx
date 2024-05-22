import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { EditIcon } from "./icon/EditIcon";
import { TaskConfig } from "@/types";

interface MyProps {
  taskId: string;
  taskConfig: TaskConfig;
}

export const UpdateTask: React.FC<MyProps> = ({ taskId, taskConfig }) => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [values, setValues] = useState({
    code: taskConfig.code,
    direction: taskConfig.direction,
    target_price: taskConfig.target_price,
    price_diff_step: taskConfig.price_diff_step,
    volume_diff_step: taskConfig.volume_diff_step,
    profit_diff_price: taskConfig.profit_diff_price,
    target_profit: taskConfig.target_profit,
    max_position_ratio: taskConfig.max_position_ratio,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // 处理启动按钮点击事件
  const handleUpdateButtonClick = async () => {
    setIsDisabled2(true); // 设置按钮状态为disable
    try {
      // 使用fetch发送请求
      const resp = await fetch(`${API_URL}/api/v1/future/update_task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { User: session?.user, task_id: taskId, task_config: values },
          null,
          2
        ),
      });
      const jsonData = await resp.json();
      setValues(jsonData.data.task_config);
    } catch (error) {
      console.error(error); // 打印失败信息
    } finally {
      setIsDisabled2(false); // 请求结束，恢复按钮状态为enable
    }
  };

  return (
    <div>
      <>
        <div className="flex flex-col gap-2">
          <EditIcon onClick={onOpen}>
            <span>更新任务参数</span>
          </EditIcon>
        </div>
        <Modal
          size="xs"
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  任务参数
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="品种"
                    name="code"
                    variant="bordered"
                    value={values.code}
                    onChange={handleChange}
                  />
                  <Input
                    label="开仓方向"
                    name="direction"
                    variant="bordered"
                    value={values.direction}
                    onChange={handleChange}
                  />
                  <Input
                    label="起始价格"
                    name="target_price"
                    variant="bordered"
                    value={values.target_price}
                    onChange={handleChange}
                  />
                  <Input
                    label="增仓价差"
                    name="price_diff_step"
                    variant="bordered"
                    value={values.price_diff_step}
                    onChange={handleChange}
                  />
                  <Input
                    label="增仓量差"
                    name="volume_diff_step"
                    variant="bordered"
                    value={values.volume_diff_step}
                    onChange={handleChange}
                  />
                  <Input
                    label="盈利价差"
                    name="profit_diff_price"
                    variant="bordered"
                    value={values.profit_diff_price}
                    onChange={handleChange}
                  />
                  <Input
                    label="目标盈利"
                    name="target_profit"
                    variant="bordered"
                    value={values.target_profit}
                    onChange={handleChange}
                  />
                  <Input
                    label="最大仓位"
                    name="max_position_ratio"
                    variant="bordered"
                    value={values.max_position_ratio}
                    onChange={handleChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    关闭
                  </Button>
                  <Button
                    isDisabled={isDisabled2}
                    onPress={onClose}
                    onClick={handleUpdateButtonClick}
                    color="primary"
                  >
                    更新
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
