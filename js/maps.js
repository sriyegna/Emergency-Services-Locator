/* 
Name : Srinath Natarajan
Student Number : 000770411
Date : 03-10-2019
Description : JS code to handle map and buttons
*/

//Global variables
var listPoliceStations = [];
var listFireStations = [];
var listHospitals = [];
var policeStationsDisplayed = false, fireStationsDisplayed = false, hospitalsDisplayed = false;
//Array of pushpins of length of community centers
var pushpins = new Array();
//Various other variables like map, users location, location flag, infobox, jsonDataShown flag
var map, userGeoLocation, locationFound = false, infobox;

	$.ajax({
		url: "getPoliceStation.php",
		dataType: "JSON",
		success: function(json){
			//here inside json variable you've the json returned by your PHP
			for(var i=0;i<json.length;i++){
				listPoliceStations.push(json[i]);
			}
		}
	});
	$.ajax({
		url: "getFireStation.php",
		dataType: "JSON",
		success: function(json){
			//here inside json variable you've the json returned by your PHP
			for(var i=0;i<json.length;i++){
				listFireStations.push(json[i]);
			}
		}
	});
	$.ajax({
		url: "getHospital.php",
		dataType: "JSON",
		success: function(json){
			//here inside json variable you've the json returned by your PHP
			for(var i=0;i<json.length;i++){
				listHospitals.push(json[i]);
			}
		}
	});

function loadMapScenario() {
	//Get users current location
	navigator.geolocation.getCurrentPosition(
		function (pos) {
			//Store coords globally, set location flag, and add pushpin
			userGeoLocation = pos.coords;
			locationFound = true;
			addCurrentLocationPushpin();
		});
	//Create map with center point in hamilton
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {center: new Microsoft.Maps.Location(43.238879, -79.892548) });
	//For all the recreational centers
	var pinCounter = 0;
	for (i = 0; i < listPoliceStations.length; i++) {
		//Create a location from the data
		var location = new Microsoft.Maps.Location(listPoliceStations[i].Latitude, listPoliceStations[i].Longitude);
		//Create a pushpin from the location
		var pushpin = new Microsoft.Maps.Pushpin(location, null);
		//Add metadata from the listrecs info json such as name, address, image, bing maps link, xml lat long link
		pushpin.metadata = {
			title: listPoliceStations[i].Name,
			description: ("<img src='images/police.png'><b>" + "Police Station. <br>"+
				"</b><br>" + "<a href=https://bing.com/maps/default.aspx?cp=" + encodeURI(listPoliceStations[i].Latitude + "~" + listPoliceStations[i].Longitude) + "&lvl=16>Bing Maps</a>  "
				+ "<a href=http://dev.virtualearth.net/REST/v1/Locations?o=xml&q=" + encodeURI(listPoliceStations[i].Address + " Ontario") + "&key=Ak-JUwgsz1X2W1gUOhqr_S2unJ75nIc8NXZKSLz2qDkQg8NlXvvOAxUuswWph8lM" + ">Lat/Lng</a>")
		};
		pushpins[i] = pushpin;
	}
	//For all the recreational centers
	pinCounter = listPoliceStations.length;
	for (i = 0; i < listFireStations.length; i++) {
		//Create a location from the data
		var location = new Microsoft.Maps.Location(listFireStations[i].Latitude, listFireStations[i].Longitude);
		//Create a pushpin from the location
		var pushpin = new Microsoft.Maps.Pushpin(location, null);
		//Add metadata from the listrecs info json such as name, address, image, bing maps link, xml lat long link
		pushpin.metadata = {
			title: listFireStations[i].Name,
			description: ("<img src='images/fire.png'><b>" + "<br>" + listFireStations[i].Type + " Fire Station. <br>" + listFireStations[i].Address + "<br>" + listFireStations[i].City 
				+ "</b><br>" + "<a href=https://bing.com/maps/default.aspx?cp=" + encodeURI(listFireStations[i].Latitude + "~" + listFireStations[i].Longitude) + "&lvl=16&where1=" + encodeURI(listFireStations[i].Address + ", " + listFireStations[i].City) + ">Bing Maps</a>  "
				+ "<a href=http://dev.virtualearth.net/REST/v1/Locations?o=xml&q=" + encodeURI(listFireStations[i].Address + " " + listFireStations[i].City) + "&key=Ak-JUwgsz1X2W1gUOhqr_S2unJ75nIc8NXZKSLz2qDkQg8NlXvvOAxUuswWph8lM" + ">Lat/Lng</a>")
		};
		pushpins[pinCounter + i] = pushpin;
	}
	//For all the recreational centers
	pinCounter = pinCounter + listFireStations.length;
	for (i = 0; i < listHospitals.length; i++) {
		//Create a location from the data
		var location = new Microsoft.Maps.Location(listHospitals[i].Latitude, listHospitals[i].Longitude);
		//Create a pushpin from the location
		var pushpin = new Microsoft.Maps.Pushpin(location, null);
		//Add metadata from the listrecs info json such as name, address, image, bing maps link, xml lat long link
		pushpin.metadata = {
			title: listHospitals[i].Name,
			description: ("<img src='images/hospital.png'><b>" + "<br>" + " Hospital. <br>" +  listHospitals[i].Address + "<br>" + listHospitals[i].City + "<br>" +  listHospitals[i].Phone
				+ "</b><br>" + "<a href=https://bing.com/maps/default.aspx?cp=" + encodeURI(listHospitals[i].Latitude + "~" + listHospitals[i].Longitude) + "&lvl=16&where1=" + encodeURI(listHospitals[i].Address + ", " + listHospitals[i].City) + ">Bing Maps</a>  "
				+ "<a href=http://dev.virtualearth.net/REST/v1/Locations?o=xml&q=" + encodeURI(listHospitals[i].Address + " " + listHospitals[i].City) + "&key=Ak-JUwgsz1X2W1gUOhqr_S2unJ75nIc8NXZKSLz2qDkQg8NlXvvOAxUuswWph8lM" + ">Lat/Lng</a>")
		};
		pushpins[pinCounter + i] = pushpin;
	}
	//Create infobox and set it
	infobox = new Microsoft.Maps.Infobox(pushpins[1].getLocation(), { visible: false, autoAlignment: true });
	infobox.setMap(map);
	//For all pushpins, add an infobox from the metadata
	for (var j = 0; j < pushpins.length; j++) {
		Microsoft.Maps.Events.addHandler(pushpins[j], 'click', function (args) {
			infobox.setOptions({
				location: args.target.getLocation(),
				title: args.target.metadata.title,
				description: args.target.metadata.description,
				visible: true
			}); 
		});
	}
	//Add all pushpins to map
	map.entities.push(pushpins);
	policeStationsDisplayed = true;
	fireStationsDisplayed = true;
	hospitalsDisplayed = true;
}

//To add the users current location pin to the map
function addCurrentLocationPushpin() {
	//if location is found
	if (locationFound) {
		//Get the coords and create a pushpin
		var location = new Microsoft.Maps.Location(userGeoLocation.latitude, userGeoLocation.longitude);
		var pushpin = new Microsoft.Maps.Pushpin(location, null);
		//Add metadata to pushpin
		infobox.setMap(map);
		pushpin.metadata = {
			title: "Current Location",
			description: ""
		};
		//Add a pushpin click handler to invoke infobox with metadata from pushpin
		Microsoft.Maps.Events.addHandler(pushpin, 'click', function (args) {
			infobox.setOptions({
				location: args.target.getLocation(),
				title: args.target.metadata.title,
				description: args.target.metadata.description,
				visible: true
			}); 
		});
		//Add the pin to the map
		map.entities.push(pushpin);
	}
}

//Remove all pins from map. Used before we need to redraw pins
function removePins() {
	//For all pins in map, remove them
	for (var i = map.entities.getLength() - 1; i >= 0; i--) {
		var pushpin = map.entities.get(i);
		if (pushpin instanceof Microsoft.Maps.Pushpin) {
			map.entities.removeAt(i);
		}
	}
	policeStationsDisplayed = false;
	fireStationsDisplayed = false;
	hospitalsDisplayed = false;
	//Add current location pin back
	addCurrentLocationPushpin();
}

$("#Police_Stations").click(function() {
	pinCounter = 0;
	if (!policeStationsDisplayed) {
		for (var i = pinCounter; i < listPoliceStations.length; i++) {
			map.entities.push(pushpins[i]);
		}
		policeStationsDisplayed = true;
	} else {
		for (var i = pinCounter; i < listPoliceStations.length; i++) {
			for (var j = map.entities.getLength() - 1; j >= 0; j--) {
				var pushpin = map.entities.get(j);
				if (pushpin instanceof Microsoft.Maps.Pushpin) {
					if (pushpin == pushpins[i]) {
						map.entities.removeAt(j);
					}
				}
			}
		}
		policeStationsDisplayed = false;
	}
});

$("#Fire_Stations").click(function() {
	pinCounter = listPoliceStations.length;
	if (!fireStationsDisplayed) {
		for (var i = pinCounter; i < pinCounter + listFireStations.length; i++) {
			map.entities.push(pushpins[i]);
		}
		fireStationsDisplayed = true;
	} else {
		for (var i = pinCounter; i < pinCounter + listFireStations.length; i++) {
			for (var j = map.entities.getLength() - 1; j >= 0; j--) {
				var pushpin = map.entities.get(j);
				if (pushpin instanceof Microsoft.Maps.Pushpin) {
					if (pushpin == pushpins[i]) {
						map.entities.removeAt(j);
					}
				}
			}
		}
		fireStationsDisplayed = false;
	}
});

$("#Hospitals").click(function() {
	pinCounter = listPoliceStations.length + listFireStations.length;
	if (!hospitalsDisplayed) {
		for (var i = pinCounter; i < pinCounter + listHospitals.length; i++) {
			map.entities.push(pushpins[i]);
		}
		hospitalsDisplayed = true;
	} else {
		for (var i = pinCounter; i < pinCounter + listHospitals.length; i++) {
			for (var j = map.entities.getLength() - 1; j >= 0; j--) {
				var pushpin = map.entities.get(j);
				if (pushpin instanceof Microsoft.Maps.Pushpin) {
					if (pushpin == pushpins[i]) {
						map.entities.removeAt(j);
					}
				}
			}
		}
		hospitalsDisplayed = false;
	}
});

$("#Locate_Closest").click(function() {
	var distance = 9999999;
	var myLatitude = userGeoLocation.latitude;
	var myLongitude = userGeoLocation.longitude;
	var closestLatitude;
	var closestLongitude;
	if (policeStationsDisplayed) {
		for (var i = 0; i < listPoliceStations.length; i++) {
			var calcDistance = Math.sqrt(Math.pow((myLatitude - listPoliceStations[i].Latitude), 2) + Math.pow((myLongitude - listPoliceStations[i].Longitude), 2));
			if (calcDistance < distance) {
				closestLatitude = listPoliceStations[i].Latitude;
				closestLongitude = listPoliceStations[i].Longitude;
				distance = calcDistance;
			}
		}
	}
	if (fireStationsDisplayed) {
		for (var i = 0; i < listFireStations.length; i++) {
			var calcDistance = Math.sqrt(Math.pow((myLatitude - listFireStations[i].Latitude), 2) + Math.pow((myLongitude - listFireStations[i].Longitude), 2));
			if (calcDistance < distance) {
				closestLatitude = listFireStations[i].Latitude;
				closestLongitude = listFireStations[i].Longitude;
				distance = calcDistance;
			}
		}
	}
	if (hospitalsDisplayed) {
		for (var i = 0; i < listHospitals.length; i++) {
			var calcDistance = Math.sqrt(Math.pow((myLatitude - listHospitals[i].Latitude), 2) + Math.pow((myLongitude - listHospitals[i].Longitude), 2));
			if (calcDistance < distance) {
				closestLatitude = listHospitals[i].Latitude;
				closestLongitude = listHospitals[i].Longitude;
				distance = calcDistance;
			}
		}
	}
	var closestPin;
	for (var j = map.entities.getLength() - 1; j >= 0; j--) {
		var pushpin = map.entities.get(j);
		if (pushpin instanceof Microsoft.Maps.Pushpin) {
			if ((pushpin.geometry.x == closestLongitude) && (pushpin.geometry.y == closestLatitude)) {
				closestPin = pushpin;
			}
		}
	}
	removePins();
	map.entities.push(closestPin);
	
});

$("#Clear_Map").click(function() {
	removePins();
	policeStationsDisplayed = false;
	fireStationsDisplayed = false;
	hospitalsDisplayed = false;
});

$("#helpbutton").click(function() {
	$("#helpguide").toggle();
});
$("#Add_Hospital").click(function() {
	$("#HospitalFormDiv").toggle();
	$("#PoliceFormDiv").hide();
	$("#FireFormDiv").hide();
});
$("#Add_Police_Station").click(function() {
	$("#HospitalFormDiv").hide();
	$("#PoliceFormDiv").toggle();
	$("#FireFormDiv").hide();
});
$("#Add_Fire_Station").click(function() {
	$("#HospitalFormDiv").hide();
	$("#PoliceFormDiv").hide();
	$("#FireFormDiv").toggle();
});


$("#policeSubmit").click(function() {
	var data = $("#PoliceForm").serialize();
	$.ajax({
         data: data,
         type: "post",
         url: "insertPoliceStation.php"
	});
	var objectId = listPoliceStations.length;
	var object = {"ObjectID":objectId.toString(), "Name":$("#PoliceName").val(), "Latitude":$("#PoliceLatitude").val(), "Longitude":$("#PoliceLongitude").val()};
	listPoliceStations.push(object);
	//Get the coords and create a pushpin
	var location = new Microsoft.Maps.Location($("#PoliceLatitude").val(), $("#PoliceLongitude").val());
	var pushpin = new Microsoft.Maps.Pushpin(location, null);
	//Add metadata to pushpin
	infobox.setMap(map);
	pushpin.metadata = {
			title: $("#PoliceName").val(),
			description: ("<img src='images/police.png'><b>" + "Police Station. <br>"+
				"</b><br>" + "<a href=https://bing.com/maps/default.aspx?cp=" + encodeURI($("#PoliceLatitude").val() + "~" + $("#PoliceLongitude").val()) + "&lvl=16>Bing Maps</a>  ")
		};
	//Add a pushpin click handler to invoke infobox with metadata from pushpin
	Microsoft.Maps.Events.addHandler(pushpin, 'click', function (args) {
		infobox.setOptions({
			location: args.target.getLocation(),
			title: args.target.metadata.title,
			description: args.target.metadata.description,
			visible: true
		}); 
	});
	//Add the pin to the map
	map.entities.push(pushpin);
	pushpins.splice(listPoliceStations.length-1, 0, pushpin);
	$("#PoliceName").val("");
	$("#PoliceLatitude").val("");
	$("#PoliceLongitude").val("");
	$("#PoliceFormDiv").hide();
});

$("#hospitalSubmit").click(function() {
	var data = $("#HospitalForm").serialize();
	$.ajax({
         data: data,
         type: "post",
         url: "insertHospital.php"
	});
	var objectId = listHospitals.length;
	var object = {"ObjectID":objectId.toString(), "Name":$("#HospitalName").val(), "Type":$("#HospitalType").val(), "Address":$("#HospitalAddress").val(), "City":$("#HospitalCity").val(), "Phone":$("#HospitalPhone").val(), "Latitude":$("#HospitalLatitude").val(), "Longitude":$("#HospitalLongitude").val()};
	listHospitals.push(object);
	//Get the coords and create a pushpin
	var location = new Microsoft.Maps.Location($("#HospitalLatitude").val(), $("#HospitalLongitude").val());
	var pushpin = new Microsoft.Maps.Pushpin(location, null);
	//Add metadata to pushpin
	infobox.setMap(map);
	pushpin.metadata = {
			title: $("#HospitalName").val(),
			description: ("<img src='images/hospital.png'><b>" + "<br>" + " Hospital. <br>" +  $("#HospitalAddress").val() + "<br>" + $("#HospitalCity").val() + "<br>" +  $("#HospitalPhone").val()
				+ "</b><br>" + "<a href=https://bing.com/maps/default.aspx?cp=" + encodeURI($("#HospitalLatitude").val() + "~" + $("#HospitalLongitude").val()) + "&lvl=16&where1=" + encodeURI($("#HospitalAddress").val() + ", " + $("#HospitalCity").val()) + ">Bing Maps</a>  "
				+ "<a href=http://dev.virtualearth.net/REST/v1/Locations?o=xml&q=" + encodeURI($("#HospitalAddress").val() + " " + $("#HospitalCity").val()) + "&key=Ak-JUwgsz1X2W1gUOhqr_S2unJ75nIc8NXZKSLz2qDkQg8NlXvvOAxUuswWph8lM" + ">Lat/Lng</a>")
		};
	//Add a pushpin click handler to invoke infobox with metadata from pushpin
	Microsoft.Maps.Events.addHandler(pushpin, 'click', function (args) {
		infobox.setOptions({
			location: args.target.getLocation(),
			title: args.target.metadata.title,
			description: args.target.metadata.description,
			visible: true
		}); 
	});
	//Add the pin to the map
	map.entities.push(pushpin);
	pushpins.splice(listPoliceStations.length+listFireStations.length+listHospitals.length-1, 0, pushpin);
	$("#HospitalName").val("");
	$("#HospitalType").val("");
	$("#HospitalAddress").val("");
	$("#HospitalCity").val("");
	$("#HospitalPhone").val("");
	$("#HospitalLatitude").val("");
	$("#HospitalLongitude").val("");
	$("#HospitalFormDiv").hide();
});

$("#fireSubmit").click(function() {
	var data = $("#FireForm").serialize();
	$.ajax({
         data: data,
         type: "post",
         url: "insertFireStation.php"
	});
	var objectId = listFireStations.length;
	var object = {"ObjectID":objectId.toString(), "Name":$("#FireStationName").val(), "StationNo":$("#FireStationNo").val(), "Type":$("#FireStationType").val(), "Address":$("#FireStationAddress").val(), "City":$("#FireStationCity").val(), "Latitude":$("#FireStationLatitude").val(), "Longitude":$("#FireStationLongitude").val()};
	listFireStations.push(object);
	//Get the coords and create a pushpin
	var location = new Microsoft.Maps.Location($("#FireStationLatitude").val(), $("#FireStationLongitude").val());
	var pushpin = new Microsoft.Maps.Pushpin(location, null);
	//Add metadata to pushpin
	infobox.setMap(map);
	pushpin.metadata = {
		title: $("#FireStationName").val(),
		description: ("<img src='images/fire.png'><b>" + "<br>" + $("#FireStationType").val() + " Fire Station. <br>" + $("#FireStationAddress").val() + "<br>" + $("#FireStationCity").val() 
			+ "</b><br>" + "<a href=https://bing.com/maps/default.aspx?cp=" + encodeURI($("#FireStationLatitude").val() + "~" + $("#FireStationLongitude").val()) + "&lvl=16&where1=" + encodeURI($("#FireStationAddress").val() + ", " + $("#FireStationCity").val()) + ">Bing Maps</a>  "
			+ "<a href=http://dev.virtualearth.net/REST/v1/Locations?o=xml&q=" + encodeURI($("#FireStationAddress").val() + " " + $("#FireStationCity").val()) + "&key=Ak-JUwgsz1X2W1gUOhqr_S2unJ75nIc8NXZKSLz2qDkQg8NlXvvOAxUuswWph8lM" + ">Lat/Lng</a>")
	};
	//Add a pushpin click handler to invoke infobox with metadata from pushpin
	Microsoft.Maps.Events.addHandler(pushpin, 'click', function (args) {
		infobox.setOptions({
			location: args.target.getLocation(),
			title: args.target.metadata.title,
			description: args.target.metadata.description,
			visible: true
		}); 
	});
	//Add the pin to the map
	map.entities.push(pushpin);
	pushpins.splice(listPoliceStations.length+listFireStations.length-1, 0, pushpin);
	$("#FireStationName").val("");
	$("#FireStationNo").val("");
	$("#FireStationType").val("");
	$("#FireStationAddress").val("");
	$("#FireStationCity").val("");
	$("#FireStationLatitude").val("");
	$("#FireStationLongitude").val("");
	$("#FireFormDiv").hide();
});