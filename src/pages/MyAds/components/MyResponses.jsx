
import React, { forwardRef } from "react";

import ResponseBlock from "../../../components/MyAds/ResponseBlock";
const MyResponses = forwardRef( ({responsesArr, buttonFunction} , ref) => {


  return (
    <div className="AdsContainer">
      {responsesArr.map((e, i) => {
        return (
          <ResponseBlock
            func={buttonFunction}
            index={i}
            buttonText={"МОЙ ОТКЛИК"}
            task={e}
            isWatched={e.isWatched}
            {...e.advertisement}
          />
        );
      })}
      <div ref={ref} className="intersaction-block">

      </div>
    </div>
  );
} );

export default MyResponses;
