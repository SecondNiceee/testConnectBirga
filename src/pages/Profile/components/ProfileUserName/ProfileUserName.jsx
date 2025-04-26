import React from 'react';
import { getFormatedUserFullName } from '../../../../functions/getFormatedUserFullname';

const ProfileUserName = ({firstName, lastName}) => {
    const formatedName = getFormatedUserFullName(firstName, lastName)
    return (
      <h2 className="font-sf-compact-rounded tracking-wide font-medium text-white text-[23px]">
        {formatedName}
      </h2>
    );
};

export default ProfileUserName;