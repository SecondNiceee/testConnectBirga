import React from "react";
import formatDate from "../../../functions/makeDate";
const defaultDate = new Date(0)
const Dedline = ({ dedline }) => {
  return (
    <div className="DeadlineContainer">
      <p>Сроки выполнения</p>
      {dedline.start.getTime() !== defaultDate.getTime() && (
        <p>Начать : {formatDate(dedline.start, true)}</p>
      )}

      {dedline.end !== "" ? (
        <p>Дедлайн : {formatDate(dedline.end, true)} </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dedline;
