import { renderMainPage } from "../pages/main.js";
import { renderPageLogin } from "../pages/login.js";
import { renderPageNewUser } from "../pages/users.js";

export const route = (event) => {
    event = event || window.event;

    if (event) {
        event.preventDefault();

        if (!event.target.href) {
            window.history.pushState({}, "", event.target.action);
        } else {
            window.history.pushState({}, "", event.target.href);
        }
    }
    
    handleLocation();
};

const routes = {
    "/": renderMainPage,
    "/login": renderPageLogin,
    "/users": renderPageNewUser,
    getPage: function (url) {
        return this[url]();                        
    }
};

const handleLocation = async () => {
    const path = window.location.pathname;
    
    const html = routes.getPage(path);
    
    const root = document.querySelector("#root");
    root.innerHTML = "";
    root.appendChild(html);
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();