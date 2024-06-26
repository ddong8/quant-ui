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
import { toast } from "react-hot-toast";

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
    threshold_points: taskConfig.threshold_points,
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
      toast.success("任务更新成功!");
    } catch (error) {
      toast.error(`任务更新失败! 详情: ${error}`);
    } finally {
      setIsDisabled2(false); // 请求结束，恢复按钮状态为enable
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <EditIcon onClick={onOpen}>更新任务参数</EditIcon>
      <Modal
        size="sm"
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
                任务参数
              </ModalHeader>
              <ModalBody className="flex flex-col gap-1">
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
                <Input
                  label="波动监控"
                  name="threshold_points"
                  variant="bordered"
                  value={values.threshold_points}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter className="gap-3">
                <Button
                  size="md"
                  radius="lg"
                  color="danger"
                  variant="flat"
                  onClick={onClose}
                >
                  关闭
                </Button>
                <Button
                  size="md"
                  radius="lg"
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
    </div>
  );
};
