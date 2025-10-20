"use client";
import React from "react";

function StatCard({ label, value }) {
  return (
    <div className="flex-1 p-4 rounded-lg border border-gray-200">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="text-base font-semibold text-neutral-800">{value}</div>
    </div>
  );
}

export default StatCard;
