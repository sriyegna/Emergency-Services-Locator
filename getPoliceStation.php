
<?php
	try {
		$command = "SELECT * FROM PoliceStations";
		$dbh = new PDO("mysql:host=sql103.epizy.com;dbname=epiz_23907369_000770411", "epiz_23907369", "M5CCTNczmAF");
		$stmt = $dbh->prepare($command);
		$result = $stmt->execute();
		$policeStationArray = array();
		$count = 0;
		while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$myObj = new \stdClass();
			$myObj->ObjectID = $result['ObjectID'];
			$myObj->Name = $result['Name'];
			$myObj->Latitude = $result['Latitude'];
			$myObj->Longitude = $result['Longitude'];
			
			$policeStationArray[$count] = $myObj;
			$count++;
			}
			
			header('Content-Type: application/json');
			echo json_encode($policeStationArray);
		}
	//Return exception error
	catch (Exception $e) {
		echo "<p>Unable to connect</p>";
	}
?>