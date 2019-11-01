
var lat = 47.232740;
var lon = -1.239692;
var macarte = null;
// Fonction d'initialisation de la carte
function initMap() {
        // Créer l'objet de map et l'insèrer dans l'élément HTML qui a l'ID "map"
        myMap = L.map('map').setView([lat, lon], 10);
        // on précise quelle carte on utilise
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                // on cite la source
                attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                minZoom: 1,
                maxZoom: 20
        }).addTo(myMap);
        addCircuitLoireVelo(myMap);
        addAccueilVelo();
        



};

window.onload = function () {
        // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé

        initMap();
};

function addCircuitLoireVelo(map){

        $.getJSON("parcours-de-la-loire-a-velo.geojson", function (data) {


                L.geoJSON(data).addTo(map);
                
        });


}

function addAccueilVelo(){
        $.getJSON("accueil-velo-en-loire-atlantique.json", function(datas){
                $.each(datas, function (key,val){
                        $.each(val, function(key,val1){
                                console.log("Val : ", val1);    
                        });
                       // console.log("Val : ", val);
                });

        });
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}