import React from "react";
import Wrapper from "../assets/wrappers/StatsContainer";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { useSelector } from "react-redux";
import { StatsItem } from "./index";

const StatsContainer = () => {
  const { stats } = useSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: "pending application",
      count: stats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bg: "#e0e8f9",
    },
    {
      title: "job declined",
      count: stats?.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {defaultStats.map((statsItem, index) => {
        return <StatsItem key={index} {...statsItem} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
