<?php


$to_be_removed = array(".","..",".DS_Store");



$base = scandir("images");
$base = array_values(array_diff($base, $to_be_removed));

$number_check = array();


foreach ($base as $value) {

   $num = intval($value);

   if ( $num != 0 ) {

   array_push($number_check, $num);


    };


};

rsort($number_check);

$current_comic_number = $number_check[0];

$current_comic_name = scandir("images/".$current_comic_number);
$current_comic_name = array_values(array_diff($current_comic_name, $to_be_removed));
if ( isset($current_comic_name[1]) == true ) {



  if (strpos($current_comic_name[1], '.') !== false) {

      $current_comic_name = $current_comic_name[1];


  } else {

      $current_comic_name = $current_comic_name[0];


  };



 } else {


   $current_comic_name = $current_comic_name[0];


 };


$current_comic_name = substr($current_comic_name, 0, strrpos($current_comic_name, "."));




$missile_array = array($current_comic_number, $current_comic_name);

echo json_encode($missile_array);



?>
