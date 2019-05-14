// <!--
// I, Srinath Natarajan, 000770411 certify that this material is my original work.
// No other person's work has been used without due acknowledgement.
// Name: Srinath Natarajan
// ID: 000770411
// Date: 03-10-2019

// Description: Reads data from open data and adds police stations to db
// -->
<?php
//timezone
date_default_timezone_set('America/New_York');

$url = 'https://opendata.arcgis.com/datasets/ad1aeb9b93cf429c9536ea29dd8d5f5f_9.geojson';
$geoJson = file_get_contents($url);
$obj = json_decode($geoJson);

try {
	$command = "INSERT INTO PoliceStations (ObjectID, Name, Latitude, Longitude) VALUES (:ObjectID, :Name, :Latitude, :Longitude)";
	$dbh = new PDO("mysql:host=sql103.epizy.com;dbname=epiz_23907369_000770411", "epiz_23907369", "M5CCTNczmAF");
	
	foreach ($obj->features as $policeStation) {
		$h['ObjectID'] = $policeStation->properties->OBJECTID;
		$h['Name'] = $policeStation->properties->NAME;
		$h['Latitude'] = $policeStation->properties->LATITUDE;
		$h['Longitude'] = $policeStation->properties->LONGITUDE;
		
		$stmt = $dbh->prepare($command);
		$result = $stmt->execute($h);
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