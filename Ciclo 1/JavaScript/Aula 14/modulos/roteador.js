import paginaPrincipal from "./paginaPrincipal.js";
import brigadeiros from "./brigadeiros.js";
import cupcakes from "./cupcakes.js";
import doces from "./doces.js";

// import eventoCustomizado from "./eventoCustomizado.js";

export default function roteador() {
    const rotas = {
        "/": paginaPrincipal(),
        "/brigadeiros": brigadeiros(),
        "/cupcakes": cupcakes(),
        "/doces": doces(),
        getPage: function (url) {
            return this[url];                        
        },
    }
    return rotas;
}