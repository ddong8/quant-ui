"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";

function MyComponent() {
  const [data, setData] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  // 处理按钮点击事件
  const handleClick = async () => {
    setIsDisabled(true); // 设置按钮状态为disable
    try {
      // 使用fetch发送请求
      const resp = await fetch("https://restapi.amap.com/v3/ip");
      const jsonData = await resp.json();
      setData(jsonData); // 设置数据状态
    } catch (error) {
      console.error(error); // 打印失败信息
    } finally {
      setIsDisabled(false); // 请求结束，恢复按钮状态为enable
    }
  };

  return (
    <div>
      <Button isDisabled={isDisabled} onClick={handleClick} color="primary">
        发送请求
      </Button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}{" "}
      {/* 显示获取的数据 */}
    </div>
  );
}

export default MyComponent;
