import { useCallback } from "react";
import { createResponse } from "../../../functions/api/createResponse";
import menuController from "../../../functions/menuController";
import { useSelector } from "react-redux";
import { createResponseFormData } from "../../../functions/createResponseFormData";

const usePostResponse = ({
  responce,
  detailsAdertisement,
}) => {
  const me = useSelector((state) => state.telegramUserInfo);
  const postResponse = useCallback(async () => {
    const myFormData = createResponseFormData(responce, detailsAdertisement.id);
    console.log(responce)
    try {
      await createResponse({
        responseAdvertisement: detailsAdertisement,
        responseFormData: myFormData,
        responseUser: {
          id: me.id,
          fl: me.firstName,
          link: me.link,
          photo: me.photo ? me.photo : "",
          about: me.profile.about,
          stage: me.profile.stage,
        },
      });
    } catch (e) {
      console.warn(e);
    }
    menuController.showMenu();
  }, [detailsAdertisement, me, responce]);
  return postResponse;
};
export default usePostResponse;
