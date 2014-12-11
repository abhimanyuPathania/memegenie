// Globals

var memeFile = $('#memeFile');
var meme = $('#meme');
var memeCanvas = $('#c').get(0);
var topText = $('#topText');
var bottomText = $('#bottomText');
var error = $('.error');
var fileButtonImage = $("#upfile");
var fileInputDiv = $("#fileInput")

var ctx = memeCanvas.getContext("2d");
var memeText = {};
var memeImage;
var maxWidth;
var lineHeight;

var imageResizeWidthLimit
var imageResizeHeightLimit
var imageResizeBlocker

//Event Handlers
memeFile.change(function(event){
    event.preventDefault();
    
    //clear inputs everytime we load new meme
    topText.val("");
    bottomText.val("");
    //When ever we select a file, change event fires on (input type=file)
    var file = event.target.files[0];
    
    // file-type error checking
    if(!file)return false;
    if(file.type.search("image")== -1){
       return error.show("fast");
      }
    error.hide("fast");
     
    reader = new FileReader();
    reader.onloadend = function(event){
      var image = new Image();
      image.src = event.target.result;
      
      // pass it to global variable
      image.onload = function(){
        memeImage = this;
        setupResizing(memeImage);
        checkScreenSize(memeImage);
        createThumbnail(memeImage);
        createCanvas(memeImage);
      };
     };
    reader.readAsDataURL(file);
 });

  topText.keyup(function(){
    setText();
  });

  bottomText.keyup(function(){
    setText();
  });

  //Simulate File button via Image
  fileButtonImage.click(function () {
      memeFile.trigger('click');
  });
  
  /*fileButtonImage.mousedown(function(){
    $(this).css("top","1px");
  });
  
  fileButtonImage.mouseup(function(){
    $(this).css("top","0px");
  });
  */

//Primary Functions
function setText(){
  if(!memeImage) return false;
  // Get both, top and bottom, text values and pass to
  // generateTopText and generateBottomText respectively.

  memeText.top = topText.val();
  memeText.bottom = bottomText.val();
  
  // redraw meme everytime you type
  createCanvas(memeImage); 
        
  generateTopText(memeText.top);
  generateBottomText(memeText.bottom);
}

function createThumbnail(img){
  if(!img) return false;
  $("#thumb").remove();

  var thumb = new Image();
  thumb.src = img.src;
  thumb.id = "thumb";

  scaleImage(thumb,false,100)
 
  fileInputDiv.append(thumb);
 }

function setContextSettings(){
      
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.font = "40px Impact";
      ctx.lineWidth = 2;
     if($(window).width()<400){
        ctx.font = "bolder 32px Impact";
        ctx.lineWidth = 1;        
      }
      ctx.textAlign = "center";
      
      maxWidth = (memeCanvas.width-30);
      lineHeight = 40;
}

function createCanvas(img){
  
  //if text is tried to set before loading meme
  if(!memeImage)return false; 
  var w = img.width;

  if(memeCanvas.width != 0){
    //already drawn an image so clear whole canvas                                  
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height); 
  }
  
  if(w > 820){
    scaleImage(img,820,false);
  }
  
  memeCanvas.width = img.width;
  memeCanvas.height = img.height;
  ctx.drawImage(img,0 ,0 ,img.width, img.height);
  setContextSettings();
  $('#saveMessage').text("Right click and save");
}


function generateTopText(text){
   wrapText(text,(memeCanvas.width)/2, 45, maxWidth, lineHeight);
}

function generateBottomText(text){
  // call the same wrapText with bottom=true parameter
   wrapText(text,(memeCanvas.width)/2, (memeCanvas.height-15), maxWidth, lineHeight, true);  
}


function wrapText(text, x, y, maxWidth, lineHeight, bottom) {
        if(text.length==0)return false;
        
        var words = text.split(' ');
        var line = '';
        var linesArray =[];
 
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          
          //Bottom text case
          if(bottom === true){
                if (testWidth > maxWidth) {
                    linesArray.push(line);
                    createCanvas(memeImage);
                    generateTopText(memeText.top);
                    for(var i=0, len = linesArray.length; i<len; i++){
      
                     ctx.fillText(linesArray[i], x, (y-(len-(i))*lineHeight));
                     ctx.strokeText(linesArray[i], x, (y-(len-(i))*lineHeight));
                  }
                  line = words[n] + ' ';
              }
               else {
                 line = testLine;
              }
          }// End Bottom text case
          
          // Top Text case
          else{
              if (testWidth > maxWidth) {
                ctx.fillText(line, x, y);
                ctx.strokeText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
              line = testLine;
            }
         }// End Top text case
       }// End For loop
        ctx.fillText(line, x, y);
        ctx.strokeText(line, x, y);
     }

$(window).resize(function (){
  var width = $("#main").width()
  if (width<900){
    if (memeImage){
      var expectedImageWidth = width;
      if(imageResizeBlocker && expectedImageWidth > imageResizeWidthLimit){
        memeImage.width = imageResizeWidthLimit;
        memeImage.height = imageResizeHeightLimit;
        setText();//to fix image once before it returns
        return false;
      }
      scaleImage(memeImage,expectedImageWidth,false)
      setText();
    }
  }
});

function setupResizing(img){
  var width = img.width;
  if(width<820){
    imageResizeBlocker = true;
    imageResizeWidthLimit = width;
    imageResizeHeightLimit = img.height;
  }
  else{
    imageResizeBlocker = false;
  }
}

function checkScreenSize(img){
  var width = $("#main").width();
  if(width<818){
    scaleImage(memeImage,width,false)
  }
}

function scaleImage(img,requiredWidth,requiredHeight){
  var scaling
  var w = img.width;
  var h = img.height;

  if(!requiredHeight){
    scaling = w/requiredWidth;
    img.width = requiredWidth;
    img.height = h/scaling;
  }
  if(!requiredWidth){
    scaling = h/requiredHeight;
    img.height = requiredHeight;
    img.width = w/scaling
  }
  return false; 
}