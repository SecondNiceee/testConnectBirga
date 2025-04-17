import React from 'react';
import useGetUserPhotoLink from '../../hooks/useGetUserPhotoLink';

const NewProfile = () => {
    const userLinkPhoto = useGetUserPhotoLink();
    return (
        <div className='pt-[20px] px-[20px] bg-[#18222d]'>
            <div className='py-[17px] px-[19px] bg-[#20303f] rounded-[13px] justify-between w-[100%]'>
                <img
                style={{ objectFit: "cover" }}
                src={userLinkPhoto}
                className="w-[94px] h-[94px] rounded-full "
                alt=""
                />
            </div>
            <div className='flex flex-col gap-[3px] my-auto'>
                <h2 className='font-sf-pro-display-600 text-[17px] text-white tracking-[18px]'>#4</h2>
                <p className='font-sf-pro-display max-w-[70px] text-[13px] text-white tracking-[18px]'>в рейтинге по нише</p>
            </div>
            <div className='flex flex-col gap-[3px] my-auto'>
                <h2 className='font-sf-pro-display-600 text-[17px] text-white tracking-[18px]'>#4</h2>
                <p className='font-sf-pro-display max-w-[70px] text-[13px] text-white tracking-[18px]'>в общем рейтинге</p>
            </div>
        </div>
    );
};

export default NewProfile;