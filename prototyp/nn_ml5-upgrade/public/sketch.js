var model
var targetLabel = 'C'
var state = 'collection'
//var notenSequence = ["C4", "E4", "G4", "A4"]
var noten_midi = {
    C: 60,
    D: 62,
    E: 64,
    F: 65,
    G: 67,
    A: 69,
    B: 71
}
var resultArray = []
var melodie = []
var synth
var part
var tone = '4'
let sequence
let mModel
let player
let quantizedSequence
var myp5 = new p5()
var drawp5 
let seqNotes = []
let melody
let vis
//model initialisieren
const mRNN = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn')
//const mRNN = new music_rnn.MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn")
const drumRNN = new music_rnn.MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn")
let qDrums
let newSequence
let playContinuedS = new core.Player()

window.onload = () =>{
    drawp5 = new p5(drawSketch, 'canv')
    document.getElementById("play").addEventListener("click", function () {
        playContinuedS.start(sequence)
    })

    document.getElementById("convert").addEventListener("click", ()=>{
        //displayMelody()
        //drawp5.remove()
        myp5 = new p5(sketch, 'editMode')
        displayMelody(sequence)
    })
    document.getElementById("continue").addEventListener("click", continueSeq)

    document.getElementById("delete").addEventListener("click", function(){
        drawp5.remove()
        myp5.remove()
        resultArray = []
        delete sequence
        drawp5 = new p5(drawSketch, 'canv')
    })

    let options = {
        inputs: ['x', 'y'],
        outputs: ['label'],
        debug: true,
        task: 'classification'
    }

    model = ml5.neuralNetwork(options)
    model.load('model.json', modelLoaded)
}

let drawSketch = (s)=>{
    s.setup = () =>{
        s.createCanvas(560, 560)
        s.background(220, 220, 228)
    }

    s.mouseDragged = ()=>{
        if (state == 'prediction') {
            let inputs = {
                x: mouseX,
                y: mouseY
            }
            model.classify(inputs, drawLine)
            //model.classify(inputs, gotResults)
        }
    }

    s.mouseReleased = ()=>{
        let offset = 0
        //state = 'drawed'
        //createMelody()
        createINoteSequence()
    }
    //document.getElementById("continue").addEventListener("click", continueSeq)
    
}
/* 

drumRNN.initialize().then(()=>{
    qDrums = core.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4)
    /*mRNN.continueSequence(qDrums, 60, 1.5).then((sample)=>{
        console.log(sample)
        //newSequence = sample
    })
})*/


function continueSeq(){
    mRNN.initialize().then(()=>{
        //convertPitches()
        console.log("converted")
        myp5.remove()
        myp5 = new p5(sketch, 'editMode')
        quantizedSequence = core.sequences.quantizeNoteSequence(sequence, 4)
        
        mRNN.continueSequence(quantizedSequence, 60, 1).then((s)=>{
            console.log("generated: " + s.notes.length)
          //console.log(Tone.Frequency(69, "midi").toNote());
          //let n = Tone.Frequency(note.pitch, 'midi').toNote()
          console.log(sequence)
          delete sequence
          sequence = s
          newSequence = s
          console.log(sequence)
          displayMelody(newSequence)
          //playContinuedS.start(newSequence)
          //displayMelody(newSequence)
      })
    })
}


function modelLoaded() {
    console.log("model loaded")
    state = "prediction"
}
/*
function mouseClicked(){
    if (state == 'prediction') {
        let inputs = {
            x: mouseX,
            y: mouseY
        }
        //model.classify(inputs, drawLine)
        model.classify(inputs, gotResults)
    }
}*/

function drawLine(err, results) {
    if (err) {
        console.log(err)
        return
    }
    drawp5.strokeWeight(20)
    //fill(255, 0, 167)
    drawp5.line(drawp5.mouseX, drawp5.mouseY, drawp5.pmouseX, drawp5.pmouseY)
    resultArray.push(results[0].label);
}
/*
function mouseReleased() {
    let offset = 0
    //state = 'drawed'
    //createMelody()
    createINoteSequence()
}*/

function createINoteSequence(){
    console.log("result array length: " + resultArray.length)
    let c = 0
    let c_old = 0
    let notes = 0
    sequence = {
        notes: [],
        totalTime: 0
    }
    for(let i = 0; i < resultArray.length; i++){
        if(i != 0){
            if(resultArray[i-1] == resultArray[i]){
                c++
            }else{
                console.log("res: " + resultArray[i] + " modulo: " + (c%10))
                notes++
                let dur = (c%10)*0.1
                let x = {pitch: noten_midi[resultArray[i]], startTime: c_old, endTime: (c_old)+dur}
                c_old = c_old + dur
                sequence.notes.push(x)
                sequence.totalTime = x.endTime
            }
        }
    }
    console.log("total Time: " + sequence.totalTime)
}

/*
function gotResults(error, results) {
    if (error) {
        console.log(error)
        return
    }
    stroke(0)
    fill(140)
    circle(mouseX, mouseY, 20)
    fill(0)
    noStroke()
    textAlign(CENTER, CENTER)
    text(results[0].label, mouseX, mouseY)
} */
