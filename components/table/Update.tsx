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
              <ModalHeader className="flex flex-col gap-2">
                任务参数
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2">
                <div className="gap-4 grid grid-cols-2 row-span-3">
                  <Input
                    label="品种"
                    name="code"
                    variant="bordered"
                    value={values.code}
                    placeholder="交易的品种"
                    onChange={handleChange}
                  />
                  <Input
                    label="开仓方向"
                    name="direction"
                    variant="bordered"
                    value={values.direction}
                    placeholder="任务开仓的方向"
                    onChange={handleChange}
                  />
                  <Input
                    label="起始价格"
                    name="target_price"
                    variant="bordered"
                    value={values.target_price}
                    placeholder="任务设定的起始价格"
                    onChange={handleChange}
                  />
                  <Input
                    label="增仓价差"
                    name="price_diff_step"
                    variant="bordered"
                    value={values.price_diff_step}
                    placeholder="每次增仓的价格差"
                    onChange={handleChange}
                  />
                  <Input
                    label="增仓量差"
                    name="volume_diff_step"
                    variant="bordered"
                    value={values.volume_diff_step}
                    placeholder="每次增仓的数量差"
                    onChange={handleChange}
                  />
                  <Input
                    label="盈利价差"
                    name="profit_diff_price"
                    variant="bordered"
                    value={values.profit_diff_price}
                    placeholder="盈利的价格差"
                    onChange={handleChange}
                  />
                  <Input
                    label="目标盈利"
                    name="target_profit"
                    variant="bordered"
                    value={values.target_profit}
                    placeholder="设定的目标盈利"
                    onChange={handleChange}
                  />
                  <Input
                    label="最大仓位"
                    name="max_position_ratio"
                    variant="bordered"
                    value={values.max_position_ratio}
                    placeholder="允许使用的最大仓位"
                    onChange={handleChange}
                  />
                  <Input
                    label="波动监控"
                    name="threshold_points"
                    variant="bordered"
                    value={values.threshold_points}
                    placeholder="价格波动的点数监控"
                    onChange={handleChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="gap-5">
                <Button
                  radius="lg"
                  color="danger"
                  variant="flat"
                  onClick={onClose}
                >
                  关闭
                </Button>
                <Button
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
