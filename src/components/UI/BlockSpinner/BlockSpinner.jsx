import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const BlockSpinner = () => {
    return (
    <div style={{minHeight : "282px" , display : "flex" , alignItems : "center", justifyContent : "center"
    }} className="First__block">
        <ThreeCircles
            visible={true}
            height="50"
            width="50"
            color="white"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
    </div>
    );
};

export default BlockSpinner;