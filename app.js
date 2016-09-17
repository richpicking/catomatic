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
    currentchannel: 0,
    synced: false,
    sensitivity: 5,

    feed: function(mychannel) {
      console.log('Feeding...');
    },

    listenToHydna: function() {
      feeder.channel = hydna.createChannel(feeder.domain+'/'+feeder.channel, 'rw');
      console.log("listening...");
    },

    flashbutton: function(direction) {
    },

    init : function() {
      feeder.newvar = "blah";
      feeder.listenToHydna();

    }
};



console.log('Feeder domain is :'+feeder.domain);
feeder.init();
console.log('Feeder newvar is :'+feeder.newvar);
