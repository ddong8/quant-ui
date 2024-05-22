import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Task = {
  id: string;
  task_id: string;
  task_config: TaskConfig;
};

export type TaskConfig = {
  code: string;
  direction: string
  target_price: string
  price_diff_step: string
  volume_diff_step: string
  profit_diff_price: string
  target_profit: string
  max_position_ratio: string
};