
var LastImageUploaded;
var Ext;
var dataURL;
var newImage;


function get_filename(obj) {

    var file = obj.value;
    LastImageUploaded = file.replace("C:\\fakepath\\", "");
    Ext = LastImageUploaded.slice(LastImageUploaded.lastIndexOf("."),100);

}



function oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
};


function showFileSize() {
    var input, file;

    // (Can't use `typeof FileReader === "function"` because apparently
    // it comes back as "object" on some browsers. So just see if it's there
    // at all.)
    if (!window.FileReader) { return -1; }

    input = document.getElementById('thefiles');

    if (!input) {
        return -1;
    }
    else if (!input.files) {
        return -1;
    }
    else if (!input.files[0]) {
        return -1;
    }
    else {
        file = input.files[0];
        return file.size;
    }
};





function PreviewImage() {



    var accepted = [".gif",".png",".jpg",".jpeg",".GIF",".PNG",".JPG",".JPEG"];
    var imageLoader = document.getElementById("uploadbutton");
    imageLoader.addEventListener('change', handleImage, false);
    var canvas = document.getElementById('drawnportrait');
    var ctx = canvas.getContext('2d');


    function handleImage(e){ if (!window.FileReader) { document.getElementById("infoR").innerHTML="BadBrowser Error. Must be an Internet Explorer!";

                                                     var img = document.getElementById("IE");
                                                     ctx.drawImage(img,0,0);

                                                     } else {
      var reader = new FileReader();
      reader.onload = function(event){


        var img = new Image();
        img.onload = function(){

            if (Ext in oc(accepted) == true && showFileSize() <= 5000000) {

            document.getElementById("infoR").innerHTML=LastImageUploaded;
            canvas.width = 700;
            canvas.height = 220;
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
            dataURL = canvas.toDataURL("image/png");


            }

            if (showFileSize() > 5000000) {

                document.getElementById("infoR").innerHTML="File is too big. Maximum size is 5,000,000 bytes.";
                ctx.fillStyle="black";
                ctx.fillRect(0,0,150,150);
                ctx.strokeStyle="#FF0000";
                ctx.lineWidth=10;
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(150,150);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(150,0);
                ctx.lineTo(0,150);
                ctx.stroke();}

        }

        img.src = event.target.result;
    }

    if (e.target.files[0] instanceof Blob == true) { reader.readAsDataURL(e.target.files[0]) };


    if (Ext in oc(accepted) == false) {

                document.getElementById("infoR").innerHTML="Invalid file detected. Only use .png, .gif, or .jpg/jpeg.";
                ctx.fillStyle="black";
                ctx.fillRect(0,0,150,150);
                ctx.strokeStyle="#FF0000";
                ctx.lineWidth=10;
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(150,150);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(150,0);
                ctx.lineTo(0,150);
                ctx.stroke();

             }

    } }


    };



function loadCanvas(dataURL, y) {
                var canvas = document.getElementById(y);
                var context = canvas.getContext('2d');

                // load image from data url
                var imageObj = new Image();
                imageObj.onload = function() {
                context.drawImage(this, 0, 0);
                };

                imageObj.src = dataURL; };


                function Register() {


                  var a = document.getElementById("password").value;
                  var ufn = document.getElementById("infoR").innerHTML;


                     var o = document.forms['form-id']["thefiles"].value; if (o == "") { alert("No image found. Please upload one."); return };

                     if (showFileSize() > 5000000) { alert("File is too big. Maximum size is 5,000,000 bytes."); return };


                    if (window.FileReader) {

                    var accepted = [".gif",".png",".jpg",".jpeg",".GIF",".PNG",".JPG",".JPEG"];

                    if (Ext in oc(accepted) == true) {

                    var dataURLToBlob = function(dataURL) {
                    var BASE64_MARKER = ';base64,';
                    if (dataURL.indexOf(BASE64_MARKER) == -1) {
                        var parts = dataURL.split(',');
                        var contentType = parts[0].split(':')[1];
                        var raw = parts[1];

                        return new Blob([raw], {type: contentType});
                    }

                    var parts = dataURL.split(BASE64_MARKER);
                    var contentType = parts[0].split(':')[1];
                    var raw = window.atob(parts[1]);
                    var rawLength = raw.length;

                    var uInt8Array = new Uint8Array(rawLength);

                    for (var i = 0; i < rawLength; ++i) {
                        uInt8Array[i] = raw.charCodeAt(i);
                    }

                    return new Blob([uInt8Array], {type: contentType}); };

                    newImage = dataURLToBlob(dataURL); } else { alert("Cannot send file. Check your extensions."); return }; }


                    if (window.FileReader) {

                     var fd = new FormData();
                     fd.append('data', newImage);
                     fd.append('password', a);
                     fd.append('ufn', ufn); }




                    var xmlhttp;

                    if (window.XMLHttpRequest)
                               {       // code for IE7+, Firefox, Chrome, Opera, Safari
                  xmlhttp=new XMLHttpRequest();
                               }
                          else
                               {       // code for IE6, IE5
                  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                               }




                    xmlhttp.onreadystatechange=function()
                  {
                  if (xmlhttp.readyState==4 && xmlhttp.status==200)
                    {
                    alert(xmlhttp.responseText);

                    if ( xmlhttp.responseText == 'Uploaded' ) { document.getElementById("infoR").innerHTML = "<a href='https://abradley.io/create.html'>https://abradley.io/create.html</a>" }

                    }
                  }
                xmlhttp.open("POST","upload_image.php",true);
                     if (window.FileReader) { xmlhttp.send(fd) } else {
                 alert("no image file found") };

                    };
