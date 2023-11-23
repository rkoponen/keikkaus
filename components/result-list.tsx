import React, { useEffect, useRef, useState } from "react";
import SingleResult from "./single-result";
import {
  LotteryResult,
  Result,
  checkResult,
  selectLotteryNumbers,
} from "@/app/utils/lotto-utils";
import { BsPlusLg } from "react-icons/bs";
import { setTimeout } from "timers";

interface ResultListProps {
  years: number;
  rows: number[][];
}

const ResultList = (props: ResultListProps) => {
  const weeks = props.years * 52;
  const [resultList, setResultList] = useState<React.JSX.Element[]>([]);
  const [week, setWeek] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  //const resultList: React.JSX.Element[] = [];

  useEffect(() => {
    // Function to add a new item to the list
    const addNewItem = () => {
      if (week <= weeks) {
        setResultList((prevItems) => [
          ...prevItems,
          <SingleResult rows={props.rows} week={week} />,
        ]);
        setWeek(week + 1);
      } else {
        clearInterval(intervalId);
      }
    };

    // Set up an interval to add a new item every 2 seconds (adjust as needed)
    const intervalId = setInterval(addNewItem, 20);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [week, weeks, props.rows]);

  useEffect(() => {
    // Scroll to the bottom when resultList changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [resultList]);

  return (
    <div className="w-1/2">
      <div className="overflow-y-scroll h-96" ref={scrollContainerRef}>
        <ul>{resultList}</ul>
      </div>
    </div>
  );
};

export default ResultList;
