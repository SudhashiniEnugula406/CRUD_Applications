import React from "react";

const Carasol = () => {
  return (
    <div id="demo" className="carousel slide">
      {/* Carousel Inner */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://www.atatus.com/glossary/content/images/size/w960/2021/07/CRUD.jpeg"
            alt="CRUD Operations Banner"
            className="d-block w-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Carasol;
