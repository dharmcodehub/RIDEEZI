import React from "react";

function IconSVG({ name, className }) {
  const icons = {
    "check-circle": (
      <path
        d="M15 20L18.3333 23.3333L25 16.6667M35 20C35 28.2843 28.2843 35 20 35C11.7157 35 5 28.2843 5 20C5 11.7157 11.7157 5 20 5C28.2843 5 35 11.7157 35 20Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    "arrow-right": (
      <path
        d="M28.3333 13.333L35 19.9997M35 19.9997L28.3333 26.6663M35 19.9997H5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    check: (
      <path
        d="M8.3335 21.667L15.0002 28.3337L31.6668 11.667"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    "chevron-left": (
      <path
        d="M15 19L8 12L15 5"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    "chevron-right": (
      <path
        d="M9 5L16 12L9 19"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  };

  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      {icons[name]}
    </svg>
  );
}

export default IconSVG;
