<!-- 
Name : Srinath Natarajan
Student Number : 000770411
Date : 03-10-2019
Description : Main page for ESL
-->
<?php
//timezone
	date_default_timezone_set('America/New_York');
	$newID;
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Emergency Services Locator</title>
		<link rel="stylesheet" type="text/css" href="css/styles.css">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<!-- Bootstrap -->
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<script src="js/jquery-1.10.0.js"></script>
		<style>
		.navbar.center .navbar-inner {
			text-align: center;
		}
		.navbar.center .navbar-inner .nav {
			display:inline-block;
			float: none;
			vertical-align: top;
		}
		.toppadding {
			margin-top:20px;
			}
		body {
			background-color:lightgrey;
			}
		.formLabel {
			display: table-cell;
		}
		.formInput {
			display: table-cell;
		}
		.formUl {
			display: table;
		}
		
		.formLi {
			display: table-row;
		}
		#hospitalSubmit, #fireSubmit, #policeSubmit {
			text-align: center;
			width:100%;
			}
		label {
			text-align:center;
			width:100%;
		}
		</style>
    </head>
    <body>
		<!-- container for the buttons for All and cities -->
		<div id='titleOfPage'>Emergency Services Locator</div>
		<nav class="navbar navbar-inverse center toppadding">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">
					<img alt="Brand" src="images/logoi.png">
				</a>
			</div>
			<div class="navbar-inner">
				<ul class="nav navbar-nav">
					<li id="Hospitals" class="active"><a href="#"><b>Hospitals</b></a></li>
					<li id="Police_Stations"><a href="#"><b>Police Stations</b></a></li>
					<li id="Fire_Stations" class="active"><a href="#"><b>Fire Stations</b></a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right" style="width:100px;font-size:150%;">
					<li id="helpbutton"><a href="#"><b>Help</b></a></li>
				</ul>
			</div>
		</nav>
		<div id="helpguide" style="display:none;text-align:center;">
			<ul style="list-style-type:none">
				<li>Click on one of the three buttons at the top of the page labelled "Hospitals", "Police Stations", or "Fire Stations" to toggle the locations for that choice.</li>
				<li>To add a location to the map, you can use one of the Add buttons at the bottom of the page to add that type of location to the database by filling out the required information.</li>
				<li>To clear the map, you can press the "Clear Map" button located at the bottom of the page.</li>
				<li>You can also locate the closest pin to your location by clicking on the "Locate Closest" button.</li>
				<li><b>Press the "Help" button again to hide these tips!</b></li>
			</ul>
		</div>
			<!-- container for bing maps -->
        <div id='myMap'></div>
		<!-- container for the buttons for All and cities -->
		<nav class="navbar navbar-inverse center toppadding">
			
			<div class="navbar-inner">
				<ul class="nav navbar-nav">
					<li id="Add_Hospital" class="active"><a href="#HospitalFormDiv"><b>Add Hospital</b></a></li>
					<li id="Add_Police_Station"><a href="#PoliceFormDiv"><b>Add Police Station</b></a></li>
					<li id="Add_Fire_Station" class="active"><a href="#FireFormDiv"><b>Add Fire Station</b></a></li>
					<li id="Clear_Map"><a href="#"><b>Clear Map</b></a></li>
					<li id="Locate_Closest" class="active"><a href="#"><b>Locate Closest</b></a></li>
				</ul>
			</div>
		</nav>
		<div class="border">
			<div id="HospitalFormDiv" style="display:none">
				<!-- Main information on page like main menu link, information about page -->
				<label>Insert a Hospital into the database.</label>
				<!-- Form that asks user for all information about a vehicle -->
				<form id="HospitalForm">
					<div class="formUl" style="list-style-type:none">
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon1">Name: </span><input class="formInput form-control" type="text" id="HospitalName" name="Name" required aria-describedby="basic-addon1"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon2">Type: </span><input class="formInput form-control" type="text" id="HospitalType" name="Type" aria-describedby="basic-addon2"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon3">Address: </span><input class="formInput form-control" type="text" id="HospitalAddress" name="Address" required aria-describedby="basic-addon3"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon4">City: </span><input class="formInput form-control" type="text" id="HospitalCity" name="City" required aria-describedby="basic-addon4"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon5">Phone: </span><input class="formInput form-control" type="text" id="HospitalPhone" name="Phone" required aria-describedby="basic-addon5"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon6">Latitude: </span><input class="formInput form-control" type="number" id="HospitalLatitude" name="Latitude" step=any required aria-describedby="basic-addon6"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon7">Longitude: </span><input class="formInput form-control" type="number" id="HospitalLongitude" name="Longitude" step=any required aria-describedby="basic-addon7"></div>
						<div><button id="hospitalSubmit" type="button" class="btn btn-default btn-lg"></span>Submit</button></div>
					</div>
				</form>
			</div>
			<div id="PoliceFormDiv" style="display:none">
				<!-- Main information on page like main menu link, information about page -->
				<label>Insert a Police Station into the database.</label>
				<!-- Form that asks user for all information about a vehicle -->
				<form id="PoliceForm">
					<div class="formUl" style="list-style-type:none">
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon8">Name: </span><input class="formInput form-control" type="text" id="PoliceName" name="Name" required aria-describedby="basic-addon8"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon9">Latitude: </span><input class="formInput form-control" type="number" id="PoliceLatitude" name="Latitude" step=any required aria-describedby="basic-addon9"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon10">Longitude: </span><input class="formInput form-control" type="number" id="PoliceLongitude" name="Longitude" step=any required aria-describedby="basic-addon10"></div>
						<div><button id="policeSubmit" type="button" class="btn btn-default btn-lg"></span>Submit</button></div>
					</div>
				</form>
			</div>
			<div id="FireFormDiv" style="display:none">
				<!-- Main information on page like main menu link, information about page -->
				<label>Insert a Fire Station into the database.</label>
				<!-- Form that asks user for all information about a vehicle -->
				<form id="FireForm">
					<div class="formUl" style="list-style-type:none">
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon11">Name: </span><input class="formInput form-control" type="text" id="FireStationName" name="Name" required aria-describedby="basic-addon11"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon12">Station No: </span><input class="formInput form-control" type="text" id="FireStationNo" name="StationNo" required aria-describedby="basic-addon12"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon13">Type: </span><input class="formInput form-control" type="text" id="FireStationType" name="Type" aria-describedby="basic-addon13"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon14">Address: </span><input class="formInput form-control" type="text" id="FireStationAddress" name="Address" required aria-describedby="basic-addon14"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon15">City: </span><input class="formInput form-control" type="text" id="FireStationCity" name="City" required aria-describedby="basic-addon15"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon16">Latitude: </span><input class="formInput form-control" type="number" id="FireStationLatitude" name="Latitude" step=any required aria-describedby="basic-addon16"></div>
						<div class="formLi input-group"><span class="formLabel input-group-addon" id="basic-addon17">Longitude: </span><input class="formInput form-control" type="number" id="FireStationLongitude" name="Longitude" step=any required aria-describedby="basic-addon17"></div>
						<div><button id="fireSubmit" type="button" class="btn btn-default btn-lg"></span>Submit</button></div>
					</div>
				</form>
			</div>
			
			
		</div>
			
		<!-- main maps code that performs core functionality -->
        <script type='text/javascript' src='js/maps.js'></script>
        <script type='text/javascript' src='https://www.bing.com/api/maps/mapcontrol?key=Ak-JUwgsz1X2W1gUOhqr_S2unJ75nIc8NXZKSLz2qDkQg8NlXvvOAxUuswWph8lM&callback=loadMapScenario' async defer></script>
    </body>
</html>


