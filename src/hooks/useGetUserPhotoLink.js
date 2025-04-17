import { useSelector } from 'react-redux';
import userPhoto from "../images/userPhoto/user.png";

const useGetUserPhotoLink = () => {
    const userInfo = useSelector((state) => state.telegramUserInfo);
    return userInfo.photo.length > 0 ? userInfo.photo.split('https://').length === 2 ? userInfo.photo : `${process.env.REACT_APP_HOST}/${userInfo.id}/${userInfo.photo}` : userPhoto
};

export default useGetUserPhotoLink;