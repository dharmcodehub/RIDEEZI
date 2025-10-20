import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const FeedbackModal = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    toast.info("Ride Completed! Please rate your ride."); // Show toast notification

    // Ensure the map remains visible and bring the modal to the front
    const mapContainer = document.querySelector(".leaflet-container");
    if (mapContainer) {
      mapContainer.style.zIndex = "0"; // Keep map visible
    }

    return () => {
      if (mapContainer) {
        mapContainer.style.zIndex = "auto"; // Reset z-index when modal closes
      }
    };
  }, []);

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please provide a star rating before submitting.");
      return;
    }
    onSubmit({ rating, feedback });
  };

  return (
    <div className="fixed inset-0 flex bg-opacity-50 bg-black items-center justify-center z-50">
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg shadow-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Rate Your Ride</h2>
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-4xl cursor-pointer transition-transform transform hover:scale-125 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500"
          placeholder="Leave additional feedback (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-md font-semibold hover:from-orange-500 hover:to-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;