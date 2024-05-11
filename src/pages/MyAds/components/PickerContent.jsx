import React from 'react';
import { Link } from 'react-router-dom';
import plus from "../../../images/icons/plus-circle.svg";
import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
const PickerContent = ({myAdsArray , setTask , goForward , setDetailsActive , setIndex}) => {
    return (
    <div className="PickerContent">
        <div className="picler__block">
          <Link to="/AdCreating" className="AdCreactingFunction">
            <img src={plus} alt="" />
            <p>Создать объявление</p>
          </Link>
          <div className="AdsContainer">
            {myAdsArray.map((e, i) => {
              return (
                <div key={i}
                  className="block"
                  onClick={(e) => {
                    if (e.target.closest('.MyButton_MyButton__DY3IO') === null){
                      // setTask(e);
                      goForward();
                    }
                  }}
                >
                  <FirstBlock
                    key={i}
                    isButton={true}
                    setDetailsActive={() => {
                      setDetailsActive(true);
                      setIndex(i);
                    }}
                    {...e}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default PickerContent;