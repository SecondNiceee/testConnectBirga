import React from 'react';
import useGetUserName from '../../../../hooks/useGetUserName';

const ProfileUserName = () => {
    const userName = useGetUserName();
    return (
      <h2 className="font-sf-compact-rounded font-medium text-white text-[23px]">
        {userName}
      </h2>
    );
};

export default ProfileUserName;