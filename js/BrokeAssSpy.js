// Define data veriables
var importData = '';

var roomsData = '';
var missionData = '';
var gadgetData = '';
var trainerData = '';

var teamOneSelected = '';
var teamTwoSelected = '';
var teamThreeSelected = '';

// define asynchronous functions
// JSON details
function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'js/Broke Ass Spy School.json', true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText);
		}
	}
	xobj.send(null);
};

// start loading JSON data
loadJSON(function(response) {
	importData = JSON.parse(response);
	roomsData = importData.Rooms;
	missionData = importData.Mission;
	gadgetData = importData.Gadget;
	trainerData = importData.Trainer;
});

// Process and display rooms
function prepareRooms() {
	for (i = 1; i <= 6; i++) { // IMPORTANT: this should be updated to allow dynamic handling of how many options are available
		
		var teamOne_Name = Cookies.get('teamOneName');
		var teamTwo_Name = Cookies.get('teamTwoName');
		var teamThree_Name = Cookies.get('teamThreeName');

		var frontRoomName = roomsData[i].Front.split(' (')[0];
		var frontRoomPoints = roomsData[i].Front.split(' (')[1][0];
		var backRoomName = roomsData[i].Back.split(' (')[0];
		var backRoomPoints = roomsData[i].Back.split(' (')[1][0];

		$('.roomName' + i + '.front').html(frontRoomName);
		$('.roomPoints' + i + '.front').html(frontRoomPoints);
		$('.' + i + 'f.teamOneBtn').html(teamOne_Name).attr('id', 'F' + i);
		$('.' + i + 'f.teamTwoBtn').html(teamTwo_Name).attr('id', 'F' + i);
		$('.' + i + 'f.teamThreeBtn').html(teamThree_Name).attr('id', 'F' + i);

		$('.roomName' + i + '.back').html(backRoomName);
		$('.roomPoints' + i + '.back').html(backRoomPoints);
		$('.' + i + 'b.teamOneBtn').html(teamOne_Name).attr('id', 'B' + i);
		$('.' + i + 'b.teamTwoBtn').html(teamTwo_Name).attr('id', 'B' + i);
		$('.' + i + 'b.teamThreeBtn').html(teamThree_Name).attr('id', 'B' + i);
	};
};

// Select and display random gadgets
function prepareGadgets() {
	for (a = 1; a <= 6; a++) {
		for (e = 1; e <= 3; e++) {
			var diceResult = Math.floor(Math.random() * 35) +1; // IMPORTANT: this should be updated to allow dynamic handling of how many options are available
			var row = gadgetData[diceResult];
			var gadgetName = row.Gadget;
			var gadgetPoints = row.Score;
			var btnID = '.stageBtn_' + e;
			var discID = '.stageDisc_' + e;
			var gadgetID = '.g' + a;
			$('.stageBtn_' + e + '.g' + a).html(gadgetName);
			$('.stageBtn_' + e + '.g' + a).attr('id', diceResult);
			$('.stageDisc_' + e + '.g' + a).html('Points: ' + gadgetPoints);
		};
	};
};

// define story timer
function storyTimer(minutes, seconds) {
	var x = setInterval(function() {
		$('#storyTimer').html(minutes + 'm ' + seconds + 's');
			
		if (minutes > 0 && seconds == 0) {
			minutes -= 1;
			seconds = 59;
		} else if (seconds > 0) {
			seconds -= 1;
		} else if (minutes == 0 && seconds == 0) {
			clearInterval(x);
			$('#storyPage').hide();
			$('#trainerPage').show();
			prepareChoices('trainerPage');
		} else {
			clearInterval(x);
			console.log('story timer error: ' + minutes + 'm ' + seconds + 's');
		};
	}, 1000);
};

// Define get timer
function getTimer(minutes, seconds) {
	var x = setInterval(function() {
		$('#getTimer').html(minutes + 'm ' + seconds + 's'); // actual Get timer
		
		if (minutes > 0 && seconds == 0) {
			minutes -= 1;
			seconds = 59;
		} else if (seconds > 0) {
			seconds -= 1;
		} else if (minutes == 0 && seconds == 0) {
			clearInterval(x);
			$('#getPage').hide();
			prepareChoices('storyPage');
			$('#storyPage').show();
			storyTimer(4,0);
		} else {
			clearInterval(x);
			console.log('get timer error: ' + minutes + 'm ' + seconds + 's');
		};
	}, 1000);
};

// Proceed from Splash page to Players page
$('#startButton').on('click touch', function () {
	$('#splashPage').hide();
	$('#playersPage').show();
});

// Save team names to cookie and proceed to Rooms page
$('#setTeamNames').on('click touch', function() {
	Cookies.set('teamOneName', $('#teamOneNameInput').val());
	Cookies.set('teamTwoName', $('#teamTwoNameInput').val());
	Cookies.set('teamThreeName', $('#teamThreeNameInput').val());

	$('#playersPage').hide();
	$('#roomsPage').show();
	prepareRooms();
});

// Set selected rooms
$('.teamOneBtn').on('click touch', function() {
	teamOneSelected = this.id;
});

$('.teamTwoBtn').on('click touch', function() {
	teamTwoSelected = this.id;
});

$('.teamThreeBtn').on('click touch', function() {
	teamThreeSelected = this.id;
});

// Save room selections to cookie and proceed to Missions page
$('#setTeamRooms').on('click touch', function() {
	Cookies.set('teamOneRoom', teamOneSelected);
	Cookies.set('teamTwoRoom', teamTwoSelected);
	Cookies.set('teamThreeRoom', teamThreeSelected);

	$('#roomsPage').hide();
	$('#missionsPage').show();

	// Call team name cookies to populate variables
	var teamOne_Name = Cookies.get('teamOneName');
	var teamTwo_Name = Cookies.get('teamTwoName');
	var teamThree_Name = Cookies.get('teamThreeName');

	// Add team name options to stage dropdown selection boxes on Missions page
	$('.stageTeamSelect').html('<option value="' + teamOne_Name + '">' + teamOne_Name + '</option><option value="' + teamTwo_Name + '">' + teamTwo_Name + '</option><option value="' + teamThree_Name + '">' + teamThree_Name + '</option>');
});

// Randomise stage 1 mission
$('#stageOneDice').on('click touch', function() {
	var stageOneSelect = Math.floor(Math.random() * 24) +1; // IMPORTANT: this should be updated to allow dynamic handling of how many options are available
	Cookies.set('stageOneMission', stageOneSelect);
	// Show selected mission details
	$('#stageOneDescription').html(missionData[stageOneSelect].FaceText);
});

// Randomise stage 2 mission
$('#stageTwoDice').on('click touch', function() {
	var stageTwoSelect = Math.floor(Math.random() * 24) +26 // IMPORTANT: this should be updated to allow dynamic handling of how many options are available
	Cookies.set('stageTwoMission', stageTwoSelect);
	// Show selected mission details
	$('#stageTwoDescription').html(missionData[stageTwoSelect].FaceText);
});
// Randomise stage 3 mission
$('#stageThreeDice').on('click touch', function() {
	var stageThreeSelect = Math.floor(Math.random() * 24) +51 // IMPORTANT: this should be updated to allow dynamic handling of how many options are available
	Cookies.set('stageThreeMission', stageThreeSelect);
	// Show selected mission details
	$('#stageThreeDescription').html(missionData[stageThreeSelect].FaceText);
});

// Save stage selections to cookie and proceed to Gadget page
$('#setTeamMissions').on('click touch', function() {
	Cookies.set('stageOneTeam', $('#stageOneTeamSelect').val());
	Cookies.set('stageTwoTeam', $('#stageTwoTeamSelect').val());
	Cookies.set('stageThreeTeam', $('#stageThreeTeamSelect').val());

	$('#missionsPage').hide();
	prepareGadgets();
	$('#gadgetsPage').show();
});

// Save Break-In gadget selection to cookie
$('.stageBtn_1').on('click touch', function() {
	Cookies.set('stageOneGadget', this.id);
});

// Save Retrieve gadget selection to cookie
$('.stageBtn_2').on('click touch', function() {
	Cookies.set('stageTwoGadget', this.id);
});

// Save Escape gadget selection to cookie
$('.stageBtn_3').on('click touch', function() {
	Cookies.set('stageThreeGadget', this.id);
});

// proceed to next page
$('#gadgetProgress').on('click touch', function() {
	$('#gadgetsPage').hide();
	prepareChoices('getPage');
	$('#getPage').show();
	getTimer(3,0);
});

// Call cookies to populate variables
function prepareChoices(page) {
	var teamOne_Name = Cookies.get('teamOneName');
	var teamTwo_Name = Cookies.get('teamTwoName');
	var teamThree_Name = Cookies.get('teamThreeName');

	var teamOne_Room = Cookies.get('teamOneRoom');
	var teamTwo_Room = Cookies.get('teamTwoRoom');
	var teamThree_Room = Cookies.get('teamThreeRoom');

	var stageOne_Team = Cookies.get('stageOneTeam');
	var stageTwo_Team = Cookies.get('stageTwoTeam');
	var stageThree_Team = Cookies.get('stageThreeTeam');

	var stageOne_RoomName = '';
	var stageTwo_RoomName = '';
	var stageThree_RoomName = '';

	var stageOne_RoomPoints = '';
	var stageTwo_RoomPoints = '';
	var stageThree_RoomPoints = '';

	var stageOne_Gadget = Cookies.get('stageOneGadget');
	var stageTwo_Gadget = Cookies.get('stageTwoGadget');
	var stageThree_Gadget = Cookies.get('stageThreeGadget');

	// convert team rooms to stage rooms
	if (stageOne_Team == teamOne_Name) {
		var roomSide = teamOne_Room[0];
		var roomID = teamOne_Room[1];
		if (roomSide == 'F') {
			stageOne_RoomName = roomsData[roomID].Front.split('(')[0];
			stageOne_RoomPoints = roomsData[roomID].Front.split('(')[1][0];
		} else if (roomSide == 'B') {
			stageOne_RoomName = roomsData[roomID].Back.split('(')[0];
			stageOne_RoomPoints = roomsData[roomID].Back.split('(')[1][0];
		};
	} else if (stageOne_Team == teamTwo_Name) {
		var roomSide = teamTwo_Room[0];
		var roomID = teamTwo_Room[1];
		if (roomSide == 'F') {
			stageOne_RoomName = roomsData[roomID].Front.split('(')[0];
			stageOne_RoomPoints = roomsData[roomID].Front.split('(')[1][0];
		} else if (roomSide == 'B') {
			stageOne_RoomName = roomsData[roomID].Back.split('(')[0];
			stageOne_RoomPoints = roomsData[roomID].Back.split('(')[1][0];
		};
	} else {
		var roomSide = teamThree_Room[0];
		var roomID = teamThree_Room[1];
		if (roomSide == 'F') {
			stageOne_RoomName = roomsData[roomID].Front.split('(')[0];
			stageOne_RoomPoints = roomsData[roomID].Front.split('(')[1][0];
		} else if (roomSide == 'B') {
			stageOne_RoomName = roomsData[roomID].Back.split('(')[0];
			stageOne_RoomPoints = roomsData[roomID].Back.split('(')[1][0];
		};
	};
	if (stageTwo_Team == teamOne_Name) {
		var roomSide = teamOne_Room[0];
		var roomID = teamOne_Room[1];
		if (roomSide == 'F') {
			stageTwo_RoomName = roomsData[roomID].Front.split('(')[0];
			stageTwo_RoomPoints = roomsData[roomID].Front.split('(')[1][0];
		} else if (roomSide == 'B') {
			stageTwo_RoomName = roomsData[roomID].Back.split('(')[0];
			stageTwo_RoomPoints = roomsData[roomID].Back.split('(')[1][0];
		};
	} else if (stageTwo_Team == teamTwo_Name) {
		var roomSide = teamTwo_Room[0];
		var roomID = teamTwo_Room[1];
		if (roomSide == 'F') {
			stageTwo_RoomName = roomsData[roomID].Front.split('(')[0];
			stageTwo_RoomPoints = roomsData[roomID].Front.split('(')[1][0];
		} else if (roomSide == 'B') {
			stageTwo_RoomName = roomsData[roomID].Back.split('(')[0];
			stageTwo_RoomPoints = roomsData[roomID].Back.split('(')[1][0];
		};
	} else {
		var roomSide = teamThree_Room[0];
		var roomID = teamThree_Room[1];
		if (roomSide == 'F') {
			stageTwo_RoomName = roomsData[roomID].Front.split('(')[0];
			stageTwo_RoomPoints = roomsData[roomID].Front.split('(')[1][0];
		} else if (roomSide == 'B') {
			stageTwo_RoomName = roomsData[roomID].Back.split('(')[0];
			stageTwo_RoomPoints = roomsData[roomID].Back.split('(')[1][0];
		};
	};
	if (stageThree_Team == teamOne_Name) {
		var roomSide = teamOne_Room[0];
		var roomID = teamOne_Room[1];
		if (roomSide == 'F') {
			stageThree_RoomName = roomsData[roomID].Front.split('(')[0];
			stageThree_RoomPoints = roomsData[roomID].Front.split('(')[1][0];
		} else if (roomSide == 'B') {
			stageThree_RoomName = roomsData[roomID].Back.split('(')[0];
			stageThree_RoomPoints = roomsData[roomID].Back.split('(')[1][0];
		};
	} else if (stageThree_Team == teamTwo_Name) {
		var roomSide = teamTwo_Room[0];
		var roomID = teamTwo_Room[1];
		if (roomSide == 'F') {
			stageThree_RoomName = roomsData[roomID].Front.split('(')[0];
			stageThree_RoomPoints = roomsData[roomID].Front.split('(')[1][0];
		} else if (roomSide == 'B') {
			stageThree_RoomName = roomsData[roomID].Back.split('(')[0];
			stageThree_RoomPoints = roomsData[roomID].Back.split('(')[1][0];
		};
	} else {
		var roomSide = teamThree_Room[0];
		var roomID = teamThree_Room[1];
		if (roomSide == 'F') {
			stageThree_RoomName = roomsData[roomID].Front.split('(')[0];
			stageThree_RoomPoints = roomsData[roomID].Front.split('(')[1][0];
		} else if (roomSide == 'B') {
			stageThree_RoomName = roomsData[roomID].Back.split('(')[0];
			stageThree_RoomPoints = roomsData[roomID].Back.split('(')[1][0];
		};
	};

	if (page == 'getPage') {
		// Fill in choices on Get page
		$('.stageOneDisplay.teamNameDisplay').html(stageOne_Team);
		$('.stageOneDisplay.roomDisplay').html(stageOne_RoomName);

		$('.stageTwoDisplay.teamNameDisplay').html(stageTwo_Team);
		$('.stageTwoDisplay.roomDisplay').html(stageTwo_RoomName);

		$('.stageThreeDisplay.teamNameDisplay').html(stageThree_Team);
		$('.stageThreeDisplay.roomDisplay').html(stageThree_RoomName);
	} else if (page == 'storyPage') {
		var stageOne_Mission = Cookies.get('stageOneMission');
		var stageTwo_Mission = Cookies.get('stageTwoMission');
		var stageThree_Mission = Cookies.get('stageThreeMission');

		var descriptor = ['instinctively','creatively','boldly','intuitively','quickly','hurredly','thoughtfully','classily','smartly','cautiously','dicretely'];
		var randOne = Math.round(Math.random() * descriptor.length);
		var randTwo = Math.round(Math.random() * descriptor.length);
		var randThree = Math.round(Math.random() * descriptor.length);

		// Fill in choices on the Story page
		$('.stageOneDisplay.missionDisplay').html(missionData[stageOne_Mission].FaceText);
		$('.stageTwoDisplay.missionDisplay').html(missionData[stageTwo_Mission].FaceText);
		$('.stageThreeDisplay.missionDisplay').html(missionData[stageThree_Mission].FaceText);

		$('.stageOneDisplay.gadgetDisplay').html(gadgetData[stageOne_Gadget].Gadget);
		$('.stageTwoDisplay.gadgetDisplay').html(gadgetData[stageTwo_Gadget].Gadget);
		$('.stageThreeDisplay.gadgetDisplay').html(gadgetData[stageThree_Gadget].Gadget);

		$('#d1').html(descriptor[randOne]);
		$('#d2').html(descriptor[randTwo]);
		$('#d3').html(descriptor[randThree]);
	} else if ( page == 'trainerPage') {
		// Fill in team names on Trainer page
		$('.trainerOne.teamNameDisplay').html(teamOne_Name);
		$('.trainerTwo.teamNameDisplay').html(teamTwo_Name);
		$('.trainerThree.teamNameDisplay').html(teamThree_Name);
	} else if (page == 'scorePage') {
		var stageOne_Mission = Cookies.get('stageOneMission');
		var stageTwo_Mission = Cookies.get('stageTwoMission');
		var stageThree_Mission = Cookies.get('stageThreeMission');

		var stageOne_Bonus = Cookies.get('stageOneBonus');
		var stageTwo_Bonus = Cookies.get('stageTwoBonus');
		var stageThree_Bonus = Cookies.get('stageThreeBonus');

		// Fill in choices on the Score page
		$('.roomOnePoints').html(stageOne_RoomPoints);
		$('.missionOnePoints').html(missionData[stageOne_Mission].FaceScore);
		$('.gadgetOnePoints').html(gadgetData[stageOne_Gadget].Score);
		$('.bonusOnePoints').html(stageOne_Bonus);
		var totalOne = Number($('.roomOnePoints').html()) + Number($('.missionOnePoints').html()) + Number($('.gadgetOnePoints').html()) + Number($('.bonusOnePoints').html());
		$('.totalOnePoints').html(totalOne);

		$('.roomTwoPoints').html(stageTwo_RoomPoints);
		$('.missionTwoPoints').html(missionData[stageTwo_Mission].FaceScore);
		$('.gadgetTwoPoints').html(gadgetData[stageTwo_Gadget].Score);
		$('.bonusTwoPoints').html(stageTwo_Bonus);
		var totalTwo = Number($('.roomTwoPoints').html()) + Number($('.missionTwoPoints').html()) + Number($('.gadgetTwoPoints').html()) + Number($('.bonusTwoPoints').html());
		$('.totalTwoPoints').html(totalTwo);

		$('.roomThreePoints').html(stageThree_RoomPoints);
		$('.missionThreePoints').html(missionData[stageThree_Mission].FaceScore);
		$('.gadgetThreePoints').html(gadgetData[stageThree_Gadget].Score);
		$('.bonusThreePoints').html(stageThree_Bonus);
		var totalThree = Number($('.roomThreePoints').html()) + Number($('.missionThreePoints').html()) + Number($('.gadgetThreePoints').html()) + Number($('.bonusThreePoints').html());
		$('.totalThreePoints').html(totalThree);
	};
};

// Proceed from Trainer page to Score page
$('#trainerProgress').on('click touch', function() {
	Cookies.set('stageOneBonus', $('#stageOneBonus').val());
	Cookies.set('stageTwoBonus', $('#stageTwoBonus').val());
	Cookies.set('stageThreeBonus', $('#stageThreeBonus').val());

	$('#trainerPage').hide();
	prepareChoices('scorePage');
	$('#scorePage').show();
});

// Select random trainer feedback
$('#selectFeedbackOne').on('click touch', function() {
	var feedback = Math.floor(Math.random() * 44) + 1;
	$('#adviceOne').html(trainerData[feedback].Advice);
});
$('#selectFeedbackTwo').on('click touch', function() {
	var feedback = Math.floor(Math.random() * 44) + 1;
	$('#adviceTwo').html(trainerData[feedback].Advice);
});
$('#selectFeedbackThree').on('click touch', function() {
	var feedback = Math.floor(Math.random() * 44) + 1;
	$('#adviceThree').html(trainerData[feedback].Advice);
});