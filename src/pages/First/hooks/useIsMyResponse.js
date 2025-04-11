import { useMemo } from "react";
import { USERID } from "../../../constants/tgStatic.config";

const useIsMyResponse = ({detailsAdertisement, isDetailsActive}) => {
      const gotIt = useMemo( () => {
        if (detailsAdertisement){
          if (detailsAdertisement.responces){
            console.log(detailsAdertisement)
            if (detailsAdertisement.responces.find((e) =>
              String(e.user.id) === USERID) || String(detailsAdertisement.user.id) === USERID)
            {
              return true
            }
            else{
              return false
            }
          }
        }
        return false
        // eslint-disable-next-line
      },[detailsAdertisement,isDetailsActive.isOpen ] )

      return gotIt
};

export default useIsMyResponse;