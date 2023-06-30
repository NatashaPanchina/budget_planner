import React from "react";
import { useTranslation } from "react-i18next";
import { dinero, toDecimal, add } from "dinero.js";
import { USD } from "@dinero.js/currencies";

import { categoryIcons } from "../../../utils/constants/icons";
import { formatDineroOutput } from "../../../utils/format/cash";
import { createData } from "../utils/charts";

function renderTable(t, data, tableFilter) {
  let totalSum = data.reduce(
    (sum, category) => add(sum, category.sum),
    dinero({ amount: 0, currency: USD })
  );
  let floatTotalSum = Number(toDecimal(totalSum));
  return (
    <React.Fragment>
      <div className="analysis_categories_description">
        <span>{t("ANALYSIS.CATEGORY")}</span>
        <span>{t("ANALYSIS.PERCENTAGE")}</span>
        <span>{t("ANALYSIS.SUM")}</span>
      </div>
      <div className="categories_item">
        <div className="categories_total_info">{t("ANALYSIS.TOTAL_TABLE")}</div>
        <div>100.00%</div>
        <div className={`categories_${tableFilter}_amount`}>
          {formatDineroOutput(totalSum, "USD")}
        </div>
      </div>
      {data.map((item) => {
        let Icon = categoryIcons[item.category.icon];
        return (
          <div key={item.category.id} className="categories_item">
            <div className="categories_info">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="17"
                  cy="17"
                  r="17"
                  fill={`url(#${item.category.description})`}
                ></circle>
                <Icon height="20" width="20" x="7" y="7" />
                <defs>
                  <linearGradient
                    id={item.category.description}
                    x1="0"
                    y1="0"
                    x2="17"
                    y2="17"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={item.category.color[0]} />
                    <stop offset="1" stopColor={item.category.color[1]} />
                  </linearGradient>
                </defs>
              </svg>
              {item.category.description}
            </div>
            <div>
              {((toDecimal(item.sum) * 100) / floatTotalSum).toFixed(2)}%
            </div>
            <div className={`categories_${tableFilter}_amount`}>
              {formatDineroOutput(item.sum, "USD")}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default function Table({ transactions, categories, tableFilter, date }) {
  const { t } = useTranslation();

  let data = createData(
    { transactions, categories, tableFilter, date },
    "table"
  );

  return (
    <div className="table_container">{renderTable(t, data, tableFilter)}</div>
  );
}
