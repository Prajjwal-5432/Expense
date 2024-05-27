import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Bar } from "recharts";

import "./Chart.css";
import { useExpense } from "../context/ExpenseTrackerContext";

const COLORS = ["#FF9304", "#A000FF", "#FDE006"];
const d = ["Entertainment", "Food", "Travel"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontWeight={"700"}
      fontSize={"16px"}
    >
      {`${d[index]} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Chart = () => {
  const [data, setData] = useState([
    { name: "Entertainment", value: 0, color: "#FF9304" },
    { name: "Food", value: 0, color: "#A000FF" },
    { name: "Travel", value: 0, color: "#FDE006" },
  ]);

  const { expense, expenses } = useExpense();

  useEffect(() => {
    const newData = [...data];

    newData.forEach((key, ind) => {
      const expenseMade = expenses.reduce((acc, cur) => {
        return acc + (cur.category === key.name ? Number(cur.price) : 0);
      }, 0);
      newData[ind].value = (expenseMade * 100) / Number(expense);
    });

    setData(newData);
  }, [expense, expenses]);

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#fffff"
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default Chart;
