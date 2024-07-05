import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuActive } from '../../store/menuSlice';
import {Link} from 'react-router-dom'
import UpArr from '../../components/UI/UpArr/UpArr'
import Close from '../../components/UI/Close';
import Human from '../../components/UI/Human/Human'
import SmallDimond from '../../components/UI/SmallDimond/SmallDimond';


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
                {/* <UpArr className= 'upArr' />  */}
                <p className='MenuTextPrice'>Скоро</p>
                 <SmallDimond className= 'dymond' /> 
            </Link>

            <div className='MenuList'>
                <Link className='menuLink'  onClick={() => {setMenuActive(false)}}  to="/AdCreating" >Создать задание</Link>
                <Link onClick={ () => {setMenuActive(false)}} className='menuLink' to = '/'>Найти задания</Link>
                <Link onClick={ () => {setMenuActive(false)}} className='menuLink'  to='/savedPage'>Избранное</Link>
                <Link onClick={ () => {setMenuActive(false)}} className='menuLink'  to='/MyAds'>Мои задания</Link>
                <p className='menuLink'  >Уведомления</p>
                <p className='menuLink' onClick={() => {
                    window.Telegram.WebApp.openTelegramLink("https://t.me/connect_work_news")
                }} style={{
                    color : "#2ea5ff"
                }}  >Новости Коннект</p>
                {/* <p className='menuLink'   style={{color : 'rgb(42, 207, 88)'}}> Стать исполнителем </p> */}
            </div>

            <div className="Menu__Helps">
                <p className = 'menuHelp' onClick={() => {
                    window.Telegram.WebApp.openTelegramLink("https://t.me/connect_man")
                }}  >Поддержка </p>
                <Human className='human' />
            </div>

        </div>
    );
};

export default FirstMenu;

