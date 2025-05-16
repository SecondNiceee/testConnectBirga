class MenuController{
    menu = document.documentElement.querySelector(".FirstMenu")
    hideMenu(){
        if (this.menu){
            this.menu.style.display = "none"
        }
    }
    showMenu(){
        if (this.menu){
            this.menu.style.display = "flex"
        }
    }
    lowerMenu(){
        if (this.menu){
            this.menu.classList.add("disappearAnimation")
            this.menu.classList.remove("appearAnimation")
        }
    }
    raiseMenu(){
        if (this.menu){
            this.menu.classList.add("appearAnimation")
            this.menu.classList.remove("disappearAnimation")
        }
    }
}

export default new MenuController();