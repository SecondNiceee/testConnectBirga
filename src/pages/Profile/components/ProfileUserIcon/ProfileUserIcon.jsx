import React from 'react';
import useGetUserPhotoLink from '../../../../hooks/useGetUserPhotoLink';

const ProfileUserIcon = () => {
    const userLinkPhoto = useGetUserPhotoLink();
    return (
        <img
        style={{ objectFit: "cover" }}
        src={userLinkPhoto}
        className="w-[94px] h-[94px] rounded-full "
        alt=""
      />
    );
};

export default ProfileUserIcon;