
//This file contains javascript code from fulab.com.

var _frameHeight, _frameOffset = 0;
var counter = parseInt(Math.random()*10000);

function open(){
	openTab('', 'KomIgangId');
	getFagmappe();
	//framesResize(window.innerHeight);
}
function openTab(evt, tabName) { // Opens a fulab tab
	// Declare all variables
	var i, tabcontent, tabitems;
	// console.log('Open tab',tabName);

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tabitems" and remove the class "active"
	tabitems = document.getElementsByClassName("tabitems");
	for (i = 0; i < tabitems.length; i++) {
		tabitems[i].className = tabitems[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	if (evt) evt.currentTarget.className += " active";
	
	openFrame(tabName)
}
function openFrame(tabname){
	var _url;
	for (var i = 0; i<tabinfo.length;i++){
		if (tabname == tabinfo[i].TabId && !tabinfo[i].activated){
			if (tabinfo[i].url.indexOf('?') > 0){
				_url = tabinfo[i].url+'&&d='+counter;
				document.getElementById(tabinfo[i].FrameId).src = _url;
			}
			else {
				_url = tabinfo[i].url;
				document.getElementById(tabinfo[i].FrameId).src = _url;
			}
			tabinfo[i].activated = true;
			document.getElementById(tabinfo[i].FrameId).scrollTo(0, 50);
			//console.log('Viser frame ',tabinfo[i].FrameId)
			//console.log('Loading url ',_url);
		}
	}
	
}
function openCourse(frameId,url){ // Inserts an url into an iFrame in a fulab tab
	document.getElementById(frameId).src = url;
}
function openResource(frameId,url){ // Inserts an url into an iFrame in a fulab tab
	var rand = Math.random();
	document.getElementById(frameId).src = url+'?stamp='+rand;
}
function openServer(frameId,url){ // Inserts an url into an iFrame in a fulab tab
	var rand = Math.random();
	document.getElementById(frameId).src = url;
}
function openCodeRunner(frameId){ // Store edited code in LS for transfer to codeRun
    var rand = Math.random();
	var url = '../fusionCoderun/indexIDE.html?url=autosave&stamp='+rand;
	//console.log('openCodeRunner ',frameId,url);
	document.getElementById(frameId).src = url;
}
//<button class='navbutton' onclick = "openResource('SkolemappeFrameId','../skolemappe/faa-vgs/html/Mat-1P/meny.html' )"> Fagmeny</button>
function openFusionCourseMenu(){
    //console.log('Fusions fagmeny: ','../page.php?skolemappe=fusion&&fagmappe=kodekurs&&side=meny.html' )
	openCourse('GuideFrameId','../page.php?skolemappe=fusion&&fagmappe=kodekurs&&side=meny.html' )
}
function openFusionCourse(mappe,side){
    var url;
	var skolemappe = 'fusion';
	var fagmappe   = mappe;
    if (window.location.hostname == 'localhost'){
		url = 'http://localhost/fusion/page.php?skolemappe='+skolemappe+'&&fagmappe='+fagmappe+'&&side='+side;
	}
	else {
		url = 'https://fulab.no/page.php?skolemappe='+skolemappe+'&&fagmappe='+fagmappe+'&&side='+side;
	}
	//console.log('Fusion fagmeny: ',url);
	openCourse('GuideFrameId',url )
}
function openSchoolCourseMenu(){
    var url;
	var skolemappe = document.getElementById('mfag_smappe').value;
	var fagmappe   = document.getElementById('mfag_fmappe').value;
    if (window.location.hostname == 'localhost'){
		url = 'http://localhost/fusion/page.php?skolemappe='+skolemappe+'&&fagmappe='+fagmappe+'&&side=meny.html';
	}
	else {
		url = 'https://fulab.no/page.php?skolemappe='+skolemappe+'&&fagmappe='+fagmappe+'&&side=meny.html';
	}
	//console.log('Skolens fagmeny: ',url);
	openCourse('SkolemappeFrameId',url );
}
function openSchoolCourseLib(){
	var url;
	var skolemappe = document.getElementById('mfag_smappe').value;
	var fagmappe   = document.getElementById('mfag_fmappe').value;
	if (window.location.hostname == 'localhost'){
		url = 'http://localhost/fusion/fusionManualFag?skolemappe='+skolemappe+'&&fagmappe='+fagmappe;
	}
	else {
		url = 'https://fulab.no/fusionManualFag?skolemappe='+skolemappe+'&&fagmappe='+fagmappe;
	}
	openCourse('SkolemappeFrameId',url );
}


var elem = document.documentElement;
var toggleFS = true;

function toggleFullscreen(){
	if (toggleFS){
		openFullscreen();
		toggleFS = false;
		document.getElementById('fsIcon').src = '../fulibs/icons/fullscreen_close_48dp.png';
		fuWebEditorChange(250,200);
	}
	else {
		closeFullscreen();
		toggleFS = true;
		document.getElementById('fsIcon').src = '../fulibs/icons/fullscreen_open_48dp.png';
		fuWebEditorChange(-250,-200);
	}
}
function openFullscreen() {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} 
	else if (elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen();
	} 
	else if (elem.msRequestFullscreen) { /* IE11 */
		elem.msRequestFullscreen();
	}

	_frameHeight = window.innerHeight;
	framesResize(screen.availHeight);
}

function closeFullscreen() {
	if (document.exitFullscreen) { //Desktop
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) { /* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE11 */
		document.msExitFullscreen();
	}
	framesResize(_frameHeight);
}


function framesResize(height){ 
    var frames, contHeight;
	frames  = document.getElementsByClassName("frame");
	for (var i = 0; i < frames.length; i++) {
		var contHeight = frames[i].contentWindow.document.innerHeight;
		frames[i].style.height = contHeight;
	}
}
