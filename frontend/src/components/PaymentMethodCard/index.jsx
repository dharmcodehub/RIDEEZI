"use client";
import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { SocketDataContext } from "../../context/SocketContext";

function PaymentMethodCard({ selectedPayment, setSelectedPayment, paymentOptions, rideId }) {
  const [paymentDone, setPaymentDone] = useState(false);
  const { sendMessageToRoom, joinRoom } = useContext(SocketDataContext);

  useEffect(() => {
    if (rideId) {
      joinRoom(rideId);
      console.log(`User joined room: ${rideId}`);
    }
  }, [rideId]);

  // Payment method icons mapping
  const paymentIcons = {
    card: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path
          fillRule="evenodd"
          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    cash: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    wallet: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
      </svg>
    ),
  };

  // Payment method labels
  const paymentLabels = {
    card: "Credit Card",
    cash: "Cash",
    wallet: "E-Wallet",
  };

  // Function to handle payment success
  const paymentSuccessful = () => {
    toast.success("Payment Successful!");
    setPaymentDone(true);
    sendMessageToRoom(rideId, "payment-done", { rideId }); // Emit event to the room
    console.log("Payment-done event emitted to room", rideId);
  };

  return (
    <article className="bg-white rounded-[12px] p-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-[16px]">Payment</h3>
      {paymentDone ? (
        <div className="bg-green-50 rounded-md p-4 flex items-start space-x-4">
          <div className="text-2xl">⚡</div>
          <div>
            <h3 className="font-semibold text-gray-800">Payment Done</h3>
            <p className="text-sm text-gray-600">Thank you for your payment!</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-[12px] flex-wrap">
          <button
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
            onClick={paymentSuccessful}
          >
            <span className="text-[14px] font-medium">Make Payment</span>
          </button>
        </div>
      )}
    </article>
  );
}

export default PaymentMethodCard;
