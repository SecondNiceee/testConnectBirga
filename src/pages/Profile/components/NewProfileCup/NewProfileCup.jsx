import React from 'react';
import OverallRating from '../OverallRating/OverallRating';
import NitcheRating from '../NitcheRating/NitcheRating';
import Profession from '../Profession/Profession';
import ProfileUserIcon from '../ProfileUserIcon/ProfileUserIcon';
import EditIcon from '../../../../components/UI/EditIcon/EditIcon';
import NewProfileShareIcon from '../NewProfileShareIcon/NewProfileShareIcon';
import ProfileUserName from '../ProfileUserName/ProfileUserName';
import ProfileLikesCounter from '../ProfileLikesCounter/ProfileLikesCounter';

const NewProfileCup = () => {
    return (
        <div className="flex py-[17px] pb-[14px] px-[19px] flex-col gap-[13px] bg-[#20303f] rounded-[13px] ">
        <div className="flex  w-[100%]">
            <ProfileUserIcon />
            <NitcheRating />
            <OverallRating />
          <div className="h-[100%] ml-auto flex flex-col gap-[8px]">
            <NewProfileShareIcon />
            <EditIcon />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[1px]">
            <ProfileUserName />
            <Profession />
          </div>
           <ProfileLikesCounter />
        </div>
      </div>
    );
};

export default NewProfileCup;