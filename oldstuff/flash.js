var rpio = require('rpio');

var hydna = require('hydna');
var channel = hydna.createChannel('ranstey.hydna.net/feedme','r')

var rpiooptions = {
        gpiomem: true,          /* Use /dev/gpiomem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
};

rpio.init(rpiooptions);


LAMP=36;

rpio.open(LAMP, rpio.OUTPUT, rpio.LOW);

var on=false;


function flash(){
	if (on) {
		rpio.write(LAMP, rpio.LOW);
		on=false;

	}else {
	    rpio.write(LAMP, rpio.HIGH);
	    on=true;
		
	}
	
	
}


function doFlash() {
	

var flasher = setInterval(flash, 200);

var stopper = setTimeout(function(){ 
	clearInterval(flasher);
	rpio.write(LAMP, rpio.LOW);

	},5000);

}


channel.on('data', doFlash);