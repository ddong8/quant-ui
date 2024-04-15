"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";

function MyComponent() {
  const [data, setData] = useState(null);
  const [isDisabled1, setIsDisabled1] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  // 处理启动按钮点击事件
  const handleTradeStartClick = async () => {
    setIsDisabled1(true); // 设置按钮状态为disable
    try {
      // 使用fetch发送请求
      const resp = await fetch(`${API_URL}/api/v1/future/start_task`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
      const resp = await fetch(
        `${API_URL}/api/v1/future/update_target_price/` + inputValue,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await resp.json();
      setData(jsonData); // 设置数据状态
    } catch (error) {
      console.error(error); // 打印失败信息
    } finally {
      setIsDisabled2(false); // 请求结束，恢复按钮状态为enable
    }
  };

  return (
    <div>
      <Button
        isDisabled={isDisabled1}
        onClick={handleTradeStartClick}
        color="primary"
      >
        启动交易
      </Button>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <Button
        isDisabled={isDisabled2}
        onClick={handleUpdateTargetProfitClick}
        color="primary"
      >
        更新盈利
      </Button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}{" "}
      {/* 显示获取的数据 */}
    </div>
  );
}

export default MyComponent;
