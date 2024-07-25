import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const BlockSpinner = ({isPhotos = false}) => {
    return (
    <div style={  {minHeight : "144px" , display : "flex" , alignItems : "center", justifyContent : "center"
    }} className="First__block">
        <ThreeCircles
            visible={true}
            height="35"
            width="35"
            color="white"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
    </div>
    );
};

export default BlockSpinner;