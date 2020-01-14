var  displaySequence
var qSequence
let durPrev

var y_notes = {
    60: 0,
    62: 80,
    64: 160,
    65: 240,
    67: 320,
    69: 400,
    71: 480
}

var sketch = (s) => {
    let c = Math.floor(s.random(100))
    s.setup = () => {
        s.createCanvas(560,560)
        s.background(21)
        console.log(c)
    }
}

function createGrid(){
    let offset = 80;
    for(let i = 1; i < 7; i++){
        myp5.strokeWeight(2)
        myp5.stroke(200)
        myp5.line(0, i*offset, 560, i*offset)
        myp5.line(i*offset, 0, i*offset, 560)
    }
}

function displayMelody(seq){
    durPrev = 0
    displaySequence = []
    createGrid()
    displaySequence = seq.notes
    console.log(core.sequences.isQuantizedSequence(seq))
    if(core.sequences.isQuantizedSequence(seq) == true){
        qSequence = seq
    }else{
        qSequence = core.sequences.quantizeNoteSequence(seq, 4)
    }
    qDisplaySequence = qSequence.notes

    let anz = qDisplaySequence.length
    let gesSteps =  qDisplaySequence[anz-1].quantizedEndStep
    let res = Math.floor(560/gesSteps) 

    for(let i = 0; i < qDisplaySequence.length; i++){
        let pitch = qDisplaySequence[i].pitch
        let dur = qDisplaySequence[i].quantizedEndStep - qDisplaySequence[i].quantizedStartStep

        myp5.rect(durPrev*res, y_notes[pitch], dur*res, res)

        //durPrev is offset for the next rect
        durPrev += dur
    }
}
