
import React from "react";

import ResponseBlock from "../../../components/MyAds/ResponseBlock";
const MyResponses = ({responsesArr, buttonFunction}) => {


  return (
    <div className="AdsContainer">
      {responsesArr.map((e, i) => {
        return (
          <ResponseBlock
            func={buttonFunction}
            index={i}
            buttonText={"МОЙ ОТКЛИК"}
            task={e}
            {...e.advertisement}
          />
        );
      })}
    </div>
  );
};

export default MyResponses;
