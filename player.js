import { Audio } from 'expo-av';

class AudioPlayer {
    constructor() {
        this.sound = null;
    }

    async loadSoundAsync(uri) {
        try {
            this.sound = new Audio.Sound();
            await this.sound.loadAsync({ uri });
            return true;
        } catch (error) {
            console.error('Error loading sound:', error);
            return false;
        }
    }

    async playAsync() {
        try {
            if (this.sound) {
                await this.sound.playAsync();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error playing sound:', error);
            return false;
        }
    }

    async pauseAsync() {
        try {
            if (this.sound) {
                await this.sound.pauseAsync();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error pausing sound:', error);
            return false;
        }
    }

    async unloadAsync() {
        try {
            if (this.sound) {
                await this.sound.unloadAsync();
                this.sound = null;
            }
            return true;
        } catch (error) {
            console.error('Error unloading sound:', error);
            return false;
        }
    }
}

export default AudioPlayer;