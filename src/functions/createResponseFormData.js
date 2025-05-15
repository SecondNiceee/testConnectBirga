import { USERID } from "../constants/tgStatic.config";

export const createResponseFormData = (response, advertisementId) => {
    let myFormData = new FormData();
    console.log(response.text)
    myFormData.append("information", "вasdasda");
    myFormData.append("userId", String(USERID));
    myFormData.append("advertismentId", String(advertisementId));
    response.photos.forEach((e, i) => {
      myFormData.append(`photos`, e);
    });
    return FormData;
}