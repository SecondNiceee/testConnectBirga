import {configureStore} from '@reduxjs/toolkit'
import information from './information';
import ton from './ton';
import menuSlice from './menuSlice'
import telegramUserInfo from './telegramUserInfo';
import categorys from './categorys';
import profile from './profile';
export default configureStore( {
    reducer : {
        information : information,
        ton : ton,
        menu : menuSlice,
        telegramUserInfo : telegramUserInfo,
        categorys : categorys,
        profile : profile
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),

});

