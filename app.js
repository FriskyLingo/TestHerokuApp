
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




 var app2 = require('http').createServer(handler)
   , io = require('socket.io').listen(app2)
   , fs = require('fs');

 app2.listen(3001);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
	var currentHumidityLevel = getCurrentHumidity();

	//socket.emit('news', { hello: 'world' });
	//socket.emit('callMethod', { humidityLevel: currentHumidityLevel });
	socket.emit('getHumidity', currentHumidityLevel);

	socket.emit('getSubscription', subscribeDone());

  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });

	// socket.on('callMethod', function (data) {
	// 	if(data['methodName'] == 'method3') {
	// 	var currentHumidity = getCurrentHumidity();

	// 	// exports.method3();
	// 	//console.log('method3 call');
	// 	//console.log(getCurrentHumidity());
	// 	//socket.emit(currentHumidity);
	// 	return 57;
	// 	//getCurrentHumidity();
	// 	}
	// });
});



// exports.method3=function(){
// 	console.log('method3 call');
// };



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





/**
 *
 *  Demonstration for the unofficial_nest library
 *  logs in, reads status, constantly, for ever. :)
 *
 */

// "option strict";
var util = require('util'),
    nest = require('./node_modules/unofficial-nest-api/index.js');  // normally would be 'unofficial-nest-api'


function trimQuotes(s) {
    if (!s || s.length === 0) {
        return '';
    }
    var c = s.charAt(0);
    var start = (c === '\'' || c === '"') ? 1 : 0;
    var end = s.length;
    c = s.charAt(end - 1);
    end -= (c === '\'' || c === '"') ? 1 : 0;
    return s.substring(start, end);
}

function merge(o1, o2) {
    o1 = o1 || {};
    if (!o2) {
        return o1;
    }
    for (var p in o2) {
        o1[p] = o2[p];
    }
    return o1;
}


//function loginToNest() {
    /*********************************************************************************************
    Set username and password
    *********************************************************************************************/
    var username = 'krobbins@americandatanetwork.com';
    var password = 'Accord08%';
    var d2 = 0;


    /*********************************************************************************************
    Log the current humidity value to the console
    *********************************************************************************************/
    //getCurrentHumidity();


    /*********************************************************************************************
    Fetch the thermostat's data
    *********************************************************************************************/
    //Make sure username and password are set first
    if (username && password) {
        //Get rid of any quotes in the username and password
        username = trimQuotes(username);
        password = trimQuotes(password);

        // alert(nest);

        //Login to the Nest account
        nest.login(username, password, function (err, data) {
            // //If an error occurs...
            // if (err) {
            //     //Log the error message to the console and exit
            //     //console.log(err.message);
            //     alert(err.message);
            //     process.exit(1);
            //     return;
            // }

            //Log to the console that the user has successfully logged in
            console.log('Logged in.');
            // alert("Logged in.");

            //Get the information for the specified Nest account
            nest.fetchStatus(function (data) {
                ////Write out the returned JSON object to the console
                //console.log(data);

                //return data;

                // //Loop through each Nest thermostat the user has
                // for (var deviceId in data.device) {
                //     //Make sure the "device" object has a "deviceId" property before using it
                //     if (data.device.hasOwnProperty(deviceId)) {
                //         // //Create an object for the current thermostat
                //         // var sharedDevice = data.shared[deviceId];

                //         // //Log device information to the console
                //         // console.log(util.format("%s [%s], Current temperature = %d F target=%d",
                //         //     sharedDevice.name,
                //         //     deviceId,
                //         //     nest.ctof(sharedDevice.current_temperature),
                //         //     nest.ctof(sharedDevice.target_temperature)));


                //         //Create an object for the current thermostat
                //         var device = data.device[deviceId];
                //         globalDevice = device;

                //         //Log device information to the console
                //         console.log(util.format("CURRENT HUMIDITY = %d",
                //             device.current_humidity));
                //     }
                // }

                //var ids = nest.getDeviceIds();
                //var strucIds = nest.getStructureIds();
                //nest.setTemperature(ids[0], 70);
                //nest.setTemperature(70);
                //nest.setFanModeAuto();
                subscribe();
                //nest.setAway();
                //nest.setHome();
                //nest.setTargetTemperatureType(ids[0], 'heat');
            });
        });
    }
//}

function subscribe() {
    // nest.subscribe(subscribeDone, ['shared', 'energy_latest']);
    // nest.subscribe(subscribeDone, ['shared', 'device']);
    nest.subscribe(subscribeDone, ['shared']);
}

function subscribeDone(deviceId, data, type) {
    // data if set, is also stored here: nest.lastStatus.shared[thermostatID]
    if (deviceId) {
        //console.log('Device: ' + deviceId + " type: " + type);
        //console.log(JSON.stringify(data));

  //       //io.sockets.on('connection', function (socket) {
		// 	socket.emit('getSubscription', JSON.stringify(data));
		// //});

        // console.log(util.format("CURRENT HUMIDITY = %d",
        //     globalDevice.current_humidity));
    } else {
        console.log('No data');

    }
    setTimeout(subscribe, 2000);
}





function getCurrentHumidity() {
	//var datas = 0;
	//Get the information for the specified Nest account
	nest.fetchStatus(function(data) {
		//var theDatas = 0;
		// //Write out the returned JSON object to the console
		// console.log(data);

		//return JSON.stringify(data);
		//return data;

		//Loop through each Nest thermostat the user has
		for (var deviceId in data.device) {
			//Make sure the "device" object has a "deviceId" property before using it
			if (data.device.hasOwnProperty(deviceId)) {
				//Create an object for the current thermostat
				var sharedDevice = data.shared[deviceId];

				//console.log(sharedDevice);

				// //Log device information to the console
				// console.log(util.format("%s [%s], Current temperature = %d F target=%d",
				//	sharedDevice.name,
				//	deviceId,
				//	nest.ctof(sharedDevice.current_temperature),
				//	nest.ctof(sharedDevice.target_temperature)));

				//Create an object for the current thermostat
				var device = data.device[deviceId];

				//Log device information to the console
				//console.log(device.current_humidity);

				//theHumidity = device.current_humidity;

				//console.log(util.format("%s",device.current_humidity));
				//return data;
				//d2 = device.current_humidity;
				d2 = nest.ctof(sharedDevice.current_temperature);
				// return(device.current_humidity);
				//theDatas = 56;
			}
		}
	});

	return d2;
}