
// Globals
var memeFile = $('#memeFile');
var meme = $('#meme');
var memeCanvas = $('#c').get(0);
var topText = $('#topText');
var bottomText = $('#bottomText');
var memeText = [];
var memeImage;

//Event Handlers
memeFile.change(function(event){
    event.preventDefault();
    //clear inputs everytime we load new meme
    $('input[type=text]').val("");
    //When ever we select a file, change event fires on (input type=file)
    var file = event.target.files[0]; 
    reader = new FileReader();
    
    reader.onload = function(event){
      var image = new Image();
      image.src = event.target.result;
      //draw the image on canvas, add thumbnail and
      // save a copy in memeImage Global var
      memeImage = image;
      createThumbnail(image);
      createCanvas(image);
     };
    reader.readAsDataURL(file);
 });

topText.keyup(function(){
  setText();
});

bottomText.keyup(function(){
  setText();
});

$("#upfile").click(function () {
    $("#memeFile").trigger('click');
});


//Primary Functions
function setText(){
  // Get both, top and bottom, text values and pass to generateMemeText
  // using global var memeText for future enhancements
  memeText[0] = topText.val();
  memeText[1] = bottomText.val();
  createCanvas(memeImage); // redraw meme everytime you type
  generateMemeText(memeText);
}

function createThumbnail(img){
  $('#imageThumbnail').empty();
  //create new Image object since we can't modify the orginal one
  var thumb = new Image();
  thumb.src = img.src;

  var h = thumb.height;
  var w = thumb.width;
  var scaling;
  
  if(h<=100){
    if(w>150){
      thumb.width = 150;
    }
  }
  else{
    scaling = h/100;
    thumb.width = w/scaling;
  }
  $('#imageThumbnail').append(thumb);
}

function createCanvas(img){
  if(!memeImage)return false; //if text is tried to set before loading meme
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
  
      ctx.fillText(text[0],(memeCanvas.width)/2, 50);
      ctx.strokeText(text[0],(memeCanvas.width)/2, 50);
      
      ctx.fillText(text[1],(memeCanvas.width)/2, (memeCanvas.height-10));
      ctx.strokeText(text[1],(memeCanvas.width)/2, (memeCanvas.height-10));
}
