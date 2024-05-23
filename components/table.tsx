"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { DeleteIcon } from "./table/icon/DeleteIcon";
import { socket } from "../app/socket";
import { DetailTask } from "./table/Detail";
import { UpdateTask } from "./table/Update";
import { AddTask } from "./table/Add";
import { Task } from "../types";

const columns = [
  { key: "id", label: "序号" },
  { key: "name", label: "开仓品种" },
  { key: "price", label: "开仓价格" },
  { key: "actions", label: "任务操作" },
];

export default function CustomTable() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);

  const stopTask = useCallback(
    async (task_id: string) => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/future/cancel_task`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ User: session?.user, task_id }, null, 2),
          }
        );
        const jsonData = await resp.json();
        // 处理 jsonData 如果需要
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
    [session]
  );

  const handleStopButtonClick = useCallback(
    (task_id: string) => {
      stopTask(task_id).catch((error) => {
        console.error("Error stopping task:", error);
      });
    },
    [stopTask]
  );

  useEffect(() => {
    const onConnect = () => {
      socket.emit("join_room", session?.user?.name);
    };

    const onMessage = (message: any) => {
      if (typeof message === "object" && message instanceof Array) {
        setTasks(message);
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
  }, [session]); // 依赖数组中只需包含 session

  const renderCell = useCallback(
    (task: Task, columnKey: React.Key) => {
      const cellValue = getKeyValue(task, columnKey);

      switch (columnKey) {
        case "id":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-xs capitalize">
                {Number(task.id) + 1}
              </p>
            </div>
          );
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-xs capitalize">
                {task.task_config.code}
              </p>
            </div>
          );
        case "price":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-xs capitalize">
                {task.task_config.target_price}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-3">
              <Tooltip content="任务详情">
                <span className="text-default-400 cursor-pointer active:opacity-50">
                  <DetailTask
                    taskId={task.task_id}
                    taskConfig={task.task_config}
                  />
                </span>
              </Tooltip>
              <Tooltip content="更新任务">
                <span className="text-default-400 cursor-pointer active:opacity-50">
                  <UpdateTask
                    taskId={task.task_id}
                    taskConfig={task.task_config}
                  />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="删除任务">
                <span className="text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon
                    onClick={() => handleStopButtonClick(task.task_id)}
                  />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleStopButtonClick]
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <AddTask></AddTask>
        </div>
      </div>
    );
  }, []);

  return (
    <Table aria-label="Example table with custom cells" topContent={topContent}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={tasks} emptyContent={"当前没有正在运行的交易任务."}>
        {(item) => (
          <TableRow key={getKeyValue(item, "id")}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
