Status = "";
objects = [];
inpu965t = "";
function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 400);
    video.hide();
}
function start(){
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    inpu965t = document.getElementById("input").value;
}
function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
}
function draw(){
    image(video, 0, 0, 500, 400);
    if(Status != "")
    {
        detector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {          
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label==inpu965t){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("alert").innerHTML=inpu965t + " Found ";

                synth = window.speechSynthesis;
                speak_data = inpu965t + " Found ";
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(speak_data);
            }
            else{
                document.getElementById("alert").innerHTML=inpu965t + " Not Found ";
            }
        }
    }
}
function gotResult(){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}