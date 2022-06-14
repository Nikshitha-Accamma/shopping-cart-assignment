import { Button } from "antd";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

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
        <Button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
          className="prev-btn"
          data-testid="prev-btn"
        >
          Prev
        </Button>
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
        <Button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
          className="next-btn"
          data-testid="next-btn"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
