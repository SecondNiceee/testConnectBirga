import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuActive } from '../../store/menuSlice';
import {Link} from 'react-router-dom'

import Close from '../../components/UI/Close';
import SmallDimond from '../../components/UI/SmallDimond/SmallDimond';
import UpArr from '../../components/UI/UpArr/UpArr';
import Human from '../../components/UI/Human/Human'


const FirstMenu = () => {

    const dispatch = useDispatch()

    const isMenuActive = useSelector(state => state.menu.value)

    const setMenuActive = (set) => {
        dispatch(changeMenuActive(set))
    }
    const userInfo = useSelector(state => state.telegramUserInfo)

    return (
        <div className= {  isMenuActive ? 'FirstMenu'  :  'FirstMenu hidden'  }>

            <Close isMenuActive = {isMenuActive} setMenuActive = {setMenuActive}  />

            <Link onClick={() => {setMenuActive(false)}} to='/Profile' className="FirstMenu__top">
                <div>
                    <img className='icon' src= {userInfo.photo} alt="" />
                </div>
                <div className="FirstMenu__top-right">
                    <p className='MenuName'>{userInfo.firstName}</p>
                    <div onClick={() => {setMenuActive(false)}} className='MenuProfile'>
                        <p className='MenuProfileLink'>Профиль</p>

                    </div>
                </div>
            </Link>

            <Link to = "/Balance" onClick={() => {setMenuActive(false)}} className="MenuPrice">
                <UpArr className= 'upArr' /> 
                <p className='MenuTextPrice'>1 TON</p>
                 <SmallDimond className= 'dymond' /> 
                <p className='MenuTextRublePrice'>~   250 RUB</p>
            </Link>

            <div className='MenuList'>
                <Link className='menuLink'  onClick={() => {setMenuActive(false)}}  to="/AdCreating" >Создать задание</Link>
                <Link onClick={ () => {setMenuActive(false)}} className='menuLink' to = '/'>Найти задания</Link>
                <Link onClick={ () => {setMenuActive(false)}} className='menuLink'  to='/MyAds'>Мои задания</Link>
                <p className='menuLink'  >Уведомления</p>
                <p className='menuLink'  >Новости Коннект.биржи</p>
                <p className='menuLink'   style={{color : 'rgb(42, 207, 88)'}}> Стать исполнителем </p>
            </div>

            <div className="Menu__Helps">
                <p className = 'menuHelp'  >Поддержка </p>
                <Human className='human' />
            </div>

        </div>
    );
};

export default FirstMenu;

