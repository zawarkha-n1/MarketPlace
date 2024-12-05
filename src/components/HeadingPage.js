import React from "react";

const Headingpage = ({ pagename, secondheading }) => {
  return (
    <div className="text-center  w-full">
      <div className="text-center mt-8">
        <h1
          className="text-white  font-bold capitalize font-urbanist"
          style={{
            fontSize: "48px",
          }}
        >
          {pagename}
        </h1>
        <div className="flex justify-center mt-4 mb-16">
          <span
            className="text-gray-400  md:text-base font-urbanist"
            style={{
              fontSize: "18px",
            }}
          >
            Home
          </span>
          <span
            className="text-gray-400 mx-3"
            style={{
              fontSize: "18px",
            }}
          >
            /
          </span>
          <span
            className="text-gray-400  md:text-base font-urbanist"
            style={{
              fontSize: "18px",
            }}
          >
            {secondheading}
          </span>
          <span
            className="text-gray-400 mx-3"
            style={{
              fontSize: "18px",
            }}
          >
            /
          </span>
          <span
            className="text-white  md:text-base font-urbanist"
            style={{
              fontSize: "18px",
            }}
          >
            {pagename}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Headingpage;
