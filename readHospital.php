<!--
I, Srinath Natarajan, 000770411 certify that this material is my original work.
No other person's work has been used without due acknowledgement.
Name: Srinath Natarajan
ID: 000770411
Date: 03-10-2019

Description: Reads hospitals from opendata and stores in DB
-->
<?php
//timezone
date_default_timezone_set('America/New_York');

$url = 'https://opendata.arcgis.com/datasets/a5867b5375544ceb8f06544a5ed349a5_15.geojson';
$geoJson = file_get_contents($url);
$obj = json_decode($geoJson);

try {
	$command = "INSERT INTO Hospitals (ObjectID, Name, Type, Address, City, Phone, Latitude, Longitude) VALUES (:ObjectID, :Name, :Type, :Address, :City, :Phone, :Latitude, :Longitude)";
	$dbh = new PDO("mysql:host=sql103.epizy.com;dbname=epiz_23907369_000770411", "epiz_23907369", "M5CCTNczmAF");
	
	foreach ($obj->features as $hospital) {
		$h['ObjectID'] = $hospital->properties->OBJECTID;
		$h['Name'] = $hospital->properties->NAME;
		$h['Type'] = $hospital->properties->TYPE;
		$h['Address'] = $hospital->properties->ADDRESS;
		$h['City'] = $hospital->properties->COMMUNITY;
		$h['Phone'] = $hospital->properties->PHONE;
		$h['Latitude'] = $hospital->properties->LATITUDE;
		$h['Longitude'] = $hospital->properties->LONGITUDE;
		
		
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