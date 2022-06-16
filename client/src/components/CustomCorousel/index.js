import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import CustomButton from "../CustomButton";

import "./index.scss";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  return (
    <div
      {...handlers}
      className="carousel"
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children?.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <CustomButton 
          className="prev-btn" 
          onClickHandler={() => {
            updateIndex(activeIndex - 1);
          }}
          testId="prev-btn"
          label="Previous button"
        > 
         Prev
        </CustomButton>
        {React.Children?.map(children, (child, index) => {
          return (
            <div
              className={`button ${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
              data-testid={`btn-${index}`}
            />
          );
        })}
        <CustomButton 
          className="next-btn" 
          onClickHandler={() => {
            updateIndex(activeIndex + 1);
          }}
          testId="next-btn"
          label="next button"
        > 
         Next
        </CustomButton>
      </div>
    </div>
  );
};

export default Carousel;
