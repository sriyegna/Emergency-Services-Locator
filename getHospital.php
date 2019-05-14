
<?php
	try {
		$command = "SELECT * FROM Hospitals";
		$dbh = new PDO("mysql:host=sql103.epizy.com;dbname=epiz_23907369_000770411", "epiz_23907369", "M5CCTNczmAF");
		$stmt = $dbh->prepare($command);
		$result = $stmt->execute();
		$hospitalArray = array();
		$count = 0;
		while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$myObj = new \stdClass();
			$myObj->ObjectID = $result['ObjectID'];
			$myObj->Name = $result['Name'];
			$myObj->Type = $result['Type'];
			$myObj->Address = $result['Address'];
			$myObj->City = $result['City'];
			$myObj->Phone = $result['Phone'];
			$myObj->Latitude = $result['Latitude'];
			$myObj->Longitude = $result['Longitude'];
			
			$hospitalArray[$count] = $myObj;
			$count++;
			}
			
			
			header('Content-Type: application/json');
			echo json_encode($hospitalArray);
		}
	//Return exception error
	catch (Exception $e) {
		echo "<p>Unable to connect</p>";
	}
?>