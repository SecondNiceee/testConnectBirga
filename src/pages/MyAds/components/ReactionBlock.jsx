import React from "react";
import upDown from "../../../images/icons/UpDown.svg";
import Reaction from './Reaction';
const ReactionBlock = ({goForward , setClosed}) => {
  return (
    <div className="reactions__block">

        <div className="reactions__top">
            <p className="sortBy">сортировка</p>
            <div className="reaction__choice">
            <p>по рейтингу</p>
            <img src={upDown} alt="" />
            </div>
        </div>

        <Reaction setClosed={setClosed} goForward = {goForward} />

        <Reaction setClosed={setClosed}  goForward = {goForward}  />

        <Reaction setClosed={setClosed} goForward = {goForward}  />
    </div>
  );
};

export default ReactionBlock;
