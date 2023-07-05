export default function eventoCustomizado(url) {
    const eventoChange = new CustomEvent("onstatechange", { detail: { url: url } });
    return eventoChange;
}