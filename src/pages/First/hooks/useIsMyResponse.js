import { useMemo } from "react";
import { USERID } from "../../../constants/tgStatic.config";

const useIsMyResponse = ({detailsAdertisement}) => {
      const gotIt = useMemo( () => {
        if (detailsAdertisement){
          if (detailsAdertisement.responces){
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
      },[detailsAdertisement ] )
      return gotIt
};

export default useIsMyResponse;