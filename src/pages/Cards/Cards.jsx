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
    console.log(cardsSetting)
    console.log('-------------')
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({
        nameError : false
    })
    useEffect( () => {
            if (errors.nameError){
                if (cardsSetting.title.length > 3){
                    setErrors({nameError : false})
                }
            }
    }, [cardsSetting.title]  )
    function saveFunc(){
            if (cardsSetting.title.length < 3){
                setErrors({nameError : true})
            }
            else{
                setAboutU({...aboutU, cards : [...aboutU.cards , cardsSetting] })
                dispatch(addCard(cardsSetting))
                document.documentElement.style.overflow = 'auto'
                setCardsOpen(false)
            }
    }
    useEffect(  () => {
        function backFunc(){
            window.Telegram.WebApp
            .showPopup({
              title: "Создать?",
              message: "Вы хотите создать этот кейс?",
              buttons: [
                { id: "save", type: "default", text: "Да" },
                { id: "delete", type: "destructive", text: "Нет" },
              ],
            } , (buttonId) => {
    
              if (buttonId === "delete" || buttonId === null) {
                setCardsOpen(false)
              }
              if (buttonId === "save") {
                if (cardsSetting.title.length < 3){
                    setErrors({nameError : true})
                }
                else{
                    setAboutU({...aboutU, cards : [...aboutU.cards , cardsSetting] })
                    dispatch(addCard(cardsSetting))
                    document.documentElement.style.overflow = 'auto'
                    setCardsOpen(false)
                }
              }
    
    
            } )



        }
        MainButton.show()
        MainButton.setText('Добавить кейс')
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

            <button onClick={() => {
                                setAboutU({...aboutU, cards : [...aboutU.cards , cardsSetting] })
                                dispatch(addCard(cardsSetting))
                                setCardsOpen(false)

            }}>Сохранить</button>
            <TaskName 
            placeholder={'Придумайте название для нового кейса'}
            className={'cards-taskName'}
            title={'НАЗВАНИЕ КЕЙСА'}
            text={cardsSetting.title}
            description = {cardsSetting.description}
            setText={(e) => {
                setCardsSetting({...cardsSetting , title : e})
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
            <button 
            onClick={saveFunc}>Сохранить</button>
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