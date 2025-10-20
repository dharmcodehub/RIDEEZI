"use client";
import React from "react";

function StatusIndicator({status}) {
  return (
    <div className="flex gap-2 items-center px-4 py-2 rounded-lg bg-green-600 bg-opacity-10">
      <span className="w-2 h-2 bg-gray-500 rounded-full" aria-hidden="true" />
      <span className="text-sm text-gray-500">{status}</span>
    </div>
  );
}

export default StatusIndicator;
