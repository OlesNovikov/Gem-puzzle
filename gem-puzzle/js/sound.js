const audioTag = 'audio',
    moveChipSoundSource = "assets/sounds/chip-move-sound.mp3",
    className = "movePuzzleSound";

export class Audio {
    constructor() {
        this.audioHTML = document.createElement(audioTag);
    }

    setupSoundEffects() {
        this.audioHTML.className = className;
        this.audioHTML.src = moveChipSoundSource;
        this.audioHTML.playbackRate = 1.5;
        document.body.appendChild(this.audioHTML);
    }

    isMuted() {
        let soundButtonTextContent = this.audioHTML.muted === true ? "Sound: Off" : "Sound: On";
        return soundButtonTextContent;
    }

    soundOnOff(event) {
        this.audioHTML = document.querySelector(`.${className}`);
        this.audioHTML.muted = this.audioHTML.muted === true ? false : true;
        event.target.textContent = this.audioHTML.muted === true ? "Sound: Off" : "Sound: On";
    }

    pause() {
        this.audioHTML.pause();
        this.audioHTML.currentTime = 0;
    }

    play() {
        this.audioHTML.play();
    }
}