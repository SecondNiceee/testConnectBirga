import axios from "axios";
import translation from "../translate";
import en from "../../constants/language";
const messageOne = translation("📣 Вы получили отклик на задачу «");
const messageTwo = translation("» от ");
export const createResponse = async ({responseFormData, responseAdvertisement, responseUser}) => {
  console.log(responseFormData);
    try {
      let im;
      for (let i = 0; i < 1; i++) {
        im = await axios.post(
          process.env.REACT_APP_HOST + "/response",
          responseFormData,
          {
            params: {
              advertisementId: responseAdvertisement.id,
              userId: responseUser.id,
            },
            headers: {
              "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            },
          }
        );
      }
      try {
        await axios.get(process.env.REACT_APP_HOST + "/user/sendMessage", {
          params: {
            chatId: responseAdvertisement.user.chatId,
            text:
              messageOne +
              responseAdvertisement.taskName.bold() +
              messageTwo +
              responseUser.fl,
            buttonUrl:
              "https://connectbirga.ru/ResponsePage?advertisement=" +
              String(responseAdvertisement.id) +
              "&response=" +
              String(im.data.id),
            languageCode: en ? "en" : "ru",
          },
          headers: {
            "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
          },
        });
      } catch (e) {
        console.warn(e);
      }
      return im.data;
    } catch (e) {
      console.log(e);
      window.Telegram.WebApp.showAlert(e);
    }

}