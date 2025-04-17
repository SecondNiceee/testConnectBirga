import { useSelector } from 'react-redux';

const useGetUserPhotoLink = () => {
    const userInfo = useSelector((state) => state.telegramUserInfo);

    return userInfo.photo.length > 0 ? userInfo.photo.split('https://').length === 2 ? userInfo.photo : `${process.env.REACT_APP_HOST}/${userInfo.id}/${userInfo.photo}` : userPhoto
};

export default useGetUserPhotoLink;