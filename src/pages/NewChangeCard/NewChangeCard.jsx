import React, { useCallback, useEffect, useState } from 'react';
import DescriptionAndPhoto from '../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto';
import AddLinksComponent from '../../components/UI/AddLinksComponent/AddLinksComponent';
import useCardsController from './hooks/useCardsController';
import { useDispatch } from 'react-redux';
import MainButton from '../../constants/MainButton';
import { mainButtonController } from './controllers/MainButtonController';
import { backButtonController } from './controllers/BackButtonController';
import BackButton from '../../constants/BackButton';
import { makeCardFormData } from './utils/makeCardFormData';
import { USERID } from '../../constants/tgStatic.config';
import { postCard, putCard } from '../../store/telegramUserInfo';



// id : e.id,
// title : e.title,
// description : e.description,
// // behanceLink : e.behance,
// // dribbbleLink : e.dribble,
// // dropfileLink : e.dropFile,
// photosNames : e.photos,
// photos : files,
// createdAt : e.createdAt,
// views : e.views,
// links : e.links
const NewChangeCard = ({card, setChangingCardOpened, isChangingCardOpened}) => {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState({
        title : false,
        description : false,
        photos : false,
        links : {
            isError : false,
            id : 0
        }
    })
    
    const [changedCard, setChangedCard] = useState(card ?? {
        id : null,
        title : "",
        description : "",
        photos : [],
        photosNames : [],
        links : []
    });
    
    const save = useCallback( async ( ) => {
        if (!card){
            const myFormData = makeCardFormData({card : changedCard, isCardNew : true} )
            await dispatch(postCard([myFormData, USERID, changedCard]));
        }
        else{
            const myFormData = makeCardFormData({card : changedCard, isCardNew : false} )
            await dispatch(putCard([myFormData, changedCard.id, changedCard]));
        }
        setChangingCardOpened(false);
    } , [card, changedCard, setChangingCardOpened, dispatch] )

    const backFunction = useCallback( () => {
        backButtonController.backFunction({card, changedCard, errors, save,setChangingCardOpened});
    } , [card, changedCard, errors, save, setChangingCardOpened  ] )

    useEffect( () => {
        BackButton.onClick(backFunction)
        return () => {
            BackButton.offClick(backFunction);
        }
    } , [backFunction] )


    useEffect( () => {
        const localErrors = {
            title : false,
            description : false,
            photos : false,
            links : {
                isError : false,
                ids : [0]
            }
        }
        if (changedCard.description.length < 3 || changedCard.description.length > 500 ){
            localErrors.description = true
        }
        if (changedCard.title.length < 3 || changedCard.title.length > 25){
            localErrors.title = true
        }
        if (!changedCard.photos.length){
            localErrors.photos = true
        }
        if ( changedCard.links?.filter((link) => link.length).length  ){
            const errorsIds = [];
            changedCard.links.forEach( (link, id) => {
                if (!link.includes('http')){
                    errorsIds.push(id);
                }
            } )
            if (errorsIds.length){
                localErrors.links = { isError : true, ids:errorsIds }
            }
        }
        setErrors(localErrors);

    } , [changedCard, setErrors] )

    const {changeCardDescription, changeCardTitle, changePhotos} = useCardsController({setChangedCard})

    const forwardFunction = useCallback( async () => {
        mainButtonController.forwardFunction({changedCard, errors, save});
    } , [changedCard, errors, save] )

    useEffect( () => {
        MainButton.onClick(forwardFunction);
        return () => {
            MainButton.offClick(forwardFunction)
        }
    } , [forwardFunction] )

    useEffect( () => {
        mainButtonController.visabilityController({card, changedCard, errors, isChangingCardOpened});
    } , [errors, card, changedCard, isChangingCardOpened] )  // Чекаем на ерорсы

    const setLinks = useCallback((updater) => {
        setChangedCard((prev) => ({
          ...prev,
          links: typeof updater === 'function' ? updater(prev.links) : updater,
        }));
      }, [setChangedCard]);

    const leftSymbols = 25 - changedCard.title.length < 0 ? 0 : 25 - changedCard.title.length;
    return (
        <div className="pt-[20px] left-right !z-[1000] fixed left-0 top-0 w-screen h-screen overflow-y-auto px-[16px] bg-[#18222d] flex flex-col pb-[100px]">
            {/* <button onClick={forwardFunction}>ГО</button> */}
            <h2 className='ml-4 text-[20.72px] font-semibold font-sf-pro-display-600 text-white'>{!card ? "Создание кейса" : "Изменение кейса"}</h2>
            <div className='py-3 mt-[18px] px-4 flex bg-card rounded-t-[11.7px] items-center border-b-[1px] border-[0px] border-solid border-[#2A343F]'>
                <input value={changedCard.title} onChange={changeCardTitle} className='font-normal w-full text-[16.67px] font-sf-pro-display-400 text-white leading-[18.3px] placeholder:text-[#90979F]' placeholder='Название' type="text" />
                <p className={`ml-auto text-[13px] text-[#95979e] font-sf-pro-display-400 font-normal leading-[14.34px] ${leftSymbols === 0 ? "text-red-500" : "text-[#DAF5FE]"}`}>{leftSymbols}</p>
            </div>
            <DescriptionAndPhoto textAreaClassName={"!min-h-[73px]"} descriptionClassName={"!rounded-t-none !min-h-[100px]"} setText={changeCardDescription} text={changedCard.description} textPlaceholder={"Описание"} isFileInput = {false} />
            <p className='ml-4 mt-[5px] font-sf-pro-display-400 text-[13.33px] font-normal leading-[15.643px] text-[#DAF5FE]'>Название и описание для кейса.</p>
            <DescriptionAndPhoto  className={"!mt-[10px]"} photos={changedCard.photos} setPhotos={changePhotos} isDescription = {false} />
            <AddLinksComponent links={changedCard.links} setLinks={setLinks}  />
        </div>
    );
};

export default NewChangeCard;