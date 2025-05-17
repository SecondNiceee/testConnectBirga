import { useCallback, useEffect, useState } from 'react';
import CasePhotos from './CasePhotos';
import ShareIcon from '../../components/UI/ShareIcon/ShareIcon';
import FalseTie from '../../components/UI/FalseTie/FalseTie';
import useGetUserPhotoLink from '../../hooks/useGetUserPhotoLink';
import { getFormatedUserFullName } from '../../functions/getFormatedUserFullname';
import Links from '../Baidge/components/Links';
import formateDateForTimeAgo from '../../functions/formateDateForTimeAgo';
import TextAboutMe from '../../components/UI/AboutMeText/TextAboutMe';
import MyLoader from '../../components/UI/MyLoader/MyLoader';
import { useNavigate, useParams } from 'react-router';
import { findUserById } from '../../functions/api/findUserById';
import { getCardById } from '../../functions/api/getCardById';
import { useDispatch, useSelector } from 'react-redux';
import menuController from '../../functions/menuController';
import MainButton from '../../constants/MainButton';
import { setCard, setUser } from '../../store/information';
import useNavigateBack from '../../hooks/useNavigateBack';
import useSlider from '../../hooks/useSlider';
import CssTransitionSlider from '../../components/UI/PhotosSlider/CssTransitionSlider';
import { secondaryButtonController } from '../Baidge/controllers/SecondaryButtonController';
import { SecondatyButton } from '../../constants/SecondaryButton';

const NewInnerCase = () => {
    const clickFunc = () => {
        console.log('Делюсь кейсом')
        
    }
    const {userId, cardId} = useParams();
    
    const [userInfo, setUserInfo] = useState(null);

    const iconUrl = useGetUserPhotoLink({anotherUserInfo : userInfo});

    const [casePar, setCasePar] = useState(null);

    const user = useSelector( state => state.information.baidgeUser );
    const card = useSelector( state => state.information.baidgeCard );

    const navigate = useNavigate();

    const me = useSelector( (state) => state.telegramUserInfo );

    const {isSliderOpened, photoIndex, photos, setPhotoIndex, setPhotos, setSlideOpened} = useSlider();

    useNavigateBack({isSliderOpened, setSlideOpened})

    useEffect( () => {
        menuController.hideMenu();
    }, [] )

    const dispatch = useDispatch();

    useEffect( () => {
        if (userId || cardId){
            findUserById(userId).then( (user) => {
                dispatch(setUser(user))
                setUserInfo(user);
            } )
            getCardById(cardId).then( (card) => {
                dispatch(setCard(card));
                setCasePar(card)
            } )
        }
        else{
            setCasePar(card);
            setUserInfo(user)
        }
    }, [cardId, userId, card, user, navigate, casePar, dispatch])



    const onClickPhotos = (i) => {
        setPhotoIndex(i)
        setPhotos(casePar?.photos);
        setSlideOpened(true);
    }

    const changeCard = useCallback(() => {
        if (!isSliderOpened){
            navigate('/changeCard');
        }
        else{
            setSlideOpened(false);
        }
    }, [navigate, isSliderOpened, setSlideOpened])

    const backFunction = useCallback( () => {
        if (!isSliderOpened){ 
            navigate('/cardsPage')
        }
        else{
            setSlideOpened(false);
        }
    }, [navigate, isSliderOpened, setSlideOpened] )

    useEffect( () => {
        if (isSliderOpened){
            MainButton.setText("Закрыть")
        }
        else{
            if (userInfo?.id === me?.id){
                MainButton.setText("Изменить")
                SecondatyButton.show()
                SecondatyButton.setText("Удалить")
                SecondatyButton.setParams({
                    position : "left",
                    color : "#462424",
                    text_color : "#FF4646"
                })
            }
            else{
                MainButton.setText("Назад")
                SecondatyButton.hide();
            }
        }

    }, [isSliderOpened, userInfo, me] )

    useEffect( () => {
        if (userInfo?.id === me?.id){
            MainButton.onClick(changeCard);
        }
        else{
            MainButton.onClick(backFunction)
        }
    }, [backFunction, changeCard, me, userInfo] )



    const secondaryButtonHandler = useCallback( () => {
        secondaryButtonController.secondaryButtonHandler({card, dispatch, me, navigate});
    }, [card, dispatch, me, navigate] )

    useEffect( () => {
        SecondatyButton.onClick(secondaryButtonHandler);
        return () => {
            SecondatyButton.offClick(secondaryButtonHandler);
        }
    } , [secondaryButtonHandler])

    useEffect( () => {
        secondaryButtonController.controllVisabiliry({isSliderOpened});
        return () => {
            SecondatyButton.hide();
        }
    }, [isSliderOpened] )


    if (!casePar || !userInfo){
        return <MyLoader />
    }
    return (

        <>

        <div className="pt-[20px] left-right z-20 px-[16px] bg-[#18222d] flex flex-col pb-[16px]">
            
            <div className='rounded-[10px] bg-[#20303f] flex flex-col duration-200 relative z-50'>
                <CasePhotos  onClickPhotos={onClickPhotos}  photos={casePar.photos}  />
                <div className="my-4 ml-[17px] mr-[19px] flex justify-between items-center"> 
                    <div className="flex flex-col gap-[2px]">
                    <p className="font-sf-pro-display font-medium text-[17px] leading-[18.33px] text-white">{casePar.title}</p>
                    <p className="font-sf-pro-display-400 font-normal text-[14.67px] leading-[17.7px] text-[#B5CED9]">
                        {formateDateForTimeAgo(casePar.createdAt)} · {casePar.views} просмотров
                    </p>
                    </div>
                    <div className='flex gap-[10px] items-center'>     
                        <FalseTie navigate={"card"} task={casePar} id={String(casePar.id)}   />
                        <ShareIcon onClick = {clickFunc} />
                    </div>
                </div>

            </div>

            <div onClick={() => {}} className='flex cursor-pointer rounded-[13.33px] bg-card py-[12px] pr-4 pl-[19px] items-center mt-2'>
                    <img className='w-[40px] h-[40px] rounded-full' src={iconUrl} alt="" />
                    <div className='flex flex-col gap-[2.33px] ml-[10px]'>
                        <h2 className='font-medium font-sf-pro-display text-[17px] leading-[18px] text-white'>{getFormatedUserFullName(userInfo.firstName, userInfo.lastName)}</h2>
                        <p className='font-normal font-sf-pro-display-400 text-[#B5CED9] text-[14.67px] leading-[17.7px]'>
                            {userInfo.profession.profession}
                        </p>
                    </div>
                    <img className='w-[7px] h-[12px] ml-auto' src="/images/newProfile/leftArrow.svg" alt="leftArrow" />
            </div>

                <div className="flex rounded-[13.33px] mt-4 flex-col gap-[7px] w-[100%] text-[#84898f]">
                        <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">ОПИСАНИЕ</p>
                        <TextAboutMe buttonClassNames={"!bg-[#1A2F42]"} textareaClassName={"!bg-card !border-card"} aboutU={casePar.description} />
                </div>
                {casePar.links ?                 <div className="flex mt-4 flex-col gap-[7px] w-[100%] text-[#84898f]">
                    <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">ССЫЛКИ</p>
                    <Links isFirstMyLink={false} links={casePar.links}/>
                </div> : <></>}

        </div>
        <CssTransitionSlider
        blockerAll={true}
        blockerId={""}
        isSliderOpened={isSliderOpened}
        leftPosition={0}
        renderMap={photos}
        setSliderOpened={setSlideOpened}
        sliderIndex={photoIndex}
        swiperId={"1"}
        top={0}
        />
    </>
    );
};

export default NewInnerCase;