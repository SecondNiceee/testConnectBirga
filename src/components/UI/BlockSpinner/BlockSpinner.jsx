import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const BlockSpinner = ({...props}) => {
    return (
    <div {...props} className="First__block loaderBlock">
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