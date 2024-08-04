import React from 'react';
import galks from '../../../images/icons/Subtract.svg'
import userImage from "../../../images/userPhoto/user.png"
const Customer = ({customerName, rate, userPhoto, setProfile}) => {
    return (
        <div onClick={() => {
            setProfile(true)
        }} className = 'customerContainer'>
            <p className='customer__up'>Заказчик</p>
            <div className="customer__information">
                <img style={{
                    borderRadius : '50%',
                    objectFit : "cover"
                }} className='information-icon' src={userPhoto.length > 0 ? userPhoto : userImage} alt="" />
                <div className="customer__information-right">
                    <div className="customer__information-right-name">
                        <p>{customerName.length > 15 ? 
                        customerName.substring(0, 13) + '..'
                        : 
                        customerName
                    }</p>
                        <img src= {galks} alt="" />
                    </div>
                    <div className="customer__information-right-rate">
                        {/* <div className="customer__information-right-rate-images">
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                        </div> */}
                        <p className='rate'>Нет рейтинга</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;