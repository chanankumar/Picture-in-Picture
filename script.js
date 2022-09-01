const videoElement = document.getElementById('video');
const button = document.getElementById('button');
let mediaStream;

async function selectMediaStream(){
    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia();
        mediaStream.getVideoTracks()[0].addEventListener('ended',exitPicture);
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
            button.innerText = 'Start';
        }
    } catch (err) {
        console.log(err);
    }
}

async function startPictureInPicture(){
    button.disabled = true;
    await videoElement.requestPictureInPicture().then(
        button.innerText = 'Running',
        button.disabled = true
    );
}

function exitPicture (){
    document.exitPictureInPicture();
    button.innerText = 'Select Media';
    button.disabled = false;
}

    button.addEventListener('click', async () => {
        if(button.innerText === 'Select Media'){
            selectMediaStream();
        }else {
            startPictureInPicture();
        }
    })
videoElement.addEventListener('leavepictureinpicture', () => {
    console.log('close')
    mediaStream.getVideoTracks()[0].removeEventListener('ended', exitPicture());
});
