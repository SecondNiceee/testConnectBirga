import React from "react";
import formatDate from "../../../functions/makeDate";

const TimeAndWatches = ({time , watches}) => {



  
  return (
    <div className="timeAndWatches">
      <p className="time">Создано {formatDate(new Date(time))}</p>
      {/* <p className="watches">{watches}</p> */}
    </div>
  );
};

export default TimeAndWatches;
