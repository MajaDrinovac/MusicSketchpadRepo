function mousePressed() {
    let inputs = {
        x: mouseX,
        y: mouseY
    }
    if (state == 'collection') {
        let target = {
            label: targetLabel
        }
        model.addData(inputs, target)
        stroke(0)
        noFill()
        circle(mouseX, mouseY, 20)
        fill(0)
        noStroke()
        textAlign(CENTER, CENTER)
        text(targetLabel, mouseX, mouseY)
    } else if (state == 'prediction') {
        //model.classify(inputs, gotResults)
    }
}

function keyPressed() {
    if(key == 'p'){
        //play melody
    }
    if (key == 't') {
        state = 'training'
        model.normalizeData()
        let options = {
            epochs: 300
        }
        model.train(options, whileTraining, finishedTraining)
    } else {
        targetLabel = key.toUpperCase()
    }
}

function isSaved() {
    console.log("data is saved")
}

function whileTraining(epoch, loss) {
    console.log(epoch)
}

function finishedTraining() {
    console.log("finished training")
    state = 'prediction'
    background(255)
    model.save()
}