// <!--
// I, Srinath Natarajan, 000770411 certify that this material is my original work.
// No other person's work has been used without due acknowledgement.
// Name: Srinath Natarajan
// ID: 000770411
// Date: 03-10-2019

// Description: Allows user to add a police station
// -->
<?php
//timezone
	date_default_timezone_set('America/New_York');
	$newID;
	try {
		$command = "SELECT MAX(ObjectID) FROM PoliceStations LIMIT 1";
		$dbh = new PDO("mysql:host=sql103.epizy.com;dbname=epiz_23907369_000770411", "epiz_23907369", "M5CCTNczmAF");
		$stmt = $dbh->prepare($command);
		$result = $stmt->execute();
		$row = $stmt->fetch();
		$ObjectID = intval($row["MAX(ObjectID)"]);
		$newID = $ObjectID + 1; 
		}
	//Return exception error
	catch (Exception $e) {
		echo "<p>Unable to connect</p>";
	}
	//When user submits the form
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		
		//Check all the inputs
		$myObj['policeStationID'] = $newID;
		$myObj['Name'] =  $_POST['Name'];
		$myObj['Latitude'] =  $_POST['Latitude'];
		$myObj['Longitude'] =  $_POST['Longitude'];

		//Try connecting to database and completing command
		try {
			$result = false;
			$validInput = true;
			//Verify that no field is empty
			if ((empty($myObj['policeStationID'])) || (empty($myObj['Name'])) || (empty($myObj['Latitude'])) || (empty($myObj['Longitude']))) {
				$validInput = false;
				echo "<p>Failure</p>";
			} else {
				$command = "INSERT INTO PoliceStations VALUES (:policeStationID, :Name, :Latitude, :Longitude)";
				$dbh = new PDO("mysql:host=sql103.epizy.com;dbname=epiz_23907369_000770411", "epiz_23907369", "M5CCTNczmAF");
				$stmt = $dbh->prepare($command);
				$result = $stmt->execute($myObj);
				
				//Return result of command
				if (($result) && ($validInput)) {
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
	}
?>	
			