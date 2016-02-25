function initCamera() {
  //Uncomment and fill in the correct selectors below.
  capture($('#camera-video'),
          $('#camera-canvas'),
          $('#camera-button'));
}


var image;
var can;
var dataURL;

function capture(video, canvas, snapshotButton) {
  //Adopted from https://dev.opera.com/articles/media-capture-in-mobile-browsers/
  //Setup navigator for all versions of browsers.
  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia;
  var ctx = canvas[0].getContext('2d');

  var successCallback = function(mediaStream) {
    //The success callback function. On user click of snapshot button,
    //draw the image on the canvas.
    video.attr('src', window.URL.createObjectURL(mediaStream));
    snapshotButton.click(function(e) {
        console.log("Taking photo");
        //Calculate dimension of photo from the video element.
        var width = video.width();
        var height = video.height();
        canvas.attr('width', width);
        canvas.attr('height', height);
        ctx.drawImage(video[0], 0, 0, width, height);

        image = new Image();
        image.src = canvas[0].toDataURL('image/png');

        console.log("Capture success");
        console.log(image.src);
        $("#changePic").show(); 
        $("#yesPic").click(updateProfilePic);
        $("#noPic").click(noUpdate);
    });
  };

  var errorCallback = function() {
    //The error callback function. If getUserMedia errored, print that
    //we failed.
    console.log('Capture failed');
  };

  //Register the success and error callbacks with getUserMedia.
  navigator.getUserMedia({ 'video': true },
      successCallback, errorCallback);

};

function updateProfilePic(e) {
  console.log("updating porfile pic");
  // var image = new Image();
  $('#photo').attr('src', image.src);
  $("#changePic").hide();
  //$("#updated").show();
  //setTimeout(function() { $("#updated").hide(); }, 3000);
  $("#updated").show().delay(5000).fadeOut();

  console.log(image.src);
}

function noUpdate(e) {
  console.log("not updating. hide message");
  $("#changePic").hide();
}



