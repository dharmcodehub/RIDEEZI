import React from "react";

function Slide({ title, subtitle, imageAlt, imageSrc }) {
  return (
    <article className="flex flex-col gap-6 items-center min-w-full">
      <h1 className="text-5xl font-bold text-center text-green-600 max-sm:text-3xl">
        {title}
      </h1>
      <p className="text-xl opacity-80 text-neutral-800">{subtitle}</p>
      <img
        alt={imageAlt}
        src={imageSrc}
        className="object-contain overflow-hidden w-full h-[700px] max-w-[900px] max-sm:h-[500px]"
      />
    </article>
  );
}

export default Slide;
