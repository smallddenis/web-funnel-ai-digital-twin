import type { FC } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  slow?: boolean;
}

export const DecorCircle: FC<Props> = ({ className, slow: _slow }) => (
  <span
    className={cn(
      "absolute size-[600px] rounded-full blur-[130px] pointer-events-none select-none animate-[breathe_15s_ease-in-out_infinite]",
      className
    )}
  />
);
