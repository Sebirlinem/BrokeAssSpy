// DATABASE LINKS
var roomsLink = 'https://docs.google.com/spreadsheets/d/1xr_9aapefMS8-lSrSAFqIWs6pUU0IwDRYYvuzo3LMrY/pub?output=html&gid=348270078'
var missionLink = 'https://docs.google.com/spreadsheets/d/1xr_9aapefMS8-lSrSAFqIWs6pUU0IwDRYYvuzo3LMrY/pub?output=html&gid=0';
var gadgetLink = 'https://docs.google.com/spreadsheets/d/1xr_9aapefMS8-lSrSAFqIWs6pUU0IwDRYYvuzo3LMrY/pub?output=html&gid=1021070063';
var trainerLink = 'https://docs.google.com/spreadsheets/d/1xr_9aapefMS8-lSrSAFqIWs6pUU0IwDRYYvuzo3LMrY/pub?output=html&gid=1475628725'

// GET VARIABLES
// Team names
var teamOne_Name = Cookies.get('teamOneName');
var teamTwo_Name = Cookies.get('teamTwoName');
var teamThree_Name = Cookies.get('teamThreeName');
// Team rooms
var teamOne_Room = Cookies.get('teamOneRoom');
var teamTwo_Room = Cookies.get('teamTwoRoom');
var teamThree_Room = Cookies.get('teamThreeRoom');
// Team stages
var teamOne_MissionStage = Cookies.get('teamOneMissionStage');
var teamTwo_MissionStage = Cookies.get('teamTwoMissionStage');
var teamThree_MissionStage = Cookies.get('teamThreeMissionStage');
// Missions selected
var stageOne = Cookies.get('stageOne');
var stageTwo = Cookies.get('stageTwo');
var stageThree = Cookies.get('stageThree');
// Gadgets selected
var stageOneGadget = Cookies.get('stageOneGadget');
var stageTwoGadget = Cookies.get('stageTwoGadget');
var stageThreeGadget = Cookies.get('stageThreeGadget');

// PLAYERS PAGE
// Save team names to cookie
$('#setTeamNames').on('click touch', function() {
	Cookies.set('teamOneName', $('#teamOneName').val());
	Cookies.set('teamTwoName', $('#teamTwoName').val());
	Cookies.set('teamThreeName', $('#teamThreeName').val());
});

// ROOMS PAGE
// Pull rooms data from Google sheet
var roomsData = new GoogleSpreadsheet();
roomsData.url(roomsLink);
roomsData.load(function(result) {
	console.log('Rooms data loaded');
});

// Save room selections to cookie
$('#setTeamRooms').on('click touch', function() {
	Cookies.set('teamOneRoom', $('#teamOneRoom').val());
	Cookies.set('teamTwoRoom', $('#teamTwoRoom').val());
	Cookies.set('teamThreeRoom', $('#teamThreeRoom').val());
});

// MISSIONS PAGE
// Pull rooms data from Google sheet
missionData.url(missionLink);
missionData.load(function(result) {
	console.log('Mission data loaded');
});

// Save stage selections to cookie
$('#setTeamMissions').on('click touch', function() {
	Cookies.set('teamOneMissionStage', $('#teamOneMissionStage').val());
	Cookies.set('teamTwoMissionStage', $('#teamTwoMissionStage').val());
	Cookies.set('teamThreeMissionStage', $('#teamThreeMissionStage').val());
});

// Randomise stage 1 mission
$('#stageOneDice').on('click touch', function() {
	var stageOneSelect = Math.floor(Math.random() * 25) +1 // IMPORTANT: this should be updated to allow dynamic handling of how many options are available
	Cookies.set('stageOne', stageOneSelect);
	// IMPORTANT: add action to show selected mission text
});

// Randomise stage 2 mission
$('#stageOneDice').on('click touch', function() {
	var stageTwoSelect = Math.floor(Math.random() * 25) +1 // IMPORTANT: this should be updated to allow dynamic handling of how many options are available
	Cookies.set('stageOne', stageTwoSelect);
	// IMPORTANT: add action to show selected mission text
});
// Randomise stage 3 mission
$('#stageOneDice').on('click touch', function() {
	var stageThreeSelect = Math.floor(Math.random() * 25) +1 // IMPORTANT: this should be updated to allow dynamic handling of how many options are available
	Cookies.set('stageOne', stageThreeSelect);
	// IMPORTANT: add action to show selected mission text
});

// BREAK IN PAGE
// Pull gadgets data from Google sheet
gadgetData.url(gadgetLink);
gadgetData.load(function(result) {
	console.log('Gadget data loaded');
});

// Save selection to cookie
$('#stageOneGadget').on('click touch', function() {
	Cookies.set('stageOneGadget', $(this.id()));
});

// RETRIEVE PAGE
// Pull gadgets data from Google sheet
gadgetData.url(gadgetLink);
gadgetData.load(function(result) {
	console.log('Gadget data loaded');
});

// Save selection to cookie
$('#stageTwoGadget').on('click touch', function() {
	Cookies.set('stageTwoGadget', $(this.id()));
});

// ESCAPE PAGE
// Pull gadgets data from Google sheet
gadgetData.url(gadgetLink);
gadgetData.load(function(result) {
	console.log('Gadget data loaded');
});

// Save selection to cookie
$('#stageThreeGadget').on('click touch', function() {
	Cookies.set('stageThreeGadget', $(this.id()));
});

// GET PAGE

// STORY PAGE

// TRAINER PAGE
// Pull trainer data from Google spreadsheet
trainerData.url(trainerLink);
trainerData.load(function(result) {
	console.log('Trainer data loaded');
});

// SCORE PAGE