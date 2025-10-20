"use client";
import React, { useContext } from "react";
import StatusIndicator from "../StatusIndicator";
import ProfileSection from "../ProfileSection";
import { CaptainDataContext } from "../../context/CaptainContext";

function CaptainHeader({captainName , status}) {
  // console.log(captain);
  return (
    <header className="flex justify-between items-center px-6 w-full bg-green-100 shadow-sm h-[72px]">
      <div className="flex gap-6 items-center">
        <h1 className="text-xl font-bold text-green-600 w-[120px] h-[32px]">ShareRide</h1>
        <StatusIndicator status={status} />
      </div>
      <div className="flex items-center">
      </div>
      <div className="flex gap-6 items-center">
        <nav className="flex gap-6 items-center">
          <button className="flex gap-2 items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px]"
            >
              <path
                d="M10 1.6665V18.3332M14.1667 4.1665H7.91667C7.14312 4.1665 6.40125 4.47379 5.85427 5.02078C5.30729 5.56776 5 6.30962 5 7.08317C5 7.85672 5.30729 8.59858 5.85427 9.14557C6.40125 9.69255 7.14312 9.99984 7.91667 9.99984H12.0833C12.8569 9.99984 13.5987 10.3071 14.1457 10.8541C14.6927 11.4011 15 12.143 15 12.9165C15 13.6901 14.6927 14.4319 14.1457 14.9789C13.5987 15.5259 12.8569 15.8332 12.0833 15.8332H5"
                stroke="black"
                strokeWidth="1.66667"
              ></path>
            </svg>
            <span className="text-sm text-neutral-800">Earnings</span>
          </button>
          <button className="flex gap-2 items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px]"
            >
              <g clipPath="url(#clip0_2673_554)">
                <path
                  d="M15 6.6665C15 5.34042 14.4732 4.06865 13.5355 3.13097C12.5979 2.19329 11.3261 1.6665 10 1.6665C8.67392 1.6665 7.40215 2.19329 6.46447 3.13097C5.52678 4.06865 5 5.34042 5 6.6665C5 12.4998 2.5 14.1665 2.5 14.1665H17.5C17.5 14.1665 15 12.4998 15 6.6665Z"
                  stroke="black"
                  strokeWidth="1.66667"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2673_554">
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <span className="text-sm text-neutral-800">Notifications</span>
          </button>
        </nav>
        <div className="mx-6 w-px h-8 bg-zinc-200" aria-hidden="true" />
        <ProfileSection captainName={captainName}/>
      </div>
    </header>
  );
}

export default CaptainHeader;
