const ttsHelper = new SpeechSynthesisUtterance()
ttsHelper.voiceURI = 'native'
ttsHelper.volume = 1
ttsHelper.rate = 1
ttsHelper.pitch = 0.8
ttsHelper.voice = window.speechSynthesis.getVoices()[10]
ttsHelper.lang = 'en-US'

export default ttsHelper