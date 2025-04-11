import axios from "axios";
import { USERID } from "../constants/tgStatic.config";


export const shareFunction = (id) => async () => {


    const repsonse = await axios.post(`${process.env.REACT_APP_HOST}/bot/getMailingMessage` , {
      "advertisementId" : id,
      "userId" : USERID
    }, {
        headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
    })
    console.log(repsonse)
    const messageId = repsonse.data
    console.log(messageId)

    window.Telegram.WebApp.shareMessage(messageId).then((result) => {
        console.log("Сообщение успешно отправлено:", result);
      }).catch((error) => {
        console.error("Ошибка при отправке сообщения:", error);
      });

}