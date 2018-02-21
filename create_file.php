<?php

date_default_timezone_set('America/New_York');


function sanitize($post) {
$post = str_replace("Ï„", "'", $post);
$post = str_replace("τ", "'", $post);
$post = preg_replace("/\s+/", " ", $post);
return $post;
};

function content_sanitize($post) {
$post = str_replace("Ï„", "'", $post);
$post = str_replace("τ", "'", $post);
$post = str_replace("%2B","+", $post);
return $post;
};

$to_be_removed = array(".","..",".DS_Store");


// foreach ($image_choices as $value) {
//   echo "$value <br>";
// };


//need at least one external link <a href="http://www.google.com/" target="_blank">"yo"!</a>



$img_type = $_POST["img_type"];
$img_type = preg_replace('~[^a-zA-Z0-9]+~', '', $img_type);
if (empty($img_type) === TRUE) { die("invalid image type"); };

$password = sanitize($_POST["password"]);

$title_header = sanitize($_POST["title_header"]);
$sub_header = sanitize($_POST["sub_header"]);

$article_folder = $_POST["article_folder"];
$article_folder = preg_replace('~[^a-zA-Z0-9]+~', '', $article_folder);
if (empty($article_folder) === TRUE) { die("invalid folder name"); };

$in_the_url = $_POST["in_the_url"];
$in_the_url = str_replace(' ', '_', $in_the_url);
function validate_alphanumeric_underscore($str)
{ return preg_match('/^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/',$str); };
if ( validate_alphanumeric_underscore($in_the_url) == 0 ) { die("invalid file name"); };


$tab_extras = sanitize($_POST["tab_extras"]);
$meta = sanitize($_POST["meta"]);
$img_alt = sanitize($_POST["img_alt"]);
$twitter_card_title = sanitize($_POST["twitter_card_title"]);
$twitter_card_desc = sanitize($_POST["twitter_card_desc"]);
$content = content_sanitize($_POST["content"]);


$base = scandir("articles");
$base = array_values(array_diff($base, $to_be_removed));


if ( in_array($article_folder, $base) === FALSE ) {

      mkdir("articles/".$article_folder);

 };

$page_url = 'https://www.abradley.io/articles/'.$article_folder.'/'.$in_the_url.'.html';



$dir = "images";

$current_img_types = scandir($dir);
$current_img_types = array_values(array_diff($current_img_types, $to_be_removed));



if ( in_array($img_type, $current_img_types) === FALSE ) { die("invalid image type"); } else {

  $image_choices = scandir($dir."/".$img_type);
  $image_choices = array_values(array_diff($image_choices, $to_be_removed));

  if (count($image_choices) == 0) { die("no images found"); };
  if (count($image_choices) >= 2) { die("img type folder full"); };


  $rand = rand(0, count($image_choices) - 1);

  $img = '"https://abradley.io/'.$dir.'/'.$img_type.'/'.$image_choices[$rand].'"';
  $img_url = 'https://abradley.io/'.$dir.'/'.$img_type.'/'.$image_choices[$rand];
  $img_date = filectime($_SERVER["DOCUMENT_ROOT"].'/'.$dir.'/'.$img_type.'/'.$image_choices[$rand]);
  $img_date = date('m/d/Y H:i:s A', $img_date);
  $img_date = explode(' ', $img_date);

};






if ( $password != "p@ssw0rd" ) { die(" "); } else {

      $twitter_card_img = 'https://abradley.io/'.$dir.'/twitter_cards/math.gif';

      $twitter_card = '<meta name="twitter:card" content="summary"><meta name="twitter:url" content="'.$page_url.'"><meta name="twitter:title" content="'.$twitter_card_title.'"><meta name="twitter:description" content="'.$twitter_card_desc.'"><meta name="twitter:image" content="'.$twitter_card_img.'">';

      $file_title = $in_the_url.'.html';

      $start = '<html lang="en"><head><!--'.$img_type.'--><meta charset="utf-8"><title>'.$title_header.': '.$tab_extras.'</title><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"><style>body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif} body {font-size: 125%} code { display: block; width: 90%; margin: auto; background:#F8F8FF; border:black solid 1px; white-space: pre-wrap; word-break: break-all; padding:6px } img.b { display: block; width: 50%; margin: auto } img.bb { display: block; width: 90%; margin: auto }</style><script src="/javascript.js"></script><link rel="icon" type="image/png" href="/favicon.ico">';


      $meta_desc = '<meta name="description" content="'.$meta.'">'.$twitter_card.'<link rel="canonical" href="'.$page_url.'"></head><body class="w3-light-grey" onload="CreateArchive(1);activate_arrows()"><div class="w3-content" style="max-width:1400px">';


        $header = '<!-- Grid -->
        <div class="w3-row">

        <!-- Blog entries -->
        <div id="rollout" class="w3-col l8 s12">
          <!-- Blog entry -->
          <div class="w3-card-4 w3-margin w3-white">
            <img src='.$img.' alt="'.$img_alt.'" style="width:100%">
            <div class="w3-container">
              <h3><b>'.$title_header.'</b></h3>
              <h5>'.$sub_header.'<span class="w3-opacity"><br>'.$img_date[0].'<br>'.$img_date[1].' EST</span></h5>
            </div>

            <div class="w3-container"><!-- BEGIN CONTENT -->
              '.$content.'
            </div>
          </div>
          <hr>
        <!-- END BLOG ENTRIES -->
        </div>

        <!-- Introduction menu -->
        <div class="w3-col l4">
          <!-- About Card -->
          <div class="w3-card-2 w3-margin w3-margin-top">
          <img src="https://abradley.io/face.png" style="width:100%">
            <div class="w3-container w3-white">
              <h4><b>Andrew Bradley</b></h4>
              <p>Full stack developer and data scientist living in the Greater Boston area. Always keeping up to date with the latest technological trends and has a passion for educating others about the emerging fields of data-driven machine learning and prediction analysis.</p>
            </div>
          </div><hr>

          <!-- Posts -->
          <div class="w3-card-2 w3-margin">
            <div class="w3-container w3-padding">
              <h4>Menu</h4>
            </div>
            <ul class="w3-ul w3-hoverable w3-white">
              <li onclick="return_home();" class="w3-padding-16" style="cursor: pointer;">
                <img src="/logos/home.png" alt="Image" class="w3-left w3-margin-right" style="width:50px">
                <span class="w3-large">Home</span><br>
                <span>Return to index.html</span>
              </li>
              <li class="w3-padding-16">
                <img src="/logos/email.png" alt="Image" class="w3-left w3-margin-right" style="width:50px">
                <span class="w3-large">Email</span><br>
                <span>abradley201@gmail.com</span>
              </li>
            </ul>
          </div>
          <hr>

          <!-- Labels / tags -->
          <div class="w3-card-2 w3-margin">
            <div class="w3-container w3-padding">
              <h4>Tags</h4>
            </div>
            <div class="w3-container w3-white">
            <p id="tagp">
            </p>
            </div>
          </div>

        <!-- END Introduction Menu -->
        </div>

        <!-- END GRID -->
        </div><br>

        <!-- END w3-content -->
        </div>';



      $footer = '<footer class="w3-container w3-dark-grey w3-padding-32 w3-margin-top">
        <button id="post_previous" class="w3-button w3-black w3-padding-large w3-margin-bottom">Previous</button>
        <button id="post_next" class="w3-button w3-black w3-padding-large w3-margin-bottom">Next »</button>
      </footer>';

      $file_guts = $start.$meta_desc.$header.$footer.'</body></html>';


      $sub_header = strtolower(str_replace(' ', '_', $sub_header));
      if ( validate_alphanumeric_underscore($sub_header) == 0 ) { die("invalid sub header"); };

      if ( @fopen('articles/'.$article_folder.'/'.$file_title,"r") != false ) { die("file name not unique"); };


      if (mkdir($dir.'/'.$img_type.'/'.$sub_header) && file_put_contents('articles/'.$article_folder.'/'.$file_title, $file_guts)) {

      echo "success<br><a href='".$page_url."'>".$page_url."</a>"; } else { echo "failure"; };



 };





?>
