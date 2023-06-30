import React from "react";

export default function CashChartLegends({ data, totalBalance }) {
  const sortedData = data.slice().sort((a, b) => b.balance - a.balance);

  return (
    <div className="pie_legends_block">
      {sortedData.map((value, index) => {
        return (
          <React.Fragment key={index}>
            <svg height={14} width={14} xmlns="http://www.w3.org/2000/svg">
              <circle
                cx={7}
                cy={7}
                r={7}
                fill={`url(#${value.description.replaceAll(" ", "_")})`}
              />
              <defs>
                <linearGradient
                  id={value.description.replaceAll(" ", "_")}
                  x1="0"
                  y1="0"
                  x2="14"
                  y2="14"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={value.color[0]} />
                  <stop offset="1" stopColor={value.color[1]} />
                </linearGradient>
              </defs>
            </svg>
            <span>{value.description}</span>
            <span
              className="legends_procent"
              style={{ color: `${value.color[1]}` }}
            >
              {((value.balance * 100) / totalBalance).toFixed(2)} %
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
