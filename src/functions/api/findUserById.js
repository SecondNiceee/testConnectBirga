import { createUserByBot } from "./createUserByBot";
import { getCardByUserId } from "./getCardsByUserId";
import { formatUserFromApi } from "./formatUserFromApi";
import { getUserWithoutCards } from "./getUserWithoutCards";

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
        return formatUserFromApi(user.data, userCards);
    }
    catch (e){
        console.log(e)
    }
}