$(document).ready(function(){
  
});

var memeFile = $('#memeFile');
var meme = $('#meme');
var memeCanvas = $('#c').get(0);
var topText = $('#topText');

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

  var ctx = memeCanvas.getContext("2d");
  if(memeCanvas.width != 0){
    //already drawn an image so clear whole canvas                                  
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height); 
  }
  memeCanvas.width = img.width;
  memeCanvas.height = img.height;
  ctx.drawImage(img, 0, 0);
}

function generateMemeText(text){
  var ctx = memeCanvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.font = "36pt Impact";
      ctx.lineWidth = 1;
      ctx.textAlign = "center";
      
      ctx.fillText(text,(memeCanvas.width)/2, 40);
      ctx.strokeText(text,(memeCanvas.width)/2, 40);
}
