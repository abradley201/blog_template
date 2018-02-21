<?php


$to_be_removed = array(".","..",".DS_Store");


$img_type = $_POST["img_type"];

if ( is_numeric($img_type) == false ) { die("<invalid>"); };



if ( $img_type == 0 ) {


  $image_choices = scandir("images/1");
  if ($image_choices == FALSE) { die("<no 1st post found>"); };
  $image_choices = array_values(array_diff($image_choices, $to_be_removed));
  if ( isset($image_choices[1]) == true ) {

    if (strpos($image_choices[1], '.') !== false) {

        $image_choices = $image_choices[1];

    } else {

        $image_choices = $image_choices[0];

    };

  } else {

    $image_choices = $image_choices[0];

  };

  $image_choices = substr($image_choices, 0, strrpos($image_choices, "."));

  echo $image_choices;



} else {



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

if ( $img_type == 1 ) {

  $image_choices = scandir("images/2");
  if ($image_choices == FALSE) { die("<no 2nd post found>"); };
  $image_choices = array_values(array_diff($image_choices, $to_be_removed));
  if ( isset($image_choices[1]) == true ) {


    if (strpos($image_choices[1], '.') !== false) {

        $image_choices = $image_choices[1];


    } else {

        $image_choices = $image_choices[0];


    };


   } else {

     $image_choices = $image_choices[0];

   };

  $image_choices = substr($image_choices, 0, strrpos($image_choices, "."));


  $image_choices = array(0, $image_choices);

  echo json_encode($image_choices);


} else if ( $img_type == $current_comic_number ) {

  $previous = $img_type - 1;

  $image_choices = scandir("images/".$previous);
  $image_choices = array_values(array_diff($image_choices, $to_be_removed));
  if ( isset($image_choices[1]) == true ) {

    if (strpos($image_choices[1], '.') !== false) {

        $image_choices = $image_choices[1];


    } else {

        $image_choices = $image_choices[0];


    };

   } else {

     $image_choices = $image_choices[0];

   };
  $image_choices = substr($image_choices, 0, strrpos($image_choices, "."));


  $image_choices = array($image_choices,0);

  echo json_encode($image_choices);


} else {

  $previous = $img_type - 1;
  $next = $img_type + 1;


  $image_choices = scandir("images/".$previous);
  $image_choices = array_values(array_diff($image_choices, $to_be_removed));
  if ( isset($image_choices[1]) == true ) {

    if (strpos($image_choices[1], '.') !== false) {

        $image_choices = $image_choices[1];


    } else {

        $image_choices = $image_choices[0];


    };

  } else {

    $image_choices = $image_choices[0];

  };
  $image_choices = substr($image_choices, 0, strrpos($image_choices, "."));

  $image_choices2 = scandir("images/".$next);
  $image_choices2 = array_values(array_diff($image_choices2, $to_be_removed));
  if ( isset($image_choices2[1]) == true ) {

    if (strpos($image_choices2[1], '.') !== false) {

        $image_choices2 = $image_choices2[1];


    } else {

        $image_choices2 = $image_choices2[0];


    };

  } else {

    $image_choices2 = $image_choices2[0];

  };
  
  $image_choices2 = substr($image_choices2, 0, strrpos($image_choices2, "."));



  $image_choices = array($image_choices, $image_choices2);

  echo json_encode($image_choices);

}

};

?>
