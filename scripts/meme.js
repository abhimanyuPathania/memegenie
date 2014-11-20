
// Globals
var memeFile = $('#memeFile');
var meme = $('#meme');
var memeCanvas = $('#c').get(0);
var ctx = memeCanvas.getContext("2d");
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
    
    // file-type error checking
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

//Simulate File button via Image
$("#upfile").click(function () {
    $("#memeFile").trigger('click');
});

$("#upfile").mousedown(function(){
  $(this).css("top","1px");
});

$("#upfile").mouseup(function(){
  $(this).css("top","0px");
});

//Primary Functions
function setText(){
  if(!memeImage) return false;
  // Get both, top and bottom, text values and pass to generateMemeText
  // using global var memeText for future enhancements
  memeText[0] = topText.val();
  memeText[1] = bottomText.val();
  createCanvas(memeImage); // redraw meme everytime you type
  generateTopText(memeText[0]);
  generateBottomText(memeText[1]);
}

function createThumbnail(img){
  if(!img)return false;
  $('#imageThumbnail').empty();
  //create new Image object since we can't modify the orginal one
  var thumb = new Image();
  thumb.src = img.src;
  thumb.id = "thumb";
  //thumb.style.boxShadow = "0px 0px 3px 0px rgba(0, 152, 219, 0.80)";

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
  //var ctx = memeCanvas.getContext("2d");
  
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
  ctx.drawImage(img,0 ,0 ,img.width, img.height);
  $('#test').append(img);
  $('#saveMessage').text("Right click on the image to save it...");
}


function generateTopText(text){
   var maxWidth = (memeCanvas.width-30);
   var lineHeight = 40;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.font = "30pt Impact";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
  
      wrapTextTop(text,(memeCanvas.width)/2, 45, maxWidth, lineHeight);
      
      //wrapTextBottom(text[1],(memeCanvas.width)/2, (memeCanvas.height-15), maxWidth, lineHeight);  

      
      //ctx.fillText(text[1],(memeCanvas.width)/2, (memeCanvas.height-15));
      //ctx.strokeText(text[1],(memeCanvas.width)/2, (memeCanvas.height-15));
}

function generateBottomText(text){
   var maxWidth = (memeCanvas.width-30);
   var lineHeight = 40;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.font = "30pt Impact";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
  
      //wrapTextTop(text,(memeCanvas.width)/2, 45, maxWidth, lineHeight);
      
      wrapTextBottom(text,(memeCanvas.width)/2, (memeCanvas.height-15), maxWidth, lineHeight);  

      
      //ctx.fillText(text[1],(memeCanvas.width)/2, (memeCanvas.height-15));
      //ctx.strokeText(text[1],(memeCanvas.width)/2, (memeCanvas.height-15));
}


function wrapTextBottom(text, x, y, maxWidth, lineHeight) {
        if(text.length==0)return false;
        var words = text.split(' ');
        var line = '';
        var linesArray = [];
        //var y_old;

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          
          console.log("---testLine: ",testLine);
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          console.log("testWidth: ",testWidth," maxWidth: ",maxWidth);
          console.log("x: ",x," y: ",y);
          console.log("testWidth > maxWidth: ",(testWidth > maxWidth));
          if (testWidth > maxWidth) {
            
            linesArray.push(line);
            createCanvas(memeImage);
            generateTopText(memeText[0]);
            for(var i=0, len = linesArray.length; i<len; i++){

              ctx.fillText(linesArray[i], x, (y-(len-(i))*lineHeight));
              ctx.strokeText(linesArray[i], x, (y-(len-(i))*lineHeight));
            }
            //console.log("if block executed");
            //y_old = y;
            //y -= lineHeight;
            //ctx.fillText(line, x, y);
            //ctx.strokeText(line, x, y);
            line = words[n] + ' ';
            //y = y_old;
          }
          else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, y);
        ctx.strokeText(line, x, y);
     }

function wrapTextTop(text, x, y, maxWidth, lineHeight) {
        if(text.length==0)return false;
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          
          //console.log("Bottom testLine: ",testLine);
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          //console.log("testWidth: ",testWidth," maxWidth: ",maxWidth);
          //console.log("x: ",x," y: ",y);
          //console.log("testWidth > maxWidth: ",(testWidth > maxWidth));
          if (testWidth > maxWidth) {
            //console.log("if block executed");
            ctx.fillText(line, x, y);
            ctx.strokeText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, y);
        ctx.strokeText(line, x, y);
     }
     
     
