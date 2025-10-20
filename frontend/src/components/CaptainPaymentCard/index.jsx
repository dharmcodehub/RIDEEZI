"use client";
import React, { useState, useEffect, useContext } from "react";
import { SocketDataContext } from "../../context/SocketContext";
import { toast } from "react-toastify";

function CaptainPaymentCard({ paymentStatus , setPaymentStatus, handleSubmit, rideId }) {
  const [status, setStatus] = useState(paymentStatus);
  const { receiveMessageFromRoom, joinRoom } = useContext(SocketDataContext);
  console.log("Ride  id  from captain payment is : ", rideId)
  useEffect(() => {
    if (rideId) {
      console.log(`Attempting to join room with rideId: ${rideId}`);
      joinRoom(rideId);
      console.log(`Captain joined room: ${rideId}`);
    } else {
      console.error("rideId is undefined in CaptainPaymentCard");
    }
  }, [rideId]);

  useEffect(() => {
    console.log("Setting up listener for payment-done event");
    receiveMessageFromRoom("payment-done", (data) => {
      console.log("Payment-done event received in CaptainPaymentCard:", data);
      setStatus("completed");
      setPaymentStatus("completed");
      toast.success("Payment completed successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    
      console.log("Payment status updated to completed");
    });
  }, [receiveMessageFromRoom]);

  // Status configurations with appropriate colors and icons
  const statusConfigs = {
    pending: {
      color: "text-[#F59E0B]",
      bgColor: "bg-[#FEF3C7]",
      borderColor: "border-[#F59E0B]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "Payment Pending",
      description: "Your payment is being processed",
    },
    completed: {
      color: "text-[#22C55E]",
      bgColor: "bg-[#F0FDF4]",
      borderColor: "border-[#22C55E]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "Payment Completed",
      description: "Your payment has been processed successfully",
    },
    failed: {
      color: "text-[#EF4444]",
      bgColor: "bg-[#FEF2F2]",
      borderColor: "border-[#EF4444]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "Payment Failed",
      description: "There was an issue processing your payment",
    },
    refunded: {
      color: "text-[#6B7280]",
      bgColor: "bg-[#F3F4F6]",
      borderColor: "border-[#6B7280]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "Payment Refunded",
      description: "Your payment has been refunded",
    },
  };

  const statusButtons = [
    {
      label: "Pending",
      value: "pending",
      activeClass: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
    },
    {
      label: "Completed",
      value: "completed",
      activeClass: "bg-[#F0FDF4] border-[#22C55E] text-[#22C55E]",
    },
    {
      label: "Failed",
      value: "failed",
      activeClass: "bg-[#FEF2F2] border-[#EF4444] text-[#EF4444]",
    },
    {
      label: "Refunded",
      value: "refunded",
      activeClass: "bg-[#F3F4F6] border-[#6B7280] text-[#6B7280]",
    },
  ];

  // Get current status configuration
  const currentStatus = statusConfigs[status] || statusConfigs.pending;

  return (
    <article className="bg-white rounded-[12px] p-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-[16px]">
        Payment Status
      </h3>

      <div
        className={`p-4 rounded-[8px] border ${currentStatus.borderColor} ${currentStatus.bgColor} mb-4`}
      >
        <div className="flex items-center gap-3">
          <div className={`${currentStatus.color}`}>{currentStatus.icon}</div>
          <div>
            <h4 className={`text-[15px] font-medium ${currentStatus.color}`}>
              {currentStatus.label}
            </h4>
            <p className="text-[13px] text-[#666]">
              {currentStatus.description}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction details section */}
      {status === "completed" && (
        <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
          <h4 className="text-[14px] font-medium text-[#1A1A1A] mb-3">
            Transaction Details
          </h4>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-[13px] text-[#666]">Transaction ID</span>
              <span className="text-[13px] font-medium text-[#1A1A1A]">
                TXN-12345678
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] text-[#666]">Date</span>
              <span className="text-[13px] font-medium text-[#1A1A1A]">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] text-[#666]">Payment Method</span>
              <span className="text-[13px] font-medium text-[#1A1A1A]">
                Credit Card
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center w-full">
        <button
          className="flex justify-center items-center w-full py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          onClick={handleSubmit}
        >
          Ride Completed
        </button>
      </div>
    </article>
  );
}

export default CaptainPaymentCard;
