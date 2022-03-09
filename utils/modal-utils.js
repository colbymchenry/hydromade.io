export function toggleFullscreenScroll(on) {
    if (typeof document !== 'undefined') {
        document.getElementById("__next").style.height = !on ? "100vh" : "unset"
        document.getElementById("__next").style.overflow = !on ? "hidden" : "unset"
    }
}