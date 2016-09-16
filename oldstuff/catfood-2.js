// node pi-gpio script for cat feeder

//var gpio = require("pi-gpio");

// use npm rpio
var rpio = require('rpio');

var rpiooptions = {
        gpiomem: true,          /* Use /dev/gpiomem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
};

rpio.init(rpiooptions);



//var hydna = require('hydna');


// Open channel in "read" mode. We are just listening for data and signals.
//var channel = hydna.createChannel('public.hydna.net', 'read');

/*
// Connect handler, is triggered once that the channel is connected
channel.on('connect', function (data) {
  console.log("Press Ctrl-C to abort the receive loop");

  // The "connect" handler may contain an optional welcome-message sent
  // by remote part. Print message if exists.
  if (typeof data == 'string') {
    console.log("[WELCOME]: " + data);
  }
});

// Data handler, is triggered each time DATA is received on the channel
channel.on('data', function (data) {
  if (typeof data == 'string') {
    console.log('[DATA] ' + data);
  } else {
    console.log('[DATA] <binary>');
  }
});

// Signal handler, is triggered each time a SIGNAL is received on the channel
channel.on('signal', function (data) {
  if (typeof data == 'string') {
    console.log('[SIGNAL] ' + data);
  } else {
    console.log('[SIGNAL] <binary>');
  }
});

*/

//ultrasonic trigger and echo pins
DIST_TRIGGER=38;
DIST_ECHO=37;

//change for motor pin numbers
PINS = [11,15,16,7];
runMotorFor = 10000;
//number of miliseconds to wait at each step
speed = 3;  //(delay in ms - small number = faster)
counter = 0;
// Set step direction and pattern
// Set to 1 or 2 for clockwise
// Set to -1 or -2 for anti-clockwise
var StepDir = 1;

// wait for everything to settle down 
rpio.sleep(1);

//# Define advanced sequence
//# as shown in manufacturers datasheet
seq = [[1,0,0,1],
       [1,0,0,0],
       [1,1,0,0],
       [0,1,0,0],
       [0,1,1,0],
       [0,0,1,0],
       [0,0,1,1],
       [0,0,0,1]];

var StepCount = seq.length;

/*
for (i = 0; i < cars.length; i++) {
    text += cars[i] + "<br>";
}

*/
//initialise stepper motor output pins.
for (i=0;i < PINS.length; i++){
  console.log("Opening Pin: "+PINS[i]);
/* Configure stepper motor pins as output with the initiate state set low */
 rpio.open(PINS[i], rpio.OUTPUT, rpio.LOW);
}

//initialise ultrasonic pins
// rpio.open(DIST_TRIGGER, rpio.OUTPUT, rpio.LOW);
// rpio.open(DIST_ECHO, rpio.INPUT);



//main loop

//set timeout to clear the set interval after the motor has been running for x seconds

var myStopTimer = setTimeout(stopRunning, runMotorFor); //when to stop running the motor

//Run stepper motor
var myStepper = setInterval(stepMotor, speed);


//Run distance measure
//var myDistanceCheck = setInterval(measureDist, 1000);



function stopRunning(){
  //called by timeout to clear the Interval that runs the motor

  clearInterval(myStepper);

//  clearInterval(myDistanceCheck);
  closePins();
//  channel.end('good bye!');
}


function stepMotor(){
  console.log("stepMotor called");
 for(i=0;i<seq[counter].length;i++){
     console.log("Set pin "+PINS[i]+" to "+seq[counter][i]);
//    gpio.write(PINS[i], seq[counter][i], function() {
//       console.log("Set pin "+PINS[i]+" to "+seq[counter][i]);
//  	});
     rpio.write(PINS[i], seq[counter][i]);
  }
  moveCounter();  //increment or decrement counter and cycle back around the sequence array
//  console.log("Measuring... ");
//  console.log("Distance is:"+measureDist());
}

function moveCounter(){
  counter = counter + StepDir;
  // If we reach the end of the sequence
  // start again
    if (counter>=StepCount){
      counter = 0;
    }
    if (counter<0){
      counter = StepCount+StepDir;
    }

}

function closePins(){
//close motor output pins.
  for (i=0;i < PINS.length; i++){
      console.log("Closing Pin: "+PINS[i]);
    rpio.close(PINS[i]);
  }
//close ultrasound pins

 rpio.close(DIST_TRIGGER);
 rpio.close(DIST_ECHO);

}

function measureDist() {
  var elapsed, distance;
  var buf = new Buffer(10000);
  buf.fill(0);
  // This function measures a distance
  rpio.write(DIST_TRIGGER, 1);
//  setTimeout(function(){
   rpio.usleep(10); 
	rpio.write(DIST_TRIGGER, 0);
	
//	while (rpio.read(GPIO_ECHO) == 0) {
//		console.time("echotime");
//	}

   //read buffer of what happens next
   console.time("buffertime");
	rpio.readbuf(DIST_ECHO,buf);
	console.timeEnd("buffertime");
//    console.log("Buffer:"+buf);
//   },1); //fire trigger for 1ms then set back to zero 
  
rpio.msleep(10);

var swit=0;
for (var i=0;i<buf.length;i++) {
	if (buf[i] != swit) {
      swit = buf[i];
	  console.log("Pos:"+i+" - "+buf[i]);
	}
	
}
console.log(i+" buffer entries checked");

/*
  //start = time.time()

  //while (rpio.read(DIST_ECHO)==0) {
    console.time("echotime");
    for (var i = 0; i < 100; i++) {
      ;
    }
  //}
 // while GPIO.input(GPIO_ECHO)==1:
 //   stop = time.time()

  elapsed = console.timeEnd("echotime");
  console.log("elapsed string is :"+elapsed);
  distance = (elapsed * 34300)/2;

  return distance
*/
	return 10;
}
