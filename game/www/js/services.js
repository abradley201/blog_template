angular.module('app.services', [])



.service('homeData', function($state){

        return {

            StartTest: function () {

              var test_data = JSON.parse(window.localStorage.getItem('test_data'));

              if ( test_data == null ) {

                          $state.go("menu.setup");

              } else if ( test_data.dimension == 1 ) {

                          $state.go("horizontal");

              } else { $state.go("circles") };


              return test_data;

                      } };

})

.service('devData', function($state){

        return {

            GetDevs: function () {

                $state.go("devs");

                      } };

})





.service('setupData', [function(){

        return {

              toggleData: function () {

                  vm = this;
                  vm.foo = false;
                  vm.bar = false;
                  vm.setFoo = function() {
                    if ( vm.foo == false ) { vm.foo = true } else { vm.foo = false };
                  };
                  vm.setBar = function() {
                    if ( vm.bar == false ) { vm.bar = true } else { vm.bar = false };
                  };


                  return vm } };


}])



.service('setupData_c', [function(){

        return {

              toggleData: function () {

                cm = this;
                cm.coo = false;
                cm.car = false;
                cm.setCoo = function() {
                  if ( cm.coo == false ) { cm.coo = true } else { cm.coo = false };
                };
                cm.setCar = function() {
                  if ( cm.car == false ) { cm.car = true } else { cm.car = false };
                };


                  return cm } };


}])


.service('okbutton', function($state, $ionicPopup){

        return {

              go: function () {


                var a_array = [];

                for (var key in localStorage){

                  if ( key.slice(0,10) == "FittsTouch" ) { a_array.push(parseInt(key.slice(12,key.indexOf("✝")))) };

                };



                var test_already = JSON.parse(window.localStorage.getItem('test_data'));
                if ( test_already != null ) {



                  if ( test_already.dimension == 1 ) {

                              data_object = test_already; $state.go("horizontal");

                  } else { data_object = test_already; $state.go("circles") };



                } else {

                var block_code;


                if ( a_array.length == 0 ) { block_code = 0 } else { a_array.sort(function(a,b){return a - b}); block_code = a_array[a_array.length - 1] + 1 };



                //FittsTouch-P10-S08-B01-G03-C02-2D.sd1
                //Make sure these inputs only accept integers
                //Letters for participant, session, etc. are added when making CSV files



                data_object = {
                  handedness: document.getElementById("setup-select1").value,
                  grip_span: parseInt(document.getElementById("setup-select2").value, 10),
                  group: parseInt(document.getElementById("setup-select_group").value, 10),
                  block_code: block_code,
                  condition: parseInt(document.getElementById("setup-select_condition").value, 10),
                  current_session: 1,
                  session_number: parseInt(document.getElementById("setup-select3").value, 10),
                  participant_number: parseInt(document.getElementById("setup-select4").value, 10),
                  dimension: 1,
                  trial_number: parseInt(document.getElementById("setup-select6").value, 10),
                  circle_number: "N/A",
                  target_amplitude: parseInt(document.getElementById("setup-select8").value, 10),
                  target_width: parseInt(document.getElementById("setup-select9").value, 10),
                  vibrotactile_feedback: vm.foo,
                  auditory_feedback: vm.bar
                  };


                  var input_check = [data_object.grip_span, data_object.group, data_object.condition, data_object.session_number, data_object.participant_number, data_object.trial_number, data_object.target_amplitude, data_object.target_width];

                  function check_values(array) {
                    return array >= 0;
                  };

                  if ( input_check.every(check_values) == false ) {

                    var endPopup = $ionicPopup.show({
                          title: 'Error',
                          template: "All inputs must be a positive integer or zero",
                          buttons: [
                              { text: 'OK',
                                onTap: function(e){

                                }
                            }]})
                                      return data_object };



            if ( data_object.dimension == 1 && parseInt(data_object.target_width) > parseInt(data_object.target_amplitude) ) {

              var endPopup = $ionicPopup.show({
                    title: 'Error',
                    template: "Target Width cannot exceed Distance Btw Targets in this mode.",
                    buttons: [
                        { text: 'OK',
                          onTap: function(e){

                          }
                      }]})
                                return data_object };


            if ( data_object.session_number == 0 ) {

              var endPopup = $ionicPopup.show({
                    title: 'Error',
                    template: "session number cannot be zero",
                    buttons: [
                        { text: 'OK',
                          onTap: function(e){

                          }
                      }]})
                                return data_object };


            if ( data_object.target_amplitude == 0 || data_object.target_width == 0 ) {

                var endPopup = $ionicPopup.show({
                    title: 'Error',
                    template: "Distance Btw Targets and Target Width must both be greater than zero.",
                    buttons: [
                         { text: 'OK',
                            onTap: function(e){

                            }
                        }]})
                                return data_object };



            if ( data_object.target_amplitude > window.innerWidth ) {

            var endPopup = $ionicPopup.show({
              title: 'Error',
              template: "Distance Btw Targets cannot exceed device width: "+window.innerWidth+"px",
              buttons: [
                        { text: 'OK',
                          onTap: function(e){

                            }
                        }]})
                                return data_object };



            localStorage.setItem('test_data', JSON.stringify(data_object));

            var test_data = JSON.parse(window.localStorage.getItem('test_data'));

            if ( test_data == null ) {

                        $state.go("menu.home");

            } else if ( test_data.dimension == 1 ) {

                        $state.go("horizontal");

            } else { $state.go("circles") };

          };


            return data_object; } };

})

.service('okbutton_c', function($state, $ionicPopup){

        return {

              go: function () {


                var a_array = [];

                for (var key in localStorage){

                  if ( key.slice(0,10) == "FittsTouch" ) { a_array.push(parseInt(key.slice(12,key.indexOf("✝")))) };

                };



                var test_already = JSON.parse(window.localStorage.getItem('test_data'));
                if ( test_already != null ) {


                  if ( test_already.dimension == 1 ) {

                      data_object = test_already; $state.go("horizontal")

                  } else { data_object = test_already; $state.go("circles") };



                } else {


                var block_code;



                if ( a_array.length == 0 ) { block_code = 0 } else { a_array.sort(function(a,b){return a - b}); block_code = a_array[a_array.length - 1] + 1 };


                //FittsTouch-P10-S08-B01-G03-C02-2D.sd1
                //Make sure these inputs only accept integers
                //Letters for participant, session, etc. are added when making CSV files


                  data_object = {
                    handedness: document.getElementById("setup-select1_c").value,
                    grip_span: parseInt(document.getElementById("setup-select2_c").value, 10),
                    group: parseInt(document.getElementById("setup-select_group_c").value, 10),
                    block_code: block_code,
                    condition: parseInt(document.getElementById("setup-select_condition_c").value, 10),
                    current_session: 1,
                    session_number: parseInt(document.getElementById("setup-select3_c").value, 10),
                    participant_number: parseInt(document.getElementById("setup-select4_c").value, 10),
                    dimension: 2,
                    trial_number: "N/A",
                    circle_number: parseInt(document.getElementById("setup-select7_c").value, 10),
                    target_amplitude: parseInt(document.getElementById("setup-select8_c").value, 10),
                    target_width: parseInt(document.getElementById("setup-select9_c").value, 10),
                    vibrotactile_feedback: cm.coo,
                    auditory_feedback: cm.car
                    };

            var input_check = [data_object.grip_span, data_object.group, data_object.condition, data_object.session_number, data_object.participant_number, data_object.circle_number, data_object.target_amplitude, data_object.target_width];

            function check_values(array) {
              return array >= 0;
            };

            if ( input_check.every(check_values) == false ) {

              var endPopup = $ionicPopup.show({
                    title: 'Error',
                    template: "All inputs must be a positive integer or zero",
                    buttons: [
                        { text: 'OK',
                          onTap: function(e){

                          }
                      }]})
                                return data_object };



            if ( data_object.session_number == 0 ) {


              var endPopup = $ionicPopup.show({
                    title: 'Error',
                    template: "session number cannot be zero",
                    buttons: [
                        { text: 'OK',
                          onTap: function(e){

                          }
                      }]})



               return data_object };


               if ( data_object.target_amplitude == 0 || data_object.target_width == 0 ) {

                   var endPopup = $ionicPopup.show({
                       title: 'Error',
                       template: "Distance Btw Targets and Target Width must both be greater than zero.",
                       buttons: [
                            { text: 'OK',
                               onTap: function(e){

                               }
                           }]})
                                   return data_object };


               if ( data_object.target_amplitude > window.innerWidth ) {

               var endPopup = $ionicPopup.show({
                 title: 'Error',
                 template: "Distance Btw Targets cannot exceed device width: "+window.innerWidth+"px",
                 buttons: [
                           { text: 'OK',
                             onTap: function(e){

                               }
                           }]})
                                   return data_object };



            localStorage.setItem('test_data', JSON.stringify(data_object));

            var test_data = JSON.parse(window.localStorage.getItem('test_data'));

            if ( test_data == null ) {

                        $state.go("menu.home");

            } else if ( test_data.dimension == 1 ) {

                        $state.go("horizontal");

            } else {

            $state.go("circles") };

          }

            return data_object; } };

})


.service('Readyset_rectangles', function($location, $window, $state, $ionicPopup){

        return {

            go: function () {


              function reset_test() {

                document.getElementById("start_test").style.display = "block";
                total_clicks = 0;
                hits = 0;
                from_point = [];
                Ae_Array = [];
                Dx_Array = [];
                Time_Array = [];
                Time_Difference_Array = [];
                firstsession = false;
                first_target_hit = false;
                ratio = undefined;
                previous_ratio = undefined;
                previous_hit = [];
                SequenceRepeatCount = 0;



                if (test_data["handedness"] == "Left") {
                  document.getElementById(2).style.backgroundColor="red";
                  document.getElementById(1).style.backgroundColor="white";
                  target = 2;
                      } else {
                  document.getElementById(1).style.backgroundColor="red";
                  document.getElementById(2).style.backgroundColor="white";
                  target = 1;
                };

              };

              needed_data = {};
              previous_hit = [];
              SequenceRepeatCount = 0;

              var audio = new Audio('sounds/audio_feedback.mp3');


              document.getElementById("start_test").style.display = "none";

              var first_target_hit = false;
              var ratio;
              var previous_ratio;
              var first_tap;
              var previous_dx;



              if (typeof firstsession === 'undefined') { firstsession = true };

              test_ongoing = true;


               var test_data = JSON.parse(window.localStorage.getItem('test_data'));

                var rectangle_width = parseInt(test_data["target_width"]);


              document.getElementById(1).style.width = rectangle_width + "px";
              document.getElementById(2).style.width = rectangle_width + "px";


                var amplitude = parseInt(test_data["target_amplitude"]);
                var window_width = window.innerWidth;

                var left_position = window_width / 2 - ((rectangle_width + amplitude) / 2);

              document.getElementById(1).style.left = left_position + "px";

                var right_position = left_position + amplitude;

              document.getElementById(2).style.left = right_position + "px";

              document.getElementById(1).style.display = "block";
              document.getElementById(2).style.display = "block";


              var central_y_lines = ["n/a", Math.round(left_position + rectangle_width / 2), Math.round(right_position + rectangle_width / 2)];
              var central_x_line = ["n/a", document.getElementById(1).offsetHeight / 2, document.getElementById(1).offsetHeight / 2];

              var total_clicks = 0;
              var hits = 0;
              var trial_number = parseInt(test_data["trial_number"]);
              var target;


                  if (test_data["handedness"] == "Left") {
                    document.getElementById(2).style.backgroundColor="red";
                    target = 2;
                        } else {
                    document.getElementById(1).style.backgroundColor="red";
                    target = 1;
                  };


                        function change_target() { if ( target == 1 ) { target = 2; return }; if ( target == 2 ) { target = 1 } };

                        function get_time_difference() {

                          var time_difference = "n/a";

                          if ( Time_Array.length == 2 ) {

                            time_difference = Time_Array[1] - Time_Array[0];

                            Time_Difference_Array.push(time_difference);

                            Time_Array = [Date.now() / 1000];

                          } needed_data.diff = time_difference };


                  function increment_hits( button, trial, hit ) {


                  if ( button != target && first_target_hit == false ) { return };


                  if ( button == target && hit == true ) { hits++;

                    if ( first_target_hit == false ) { first_target_hit = true; first_tap = Date.now(); Time_Array.push(first_tap / 1000); get_time_difference() };

                  };

                    if (test_data["handedness"] == "Right") {

                      if ( button == 1 ) {
                        if ( trial%2 != 1 ) {

                          document.getElementById(1).style.backgroundColor="white";
                          document.getElementById(2).style.backgroundColor="red"

                        } else if ( trial%2 == 1 ) {


                          document.getElementById(2).style.backgroundColor="white";
                          document.getElementById(1).style.backgroundColor="red"

                        }
                      } else if ( button == 2 ) {
                        if ( trial%2 != 1 ) {


                          document.getElementById(1).style.backgroundColor="white";
                          document.getElementById(2).style.backgroundColor="red"

                        } else if ( trial%2 == 1 ) {


                          document.getElementById(2).style.backgroundColor="white";
                          document.getElementById(1).style.backgroundColor="red"

                        }
                      } else {
                        console.log("error");
                      }

                    } else {

                       if ( button == 1 ) {
                         if ( trial%2 != 1 ) {

                           document.getElementById(2).style.backgroundColor="white";
                           document.getElementById(1).style.backgroundColor="red"

                         } else if ( trial%2 == 1 ) {

                           document.getElementById(1).style.backgroundColor="white";
                           document.getElementById(2).style.backgroundColor="red"

                         }
                       } else if ( button == 2 ) {
                         if ( trial%2 != 1 ) {

                           document.getElementById(2).style.backgroundColor="white";
                           document.getElementById(1).style.backgroundColor="red"

                         } else if ( trial%2 == 1 ) {

                           document.getElementById(1).style.backgroundColor="white";
                           document.getElementById(2).style.backgroundColor="red"

                         }
                       } else {
                         console.log("error");
                       }

                    } };

            if ( firstsession == true ) {

              document.getElementById(1).addEventListener("touchend", function(){ increment_hits(1, total_clicks, true) });
              document.getElementById(2).addEventListener("touchend", function(){ increment_hits(2, total_clicks, true) });

            };


              var from_point = [];

              function distance(to_point) {

                var a = from_point[0] - to_point[0];
                var b = from_point[1] - to_point[1];

                var c = Math.sqrt( a*a + b*b );

                return parseFloat(c);

              };

              function dist(from_point,to_point) {

                var a = from_point[0] - to_point[0];
                var b = from_point[1] - to_point[1];

                var c = Math.sqrt( a*a + b*b );

                return parseFloat(c);

              };

              var Ae_Array = [];
              var Dx_Array = [];
              var Time_Array = [];
              var Time_Difference_Array = [];
              var dx;



      if ( firstsession == true ) {

        setTimeout(function(){ document.getElementsByTagName('BODY')[0].addEventListener("touchstart", function (e) {

                //e.preventDefault();


                needed_data.time_down = Date.now();
                needed_data.x_down = e.touches[0].clientX;
                needed_data.y_down = e.touches[0].clientY;


         }); }, 2);


         setTimeout(function(){ document.getElementsByTagName('BODY')[0].addEventListener("touchend", function (e) {


                  needed_data.time_up = Date.now();
                  needed_data.x_up = e.changedTouches[0].pageX;
                  needed_data.y_up = e.changedTouches[0].pageY;

                  if ( first_target_hit == false || test_ongoing == false ) { return };



                                function calc_dx(t) {

                                     dx = e.changedTouches[0].pageX - central_y_lines[t];

                                     if ( t == 1 ) { dx = dx * -1 };

                                     return dx;

                                };


                                  if ( from_point.length == 0 ) {

                                            from_point = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];

                                            needed_data.dx = undefined;

                                            needed_data.to = target;

                                            needed_data.from = 0;

                                        } else {

                                            if ( Ae_Array.length < trial_number - 1 ) {

                                                 Dx_Array.push(calc_dx(target));

                                                 needed_data.dx = calc_dx(target);

                                                 console.log(needed_data.dx);

                                                 needed_data.to = target;

                                                 if ( target == 1 ) { needed_data.from = 2 } else { needed_data.from = 1 };


                                                 if (typeof previous_dx != 'undefined') { Ae_Array.push(calc_dx(target) + amplitude + previous_dx) } else { Ae_Array.push(calc_dx(target) + amplitude) };

                                                 Time_Array.push(Date.now() / 1000);

                                                 get_time_difference();

                                                 previous_dx = calc_dx(target);



                                             };

                                            from_point = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];

                                        };


                                increment_hits(target, total_clicks, false);


                                change_target();

                                total_clicks++;



                                ratio = hits / total_clicks;

                                if ( typeof previous_ratio == "undefined" ) {

                                  needed_data.miss = 0;


                                  if ( ratio == 0 ) {

                                    //make sound and/or vibrate

                                    //if ( test_data["vibrotactile_feedback"] == true ) { navigator.vibrate(5) };

                                    if ( test_data["auditory_feedback"] == true ) { audio.play() };

                                    needed_data.miss = 1;


                                  };

                                } else {


                                  if ( ratio < previous_ratio ) {

                                    needed_data.miss = 1;

                                    //make sound and/or vibrate

                                    //if ( test_data["vibrotactile_feedback"] == true && test_ongoing == true ) { navigator.vibrate(5) };

                                    if ( test_data["auditory_feedback"] == true && test_ongoing == true ) { audio.play() };


                                  } else { needed_data.miss = 0 };


                                };

                                previous_ratio = ratio;



                                if ( typeof needed_data.dx == "undefined" ) { needed_data.dx = "n/a" };

                                function assemble_sd1_data() {

                                  if (previous_hit.length > 0){
                                  if (dist([previous_hit[previous_hit.length-1][0],previous_hit[previous_hit.length-1][1]],[needed_data.x_up,needed_data.y_up]) < amplitude / 50) { SequenceRepeatCount = 1 };
                                  };

                                  var sd1_data = {
                                    a:test_data["participant_number"], //Participant
                                    b:test_data["session_number"], //Session
                                    c:test_data["block_code"], //Block
                                    d:test_data["group"], //Group
                                    e:test_data["condition"], //Condition
                                    x:test_data["handedness"], //Left or Right
                                    y:test_data["grip_span"], //Grip Span
                                    f:"1D", //Mode
                                    g:total_clicks-1, //Trials
                                    h:amplitude, //Amplitude
                                    i:rectangle_width, //Width
                                    j:central_x_line[needed_data.from], //From_X
                                    k:central_y_lines[needed_data.from], //From_Y
                                    l:central_x_line[needed_data.to], //Target_X
                                    m:central_y_lines[needed_data.to], //Target_Y
                                    n:needed_data.x_down, //FingerDown_X
                                    o:needed_data.y_down, //FingerDown_Y
                                    p:needed_data.x_up, //Select_X
                                    q:needed_data.y_up, //Select_Y
                                    r:needed_data.dx, //Dx
                                    s:dist([needed_data.x_down,needed_data.y_down],[needed_data.x_up,needed_data.y_up]), //FingerDownUpDelta
                                    t:(needed_data.time_up - needed_data.time_down), //FingerDownUpTime(ms)
                                    u:dist([needed_data.x_up,needed_data.y_up],[central_x_line[needed_data.to],central_y_lines[needed_data.to]]), //DistanceFromTargetCenter
                                    v:needed_data.miss, //Misses
                                    w:needed_data.diff, //Difference between previous selection and now
                                    z:Date.now() //Used for ordering data in the CSV file
                                  };

                                  localStorage.setItem('FittsTouch_B'+test_data["block_code"]+'✝'+(total_clicks - 1)+"✟"+test_data["current_session"], JSON.stringify(sd1_data));

                                  previous_hit.push([needed_data.x_up,needed_data.y_up]);

                                  needed_data = {}; //Clear needed_data for next trial

                                };

                                assemble_sd1_data();





                                //Below is code for the end of a session





                                if ( total_clicks == trial_number ) {


                                  document.getElementById(1).style.display = "none";
                                  document.getElementById(2).style.display = "none";

                                  test_ongoing = false;


                                  setTimeout(function(){

                                  var time_end = Date.now();

                                  var isArray = function (obj) {
                  	                   return Object.prototype.toString.call(obj) === "[object Array]";
                                        },

                                        getNumWithSetDec = function( num, numOfDec ){
                  	                       var pow10s = Math.pow( 10, numOfDec || 0 );
                  	                        return ( numOfDec ) ? Math.round( pow10s * num ) / pow10s : num;
                                          },
                                          getAverageFromNumArr = function( numArr, numOfDec ){
                  	                         if( !isArray( numArr ) ){ return false;	}
                  	                          var i = numArr.length,
                  		                          sum = 0;
                  	                             while( i-- ){
                  		                               sum += numArr[ i ];
                  	                                }
                  	                                 return getNumWithSetDec( (sum / numArr.length ), numOfDec );
                                                   },
                                                   getVariance = function( numArr, numOfDec ){
                  	                                  if( !isArray(numArr) ){ return false; }
                  	                                   var avg = getAverageFromNumArr( numArr, numOfDec ),
                  		                                   i = numArr.length,
                  		                                     v = 0;

                  	                                        while( i-- ){
                  		                                          v += Math.pow( (numArr[ i ] - avg), 2 );
                  	                                           }
                  	                                            v /= numArr.length;
                  	                                             return getNumWithSetDec( v, numOfDec );
                                                               },
                                                               getStandardDeviation = function( numArr, numOfDec ){
                  	                                              if( !isArray(numArr) ){ return false; }
                  	                                               var stdDev = Math.sqrt( getVariance( numArr, numOfDec ) );
                  	                                                return getNumWithSetDec( stdDev, numOfDec );
                                                                  };

                                                                              function getSum(total, num) {
                                                                                  return total + num;
                                                                                    };


                                  var Ae = (Ae_Array.reduce(getSum) / Ae_Array.length);
                                  var We = (4.133 * getStandardDeviation(Dx_Array, 2));
                                  var IDe = Math.log2(Ae / We + 1);
                                  var Throughput = calc_TP();




                                  function calc_TP() {

                                    var TP;

                                    TP = (Time_Difference_Array.reduce(getSum) / Time_Difference_Array.length)

                                    return TP;


                                  };


                                  var results_object = {


                                    Participant_number: test_data["participant_number"],
                                    Current_session: test_data["current_session"],
                                    Session_number: test_data["session_number"],
                                    Hits: hits,
                                    Trials: trial_number,
                                    Misses: trial_number - hits,
                                    MT: (Time_Difference_Array.reduce(getSum) / Time_Difference_Array.length).toFixed(2),
                                    Amplitude: amplitude,
                                    Width: rectangle_width,
                                    ID: Math.log2(amplitude / rectangle_width + 1).toFixed(2),
                                    Ae: Ae.toFixed(2),
                                    We: We.toFixed(2),
                                    IDe: IDe.toFixed(2),
                                    Throughput: (IDe / Throughput).toFixed(2) + " bps"


                                  };

                                  function assemble_sd2_data() {


                                    var sd2_data = {
                                      a:test_data["participant_number"], //Participant
                                      b:test_data["session_number"], //Session
                                      c:test_data["block_code"], //Block
                                      d:test_data["group"], //Group
                                      e:test_data["condition"], //Condition
                                      x:test_data["handedness"], //Left or Right
                                      y:test_data["grip_span"], //Grip span
                                      f:"1D", //Mode
                                      g:trial_number, //Trials
                                      h:SequenceRepeatCount, //Sequence Repeat Count
                                      i:amplitude, //Amplitude
                                      j:rectangle_width, //Width
                                      k:Math.log2(amplitude / rectangle_width + 1), //ID
                                      l:Ae, //Ae
                                      m:We, //We
                                      n:IDe, //IDe
                                      o:(Time_Difference_Array.reduce(getSum) / Time_Difference_Array.length), //MT(ms)
                                      p:(results_object["Misses"] / trial_number) * 100, //Error Rate
                                      q:(IDe / Throughput) //Throughput
                                    };


                                    if ( SequenceRepeatCount == 1 ) {

                                      var error_popup = $ionicPopup.show({
                                            title: 'Error',
                                            template: "Double tap detected! You must repeat!",
                                            buttons: [
                                                { text: 'OK',
                                                  onTap: function(e){

                                                  }
                                              }]})

                                    } else {

                                        localStorage.setItem('FittsTouch_B'+test_data["block_code"]+'✝'+test_data["current_session"]+'✟sd2', JSON.stringify(sd2_data));

                                    };


                                  };

                                  assemble_sd2_data();

                                  var endPopup = $ionicPopup.show({
                                  			title: 'Results',
                                  			template: "Participant: " + results_object["Participant_number"] +
                                        "<br>Sequence " + results_object["Current_session"] + " of " + results_object["Session_number"] +
                                        "<br>Number of trials: " + results_object["Trials"] +
                                        "<br>A: " + results_object["Amplitude"] + " px" +
                                        "<br>W: " + results_object["Width"] + " px" +
                                        "<br>ID: " + results_object["ID"] + " bits" +
                                        "<br>-----" +
                                        "<br>Ae: " + results_object["Ae"] + " px" +
                                        "<br>We: " + results_object["We"] + " px" +
                                        "<br>IDe: " + results_object["IDe"] + " bits" +
                                        "<br>MT: " + results_object["MT"] + " sec" +
                                        "<br>Misses: " + results_object["Misses"] +
                                        "<br>Throughput: " + results_object["Throughput"],
                                  			buttons: [
                                  		      {
                                  		        text: 'OK',
                                  		        type: 'button-positive',
                                  		        onTap: function(e) {



                                                if ( SequenceRepeatCount == 0 ) {

                                                test_data["current_session"] = test_data["current_session"] + 1;
                                                localStorage.setItem('test_data', JSON.stringify(test_data)) } else {

                                                  for (var key in localStorage){

                                                    if ( key.slice(0,key.indexOf("✝")) == "FittsTouch_B"+test_data["block_code"] ) {

                                                       if ( parseInt(key.slice(key.indexOf("✟")+1,key.length)) == test_data["current_session"] ) {

                                                      localStorage.removeItem(key) } };

                                                  };


                                                };

                                                if ( test_data["current_session"] <= test_data["session_number"] ) {

                                                  reset_test();

                                                  $state.go("horizontal");

                                                } else {

                                                  reset_test();

                                                  firstsession = undefined;

                                                  localStorage.removeItem('test_data');

                                                  $state.go("menu.home");

                                                }

                                  		        }
                                  		      }
                                  		    ]
                                  		});



                                    }, 2);



                                 };





         }); }, 2);

       };


            return test_data;  } };

})




.service('mtcheck', function(){

      return {

      go: function () {

            if ( window.innerWidth < 1224 ) { return true } else { return false };

      } }

})



.service('Readyset_circles', function($location, $window, $state, $ionicPopup){

        return {

            go: function () {

              function reset_test() {
                document.getElementById("start_test").style.display = "block";
                total_clicks = 0;
                hits = 0;
                Ae_Array = [];
                Dx_Array = [];
                Time_Array = [];
                Time_Difference_Array = [];
                firstsession = false;
                first_target_hit = false;
                last_target = undefined;
                target_counter = 0;
                target = target_array[target_counter];
                ratio = undefined;
                previous_ratio = undefined;
                previous_hit = [];
                SequenceRepeatCount = 0;

              };

              needed_data = {};
              SequenceRepeatCount = 0;
              previous_hit = [];

              var audio = new Audio('sounds/audio_feedback.mp3');

              function distance(from_point, to_point) {

                var a = from_point[0] - to_point[0];
                var b = from_point[1] - to_point[1];

                var c = Math.sqrt( a*a + b*b ); //excel version for sqrt is #^1/2 (or number to the power of 0.5)

                return parseFloat(c);

              };

              function get_time_difference() {

                var time_difference = "n/a";

                if ( Time_Array.length == 2 ) {

                  time_difference = Time_Array[1] - Time_Array[0];

                  Time_Difference_Array.push(time_difference);

                  Time_Array = [Date.now() / 1000];

                } needed_data.diff = time_difference };

              if (typeof firstsession === 'undefined') { firstsession = true };
              var dx;
              var previous_dx;
              var last_target;
              var first_target_hit = false;
              var first_tap;
              var Ae_Array = [];
              var Dx_Array = [];
              var ratio;
              var previous_ratio;


              test_ongoing = true;



              document.getElementById("start_test").style.display = "none";

              var test_data = JSON.parse(window.localStorage.getItem('test_data'));

              var circle_button_width = parseInt(test_data["target_width"]);

              var diameter = parseInt(test_data["target_amplitude"]);

              var radius = diameter / 2;


              var x_center = (window.innerHeight / 2);
              var y_center = (window.innerWidth / 2);



                    var point_array = [];
                    var numberOfPoints = parseInt(test_data["circle_number"]);
                    var angleIncrement = 360 / numberOfPoints;

                        for (i = 0; i < numberOfPoints; i++) {

                          var p = [];
                          p.push(radius * Math.cos((angleIncrement * i) * (Math.PI / 180)));
                          p.push(radius * Math.sin((angleIncrement * i) * (Math.PI / 180)));
                          point_array.push(p);

                        };


                  var counter = 1;

                  while ( counter <= parseInt(test_data["circle_number"]) ) {

                        var btn = document.createElement("button");
                        btn.setAttribute("id", counter);
                        btn.setAttribute("class", "circlebuttons");
                        btn.style.top = x_center - point_array[counter-1][0] - circle_button_width / 2 + "px";
                        btn.style.left = y_center + point_array[counter-1][1] - circle_button_width / 2 + "px";
                        btn.style.width = circle_button_width + "px";
                        btn.style.height = circle_button_width + "px";
                        btn.setAttribute("select_center_x", (y_center + point_array[counter-1][1] - circle_button_width / 2) + circle_button_width / 2);
                        btn.setAttribute("select_center_y", (x_center - point_array[counter-1][0] - circle_button_width / 2) + circle_button_width / 2);
                        document.getElementById("container").appendChild(btn);

                        document.getElementById(counter).addEventListener("touchstart", function(){ change_target(this.id) });

                  counter++ };

                  ////////////////pathfinder//////////
                  ////////////////////////////////////

                  function path_finder(circle_number, handedness) {

                    var options = [0, 0, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
                    if ( handedness == "Right" ) { options.shift() };

                    var start = circle_number - options.indexOf(circle_number);




                    if ( handedness == "Right" ) { options.unshift(0) };

                    var change_array = [options.indexOf(circle_number), (options.indexOf(circle_number) + 1) * -1];

                    if ( handedness == "Right" ) { change_array[0] = change_array[0] * -1; change_array[1] = change_array[1] * -1 };


                    var counter = 0;

                    var current_target = start;

                    function isOdd(num) { return num % 2 };
                    //even returns 0; odd returns 1

                    var path_array = [];

                    while ( counter < circle_number + 1 ) {

                        if ( current_target > circle_number ) { path_array.push(1) } else { path_array.push(current_target) };

                        current_target = current_target + change_array[isOdd(counter)];

                    counter++ };

                    return path_array;

                  };

                  //////////////pathfinder///////////////
                  ///////////////////////////////////////


                  var hits = 0;
                  var Time_Array = [];
                  var Time_Difference_Array = [];


                  var target_array = path_finder(numberOfPoints, test_data["handedness"]);


                  var target_counter = 0;

                  var target = target_array[target_counter];

                  document.getElementById(target).setAttribute("class", "circlebuttons_selected");


                  function change_target(x) {


                        if ( x == target ) { hits++;

                          if ( first_target_hit == false ) { first_target_hit = true;


                           };

                         };


                  };


              var total_clicks = 0;


              setTimeout(function(){ document.getElementsByTagName('BODY')[0].addEventListener("touchstart", function (e) {

                needed_data.time_down = Date.now();
                needed_data.x_down = e.touches[0].clientX;
                needed_data.y_down = e.touches[0].clientY;


               }); }, 2);


               setTimeout(function(){ document.getElementsByTagName('BODY')[0].addEventListener("touchend", function (e) {

                 needed_data.time_up = Date.now();
                 needed_data.x_up = e.changedTouches[0].pageX;
                 needed_data.y_up = e.changedTouches[0].pageY;



                 if ( test_ongoing == false || first_target_hit == false ) { return };


                     total_clicks++;


                     Time_Array.push(Date.now() / 1000); get_time_difference();

                     ///////calc_dx here//////

                     var select_center_x = parseInt(document.getElementById(target).getAttribute("select_center_x"));
                     var select_center_y = parseInt(document.getElementById(target).getAttribute("select_center_y"));


                     //calc_a is amplitude

                     function calc_b() { //distance between user select point and TARGET circle button's center

                       return distance([e.changedTouches[0].pageX, e.changedTouches[0].pageY],[select_center_x, select_center_y]);

                     };

                     function calc_c() { //distance between user select point and PREVIOUS circle button's center

                       return distance([e.changedTouches[0].pageX, e.changedTouches[0].pageY],[parseInt(document.getElementById(last_target).getAttribute("select_center_x")), parseInt(document.getElementById(last_target).getAttribute("select_center_y"))]);

                     };

                   function calc_slope(point_a, point_b) {

                       var slope;

                       var numerator = point_b[1] - point_a[1];
                       var denominator = point_b[0] - point_a[0];

                       slope = numerator / denominator;

                       return slope;

                   };

                   function perpendicular(slope) {

                       return -1 * (1 / slope);

                   };

     function calc_dx_value(starting_point_a,slope_of_a,starting_point_p,perpendicular_slope) {



                       var compare_variable;


                        if (Math.abs(perpendicular_slope) == Infinity) {

             //this occurs when it is a straight horizontal line between the circles
             //dx can be calculated as if it were 1D in such situations

     if ( parseInt(document.getElementById(target).getAttribute("select_center_x")) - parseInt(document.getElementById(last_target).getAttribute("select_center_x")) > 0 ) {

     dx = e.changedTouches[0].pageX - parseInt(document.getElementById(target).getAttribute("select_center_x"));

     } else {

     dx = -1 * (e.changedTouches[0].pageX - parseInt(document.getElementById(target).getAttribute("select_center_x")));

     };

                            return;


                        } else {


                       function pointAtX(a, slope, x) {
                               //a is a starting point array [ 23,55 ]
                               var y = a[1] + (x - a[0]) * slope;
                               return [x, y];
                             };

                       function create_line(starting_point, slope) {

                             //starting point = array [ 12,33 ]
                             //slope is a float

                             var line_pos = [];
                             var line_neg = [];

                             var length = window.innerWidth;

                             line_pos.push(starting_point);
                             line_neg.push(starting_point);

                             var c1 = 1;
                             var c2 = -1;

                             while ( c1 <= length ) {

                                 line_pos.push(pointAtX(line_pos[0], slope, line_pos[0][0] + c1));


                             c1++ };

                             while ( c2 >= length*-1 ) {

                                 line_neg.push(pointAtX(line_neg[0], slope, line_neg[0][0] + c2));


                             c2-- };


                           return line_pos.concat(line_neg);


                       };


                       function return_dx_value(line_a, line_p) {

                           var intersection;
                           var dx_found = false;


                           var x_values_a = []; var y_values_a = [];
                           var x_values_p = []; var y_values_p = [];

                           var x = 0;

                           while ( x < line_a.length ) {

                               x_values_a.push(Math.round(line_a[x][0]));
                               y_values_a.push(line_a[x][1]);


                           x++ };

                           x = 0;

                           while ( x < line_p.length ) {

                               x_values_p.push(Math.round(line_p[x][0]));
                               y_values_p.push(line_p[x][1]);


                           x++ };

                           x = 0;


                         while ( x < line_a.length ) {

                           if ( x_values_p.indexOf(x_values_a[x]) != -1 ) {

                             if ( x_values_a[x] == x_values_p[x_values_p.indexOf(x_values_a[x])] ) {


                     var truth_array = [Math.floor(y_values_a[x]) == Math.floor(y_values_p[x_values_p.indexOf(x_values_a[x])]),Math.floor(y_values_a[x]) == Math.floor(y_values_p[x_values_p.indexOf(x_values_a[x])]) - 1,Math.floor(y_values_a[x]) == Math.floor(y_values_p[x_values_p.indexOf(x_values_a[x])]) + 1,Math.round(y_values_a[x]) == Math.round(y_values_p[x_values_p.indexOf(x_values_a[x])]),Math.round(y_values_a[x]) == Math.round(y_values_p[x_values_p.indexOf(x_values_a[x])]) - 1,Math.round(y_values_a[x]) == Math.round(y_values_p[x_values_p.indexOf(x_values_a[x])]) + 1];


             if ( truth_array.indexOf(true) != -1 ) {

 intersection = [x_values_p[x_values_p.indexOf(x_values_a[x])],Math.floor(y_values_p[x_values_p.indexOf(x_values_a[x])])];

                                 dx_found = true;

                                 dx = distance(intersection,[select_center_x,select_center_y]);

                                 break;

                                 } } } x++ };


         if ( dx_found == false ) { x = 0;

           compare_variable = Math.abs(y_values_a[1] - y_values_a[0]) + 1;
           if ( Math.abs(y_values_p[1] - y_values_p[0]) + 1 > compare_variable ) {
           compare_variable = Math.abs(y_values_p[1] - y_values_p[0]) + 1;
           };


                      while ( x < line_a.length ) {

         if (Math.abs(y_values_a[x] - y_values_p[x_values_p.indexOf(x_values_a[x])]) < compare_variable) {
                     intersection = [x_values_p[x_values_p.indexOf(x_values_a[x])],Math.floor(y_values_p[x_values_p.indexOf(x_values_a[x])])];

                                 dx_found = true;

                                 dx = distance(intersection,[select_center_x,select_center_y]);

                                 break;
         };
                      x++ };

                                  };




         var last = [parseInt(document.getElementById(last_target).getAttribute("select_center_x")), parseInt(document.getElementById(last_target).getAttribute("select_center_y"))];
         var current = [parseInt(document.getElementById(target).getAttribute("select_center_x")), parseInt(document.getElementById(target).getAttribute("select_center_y"))];



                           if ( distance(intersection,last) < distance(current,last) ) {
                             dx = dx * -1;
                           };

                         return dx };



                       var start_a = pointAtX(starting_point_a, slope_of_a, starting_point_a[0]);

                       var start_p = pointAtX(starting_point_p, perpendicular_slope, starting_point_p[0]);


                            var line_a = create_line(starting_point_a, slope_of_a);
                            var line_p = create_line(starting_point_p, perpendicular_slope);

                             dx = parseFloat(return_dx_value(line_a, line_p));


                        } };



                     function calc_dx() { //adding in both dx's when applicable

                          var a = diameter;
                          var b;
                          var c;

                          var Ae;



                          if ( typeof last_target != "undefined" ) {



                              var slope_of_a = calc_slope([parseInt(document.getElementById(last_target).getAttribute("select_center_x")), parseInt(document.getElementById(last_target).getAttribute("select_center_y"))],[parseInt(document.getElementById(target).getAttribute("select_center_x")), parseInt(document.getElementById(target).getAttribute("select_center_y"))]);
                                                 var perpendicular_slope = perpendicular(calc_slope([parseInt(document.getElementById(last_target).getAttribute("select_center_x")), parseInt(document.getElementById(last_target).getAttribute("select_center_y"))],[parseInt(document.getElementById(target).getAttribute("select_center_x")), parseInt(document.getElementById(target).getAttribute("select_center_y"))]));


             var starting_point_a = [select_center_x, select_center_y];
             var starting_point_p = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];



                              calc_dx_value(starting_point_a,slope_of_a,starting_point_p,perpendicular_slope);

                              console.log(dx);

                              Ae = a + dx;



                             if ( typeof previous_dx != "undefined" ) {

                                 Ae = Ae + previous_dx;

                             };

                           };


                          if ( typeof dx != "undefined" ) { Dx_Array.push(dx); previous_dx = dx; needed_data.dx = dx;
                                                          };

                          if ( typeof Ae != "undefined" ) { Ae_Array.push(Ae) };

                     };

                     calc_dx();

                       ////////////////////////////


                     document.getElementById(target).setAttribute("class", "circlebuttons");


                     ratio = hits / total_clicks;

                     if ( typeof previous_ratio == "undefined" ) {

                       needed_data.miss = 0;


                       if ( ratio == 0 ) {

                         //make sound and/or vibrate

                         //if ( test_data["vibrotactile_feedback"] == true ) { navigator.vibrate(5) };

                         if ( test_data["auditory_feedback"] == true ) { audio.play() };

                         needed_data.miss = 1;


                       };

                     } else {


                       if ( ratio < previous_ratio ) {


                         needed_data.miss = 1;

                         //make sound and/or vibrate

                         //if ( test_data["vibrotactile_feedback"] == true ) { navigator.vibrate(5) };

                         if ( test_data["auditory_feedback"] == true ) { audio.play() };


                       } else { needed_data.miss = 0 };


                     };


                     previous_ratio = ratio;



                     needed_data.to = [document.getElementById(target).getAttribute("select_center_x"),document.getElementById(target).getAttribute("select_center_y")];
                     if (typeof last_target != 'undefined')  { needed_data.from = [parseFloat(document.getElementById(last_target).getAttribute("select_center_x")),parseFloat(document.getElementById(last_target).getAttribute("select_center_y"))] } else { needed_data.from = ["n/a","n/a"] };

                     if ( typeof needed_data.dx == "undefined" ) { needed_data.dx = "n/a" };


                                      function assemble_sd1_data() {

                                        if (previous_hit.length > 0){
                                        if (distance([previous_hit[previous_hit.length-1][0],previous_hit[previous_hit.length-1][1]],[needed_data.x_up,needed_data.y_up]) < diameter / 50) { SequenceRepeatCount = 1 };
                                        };


                                        var sd1_data = {
                                          a:test_data["participant_number"], //Participant
                                          b:test_data["session_number"], //Session
                                          c:test_data["block_code"], //Block
                                          d:test_data["group"], //Group
                                          e:test_data["condition"], //Condition
                                          x:test_data["handedness"], //Left or Right
                                          y:test_data["grip_span"], //Grip Span
                                          f:"2D", //Mode
                                          g:total_clicks-1, //Trials
                                          h:diameter, //Amplitude
                                          i:circle_button_width, //Width
                                          j:needed_data.from[0], //From_X
                                          k:needed_data.from[1], //From_Y
                                          l:parseFloat(needed_data.to[0]), //Target_X
                                          m:parseFloat(needed_data.to[1]), //Target_Y
                                          n:needed_data.x_down, //FingerDown_X
                                          o:needed_data.y_down, //FingerDown_Y
                                          p:needed_data.x_up, //Select_X
                                          q:needed_data.y_up, //Select_Y
                                          r:needed_data.dx, //Dx
                                          s:distance([needed_data.x_down,needed_data.y_down],[needed_data.x_up,needed_data.y_up]), //FingerDownUpDelta
                                          t:(needed_data.time_up - needed_data.time_down), //FingerDownUpTime(ms)
                                          u:distance([needed_data.x_up,needed_data.y_up],[needed_data.to[0],needed_data.to[1]]), //DistanceFromTargetCenter
                                          v:needed_data.miss, //Misses
                                          w:needed_data.diff, //Time between previous selection and now
                                          z:Date.now() //Used to order data in the CSV file
                                        };



                                        localStorage.setItem('FittsTouch_B'+test_data["block_code"]+'✝'+(total_clicks - 1)+"✟"+test_data["current_session"], JSON.stringify(sd1_data));

                                        previous_hit.push([needed_data.x_up,needed_data.y_up]);

                                        needed_data = {}; //Clear needed data for next trial

                                      };



                                        assemble_sd1_data();



                     if ( target_counter + 1 < target_array.length ) {

                       last_target = target;

                       target_counter++;

                       target = target_array[target_counter];

                       document.getElementById(target).setAttribute("class", "circlebuttons_selected");

                       //test continues



                     } else { //test ends







                       test_ongoing = false;


                       var parent = document.getElementById("container");
                       var counter = 1;
                       while (counter <= numberOfPoints) {
                         parent.removeChild(document.getElementById(counter));
                       counter++ };



                       var isArray = function (obj) {
                            return Object.prototype.toString.call(obj) === "[object Array]";
                             },

                             getNumWithSetDec = function( num, numOfDec ){
                                var pow10s = Math.pow( 10, numOfDec || 0 );
                                 return ( numOfDec ) ? Math.round( pow10s * num ) / pow10s : num;
                               },
                               getAverageFromNumArr = function( numArr, numOfDec ){
                                  if( !isArray( numArr ) ){ return false;	}
                                   var i = numArr.length,
                                     sum = 0;
                                      while( i-- ){
                                          sum += numArr[ i ];
                                         }
                                          return getNumWithSetDec( (sum / numArr.length ), numOfDec );
                                        },
                                        getVariance = function( numArr, numOfDec ){
                                           if( !isArray(numArr) ){ return false; }
                                            var avg = getAverageFromNumArr( numArr, numOfDec ),
                                              i = numArr.length,
                                                v = 0;

                                                 while( i-- ){
                                                     v += Math.pow( (numArr[ i ] - avg), 2 );
                                                    }
                                                     v /= numArr.length;
                                                      return getNumWithSetDec( v, numOfDec );
                                                    },
                                                    getStandardDeviation = function( numArr, numOfDec ){
                                                       if( !isArray(numArr) ){ return false; }
                                                        var stdDev = Math.sqrt( getVariance( numArr, numOfDec ) );
                                                         return getNumWithSetDec( stdDev, numOfDec );
                                                       };

                                                                   function getSum(total, num) {
                                                                       return total + num;
                                                                         };



                       var Ae = (Ae_Array.reduce(getSum) / Ae_Array.length).toFixed(2);
                       var We = (4.133 * getStandardDeviation(Dx_Array, 2)).toFixed(2);
                       var IDe = Math.log2(Ae / We + 1).toFixed(2);
                       var Throughput = calc_TP();


                       function calc_TP() {

                         var TP;

                         TP = (Time_Difference_Array.reduce(getSum) / Time_Difference_Array.length).toFixed(2);

                         return TP; };




                       var time_end = Date.now();

                       var results_object = {

                         Participant_number: test_data["participant_number"],
                         Current_session: test_data["current_session"],
                         Session_number: test_data["session_number"],
                         Hits: hits,
                         Trials: numberOfPoints + 1,
                         Misses: numberOfPoints + 1 - hits,
                         Accuracy: Math.round((hits / (numberOfPoints + 1)) * 100) + "%",
                         MT: (Time_Difference_Array.reduce(getSum) / Time_Difference_Array.length).toFixed(2),
                         Amplitude: diameter,
                         Width: circle_button_width,
                         ID: Math.log2(diameter / circle_button_width + 1).toFixed(2),
                         Ae: Ae,
                         We: We,
                         IDe: IDe,
                         Throughput: (IDe / Throughput).toFixed(2) + " bps"


                       };

                       function assemble_sd2_data() {


                         var sd2_data = {
                           a:test_data["participant_number"], //Participant
                           b:test_data["session_number"], //Session
                           c:test_data["block_code"], //Block
                           d:test_data["group"], //Group
                           e:test_data["condition"], //Condition
                           x:test_data["handedness"], //Left or Right
                           y:test_data["grip_span"], //Grip Span
                           f:"2D", //Mode
                           g:numberOfPoints, //Trials
                           h:SequenceRepeatCount, //Sequence Repeat Count
                           i:diameter, //Amplitude
                           j:circle_button_width, //Width
                           k:Math.log2(diameter / circle_button_width + 1), //ID
                           l:(Ae_Array.reduce(getSum) / Ae_Array.length), //Ae
                           m:(4.133 * getStandardDeviation(Dx_Array, 2)), //We
                           n:Math.log2((Ae_Array.reduce(getSum) / Ae_Array.length) / (4.133 * getStandardDeviation(Dx_Array, 2)) + 1), //IDe
                           o:(Time_Difference_Array.reduce(getSum) / Time_Difference_Array.length), //MT(ms)
                           p:(results_object["Misses"] / numberOfPoints) * 100, //Error Rate
                           q:(Math.log2((Ae_Array.reduce(getSum) / Ae_Array.length) / (4.133 * getStandardDeviation(Dx_Array, 2)) + 1) / Throughput) //Throughput
                         };

                         if ( SequenceRepeatCount == 1 ) {

                           var error_popup = $ionicPopup.show({
                                 title: 'Error',
                                 template: "Double tap detected! You must repeat!",
                                 buttons: [
                                     { text: 'OK',
                                       onTap: function(e){

                                       }
                                   }]})

                         } else {

                           localStorage.setItem('FittsTouch_B'+test_data["block_code"]+'✝'+test_data["current_session"]+'✟sd2', JSON.stringify(sd2_data));


                         };


                       };

                       assemble_sd2_data();

                       var endPopup = $ionicPopup.show({
                             title: 'Results',
                             template: "Participant: " + results_object["Participant_number"] +
                             "<br>Sequence " + results_object["Current_session"] + " of " + results_object["Session_number"] +
                             "<br>Number of trials: " + results_object["Trials"] +
                             "<br>A: " + results_object["Amplitude"] + " px" +
                             "<br>W: " + results_object["Width"] + " px" +
                             "<br>ID: " + results_object["ID"] + " bits" +
                             "<br>-----" +
                             "<br>Ae: " + results_object["Ae"] + " px" +
                             "<br>We: " + results_object["We"] + " px" +
                             "<br>IDe: " + results_object["IDe"] + " bits" +
                             "<br>MT: " + results_object["MT"] + " sec" +
                             "<br>Misses: " + results_object["Misses"] +
                             "<br>Throughput: " + results_object["Throughput"],
                             buttons: [
                                 {
                                   text: 'OK',
                                   type: 'button-positive',
                                   onTap: function(e) {

                                     if ( SequenceRepeatCount == 0 ) {

                                     test_data["current_session"] = test_data["current_session"] + 1;
                                     localStorage.setItem('test_data', JSON.stringify(test_data)) } else {

                                       for (var key in localStorage){

                                         if ( key.slice(0,key.indexOf("✝")) == "FittsTouch_B"+test_data["block_code"] ) {

                                            if ( parseInt(key.slice(key.indexOf("✟")+1,key.length)) == test_data["current_session"] ) {

                                           localStorage.removeItem(key) } };

                                       } };

                                     if ( test_data["current_session"] <= test_data["session_number"] ) {

                                       reset_test();

                                       $state.go("circles");

                                     } else {

                                       reset_test();

                                       firstsession = undefined;

                                       localStorage.removeItem('test_data');

                                       $state.go("menu.home");

                                     }
                                   }
                                 }
                               ]
                           });

                   };



               }); }, 2);




            return test_data;  } };

})
