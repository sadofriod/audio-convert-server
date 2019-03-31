const { exec } = require('child_process')
const DEFAULT_OUTPUT_OPTION = {
    channelCount: 1,
    sampleRate: 16000,
    bitSec: '64k',
    inputPath: __dirname + '/test.mp3',
    outputPath: __dirname + '/test.wav',
    bitdpth:'u8'
}
function Convert(params = DEFAULT_OUTPUT_OPTION) {
    // constructor() {
    this.channelCount = params.channelCount;
    this.sampleRate = params.sampleRate;
    this.bitSec = params.bitSec;
    this.inputPath = params.inputPath;
    this.outputPath = params.outputPath;
    this.bitdpth = params.bitdpth
    return this;
}
Convert.prototype.processAudio = function () {
    let command = "ffmpeg -i" + this.inputPath + "-b:a" + this.bitSec + "-ar" + this.sampleRate + "-ac" + this.channelCount + "  " + this.outputPath;
    console.log(command);
    exec(command)
}
module.exports = {
    Convert: Convert,
    processAudio: Convert().processAudio
}