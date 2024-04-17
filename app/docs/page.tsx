"use client";
import React, { useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { UpdateTask } from "./update-task";

function MyComponent() {
  const [taskId, setTaskId] = useState("");
  const [isDisabled1, setIsDisabled1] = useState(false);

  const [values, setValues] = useState({
    code: "",
    direction: "SELL",
    target_price: "1570",
    price_diff_step: "5",
    volume_diff_step: "1",
    target_profit: "110",
    max_position_ratio: "0.4",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 处理启动按钮点击事件
  const handleTradeCreateClick = async () => {
    setIsDisabled1(true); // 设置按钮状态为disable
    try {
      // 使用fetch发送请求
      const resp = await fetch(`${API_URL}/api/v1/future/create_task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await resp.json();
      setValues(jsonData.data.task_config);
      setTaskId(jsonData.data.task_id);
    } catch (error) {
      console.error(error); // 打印失败信息
    } finally {
      setIsDisabled1(false); // 请求结束，恢复按钮状态为enable
    }
  };

  // 处理启动按钮点击事件
  const handleTradeStopClick = async () => {
    setIsDisabled1(true); // 设置按钮状态为disable
    try {
      // 使用fetch发送请求
      const resp = await fetch(`${API_URL}/api/v1/future/cancel_task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task_id: taskId }, null, 2),
      });
      const jsonData = await resp.json();
    } catch (error) {
      console.error(error); // 打印失败信息
    } finally {
      setIsDisabled1(false); // 请求结束，恢复按钮状态为enable
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Textarea
          isDisabled
          isReadOnly
          variant="bordered"
          label="交易任务ID"
          labelPlacement="outside"
          placeholder=""
          value={taskId}
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          isDisabled={isDisabled1}
          onClick={handleTradeCreateClick}
          color="primary"
        >
          启动交易
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          isDisabled={isDisabled1}
          onClick={handleTradeStopClick}
          color="danger"
        >
          停止交易
        </Button>
      </div>
      <UpdateTask taskId={taskId} values={values} setValues={setValues} />
    </div>
  );
}

export default MyComponent;
