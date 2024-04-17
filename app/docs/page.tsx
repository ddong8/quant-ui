"use client";
import React, { useState } from "react";
import { Button, Input, Code } from "@nextui-org/react";
import { AddUser } from "./add-user";

function MyComponent() {
  const [data, setData] = useState(null);
  const [taskId, setTaskId] = useState("");
  const [isDisabled1, setIsDisabled1] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);

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

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

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
      setData(jsonData); // 设置数据状态
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
      setData(jsonData); // 设置数据状态
    } catch (error) {
      console.error(error); // 打印失败信息
    } finally {
      setIsDisabled1(false); // 请求结束，恢复按钮状态为enable
    }
  };

  // 处理启动按钮点击事件
  const handleUpdateTargetProfitClick = async () => {
    setIsDisabled2(true); // 设置按钮状态为disable
    try {
      // 使用fetch发送请求
      const resp = await fetch(`${API_URL}/api/v1/future/update_task_config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task_id: taskId, task_config: values }, null, 2),
      });
      const jsonData = await resp.json();
      setValues(jsonData.data.task_config);
      setData(jsonData); // 设置数据状态
    } catch (error) {
      console.error(error); // 打印失败信息
    } finally {
      setIsDisabled2(false); // 请求结束，恢复按钮状态为enable
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input
          isDisabled
          labelPlacement="outside-left"
          label="交易任务ID"
          variant="bordered"
          defaultValue=""
          value={taskId}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-2">
          <Button
            isDisabled={isDisabled1}
            onClick={handleTradeCreateClick}
            color="primary"
          >
            启动交易
          </Button>
          <Button
            isDisabled={isDisabled1}
            onClick={handleTradeStopClick}
            color="danger"
          >
            停止交易
          </Button>
        </div>
      </div>
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
      <Button
        isDisabled={isDisabled2}
        onClick={handleUpdateTargetProfitClick}
        color="primary"
      >
        更新任务参数
      </Button>
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>}{" "} */}
      {/* <div className="flex w-full">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <AddUser />
        </div>
      </div> */}
    </div>
  );
}

export default MyComponent;
