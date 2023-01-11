export const selectColor = (param) => {
    for (let i = 0; i < 4; i++) {
        document.getElementById(`ribbon${i}`).classList.remove("selected");
    }
    document.getElementById(`ribbon${param}`).classList.add("selected");

    setPathname();
}

export const setPathname = () => {
    setTimeout(() => {
        switch (window.location.pathname) {
            case "/":
                selectColor(0);
                break;
            case "/resume":
                selectColor(1);
                break;
            case "/portfolio":
                selectColor(2);
                break;
            case "/story":
                selectColor(3);
                break;
            default:
                break;
        }
    }, 100)
}