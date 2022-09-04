import React from "react";
import Wrapper from "../assets/wrappers/StatItem";
const StatsItem = ({ title, icon, color, bg, count }) => {
  return (
    <Wrapper color={color} bcg={bg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatsItem;
