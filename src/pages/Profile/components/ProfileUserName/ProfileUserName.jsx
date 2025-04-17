import React from 'react';
import useGetFullUserName from '../../../../hooks/useGetFullUserName';

const ProfileUserName = () => {
    const userFullName = useGetFullUserName();
    return (
      <h2 className="font-sf-compact-rounded tracking-wide font-medium text-white text-[23px]">
        {userFullName}
      </h2>
    );
};

export default ProfileUserName;