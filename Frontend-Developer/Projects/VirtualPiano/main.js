let whiteKeys = ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ"];
let blackKeys = ["KeyW", "KeyE", "KeyT", "KeyY", "KeyU"];

document.addEventListener("keypress", function(e) {
    if (whiteKeys.includes(e.code)) {
        let audioObject = new Audio("media/white_keys/" + e.key.toUpperCase() + ".mp3");
        audioObject.play();
    } else if (blackKeys.includes(e.code)) {
        let audioObject = new Audio("media/black_keys/" + e.key.toUpperCase() + ".mp3");
        audioObject.play();
    }
});