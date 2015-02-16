function setText(){if(!memeImage)return false;memeText.top=topText.val();memeText.bottom=bottomText.val();createCanvas(memeImage);generateTopText(memeText.top);generateBottomText(memeText.bottom)}function createThumbnail(e){if(!e)return false;$("#thumb").remove();var t=new Image;t.src=e.src;t.id="thumb";scaleImage(t,false,100);fileInputDiv.append(t)}function setContextSettings(){ctx.fillStyle="white";ctx.strokeStyle="black";ctx.font="40px Impact";ctx.lineWidth=2;if($(window).width()<400){ctx.font="bolder 32px Impact";ctx.lineWidth=1}ctx.textAlign="center";maxWidth=memeCanvas.width-30;lineHeight=40}function createCanvas(e){if(!memeImage)return false;var t=e.width;if(memeCanvas.width!=0){ctx.clearRect(0,0,memeCanvas.width,memeCanvas.height)}if(t>820){scaleImage(e,820,false)}memeCanvas.width=e.width;memeCanvas.height=e.height;ctx.drawImage(e,0,0,e.width,e.height);setContextSettings();$("#saveMessage").text("Right click and save")}function generateTopText(e){wrapText(e,memeCanvas.width/2,45,maxWidth,lineHeight)}function generateBottomText(e){wrapText(e,memeCanvas.width/2,memeCanvas.height-15,maxWidth,lineHeight,true)}function wrapText(e,t,n,r,i,s){if(e.length==0)return false;var o=e.split(" ");var u="";var a=[];for(var f=0;f<o.length;f++){var l=u+o[f]+" ";var c=ctx.measureText(l);var h=c.width;if(s===true){if(h>r){a.push(u);createCanvas(memeImage);generateTopText(memeText.top);for(var p=0,d=a.length;p<d;p++){ctx.fillText(a[p],t,n-(d-p)*i);ctx.strokeText(a[p],t,n-(d-p)*i)}u=o[f]+" "}else{u=l}}else{if(h>r){ctx.fillText(u,t,n);ctx.strokeText(u,t,n);u=o[f]+" ";n+=i}else{u=l}}}ctx.fillText(u,t,n);ctx.strokeText(u,t,n)}function setupResizing(e){var t=e.width;if(t<820){imageResizeBlocker=true;imageResizeWidthLimit=t;imageResizeHeightLimit=e.height}else{imageResizeBlocker=false}}function checkScreenSize(e){var t=$("#main").width();if(t<818){scaleImage(memeImage,t,false)}}function scaleImage(e,t,n){var r;var i=e.width;var s=e.height;if(!n){r=i/t;e.width=t;e.height=s/r}if(!t){r=s/n;e.height=n;e.width=i/r}return false}var memeFile=$("#memeFile");var meme=$("#meme");var memeCanvas=$("#c").get(0);var topText=$("#topText");var bottomText=$("#bottomText");var error=$(".error");var fileButtonImage=$("#upfile");var fileInputDiv=$("#fileInput");var ctx=memeCanvas.getContext("2d");var memeText={};var memeImage;var maxWidth;var lineHeight;var imageResizeWidthLimit;var imageResizeHeightLimit;var imageResizeBlocker;memeFile.change(function(e){e.preventDefault();topText.val("");bottomText.val("");var t=e.target.files[0];if(!t)return false;if(t.type.search("image")==-1){return error.show("fast")}error.hide("fast");reader=new FileReader;reader.onloadend=function(e){var t=new Image;t.src=e.target.result;t.onload=function(){memeImage=this;setupResizing(memeImage);checkScreenSize(memeImage);createThumbnail(memeImage);createCanvas(memeImage)}};reader.readAsDataURL(t)});topText.keyup(function(){setText()});bottomText.keyup(function(){setText()});fileButtonImage.click(function(){memeFile.trigger("click")});$(window).resize(function(){var e=$("#main").width();if(e<900){if(memeImage){var t=e;if(imageResizeBlocker&&t>imageResizeWidthLimit){memeImage.width=imageResizeWidthLimit;memeImage.height=imageResizeHeightLimit;setText();return false}scaleImage(memeImage,t,false);setText()}}})