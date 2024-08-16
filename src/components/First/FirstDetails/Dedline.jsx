import React from "react";
import formatDate from "../../../functions/makeDate";
import Text from "../../Text/Text";
const defaultDate = new Date(0)
const Dedline = ({ dedline }) => {
  return (
    <div className="DeadlineContainer">
      <Text>Сроки выполнения</Text>
      {dedline.start.getTime() !== defaultDate.getTime() && (
        <Text>Начать : {formatDate(dedline.start, true)}</Text>
      )}

      {dedline.end !== "" ? (
        <Text>Дедлайн : {formatDate(dedline.end, true)} </Text>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dedline;
