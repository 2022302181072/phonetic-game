音标音频文件夹
================

默认使用浏览器 TTS（英式 en-GB），点击播放按钮读一遍，切换题目自动停止。

如需更高质量的音标发音，可将 MP3 文件放入此文件夹，命名规则：

  p.mp3    → /p/ 音标（例词 pen）
  b.mp3    → /b/ 音标（例词 book）
  ...

然后在 js/data.js 的 speakPhoneme 函数中改为优先播放本地音频。

推荐音频来源：
- Forvo（https://forvo.com）
- 剑桥词典发音
- 自行录制课堂标准发音

当前例词列表见 js/data.js 中的 PHONEMES 对象。
