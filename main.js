//https://teachablemachine.withgoogle.com/models/FMGpNJIsj/model.json
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
Webcam.attach("#camera");

function capture() {
    Webcam.snap(function (pic) {
        document.getElementById("result").innerHTML = '<img id="capture_img" src="' + pic + '">';
    });
}
emoji_model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/szj4QeCvn/model.json", model_ready);

function model_ready() {
    console.log("model loaded succesfully");
}
prediction1 = "";


function speak() {
    speak_data1 = "It is " + prediction1;
    Speak_audio = new SpeechSynthesisUtterance(speak_data1);
    window.speechSynthesis.speak(Speak_audio);
}

function identify() {
    img = document.getElementById("capture_img");
    emoji_model.classify(img, got_restults)
}

function got_restults(e, r) {
    if (e) {
        console.error(e);
    } else {
        console.log(r);
        prediction1 = r[0].label;
        
        document.getElementById("emotion_name1").innerHTML = prediction1;
        
        speak();
        if(prediction1=="victory"){
        document.getElementById("emoji1").innerHTML="&#9996";
    } else if (prediction1 == "perfect") {
        document.getElementById("emoji1").innerHTML = "&#128076";
    } else if (prediction1 == "good") {
        document.getElementById("emoji1").innerHTML = "&#128077";
    }
    
}
}