export function obtainValueCookie(nameCookie) {
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if(cookie.indexOf(nameCookie) == 0) {
            return cookie.substring(nameCookie.length + 1);
        }
    }
    return null;
}

// function obterValorDoCookie(nomeDoCookie) {
//     var cookies = document.cookie.split(';');
//     for(var i = 0; i < cookies.length; i++) {
//       var cookie = cookies[i].trim();
//       if(cookie.indexOf(nomeDoCookie) == 0) {
//         return decodeURIComponent(cookie.substring(nomeDoCookie.length + 1));
//       }
//     }
//     return null;
//   }