import axios from "axios";


export const shareFunction = (id) => async () => {
    const repsonse = await axios.post(`${process.env.REACT_APP_HOST}/bot/getMailingMessage` , {
      "advertisementId" : id,
      "userId" : Number(window.Telegram.WebApp.initDataUnsafe.user.id)
    }, {
        headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
    })
    const messageId = repsonse.data
    window.Telegram.WebApp.shareMessage({
        prepared_message_id: messageId // подставьте полученный prepared_message_id
      });
  }