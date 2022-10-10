import React from "react";

const Skeleton = ({ children, count }) => (
  <>
    {[...Array(count || 1)].map((_, i) => (
      <div key={i}>{children}</div>
    ))}
  </>
);

export const TaskbarSkeleton = ({ count }) => (
  <Skeleton count={count}>
    <div className="flex justify-between items-center pb-3 px-4 border-b dark:border-white/10 my-3">
      <div>
        <div className="h-2.5 bg-black/30 rounded-full dark:bg-white/40 w-24 mb-2.5" />
        <div className="w-32 h-2 bg-black/20 rounded-full dark:bg-white/20" />
      </div>
      <div className="h-2 w-12 aspect-square bg-black/30 rounded-full dark:bg-white/50" />
    </div>
  </Skeleton>
);
