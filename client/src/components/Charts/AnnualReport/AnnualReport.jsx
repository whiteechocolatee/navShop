import React from "react";

export const AnnualReport = () => {
  return (
    <div>
      <div>
        <h4>Статистика продажів по рокам</h4>
      </div>
      <article>
        <iframe
          title='sales statistic'
          style={{
            background: "#FFFFFF",
            border: "none",
            borderRadius: "2px",
            width: "100%",
            height: "350px",
          }}
          src='https://charts.mongodb.com/charts-navshop-tbutd/embed/charts?id=6304a272-df9a-41de-849f-687fa30ef06d&maxDataAge=3600&theme=light&autoRefresh=true'></iframe>
      </article>
    </div>
  );
};
