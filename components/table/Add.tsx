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

import { PlusIcon } from "./icon/PlusIcon";

export const AddTask = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDisabled1, setIsDisabled1] = useState(false);
  const [values, setValues] = useState({
    code: "CZCE.FG409",
    direction: "BUY",
    target_price: "1900",
    price_diff_step: "5",
    volume_diff_step: "1",
    profit_diff_price: "8",
    target_profit: "5600",
    max_position_ratio: "0.1",
    threshold_points: "10",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // 处理启动按钮点击事件
  const handleCreateButtonClick = async () => {
    setIsDisabled1(true); // 设置按钮状态为disable
    try {
      // 使用fetch发送请求
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/future/create_task`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            { User: session?.user, task_config: values },
            null,
            2
          ),
        }
      );
      const jsonData = await resp.json();
      setValues(jsonData.data.task_config);
      toast.success("创建任务成功!");
    } catch (error) {
      toast.error(`创建任务失败! 详情: ${error}`);
    } finally {
      setIsDisabled1(false); // 请求结束，恢复按钮状态为enable
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        size="md"
        radius="lg"
        isDisabled={isDisabled1}
        color="primary"
        endContent={<PlusIcon />}
        onClick={onOpen}
      >
        新建任务
      </Button>
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
                  isDisabled={isDisabled1}
                  onPress={onClose}
                  onClick={handleCreateButtonClick}
                  color="primary"
                >
                  创建
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
