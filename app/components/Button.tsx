import * as React from "react";

function Button() {
  return (
    <div className="relative flex items-center justify-center md:justify-end h-16 md:h-auto mt-8 md:mt-0">
      <div className="w-full h-px bg-gray-300 md:hidden"></div>
      <button
        type="submit"
        className="absolute bg-violet-500 hover:bg-purple-600 active:bg-purple-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-200 shrink-0"
      >
        <img
          src="/assets/images/icon-arrow.svg"
          alt="arrow icon"
          className="w-7 h-8"
        />
      </button>
      <div className="w-full h-px bg-gray-300 hidden md:block"></div>
    </div>
  );
}

export default Button;
