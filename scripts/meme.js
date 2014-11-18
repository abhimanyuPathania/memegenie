$(document).ready(function(){
  
});

var memeFile = $('#memeFile');
var meme = $('#meme');
var memeCanvas = $('#c').get(0);

memeFile.change(function(event){
  event.preventDefault();
  var file = event.target.files[0];
  reader = new FileReader();
  reader.onload = function(event){
    var memeImage = new Image();
    memeImage.src = event.target.result;
    console.log(memeImage.width,memeImage.height);
    createCanvas(memeImage);
  };
  reader.readAsDataURL(file);
});

function createCanvas(img){
  //var c = $('<canvas id="c" width="'+ img.width +'" height="'+ img.height +'"></canvas>').get(0); //get the actual canvas from jQuery Object
  memeCanvas.width = img.width;
  memeCanvas.height = img.height;
  //meme.prepend(c);
  
  var ctx = memeCanvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
}
