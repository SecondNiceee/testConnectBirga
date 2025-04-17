import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetFullUserName = () => {
    const userInfo = useSelector((state) => state.telegramUserInfo);

    const userName = useMemo( () => {
      const fullName = userInfo.firstName + ' ' + userInfo.lastName;
      return fullName.length > 22
      ? fullName.slice(0, 22) + ".."
      : fullName.trim();
    }, [userInfo.firstName, userInfo.lastName] )
  
    
    return userName;
};

export default useGetFullUserName;