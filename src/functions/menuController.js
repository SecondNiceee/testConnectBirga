class MenuController{
    menu = document.documentElement.querySelector(".FirstMenu")
    
    hideMenu(){
        this.menu.style.display = "none"
    }
    showMenu(){
        this.menu.style.display = "flex"
    }
}

export default new MenuController;