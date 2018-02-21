function CreateSection(id, bgcolor, txtcolor, txtsize, html) {

    var Div = document.createElement('div');
    Div.id = id;
    Div.className = "section";
    Div.style.display = "block";
    Div.style.backgroundColor = bgcolor;
    Div.style.color = txtcolor;
    Div.style.fontSize = txtsize+"px";
    document.getElementById('container').appendChild(Div);
    if (html != undefined) { document.getElementById(id).innerHTML = html }

  };

//Date function for putting date at the top of posts

function WriteDate(date_now) {

    if ( typeof date_now == 'undefined' ) { return "TBD|" };

    //use Date.now()
    //console.log(date_now);

    var date = new Date(date_now);

    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    var meridian = "AM";

    if ( minute < 10 ) { minute = "0"+minute.toString() };

    if ( hour >= 12 && hour < 24 ) { if ( hour > 12 ) { hour = hour - 12 }; meridian = "PM"; }

    if ( hour == 24 ) { hour = hour - 12 };

    if ( hour == 0 ) { hour = 12 };


    //console.log(month+"/"+day+"/"+year+" "+hour+":"+minute+meridian);

    return month+"/"+day+"/"+year+" "+hour+":"+minute+meridian+"|";


};

//Footer drawing: it's a bar that fills up as the year progresses.
// Current Day / 365

    var diffDays;

    var date = new Date(Date.now());
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(new Date().getFullYear(), 0, 1);
    var secondDate = new Date(year,month,day);

    diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))) + 1;

function DrawFooter() {

    var c = document.getElementById("footer_canvas");
    var ctx = c.getContext("2d");

    // Create gradient
    var grd = ctx.createLinearGradient(0,0,diffDays*2.63,0);
    grd.addColorStop(0,"purple");
    grd.addColorStop(1,"#FFA0FF");

    // Fill with gradient
    ctx.fillStyle = grd;

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,diffDays*2.63,20);



};


//Custom Tables that make positioning more consistent

function MakeTableQ(left, right, height) {

    var percent1 = '50';
    var percent2 = '50';

    var divclass_left = 'imgbox';
    var divclass_right = 'imgbox';

    var html = "<table style='width:100%'><tr><td style='width:"+percent1+"%'><div class='"+divclass_left+"' style='height:"+height+"px'>"+left+"</div></td><td style='width:"+percent2+"%'><div class='"+divclass_right+"' style='height:"+height+"px'>"+right+"</div></td></tr></table>";

    return html;


    };



function MakeTable2(left, right, height, percent1, percent2) {

    var divclass_left = 'flexcroll';
    var divclass_right = 'flexcroll';

    if ( left.slice(0,4) == "<img" ) { divclass_left = 'imgbox' };
    if ( right.slice(0,4) == "<img" ) { divclass_right = 'imgbox' };

    var html = "<table style='width:100%'><tr><td style='width:"+percent1+"%'><div class='"+divclass_left+"' style='height:"+height+"px'>"+left+"</div></td><td style='width:"+percent2+"%'><div class='"+divclass_right+"' style='height:"+height+"px'>"+right+"</div></td></tr></table>";

    return html;


    };

function MakeTable3(left, center, right, height) {

    var divclass_left = 'flexcroll';
    var divclass_center = 'flexcroll';
    var divclass_right = 'flexcroll';

    if ( left.slice(0,4) == "<img" ) { divclass_left = 'imgbox' };
    if ( center.slice(0,4) == "<img" ) { divclass_center = 'imgbox' };
    if ( right.slice(0,4) == "<img" ) { divclass_right = 'imgbox' };


    var html = "<table style='width:100%'><tr><td style='width:33.3%'><div class='"+divclass_left+"' style='height:"+height+"px'>"+left+"</div></td><td style='width:33.3%'><div class='"+divclass_center+"' style='height:"+height+"px'>"+center+"</div></td><td style='width:33.3%'><div class='"+divclass_right+"' style='height:"+height+"px'>"+right+"</div></td></tr></table>";

    return html;

    };

var archive;

function CreateArchive(pp) {

             var heroes_returned; var array_s; var archive_html = ""; var c = 0; var counter = 0; var num; var left; var name; var date; var current_num; var rest; var current_name; var current_name_for_link; var presented_name; var cut_post; var unique_tags = []; var ft; var ct;


             function retrieve_archive() {

                 var xmlhttp;

                 if (window.XMLHttpRequest)
                 {       // code for IE7+, Firefox, Chrome, Opera, Safari
                 xmlhttp=new XMLHttpRequest();
                                }
                     else
                 {       // code for IE6, IE5
                 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                                      }

                 xmlhttp.onreadystatechange=function(){
                 if (xmlhttp.readyState==4 && xmlhttp.status==200) {

                  //console.log(xmlhttp.responseText);
                  //return;



                   heroes_returned = JSON.parse(xmlhttp.responseText);

                   archive = heroes_returned.reverse();

                  if ( pp != 1 ) {

                    CreateDivs(top_post);

                   if ( archive.length == 0 ) { return };

                   if ( archive.length > 3 ) { c = 3 } else { c = archive.length };


                   while ( counter < c ) {

                     cut_post = archive[counter].slice(archive[counter].indexOf(":")+1,archive[counter].length);

                     CreateDivs(cut_post);

                   counter++; };


                   counter = 0;


                 };


                   while ( counter < archive.length ) {

                ft = archive[counter].slice(archive[counter].indexOf("$")+1,archive[counter].indexOf(":"));

                if ( unique_tags.indexOf(ft) == -1 ) {

                  if ( pp == 1 ) {

                    CreateTagSpans(ft,1,1);
                    CreateTagSpans(" ",0);

                  } else {

                    CreateTagSpans(ft,1);
                    CreateTagSpans(" ",0);

                  };

                    if ( tags.indexOf(ft) == -1 ) { tags.push(ft) };

                    unique_tags.push(ft); };

                   counter++; };


                if ( pp == 1 ) {


                  ct = document.getElementsByTagName("h5")[0].innerHTML;

                  ct = ct.slice(0,ct.indexOf("<span"));

                  ct = ct.split(' ').join('_');

                  counter = 0;

                  while ( counter < unique_tags.length ) {

                    if ( ct == unique_tags[counter] ) {

                      document.getElementById(ct).className = "w3-tag w3-black w3-margin-bottom";

                    };

                  counter++; };



                };











                   //heroes_returned.sort(function(x, y){return y.slice(0,y.indexOf(":")) - x.slice(0,x.indexOf(":"));});

                   //console.log(heroes_returned);


                   //put latest comic in movie canvas

                   //make upload latest comic button for create.html, will locate needed info in the largest number folder of image folder items

                    // current_num = heroes_returned[0].slice(0,heroes_returned[0].indexOf(":"));
                    // rest = heroes_returned[0].slice(heroes_returned[0].indexOf(":") + 1);
                    // current_name = rest.slice(0, rest.indexOf(":"));
                    // current_name_for_link = current_name.slice(0,current_name.indexOf("."));
                    //


                   //load archive as number, url w/ link, date

                    // array_s = heroes_returned;
                    //
                    //
                    // while ( c < array_s.length ) {
                    //
                    //             num = array_s[c].slice(0,array_s[c].indexOf(":"));
                    //             left = array_s[c].slice(array_s[c].indexOf(":") + 1);
                    //             name = left.slice(0,left.indexOf(":"));
                    //             name = name.slice(0,name.indexOf("."));
                    //             presented_name = name.replace(/_/g, ' ');
                    //             date = left.slice(left.indexOf(":") + 1);
                    //
                    //             //archive_html = archive_html + "<tr><td><center>" + num + "</center></td><td><center><a href='https://abradley.io/articles/series/" + name + ".html'>" + presented_name + "</a></center></td><td><center>" + WriteDate(date * 1000).slice(0,-8) + "</center></td></tr>";
                    //
                    //             archive_html = archive_html + presented_name;
                    //
                    // c++ };

                    //console.log(archive_html);

                 } };



               xmlhttp.open("GET","/retrieve_archive.php",true);
               xmlhttp.send();




             };


             retrieve_archive();



    };

var top_post = '<!-- Blog entry --><div class="w3-card-4 w3-margin w3-white"><img src="https://abradley.io/wavelengths.png" alt="wavelengths" style="width:100%"><div class="w3-container"><br><h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</h3></div><div class="w3-container"><!-- BEGIN CONTENT --><table width="100%"><tr><td><center><a href="https://abradley.io/articles/series/The_HotS_Project.html"><img src="https://abradley.io/logos/HotS.png" alt="HotS"></a><br>Project 1</center></td><td><center><a href="https://abradley.io/articles/series/student_loan_project.html"><img src="https://abradley.io/logos/loan.png" alt="loan"></a><br>Project 2</center></td></tr></table><br><br><center><b><h3>Below you will find the most recent articles</b></h3></center><br></div></div><hr><!-- END BLOG ENTRIES --></div>'


function get_comic_info() {

  var response_array;

  var xmlhttp;

  if (window.XMLHttpRequest)
  {       // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
                 }
      else
  {       // code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                       }

  xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState==4 && xmlhttp.status==200) {

        response_array = JSON.parse(xmlhttp.responseText);

        //put appropriate info into the textboxes of create.html
        document.getElementById("img_type").value = response_array[0];
        document.getElementById("article_folder").value = "series";
        document.getElementById("in_the_url").value = response_array[1];


  } }


  xmlhttp.open("GET","/comic_setup.php",true);
  xmlhttp.send();


};

function CreateWriterSections() {

  CreateSection(8, "white", "black", 34, "<center><button id='comic_setup_button' onclick='get_comic_info()'>SERIES</button></center>");

  CreateSection(7, "white", "black", 34, MakeTableQ("<textarea id='title_header' class='smalltext' onclick=''>tab title and main header</textarea>","<textarea id='sub_header' class='smalltext'>sub header and category NO PUNCTUATION only spaces</textarea>",206));

  CreateSection(6, "white", "black", 34, "<center><textarea id='content' class='largetext'>content: need 1 <a href='' target='_blank'>anchor text</a>. Use <p> tags between paragraphs. 300 characters MINIMUM</textarea></center>");

  CreateSection(5, "white", "black", 34, MakeTableQ("<textarea id='twitter_card_title' class='smalltext'>twitter card title</textarea>","<textarea id='twitter_card_desc' class='smalltext'>twitter card description</textarea>",206));

  CreateSection(4, "white", "black", 34, MakeTableQ("<textarea id='img_type' class='smalltext'>img type (number for series)</textarea>","<textarea id='img_alt' class='smalltext'>img alt</textarea>",206));

  CreateSection(3, "white", "black", 34, MakeTableQ("<textarea id='meta' class='smalltext'>meta description</textarea>","<textarea id='tab_extras' class='smalltext'>: extra words for tab title</textarea>",206));

  CreateSection(2, "white", "black", 34, MakeTableQ("<textarea id='article_folder' class='smalltext'>folder</textarea>","<textarea id='in_the_url' class='smalltext'>actual title (if comic, make image name without extension)</textarea>",206)+"<br>");

  CreateSection(1, "white", "black", 34, "<center><button id='send' onclick='send_text_to_server()'><span>SEND </span></button><br><input id='password' type='password'></center>");

  CreateSection(0, "white", "black", 34, "<center><div id='receiver'></div></center>");

  CreateSection("FOOTER","white","black",25,"<br><br><br><center><canvas id='footer_canvas' class='footer_canvas' width='960' height='20'></canvas>Day "+diffDays+" / 365, "+year+" </center>");

  DrawFooter();





}



function send_text_to_server() {

    if ( document.getElementById("img_type").value == "" || document.getElementById("password").value == "" ) { return };
    function sanitize(a) {
            if (a.indexOf("+") !== -1) {
            a = a.split("+").join("%2B") };
            a = encodeURIComponent(a);
            if (a.indexOf("'") !== -1) {
            a = a.split("'").join("τ") };
            return a; };

    var img_type = document.getElementById("img_type").value;
    var password = sanitize(document.getElementById("password").value);
    var title_header = sanitize(document.getElementById("title_header").value);
    var sub_header = sanitize(document.getElementById("sub_header").value);
    var in_the_url = sanitize(document.getElementById("in_the_url").value);
    var tab_extras = sanitize(document.getElementById("tab_extras").value);
    var meta = sanitize(document.getElementById("meta").value);
    var img_alt = sanitize(document.getElementById("img_alt").value);
    var twitter_card_desc = sanitize(document.getElementById("twitter_card_desc").value);
    var twitter_card_title = sanitize(document.getElementById("twitter_card_title").value);
    var content = sanitize(document.getElementById("content").value);
    var article_folder = document.getElementById("article_folder").value;






          var xmlhttp;

            if (window.XMLHttpRequest)
            {       // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
                           }
                else
            {       // code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                                 }

            xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {




            document.getElementById("send").innerHTML = "<span>SENT </span>";
            document.getElementById("receiver").innerHTML = xmlhttp.responseText;





            } };





                  xmlhttp.open("POST","/create_file.php",true);
                  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                  xmlhttp.send('content=' + content + '&' + 'twitter_card_desc=' + twitter_card_desc + '&' + 'twitter_card_title=' + twitter_card_title + '&' + 'article_folder=' + article_folder + '&' + 'sub_header=' + sub_header + '&' + 'img_alt=' + img_alt + '&' + 'meta=' + meta + '&' + 'tab_extras=' + tab_extras + '&' + 'in_the_url=' + in_the_url + '&' + 'title_header=' + title_header + '&' + 'password=' + password + '&' + 'img_type=' + img_type);

  };

  var navigation_array;
  var right_link;
  var left_link;
  var xmlhttp;

    function activate_arrows() {

      var response;

      var img_type_from_document_html = new XMLSerializer().serializeToString(document);
      img_type_from_document_html = img_type_from_document_html.slice(img_type_from_document_html.indexOf("<!--")+4,img_type_from_document_html.indexOf("-->"));

      console.log(img_type_from_document_html);

        if (window.XMLHttpRequest)
        {       // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
                       }
            else
        {       // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                             }

        xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {

                response = xmlhttp.responseText;

                if ( response.indexOf("<") != -1 ) {

                    console.log(response);

                    return;

                };

                navigation_array = JSON.parse(xmlhttp.responseText);

                if ( navigation_array[0] == 0 ) {

                  document.getElementById("post_previous").onclick = function() {

                    window.location.href = "https://abradley.io";

                  }

                  document.getElementById("post_next").onclick = function() {

                    go_to(navigation_array[1]);

                  }


                } else if ( navigation_array[1] == 0 ) {

                  document.getElementById("post_previous").onclick = function() {

                    go_to(navigation_array[0]);

                  }

                  document.getElementById("post_next").onclick = function() {

                    window.location.href = "https://abradley.io";


                  }



                } else {

                  document.getElementById("post_previous").onclick = function() {

                    go_to(navigation_array[0]);

                  }

                  document.getElementById("post_next").onclick = function() {

                    go_to(navigation_array[1]);


                  }

                };


        } };


            xmlhttp.open("POST","/activate_arrows.php",true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send('img_type=' + img_type_from_document_html);



    };




  function CreateDivs(html) {

      var divs = document.createElement('div');
      divs.innerHTML = html;
      document.getElementById("rollout").appendChild(divs);

    };



var tags = [];


  function CreateTagSpans(html,s,sp) {

      var spans = document.createElement('span');
      if (s == 1) {
      spans.className = "w3-tag w3-light-grey w3-small w3-margin-bottom"; }
      if (s == 2) {
      spans.className = "w3-tag w3-black w3-margin-bottom"; }
      if (s == 0) {
      spans.className = "w3-tag w3-white w3-margin-bottom"; }
      spans.innerHTML = html;
      document.getElementById("tagp").appendChild(spans);


        if ( s != 0 ) {

              spans.id = html;

              if ( sp != 1 ) {

                  document.getElementById(html).onclick = function() {
                    MTA(html)
                  };

                  spans.style="cursor: pointer;";

              };


        };

    };


    function FPR() {

      var myNode = document.getElementById("rollout");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }

      document.getElementById("rollout").innerHTML = ' <div class="w3-card-4 w3-margin w3-white"></div>';


    };

    function MTA(x) {

        var ft;

        FPR();

        document.getElementById(x).className = "w3-tag w3-black w3-margin-bottom";

        CreateDivs(top_post);

        var counter = 0;

        while ( counter < tags.length ) {

          if ( tags[counter] != x ) {

            document.getElementById(tags[counter]).className = "w3-tag w3-light-grey w3-small w3-margin-bottom";

          };

        counter++; };

        counter = 0;

        while ( counter < archive.length ) {

          ft = archive[counter].slice(archive[counter].indexOf("$")+1,archive[counter].indexOf(":"));

          if ( ft == x ) {

          cut_post = archive[counter].slice(archive[counter].indexOf(":")+1,archive[counter].length);

          CreateDivs(cut_post); };

        counter++; };


    };


    function go_to(x) {

      window.location.href = 'https://abradley.io/articles/series/' + x + ".html";

    };

    function intro_arrow() {

      var response;

      if (window.XMLHttpRequest)
      {       // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
                     }
          else
      {       // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                           }

      xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {

        response = xmlhttp.responseText;

        if ( response.indexOf("<") != -1 ) {

            console.log(response);

        } else {

        document.getElementById("home_next").onclick = function() {

          go_to(response);

        } };


      } };

      xmlhttp.open("POST","/activate_arrows.php",true);
      xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xmlhttp.send('img_type=0');

    };

    function return_home() {

      window.location.href = 'https://abradley.io/'

    };

    function go_github() {

      window.location.href = 'https://github.com/abradley201'

    };

    function go_twitter() {

      window.location.href = 'https://twitter.com/abradley201'

    };

    function go_linkedin() {

      window.location.href = 'https://linkedin.com/in/abradley201/'

    };
