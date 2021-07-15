song = "";

leftWristx = 0;
leftWristy = 0;

rightWristx = 0;
rightWristy = 0;

scoreLeftWrist = 0;

function preload()
{
song = loadSound("music.mp3");
}


function setup()
{
canvas = createCanvas(601,501);

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}


function modelLoaded()
{
    console.log("poseNet is Initiallized");
}


function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
{
    circle(leftWristx,leftWristy,20);
    InNumberleftWristY = Number(leftWristy);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
}
}


function gotPoses(results)
{
if(results.length > 0)
{
    scoreLeftWrist = results[0].pose.keypoints[10].score;
    console.log(results);
    leftWristx = results[0].pose.leftWrist.x;
    leftWristy = results[0].pose.leftWrist.y;
    console.log("leftWristx =" + leftWristx + "leftwristy =" + leftWristy);
    
    rightWristx = results[0].pose.rightWrist.x;
    rightWristy = results[0].pose.rightWrist.y;
    console.log("rightWristx =" + rightWristx + "rightWristy =" + rightWristy);
}
}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}


function stop()
{
    song.stop();
}