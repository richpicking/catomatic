/*
var rpio = require('rpio');
var rpiooptions = {
        gpiomem: true,
        mapping: 'physical',
};
rpio.init(rpiooptions);
*/

var hydna = require('hydna');


//require('./feeder.js');

var feeder = {
    domain: "ranstey.hydna.net",
    channel: "feedme",
    synctimer: null,
    closetimer: null,
    LAMP: 36, //pin connected to the bulb in the button
    PINS: [11,15,16,7], //pins to drive the stepper motor (in order)
    lampFlashRate: 200, //tine to wait between off and on flashes
    speed: 3,  //(delay in ms - small number = faster)
    StepDir: 1, //can be between +2 and -2 - determins stepping type - forward, backward etc.
    seq: [[1,0,0,1], //stepper motor pin switch array
          [1,0,0,0],
          [1,1,0,0],
          [0,1,0,0],
          [0,1,1,0],
          [0,0,1,0],
          [0,0,1,1],
          [0,0,0,1]],

    feed: function(runMotorFor) {
      console.log('Feeding...');
      //set timeout to clear the set interval after the motor has been running for x seconds
      var myStopTimer = setTimeout(stopRunning, runMotorFor); //when to stop running the motor
      //Run stepper motor
      var myStepper = setInterval(stepMotor, feeder.speed);
      var counter = 0; //counter for stepper motor pins
      var StepCount = feeder.seq.length,

      //initialise stepper motor output pins.
      for (i=0;i < feeder.PINS.length; i++){
        console.log("Opening Pin: "+feeder.PINS[i]);
      /* Configure stepper motor pins as output with the initiate state set low */



       //*****************************************
       //rpio.open(PINS[i], rpio.OUTPUT, rpio.LOW);



      }

      function stopRunning(){
        //called by timeout to clear the Interval that runs the motor
        clearInterval(myStepper);
        //  clearInterval(myDistanceCheck);
        feeder.closePins();
        //  channel.end('good bye!');
      }

      function stepMotor(){
        console.log("stepMotor called");
        for(i=0;i<feeder.seq[counter].length;i++){
           console.log("Set pin "+feeder.PINS[i]+" to "+feeder.seq[counter][i]);
      //    gpio.write(PINS[i], seq[counter][i], function() {
      //       console.log("Set pin "+PINS[i]+" to "+seq[counter][i]);
      //  	});
           rpio.write(feeder.PINS[i], feeder.seq[counter][i]);
        }
        moveCounter();  //increment or decrement counter and cycle back around the sequence array
      //  console.log("Measuring... ");
      //  console.log("Distance is:"+measureDist());
      }

      function moveCounter(){
        counter = counter + feeder.StepDir;
        // If we reach the end of the sequence
        // start again
        if (counter>=StepCount){
          counter = 0;
        }
        if (counter<0){
          counter = StepCount+feeder.StepDir;
        }
      }
    },

    listenToHydna: function() {
      feeder.channel = hydna.createChannel(feeder.domain+'/'+feeder.channel, 'rw');
      console.log("listening...");
    },

    flashButton: function(duration) { //Flash the bulb in the big green button
      var on=false;

      function flash(){
      	if (on) {
      		rpio.write(feeder.LAMP, rpio.LOW);
      		on=false;
      	}else {
      	    rpio.write(feeder.LAMP, rpio.HIGH);
      	    on=true;
      	}
      }

      function doFlash() {

        //******************************************8
        //Initialise the lighting pin
        //rpio.open(feeder.LAMP, rpio.OUTPUT, rpio.LOW); //


        var flasher = setInterval(flash, feeder.lampFlashRate);
        var stopper = setTimeout(function(){
      	  clearInterval(flasher);
      	  rpio.write(feeder.LAMP, rpio.LOW); //switch bulb off when stopping flasher
        },duration);
      }
    },

    init : function() {
      // Initialise all the pins

      //******************************************8
      //Initialise the lighting pin
      //rpio.open(feeder.LAMP, rpio.OUTPUT, rpio.LOW); //


      //consider a sleep to ready the rpio stuff ?

//      feeder.newvar = "blah";

      //feeder.flashButton(2000); //flash the button on initiation
      feeder.listenToHydna();
    },

    closePins : function (){
    //close motor output pins.
      for (i=0;i < feeder.PINS.length; i++){
        console.log("Closing Pin: "+feeder.PINS[i]);
        rpio.close(PINS[i]);
      }
      //close button lamp pins
      rpio.close(feeder.LAMP);
    }
};



console.log('Feeder domain is :'+feeder.domain);
feeder.init();
console.log('Feeder newvar is :'+feeder.newvar);
