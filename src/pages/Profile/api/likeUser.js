export const likeUser = async (userId, likedUserId) => {
    try{

        const response = await axios.post(`${process.env.REACT_APP_HOST}/user/like`, {} ,{
            params : {
              userId : userInfo.id,
              likedUserId : userConfig.id
            },
            headers : {
              "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            }
          })
        console.log(response);
    }
    catch(e){
        console.warn(e)
        return e;
    }
}