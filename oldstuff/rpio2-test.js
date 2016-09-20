// node pi-gpio script for cat feeder

//var gpio = require("pi-gpio");

// use npm rpio
//var rpio = require('rpio2');

//install rpio2 from NPM and see where this lives s??

//install rpio2!!!


const Gpio = require('./lib/index.js').Gpio;


var rpiooptions = {
        gpiomem: true,          /* Use /dev/gpiomem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
};

Gpio.init(rpiooptions);

//ultrasonic trigger and echo pins
const DIST_TRIGGER= new Gpio(38);
const DIST_ECHO= new Gpio(37);

DIST_TRIGGER.open(Gpio.OUTPUT,Gpio.LOW);
DIST_ECHO.open(Gpio.INPUT);

var timing;
var diff;

DIST_ECHO.on('rising', function(){
  timing = process.hrtime();
  console.log('Recieved signal !');

});

DIST_ECHO.on('falling', function(){
  diff = process.hrtime(timing);
  console.log('Signal end');
});


//wait to initialise
Gpio.sleep(200); //sleep 200 ms
DIST_TRIGGER.write(Gpio.HIGH);
Gpio.sleep(200); //sleep 200 ms
DIST_TRIGGER.write(Gpio.LOW;

function measureDist(){   // not used ?
  var elapsed, distance;
  // This function measures a distance
  DIST_TRIGGER.

  write(DIST_TRIGGER, 1);
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
