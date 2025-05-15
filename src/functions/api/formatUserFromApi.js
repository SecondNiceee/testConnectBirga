export const formatUserFromApi = (userFromApi, userCards) => {
    const photoUrl = userFromApi.photo ?? "";
    console.log(userFromApi);
    return ( {
        firstName: userFromApi.fl.split(' ')[0],
        lastName: userFromApi.fl.split(' ')[1],
        address : userFromApi.address,
        mnemonic : userFromApi.mnemonic,
        id: userFromApi.id,
        views : userFromApi.views,
        link : userFromApi.link,
        photo: photoUrl,
        about : userFromApi.about,
        stage : userFromApi.stage,
        deals : userFromApi.deals,
        completedTasks : userFromApi.completedAdvertisements,
        cards : userCards,
        congradulations : userFromApi.congradulations,
        lastTransaction : userFromApi.lastTransaction,
        congratulate : userFromApi.congratulate,
        userLikes : userFromApi.userLikes,
        profession : userFromApi.profession,
        links :  userFromApi.links ? [`https://t.me/${userFromApi.link}` , ...userFromApi.links] : [],
        taggs : userFromApi.taggs,
        rating : userFromApi.rating
      } );
}