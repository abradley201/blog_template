<?php


$to_be_removed = array(".","..",".DS_Store");



$base = scandir("images");
$base = array_values(array_diff($base, $to_be_removed));

$number_check = array();
$number_name = array();

foreach ($base as $value) {

   $num = intval($value);

   if ( $num != 0 ) {

   $img_name = scandir("images/".$num);
   $img_name = array_values(array_diff($img_name, $to_be_removed));

   if ( isset($img_name[1]) == true ) {

     array_push($number_check, $num);

     if (strpos($img_name[0], '.') !== false) {

  $npg = substr($img_name[0],0,strpos($img_name[0],"."));

  $page = file_get_contents('https://abradley.io/articles/series/'.substr($img_name[0],0,strpos($img_name[0],".")).".html");

  $distance = strpos($page,"<!-- BEGIN CONTENT -->") - strpos($page,'<!-- Blog entry -->') + 250;

  $page = substr($page,strpos($page,'<!-- Blog entry -->'),$distance);

  $page = $page.' . . .<div class="w3-row"><div class="w3-col m8 s12"><p><button onclick="go_to(\''.$npg.'\')" class="w3-button w3-padding-large w3-white w3-border"><b>READ MORE »</b></button></p></div></div></div></div><hr><!-- END BLOG ENTRIES --></div>';

       array_push($number_name, $img_name[0]."$".$img_name[1].":".$page);


     } else {

  $npg = substr($img_name[1],0,strpos($img_name[1],"."));

  $page = file_get_contents('https://abradley.io/articles/series/'.substr($img_name[1],0,strpos($img_name[1],".")).".html");

  $distance = strpos($page,"<!-- BEGIN CONTENT -->") - strpos($page,'<!-- Blog entry -->') + 250;

  $page = substr($page,strpos($page,'<!-- Blog entry -->'),$distance);

  $page = $page.' . . .<div class="w3-row"><div class="w3-col m8 s12"><p><button onclick="go_to(\''.$npg.'\')" class="w3-button w3-padding-large w3-white w3-border"><b>READ MORE »</b></button></p></div></div></div></div><hr><!-- END BLOG ENTRIES --></div>';

       array_push($number_name, $img_name[1]."$".$img_name[0].":".$page);

     };


      };


    };


};




$heroes = array();

$count = count($number_check);

$c = 0;

while ( $c < $count ) {

    array_push($heroes, $number_check[$c]."?".$number_name[$c]);

$c++; };



echo json_encode($heroes);




?>
