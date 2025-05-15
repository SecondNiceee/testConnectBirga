import axios from "axios";

export const getAdvertisementsByUserId = async (userId, page, limit = 1) => {
    try{
        const advertisementsResponse = await axios.get(
            `${process.env.REACT_APP_HOST}/advertisement/findByUser`,
            {
              params: { 
                page: page,
                userId: userId,
                limit: limit,
              },
              headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              },
            }
          );
          const advertisements = advertisementsResponse.data;
          return advertisements
    }
    catch(e){
        console.warn(e);
        return null;
    }

}