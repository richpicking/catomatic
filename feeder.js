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

    listentohydna: function() {
    },

    flashbutton: function(direction) {
    },

    init : function() {
    }
};

//hydna stuff

/*        var code = parseInt(prompt("Enter slideshow code", ""));

       if (!isNaN(code) && code > 1 && code != remote.currentchannel) {
           if (remote.channel) {
               remote.channel.close();
           }

           var mychannel = String(code);

           $('#loader_id').show();
           $('#reconnect_id').hide();

           // remote-control
           remote.channel = new HydnaChannel(remote.domain+'/'+mychannel, 'rw');

           remote.channel.onmessage = function(e) {
               switch(e.data) {
                   case "synced":
                       clearTimeout(remote.synctimer);
                       $('#reconnect_id').hide();
                       $('#swipe_id').show();
                       $('#loader_id').hide();
                       break;
               }
           }

           remote.channel.onopen = function(e) {
               clearTimeout(remote.closetimer);

               remote.currentchannel = code;
               remote.channel.send(mychannel);

               clearTimeout(remote.synctimer);
               remote.synctimer = setTimeout( function() {
                   $('#reconnect_id').show();
                   $('#loader_id').hide();
               }, 2000);
           }

           remote.channel.onclose = function(e) {
               clearTimeout(remote.closetimer);
               remote.closetimer = setTimeout( function() {
                   $('#reconnect_id').show();
                   $('#swipe_id').hide();
                   $('#loader_id').hide();
               }, 2000);
           }

       } else {
           if(code != "") {
               if (code == remote.currentchannel) {
                   alert("You are already connected to this channel");
                   remote.channel.send(String(code));
               } else {
                   alert("Invalid channel");
               }
           }
       }
   },
*/
