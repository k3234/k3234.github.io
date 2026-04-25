// 音效服务
class AudioService {
  constructor() {
    this.audioElements = new Map();
    this.isMuted = false;
  }

  // 加载音效
  loadSound(id, url) {
    if (!this.audioElements.has(id)) {
      const audio = new Audio(url);
      this.audioElements.set(id, audio);
    }
  }

  // 播放音效
  playSound(id) {
    if (this.isMuted) return;
    
    const audio = this.audioElements.get(id);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => {
        console.error('Error playing sound:', err);
      });
    }
  }

  // 停止音效
  stopSound(id) {
    const audio = this.audioElements.get(id);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  // 静音/取消静音
  setMuted(muted) {
    this.isMuted = muted;
  }

  // 检查是否静音
  getMuted() {
    return this.isMuted;
  }

  // 预加载所有音效
  preloadSounds() {
    // 这里可以预加载所有需要的音效
    const sounds = [
      { id: 'correct', url: '/sounds/correct.mp4' },
      { id: 'wrong', url: '/sounds/wrong.mp4' },
      { id: 'level-up', url: '/sounds/level-up.mp4' },
      { id: 'achievement', url: '/sounds/achievement.mp4' },
      { id: 'click', url: '/sounds/click.mp4' }
    ];

    sounds.forEach(sound => {
      this.loadSound(sound.id, sound.url);
    });
  }
}

// 导出单例实例
const audioService = new AudioService();
export default audioService;