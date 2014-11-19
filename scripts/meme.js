
// Globals
var memeFile = $('#memeFile');
var meme = $('#meme');
var memeCanvas = $('#c').get(0);
var topText = $('#topText');
var bottomText = $('#bottomText');
var error = $('.error');
var memeText = [];
var memeImage;

//Event Handlers
memeFile.change(function(event){
    event.preventDefault();
    //clear inputs everytime we load new meme
    $('input[type=text]').val("");
    //When ever we select a file, change event fires on (input type=file)
    var file = event.target.files[0];

    if(file.type.search("image")== -1){
       return error.show("fast");
      }
    error.hide("fast"); 
    reader = new FileReader();
    
    reader.onload = function(event){
      var image = new Image();
      image.src = event.target.result;
      //draw the image on canvas, add thumbnail and
      // save a copy in memeImage Global var
      memeImage = image;
      createThumbnail(memeImage);
      createCanvas(memeImage);
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
  if(!img)return false;
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
  var scaling;
  var w = img.width;
  var h = img.height;
  var ctx = memeCanvas.getContext("2d");
  
  if(memeCanvas.width != 0){
    //already drawn an image so clear whole canvas                                  
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height); 
  }
  
  if(w > 880){
    img.width = 880;
    scaling = w/880;
    img.height = h/scaling;
  }
  
  memeCanvas.width = img.width;
  memeCanvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  $('#saveMessage').text("Right click on the image to save it...");
}


function generateMemeText(text){
  var ctx = memeCanvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.font = "30pt Impact";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
  
      ctx.fillText(text[0],(memeCanvas.width)/2, 45);
      ctx.strokeText(text[0],(memeCanvas.width)/2, 45);
      
      ctx.fillText(text[1],(memeCanvas.width)/2, (memeCanvas.height-15));
      ctx.strokeText(text[1],(memeCanvas.width)/2, (memeCanvas.height-15));
}

function manageError(){
  
}
