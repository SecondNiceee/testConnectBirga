class MenuController{
    menu = document.documentElement.querySelector(".FirstMenu")
    hideMenu(){
        setTimeout( () => {
            document.documentElement.querySelector(".FirstMenu").style.display = "none"
        }, 200 )
    }
    showMenu(){
        setTimeout( () => {
            document.documentElement.querySelector(".FirstMenu").style.display = "flex"
        }, 200 )
    }
    lowerMenu(){
        setTimeout( () => {
            document.documentElement.querySelector(".FirstMenu").classList.add("disappearAnimation")
            document.documentElement.querySelector(".FirstMenu").classList.remove("appearAnimation")
        }, 200 )
    }
    raiseMenu(){
        setTimeout( () => {
            document.documentElement.querySelector(".FirstMenu").classList.add("appearAnimation")
            document.documentElement.querySelector(".FirstMenu").classList.remove("disappearAnimation")
        }, 200 )
    }
}

export default new MenuController();