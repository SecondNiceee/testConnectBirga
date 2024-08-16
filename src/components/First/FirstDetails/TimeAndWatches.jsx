import React from "react";
import formatDate from "../../../functions/makeDate";
import Text from "../../Text/Text";

const TimeAndWatches = ({ time, watches }) => {
  return (
    <div className="timeAndWatches">
      <div className="createdAt-block">
        <Text>Создано </Text>
        <p>{formatDate(new Date(time))}</p>
      </div>
      {/* <Text className="watches">{watches}</Text> */}
    </div>
  );
};

export default TimeAndWatches;
