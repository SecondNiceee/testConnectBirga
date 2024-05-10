import React from 'react';
import photo from '../../../images/nonUsed/photo.svg' 
import { memo } from 'react';
const LastImages = () => {
    return (
        <div className="last-images">
          <img src={photo} alt="" />
          <img src={photo} alt="" />
        </div>
    );
};

export default memo(LastImages);