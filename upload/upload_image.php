<?php

$Err = "";

if ( $_POST['password'] != "p@ssw0rd" ) { die(); };

$to_be_removed = array(".","..",".DS_Store");



if (isset($_FILES["data"]) == true) {


   $thefiles = $_FILES["data"]["tmp_name"];
   $fileType = $_FILES['data']['type'];
   $fileSize = $_FILES['data']['size'];
   $fn = $_FILES['data']['name'];

   $ufn = $_POST['ufn'];



   $allowedTypes = array(IMAGETYPE_PNG, IMAGETYPE_JPEG, IMAGETYPE_GIF);
   $detectedType = exif_imagetype($thefiles);
   if (in_array($detectedType, $allowedTypes) == false) { $Err = "Your file was rejected by the server: bad file type."; }




if ( filesize($thefiles) > 5000000 ) { $Err = "Your file was rejected by the server: too big."; }

$image = getimagesize($thefiles);
$width = $image[0];
$height = $image[1];

if ($width !== 700 || $height !== 220) { $Err = "There was an error. Please try again."; }  } else { $Err = " No image found."; }




if ( $Err == "" ) {


  $dir = "../images";

  $current_img_types = scandir($dir);
  $current_img_types = array_values(array_diff($current_img_types, $to_be_removed));
  $number_check = array();


  foreach ($current_img_types as $value) {

     $num = intval($value);

     if ( $num != 0 ) {

     array_push($number_check, $num);


      };


  };

  rsort($number_check);

  if ( count($number_check) == 0 ) { $current_comic_number = 0; } else {

  $current_comic_number = $number_check[0]; }

  $np = $current_comic_number + 1;

  mkdir($dir."/".$np);

  if(move_uploaded_file($thefiles, $dir."/".$np."/".$ufn))
      { echo 'Uploaded'; }
  else
      { echo "Not Uploaded"; }


  } else { echo $Err; };





?>
