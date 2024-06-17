import React, { useEffect, useState } from 'react';
import TaskName from '../../components/UI/TaskName/TaskName';
import DescriptionAndPhoto from '../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto';
import behanceIcon from '../../images/icons/behance.svg';
import dripleIcon from '../../images/icons/Dribble.svg';
import dropfileIcon from '../../images/icons/Dropfile.svg';
import BackButton from '../../constants/BackButton';
import MainButton from '../../constants/MainButton';
import { useDispatch } from 'react-redux';
import { addCard } from '../../store/profile';

const Cards = ({setCardsOpen, setAboutU , aboutU}) => {
    const [cardsSetting , setCardsSetting] = useState({
        title : '',
        description : '',
        photos : [],
        behanceLink : '',
        dribbbleLink : '',
        dropfileLink : ''
    })
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({
        nameError : false
    })
    useEffect(  () => {
        function backFunc(){
            window.Telegram.WebApp
            .showPopup({
              title: "Сохранить?",
              message: "Сохранить изменения перед выходом?",
              buttons: [
                { id: "save", type: "default", text: "Да" },
                { id: "delete", type: "destructive", text: "Нет" },
              ],
            } , (buttonId) => {
    
              if (buttonId === "delete" || buttonId === null) {
              }
              if (buttonId === "save") {
                setAboutU({...aboutU, cards : [...aboutU.cards , cardsSetting] })
                dispatch(addCard(cardsSetting))
              }
    
    
            } )



            setCardsOpen(false)
        }
        function saveFunc(){
            setAboutU({...aboutU, cards : [...aboutU.cards , cardsSetting] })
            dispatch(addCard(cardsSetting))
        }
        MainButton.show()
        MainButton.setText('Сохранить')
        MainButton.onClick(saveFunc)
        BackButton.show()
        BackButton.onClick(backFunc)
        return () => {
            MainButton.hide()
            BackButton.offClick(backFunc)
        }
    } , [] )
    return (
        <div className='cards'>


            <h3 className='cards-title'>Новый кейс</h3>


            <TaskName 
            placeholder={'Придумайте название для нового кейса'}
            className={'cards-taskName'}
            title={'НАЗВАНИЕ КЕЙСА'}
            text={cardsSetting.name}
            description = {cardsSetting.description}
            setText={(e) => {
                setCardsSetting({...cardsSetting , name : e.target.value})
            }}
            errorValue={errors.nameError}
            underText={''}
             />

             


            <DescriptionAndPhoto
                className={'cards-descriptionAndPhoto'}
                text={cardsSetting.description}
                textPlaceholder={'Опишите в чем особенность ваших работ'}
                setText={(e) => {
                    setCardsSetting({...cardsSetting , description : e})
                }}
                setPhotos={(e) => {
                    setCardsSetting({...cardsSetting, photos : e})
                }}
                photos={cardsSetting.photos}
                MyInformation={false}
                textTitle={'ОПИСАНИЕ КЕЙСА'}
                filesTitle={''}            
            />
            <p className='cards-underText'>Расскажите о себе и своем опыте работы
Прикрепите релевантные примеры</p>

            <div className="cards-links">
                <div className="behans-link cards-link">
                    <img src={behanceIcon} alt="" />
                    <p>Ссылка на Behance</p>
                </div>
                <div className="behans-link cards-link">
                    <img src={dripleIcon} alt="" />
                    <p>Ссылка на Dribbble</p>
                </div>
                <div className="behans-link cards-link">
                    <img src={dropfileIcon} alt="" />
                    <p>Ссылка на Dropfile</p>
                </div>
            </div>
        </div>
    );
};

export default Cards;