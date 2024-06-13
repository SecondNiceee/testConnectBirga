import React from 'react';
import MyButton from '../../UI/MyButton/MyButton';
import Pallete from '../../UI/Pallete/Pallete';
import ShareIcon from '../../UI/ShareIcon/ShareIcon'
import SmallDimond from '../../UI/SmallDimond/SmallDimond'
import FalseTie from '../../UI/FalseTie/FalseTie'
import { useSelector } from 'react-redux';

const FirstBlock = ({ className, taskName, executionPlace, time, tonValue , setDetailsActive , isButton , photos }) => {
    const tonConstant = useSelector(state => state.ton.value)
    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour : 'numeric',
        minute : 'numeric',
        timezone: 'UTC'
      };
    return (
        <>
        {photos !== undefined ? 
                     <div className={ className ? ["First__block" , className].join(' ') : "First__block" }>
                     {photos.length ? (<div className='first__photos'> 
     
                         {photos.map( (e) => {
                             return <img src={URL.createObjectURL(e)}
                             style={photos.length === 1 ? {
                                 width : 'calc(100% - 3.67px)'
                             }
                         : 
                         {}
                            }
                              className='first__photo' alt="" />
                             // return <img className='first__photo' src = {'https://back-birga.ywa.su/' + e} />
                         } )}
                         
     
                      </div>) : ''  }
                     <div className="FirstMain__top">
                         <Pallete  />
                         <p>{taskName}</p>
                         <ShareIcon className='share__icon' />
                     </div>
                     <div className="FirstMain__middle">
                         {/* <p>{executionPlace}</p> */}
                         <p> {"Начать: " + time.start.toLocaleString("ru", options)}</p>
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
        :
        <div></div> }


        </>

    );
};

export default FirstBlock;