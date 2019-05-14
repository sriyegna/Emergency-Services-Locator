<!--
I, Srinath Natarajan, 000770411 certify that this material is my original work.
No other person's work has been used without due acknowledgement.
Name: Srinath Natarajan
ID: 000770411
Date: 03-10-2019

Description: Reads fire stations from opendata and stores in DB
-->
<?php
//timezone
date_default_timezone_set('America/New_York');

$url = 'https://opendata.arcgis.com/datasets/dbb028cd6bcc4b218c607952b760fd04_5.geojson';
$geoJson = file_get_contents($url);
$obj = json_decode($geoJson);

try {
	$command = "INSERT INTO FireStations (ObjectID, Name, StationNo, Type, Address, City, Latitude, Longitude) VALUES (:ObjectID, :Name, :StationNo, :Type, :Address, :City, :Latitude, :Longitude)";
	$dbh = new PDO("mysql:host=sql103.epizy.com;dbname=epiz_23907369_000770411", "epiz_23907369", "M5CCTNczmAF");
	
	foreach ($obj->features as $fireStation) {
		$h['ObjectID'] = $fireStation->properties->OBJECTID;
		$h['Name'] = $fireStation->properties->NAME;
		$h['StationNo'] = $fireStation->properties->STATION_NO;
		$h['Type'] = $fireStation->properties->TYPE;
		$h['Address'] = $fireStation->properties->ADDRESS;
		$h['City'] = $fireStation->properties->COMMUNITY;
		$h['Latitude'] = $fireStation->properties->LATITUDE;
		$h['Longitude'] = $fireStation->properties->LONGITUDE;
		
		
		$stmt = $dbh->prepare($command);
		$result = $stmt->execute($h);
		//Return result of command
		if ($result) {
			echo "<p>Success</p>";
		} else {
			echo "<p>Failure</p>";
		}
	}
	
	
	
}
//Return exception error
catch (Exception $e) {
	echo "<p>Unable to connect</p>";
}

?>