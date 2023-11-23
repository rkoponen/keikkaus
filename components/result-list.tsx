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

  useEffect(() => {
    const addNewItems = () => {
      if (week < weeks) {
        const newItems: React.JSX.Element[] = [];
        for (let i = week; i < week + 10 && i <= weeks; i++) {
          newItems.push(<SingleResult rows={props.rows} week={i} />);
          setWeek(i)
        }
    
        setResultList((prevItems) => [...prevItems, ...newItems]);
      } else {
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(addNewItems, 4);

    return () => clearInterval(intervalId);
  }, [week, weeks, props.rows]);

  useEffect(() => {
    //Scroll to the bottom of the result scroll div
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
