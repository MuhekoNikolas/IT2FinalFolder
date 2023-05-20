//--- Mal for tegning i canvas.
//--- Tegning kan utføres direkte i Canva eller via Fusions tegneapier

//--- Deklarasjon av GLOBALE variabler for programmet
var canvas,ctx; // Canvas med 2D tegnekontekst fra HTML5
var bgcol = 'white';
//--- Hovedprogrammet i winInit kjøres når siden er ferdiglasta
window.onload = winInit;  

function winInit(){ // Hovedprogrammet
    canvas = elGetId("canvas");                 // Hentes fra klassens kodebibliotek teamtools.js (document.getElmentById("canvas")
	ctx    = canvas.getContext("2d"); 			// Objekt som inneholder tegneverktøyet i canvas
	tegnBrukCanvas("canvas"); // Kobler canvas i html sammen med tegnepakka. Viktig ved lokal koding
	
	elGetId("tegngrafMinMax").onclick   = ()=>{visGrafMinMax(true)};   // Oppsett av hendelse ved klikk på tegneknapp
	elGetId("tegngrafGsnittMinMax").onclick   = visGrafGsnittMinMax;   // Oppsett av hendelse ved klikk på tegneknapp
	elGetId("tegnDifferansenMinMax").onclick = visGrafDiffMinMax;  // Oppsett av hendelse ved klikk på viskut-knapp

	elGetId("tegnMaxSoyle").onclick = ()=>{tegnSoyleDiagram(obj=allData.Maksimums_temperatur, name="Max temperatur")}
	elGetId("tegnMinSoyle").onclick = ()=>{tegnSoyleDiagram(obj=allData.Minimums_temperatur, name="Min temperatur")}
	elGetId("viskut").onclick     = viskUt;     // Oppsett av hendelse ved klikk på viskut-knapp
	elGetId("canvas").onclick     = vedKlikk;
	tegnTittel('Tafjord [SN60500]');		// Eksempeltegning verdenskoordinater
	print('Interaktivt eksempelprogram med tegning i canvas'); // Fra skolebiblioteket. Utskrift i textarea med id='meldinger' alternativt nettleserens konsoll.
    tegnKilde();
	viskUt()
	visGrafMinMax(false)

}


function viskUt(){
	bgcol = elGetId("bakgrunn").value; // Henter verdien i feltet med id='bakgrunn'
	tegnBrukBakgrunn(bgcol);
	tegnTittel('Tafjord [SN60500]');
	clearprint(); 
}

function vedKlikk(evt){
	print(`${evt.clientX}, ${evt.clientY}`)
}