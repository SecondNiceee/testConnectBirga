import React from 'react';
import Heart from '../Heart/Heart';

const ProfileLikesCounter = () => {
    return (
        <div className="flex items-center gap-[6.67px] mt-auto">
        <p className="font-sf-pro-display font-medium text-[17px] text-[#b5ced9]">
          189
        </p>
        <Heart />
      </div>
    );
};

export default ProfileLikesCounter;