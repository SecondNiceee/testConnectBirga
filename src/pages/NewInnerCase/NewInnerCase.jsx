import React from 'react';
import CasePhotos from './CasePhotos';
import ShareIcon from '../../components/UI/ShareIcon/ShareIcon';
import FalseTie from '../../components/UI/FalseTie/FalseTie';
import useGetUserPhotoLink from '../../hooks/useGetUserPhotoLink';
import { getFormatedUserFullName } from '../../functions/getFormatedUserFullname';
import Links from '../Baidge/components/Links';
import formateDateForTimeAgo from '../../functions/formateDateForTimeAgo';
import TextAboutMe from '../../components/UI/AboutMeText/TextAboutMe';

const NewInnerCase = ({casePar, userInfo}) => {

    const clickFunc = () => {
        console.log('Делюсь кейсом')
    }
    const iconUrl = useGetUserPhotoLink({anotherUserInfo : userInfo});
    return (
        <div className="pt-[20px] left-right fixed left-0 top-0 w-screen z-20 h-screen overflow-y-auto px-[16px] bg-[#18222d] flex flex-col pb-[100px]">
            
            <div className='rounded-[10px] bg-[#20303f] flex flex-col duration-200 relative z-50'>
                <CasePhotos photos={casePar.photos}  />

                <div className="my-4 ml-[17px] mr-[19px] flex justify-between items-center"> 
                    <div className="flex flex-col gap-[2px]">
                    <p className="font-sf-pro-display font-medium text-[17px] leading-[18.33px] text-white">{casePar.title}</p>
                    <p className="font-sf-pro-display-400 font-normal text-[14.67px] leading-[17.7px] text-[#B5CED9]">
                        {formateDateForTimeAgo(casePar.createdAt)} · {casePar.views} просмотров
                    </p>
                    </div>
                    <div className='flex gap-[6px] items-center'>
                        <ShareIcon onClick = {clickFunc} />
                        <FalseTie navigate={"card"} task={casePar} id={casePar.id}   />
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
                        <TextAboutMe buttonClassNames={"bg-[#1A2F42]"} textareaClassName={"!bg-card"} aboutU={casePar.description} />
                </div>
                
                <div className="flex mt-4 flex-col gap-[7px] w-[100%] text-[#84898f]">
                    <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">ССЫЛКИ</p>
                    <Links links={casePar.links}/>
                </div>

        </div>
    );
};

export default NewInnerCase;