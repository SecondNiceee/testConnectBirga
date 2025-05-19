import React, { useMemo } from 'react';
import galks from '../../../images/icons/Subtract.svg'
import userImage from "../../../images/userPhoto/user.png"
import Text from '../../Text/Text';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const Customer = ({customerName, rate, userPhoto, id}) => {
    const userInfo = useSelector(state => state.telegramUserInfo)
    const navigate = useNavigate();
    const urId = useMemo( () => {
        if (id){
            return id
        }
        else{
            return userInfo.id
        }
    } , [id, userInfo.id] )
    return (
        <div onClick={() => {
            navigate(`/Baidge/${id}`)
        }} className = 'customerContainer'>
            <Text className='customer__up'>Заказчик</Text>
            <div className="customer__information">
                <img style={{
                    borderRadius : '50%',
                    objectFit : "cover"
                }} className='information-icon' src={userPhoto.length > 0 ? userPhoto.split('https://').length === 2 ? userPhoto : `${process.env.REACT_APP_HOST}/${urId}/${userPhoto}` : userImage} alt="" />
                <div className="customer__information-right">
                    <div className="customer__information-right-name">
                        <Text>{customerName.length > 15 ? 
                        customerName.substring(0, 13) + '..'
                        : 
                        customerName
                    }</Text>
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
                        <Text className='rate'>Нет рейтинга</Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;