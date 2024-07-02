import React from "react";
import photo from "../../../images/nonUsed/photo_2024-03-02 03.14.svg";
import Case from "../../../components/UI/Case/Case";

const ExampleWorks = ({cards}) => {
  return (
    <div className="examplesWork">
      <p className="exampleWork-text">Примеры работ</p>
      <div className="cards__wraaper">
        {cards.map((e) => {
          return (
            <Case title = {e.title} description={e.description} photos={e.photos} />
          )
        })}
      </div>
    </div>
  );
};

export default ExampleWorks;
