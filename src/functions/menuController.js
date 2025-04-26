class MenuController{
    menu = document.documentElement.querySelector(".FirstMenu")
    
    hideMenu(){
        this.menu.style.display = "none"
    }
    showMenu(){
        this.menu.style.display = "flex"
    }
    lowerMenu(){
        this.menu.classList.add("disappearAnimation")
        this.menu.classList.remove("appearAnimation ")
    }
    raiseMenu(){
        this.menu.classList.add("appearAnimation")
        this.menu.classList.remove("disappearAnimation")
    }
}

export default new MenuController;