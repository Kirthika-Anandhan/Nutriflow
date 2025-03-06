import { Howl } from 'howler';
import { SoundEffect } from '../types';

class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private musicPlaying: boolean = false;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private volume: number = 0.5;
  private musicVolume: number = 0.3;
  private currentMusic: Howl | null = null;

  constructor() {
    this.loadSounds();
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const settings = localStorage.getItem('healthTycoonSoundSettings');
    if (settings) {
      const { soundEnabled, musicEnabled, volume, musicVolume } = JSON.parse(settings);
      this.soundEnabled = soundEnabled;
      this.musicEnabled = musicEnabled;
      this.volume = volume;
      this.musicVolume = musicVolume;
    }
  }

  private saveToStorage() {
    const settings = {
      soundEnabled: this.soundEnabled,
      musicEnabled: this.musicEnabled,
      volume: this.volume,
      musicVolume: this.musicVolume
    };
    localStorage.setItem('healthTycoonSoundSettings', JSON.stringify(settings));
  }

  private loadSounds() {
    const soundEffects: SoundEffect[] = [
      { id: 'click', src: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' },
      { id: 'success', src: 'https://assets.mixkit.co/active_storage/sfx/1689/1689-preview.mp3' },
      { id: 'coins', src: 'https://assets.mixkit.co/active_storage/sfx/888/888-preview.mp3' },
      { id: 'levelUp', src: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3' },
      { id: 'water', src: 'https://assets.mixkit.co/active_storage/sfx/2253/2253-preview.mp3' },
      { id: 'workout', src: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3' },
      { id: 'notification', src: 'https://assets.mixkit.co/active_storage/sfx/1518/1518-preview.mp3' },
      { id: 'achievement', src: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3' },
      { id: 'error', src: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3' },
      { id: 'music', src: 'https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3', loop: true }
    ];

    soundEffects.forEach(sound => {
      this.sounds.set(sound.id, new Howl({
        src: [sound.src],
        volume: sound.id === 'music' ? this.musicVolume : this.volume,
        loop: sound.loop || false
      }));
    });
  }

  public play(soundId: string) {
    if (!this.soundEnabled && soundId !== 'music') return;
    if (!this.musicEnabled && soundId === 'music') return;

    const sound = this.sounds.get(soundId);
    if (sound) {
      if (soundId === 'music') {
        if (!this.musicPlaying) {
          this.currentMusic = sound;
          sound.play();
          this.musicPlaying = true;
        }
      } else {
        sound.play();
      }
    }
  }

  public stop(soundId: string) {
    const sound = this.sounds.get(soundId);
    if (sound) {
      sound.stop();
      if (soundId === 'music') {
        this.musicPlaying = false;
        this.currentMusic = null;
      }
    }
  }

  public toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.saveToStorage();
    return this.soundEnabled;
  }

  public toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.play('music');
    } else if (this.currentMusic) {
      this.stop('music');
    }
    this.saveToStorage();
    return this.musicEnabled;
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach((sound, id) => {
      if (id !== 'music') {
        sound.volume(this.volume);
      }
    });
    this.saveToStorage();
  }

  public setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    const music = this.sounds.get('music');
    if (music) {
      music.volume(this.musicVolume);
    }
    this.saveToStorage();
  }

  public isSoundEnabled() {
    return this.soundEnabled;
  }

  public isMusicEnabled() {
    return this.musicEnabled;
  }

  public getVolume() {
    return this.volume;
  }

  public getMusicVolume() {
    return this.musicVolume;
  }
}

// Create a singleton instance
const soundManager = new SoundManager();
export default soundManager;