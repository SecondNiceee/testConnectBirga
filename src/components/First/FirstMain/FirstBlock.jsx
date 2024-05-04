import React from 'react';
import MyButton from '../../UI/MyButton/MyButton';
import Pallete from '../../UI/Pallete/Pallete';
import ShareIcon from '../../UI/ShareIcon/ShareIcon'
import SmallDimond from '../../UI/SmallDimond/SmallDimond'
import FalseTie from '../../UI/FalseTie/FalseTie'
import { useSelector } from 'react-redux';

const FirstBlock = ({ className, taskName, executionPlace, time, tonValue , setDetailsActive , isButton , photos }) => {
    const tonConstant = useSelector(state => state.ton.value)
    return (
             <div className={ className ? ["First__block" , className].join(' ') : "First__block" }>
                {photos.length ? (<div className='first__photos'> 
                    {photos.map( (e) => {
                        return <img src={URL.createObjectURL(e)} className='first__photo' alt="" />
                    } )}
                 </div>) : ''  }
                <div className="FirstMain__top">
                    <Pallete  />
                    <p>{taskName}</p>
                    <ShareIcon className='share__icon' />
                </div>
                <div className="FirstMain__middle">
                    <p>{executionPlace}</p>
                    <p>{time.start}</p>
                </div>
                <div className="FirstMain__bottom">
                    <div className="FirstMain__bottom-left">
                        <div className="FirstMain__price-up">
                            <h3>{tonValue} TON</h3>
                            <SmallDimond />
                        </div>
                        <p>~ { Number ((tonValue * tonConstant).toFixed(0)).toLocaleString('ru-RU') } RUB</p>
                    </div>
                    <div className="FirstMain__bottom-right">
                        <FalseTie className = {'tie'} />
                        <MyButton style = { isButton ? {} : {display : 'none'} }  onClick = { (e) => setDetailsActive(true)  }>Подробнее</MyButton>
                    </div>
                </div>
            </div>

    );
};

export default FirstBlock;