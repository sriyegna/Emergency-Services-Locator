
<?php
	try {
		$command = "SELECT * FROM FireStations";
		$dbh = new PDO("mysql:host=sql103.epizy.com;dbname=epiz_23907369_000770411", "epiz_23907369", "M5CCTNczmAF");
		$stmt = $dbh->prepare($command);
		$result = $stmt->execute();
		$fireStationArray = array();
		$count = 0;
		while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$myObj = new \stdClass();
			$myObj->ObjectID = $result['ObjectID'];
			$myObj->Name = $result['Name'];
			$myObj->StationNo = $result['StationNo'];
			$myObj->Type = $result['Type'];
			$myObj->Address = $result['Address'];
			$myObj->City = $result['City'];
			$myObj->Latitude = $result['Latitude'];
			$myObj->Longitude = $result['Longitude'];
			
			$fireStationArray[$count] = $myObj;
			$count++;
			}
			
			
			header('Content-Type: application/json');
			echo json_encode($fireStationArray);
		}
	//Return exception error
	catch (Exception $e) {
		echo "<p>Unable to connect</p>";
	}
?>