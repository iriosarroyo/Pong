export const keysPressed = {}

addEventListener("keydown", (e) =>{
    keysPressed[e.code] = true;
})

addEventListener("keyup", (e) =>{
    keysPressed[e.code] = false;
})