import { HTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Shimmer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-200/60 dark:bg-slate-800/60",
        className
      )}
      {...props}
    />
  );
}

export function ShimmerCard() {
  return (
    <div className="flex flex-col space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm h-full w-full">
      <div className="flex items-center space-x-4">
        <Shimmer className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Shimmer className="h-4 w-[150px]" />
          <Shimmer className="h-3 w-[100px]" />
        </div>
      </div>
      <Shimmer className="h-[120px] w-full rounded-xl" />
      <div className="space-y-2">
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-4/5" />
      </div>
    </div>
  );
}
