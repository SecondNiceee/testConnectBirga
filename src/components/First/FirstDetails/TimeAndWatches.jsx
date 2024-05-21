import React from "react";

const TimeAndWatches = ({time , watches}) => {

  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour : 'numeric',
    minute : 'numeric',
    timezone: 'UTC'
  };

  
  return (
    <div className="timeAndWatches">
      <p className="time">{time.toLocaleString("ru", options)}</p>
      <p className="watches">{watches}</p>
    </div>
  );
};

export default TimeAndWatches;
