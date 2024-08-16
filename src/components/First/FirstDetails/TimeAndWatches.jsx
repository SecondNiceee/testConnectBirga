import React from "react";
import formatDate from "../../../functions/makeDate";
import Text from "../../Text/Text";

const TimeAndWatches = ({time , watches}) => {



  
  return (
    <div className="timeAndWatches">
      <Text className="time">Создано {formatDate(new Date(time))}</Text>
      {/* <Text className="watches">{watches}</Text> */}
    </div>
  );
};

export default TimeAndWatches;
