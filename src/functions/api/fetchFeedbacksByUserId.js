import axios from "axios"

export const fetchFeedBacksByUserId = async (userId) => {
    const feedbacks = await axios.get(`${process.env.REACT_APP_HOST}/findByReviewedUser`, {
        params : {
            reviewedUserId : userId
        },
        headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
    })
    console.log(feedbacks.data);
    return feedbacks.data;
}