import { renderPageInit } from "../pages/init.js";
import { renderPageLogin } from "../pages/login.js";

export const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    
    if (!event.target.href) {
        window.history.pushState({}, "", event.target.action);
    } else {
        window.history.pushState({}, "", event.target.href);
    }

    handleLocation();
};

const routes = {
    "/": renderPageInit,
    "/login": renderPageLogin,
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