import React, { useEffect, useState } from 'react';
import TaskName from '../../components/UI/TaskName/TaskName';
import DescriptionAndPhoto from '../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto';
import behanceIcon from '../../images/icons/behance.svg';
import dripleIcon from '../../images/icons/Dribble.svg';
import dropfileIcon from '../../images/icons/Dropfile.svg';
import BackButton from '../../constants/BackButton';
import MainButton from '../../constants/MainButton';
import { useDispatch } from 'react-redux';
import { addCard, changeCards } from '../../store/profile';

const ChangeCards = ({setCardsOpen, setAboutU , index, card, aboutU}) => {
    const [cardsSetting , setCardsSetting] = useState({
        title : card.title,
        description : card.description,
        photos : card.photos,
        behanceLink : card.behanceLink,
        dribbbleLink : card.dribbbleLink,
        dropfileLink : card.dropfileLink
    })
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({
        nameError : false,
        fileError : false
    })


    useEffect( () => {
        if (!Object.values(errors).every(value => value === false)){
            let photos = false
            let title = false
            if (cardsSetting.title.length < 3){
                title = true
            }
            if (cardsSetting.photos.length < 1){
                photos = true
            }
            let localErrors = {nameError : title , fileError : photos}
            if (JSON.stringify({localErrors}) !== JSON.stringify(errors)  ){
                setErrors(localErrors)
            }
        }
}, [cardsSetting.title, cardsSetting.photos]  )



    function checkMistakes(){
        let fileError = false
        let titleError = false
        if (cardsSetting.title.length < 3){
            titleError = true
        }
        if (cardsSetting.photos.length < 1){
            fileError = true
        }
        setErrors({fileError : fileError , nameError : titleError})
        let localErrors = {fileError : fileError , nameError : titleError}
        return Object.values(localErrors).every(value => value === false)
    }


    function saveFunc(){
        if (checkMistakes()){
            setAboutU({...aboutU, cards : [...aboutU.cards.map((e, i) => {
                if (i === index){
                    return cardsSetting
                }
                else{
                    return e
                }
            })] })
            dispatch(changeCards({id : index , card : cardsSetting}))
            document.documentElement.style.overflow = 'auto'
            setCardsOpen(false)
        }
        
        
}



    useEffect(  () => {
        function backFunc(){
            window.Telegram.WebApp
            .showPopup({
              title: "Сохранить?",
              message: "Сохранить изменения кейса перед выходом?",
              buttons: [
                { id: "save", type: "default", text: "Да" },
                { id: "delete", type: "destructive", text: "Нет" },
              ],
            } , (buttonId) => {
    
              if (buttonId === "delete" || buttonId === null) {
                setCardsOpen(false)
              }
              if (buttonId === "save") {
                if (checkMistakes()){
                    setAboutU({...aboutU, cards : [...aboutU.cards.map((e, i) => {
                        if (i === index){
                            return cardsSetting
                        }
                        else{
                            return e
                        }
                    })] })
                    dispatch(changeCards({id : index , card : cardsSetting}))

                    document.documentElement.style.overflow = 'auto'
                    setCardsOpen(false)
                }
                
              }
    
    
            } )



        }

        MainButton.show()
        MainButton.setText('Изменить кейс')
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


            <h3 className='cards-title'>{cardsSetting.title}</h3>

            <button onClick={() => {
                saveFunc()

            }}>Сохранить</button>
            <TaskName 
            placeholder={'Придумайте название для  кейса'}
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
                fileError={errors.fileError}     
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

export default ChangeCards;