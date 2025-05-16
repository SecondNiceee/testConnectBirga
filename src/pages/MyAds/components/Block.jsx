import React, { memo } from 'react';
import MyFirstBlock from '../../../components/MyAds/MyFirstBlock';
import { useNavigate } from 'react-router';

const Block = ({e, i, setSecondPage }) => {
  const navigate = useNavigate();
    return (
        <>
          <div 
              className="block"
            >
              <MyFirstBlock
    
                {...e}
  
                myAdsFunc={(value) => {
                  navigate(`/advertisementResponses/${e.id}`);
                }}
                
                isButton={true}
              />
            </div>
          
    </>

    );
};

export default memo(Block);