import { createUserByBot } from "./createUserByBot";
import { getCardByUserId } from "./getCardsByUserId";
import { formatUserFromApi } from "./formatUserFromApi";
import { getUserWithoutCards } from "./getUserWithoutCards";
import { getRatingByProfession } from "./getRatingByProfession";
import { getCommpnRating } from "./getCommonRating";

export const findUserById = async (id) => {
    
    try {
        let user;
        try{
             user = await getUserWithoutCards(id);
        }
        catch(e){
            await createUserByBot(id);
            user = await getUserWithoutCards(id); 
        }
        const userCards = await getCardByUserId(id);
        if (user.profession){
            return {...user, profile : {...user.profile, cards : userCards} };
        }
        return {...user, profile : {...user.profile, cards : userCards} };
    }
    catch (e){
        console.log(e)
    }
}