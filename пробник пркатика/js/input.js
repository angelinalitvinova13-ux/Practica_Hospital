const keys = {};

window.addEventListener("keydown", e => {
    // Используем e.code, он всегда выдает KeyW, KeyA, ShiftLeft и т.д.
    keys[e.code] = true;
});

window.addEventListener("keyup", e => {
    keys[e.code] = false;
});