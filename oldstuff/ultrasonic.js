// node pi-gpio script for cat feeder

//var gpio = require("pi-gpio");

// use npm rpio
var rpio = require('rpio');

var rpiooptions = {
        gpiomem: true,          /* Use /dev/gpiomem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
};

rpio.init(rpiooptions);


DIST_TRIGGER=38;
DIST_ECHO=37;

var buf = new Buffer(1000000);
buf.fill(0);
//initialise ultrasonic pins
rpio.open(DIST_TRIGGER, rpio.OUTPUT, rpio.LOW);
rpio.open(DIST_ECHO, rpio.INPUT);
rpio.pud(DIST_ECHO, rpio.PULL_DOWN);


//var listenFor = 150;  //how long to listen to echo pin for a signals (ms)
//var listen = true;
//var gotMeasure = false;
//var stopTimer = setTimeout(stopListening, listenFor); //when to stop running the motor

//function stopListening(){
  //called by timeout to clear the Interval that listens for the echo (in case we don't hear one)
//  listen = false; //stop listening
//  console.log("Stopped the listener..");
//}


/*


var testx=0;
var bin=1;
//start the action
var waittime=0;
rpio.msleep(100); //sleep miliseconds
rpio.write(DIST_TRIGGER, rpio.LOW);
rpio.write(DIST_TRIGGER, rpio.HIGH);
rpio.usleep(15); //sleep microseconds to send pulse
rpio.write(DIST_TRIGGER, rpio.LOW);

//waittime = process.hrtime()


for (var i=0;i<1000000;i++) {
	testx=rpio.read(DIST_ECHO);
	if (testx==1) {
		waittime = process.hrtime();
		bin=0;
		//console.log("x went high at i="+i);
		
	}else if (bin == 0) {
		waittime = process.hrtime(waittime);
		break;
	}
}
console.log("finished at i="+i);
//waittime = process.hrtime(waittime);
console.log("Waited us "+waittime[1]);
console.log("Distance is "+0.000034*waittime[1]+"cm");


*/

/*
while (listen && rpio.read(DIST_ECHO)==0){
   //loop until signal arrives
   console.log("waiting "+rpio.read(DIST_ECHO)+" : "+listen);
}
var waittime = process.hrtime(waittime);//end waiting
var clock=process.hrtime();//start echo timer
while (listen && rpio.read(DIST_ECHO)==1){
  //loop until signal stops
}
if(listen){gotMeasure = true;}
var echoTime=process.hrtim(clock);//stop echo timer

if(gotMeasure){
   console.log("I waited for "+waittime[1]+". Then got an echo time of "+echoTime);
   //speed of sound is 340m/s 34000cm/s 34cm/ms .034cm/us .000034cm/ns
   var distance = 0.000034*echoTime;
   console.log("Distance measured at "+distance+"cm.");
 }else{
   console.log("No echo received :-(");
 }
*/



rpio.msleep(200);
for (j=0;j<5;j++) {
  console.log("Measuring... "+j);
  console.log("Distance is:"+measureDist());
  rpio.sleep(1)
}
closePins();


function closePins(){

 rpio.close(DIST_TRIGGER);
 rpio.close(DIST_ECHO);

}

function measureDist() {
  var elapsed, distance;
  var hrend;
  buf.fill(0);
  //rpio.msleep(1000); //sleep miliseconds
  rpio.write(DIST_TRIGGER, rpio.LOW);
  rpio.write(DIST_TRIGGER, rpio.HIGH);
  rpio.usleep(15); //sleep microseconds to send pulse
  rpio.write(DIST_TRIGGER, rpio.LOW);
  var hrstart = process.hrtime();
   //read buffer of what happens next
//   console.time("buffertime");
  rpio.readbuf(DIST_ECHO,buf);
//   console.timeEnd("buffertime");
//    console.log("Buffer:"+buf);
  hrend= process.hrtime(hrstart);
console.log("buffer written in: "+hrend[1]/1000000+" ms");

rpio.msleep(100); //sleep miliseconds

var swit=0;
var istartpos = 0;
var istoppos = 0;
var sigcount=0;
var tothigh=0;
for (var i=0;i<buf.length;i++) {
	if (buf[i] != swit) {
      swit = buf[i];
	  if (buf[i] == 1) {  //just became 1
		istartpos = i;
	  } else {
		istoppos = i;  //just became 0 from 1
		elapsed = istoppos-istartpos;
		console.log("echo width "+elapsed);
		tothigh=tothigh+elapsed;
		sigcount++;
		
	  }
	  console.log("Pos:"+i+" - "+buf[i]);
	}
	
}
console.log(sigcount+" signals found");
console.log(i+" buffer lines checked");
console.log(tothigh+" ones found");

var timePerBufferEntry = hrend[1] / buf.length;
var timeOfSignal = (tothigh/sigcount)*timePerBufferEntry; 
var distance = 0.000034*timeOfSignal/2;
	return distance;
}

