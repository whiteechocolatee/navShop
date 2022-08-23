import React from "react";

export const MonthlyReport = () => {
  return (
    <div>
      <div>
        <h4>Статистика продажів по місяцям</h4>
      </div>
      <article>
        <iframe
          title='monthly stat'
          style={{
            background: "#FFFFFF",
            border: "none",
            borderRadius: "2px",
            width: "100%",
            height: "350px",
          }}
          src='https://charts.mongodb.com/charts-navshop-tbutd/embed/charts?id=6304d05d-1941-495d-8d3c-ebba28263606&maxDataAge=3600&theme=light&autoRefresh=true'></iframe>
      </article>
    </div>
  );
};
