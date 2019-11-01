
var lat = 47.218371;
var lon = -1.553621;
var macarte = null;


// Fonction d'initialisation de la carte
function initMap() {
        // Créer l'objet de map et l'insèrer dans l'élément HTML qui a l'ID "map"
        myMap = L.map('map').setView([lat, lon], 10.5);
        // on précise quelle carte on utilise
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                // on cite la source
                attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                minZoom: 1,
                maxZoom: 20
        }).addTo(myMap);
        addCircuitLoireVelo(myMap);
        addAccueilVelo(myMap);

};

window.onload = function () {
        // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé

        initMap();
};

function addCircuitLoireVelo(map) {

        $.getJSON("parcours-de-la-loire-a-velo.geojson", function (data) {


                L.geoJSON(data).addTo(map);

        });


}

function addAccueilVelo(map) {


        var newIcon = L.Icon.extend({
                options: {

                        iconSize:     [38, 50],
                        shadowSize:   [50, 64],
                        //iconAnchor:   [22, 94],

                        popupAnchor:  [-3, -15]
                }
        });
        
        var rest = new newIcon({iconUrl: 'rest.png'});
        var dormir = new newIcon({iconUrl: 'dormir.png'});

        $.getJSON("accueil-velo-en-loire-atlantique.json", function (datas) {
                $.each(datas, function (key, val) {
                        var lat = val.fields.latitude;
                        var long = val.fields.longitude;
                        var name = val.fields.raison_sociale
                        var add = val.fields.adr_1  + " " + val.fields.cp + " " + val.fields.vil;
                        var type = val.fields.type_1;
                        var marker;
                        if (type == "Meubl\u00e9s et G\u00eetes" || type == "Chambre d'h\u00f4tes"){
                                marker = L.marker([lat, long], {icon : dormir }).addTo(map);
                        }else if(type == "H\u00f4tels"){
                                marker = L.marker([lat, long], {icon : rest }).addTo(map);
                        }else{
                                marker = L.marker([lat, long]).addTo(map);
                        }
                        
                        
                        marker.bindPopup("<b>" + name + "</b> <br> @" + add);

                        // console.log("Val : ", val);
                });

        });
}

function distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
                return 0;
        }
        else {
                var radlat1 = Math.PI * lat1 / 180;
                var radlat2 = Math.PI * lat2 / 180;
                var theta = lon1 - lon2;
                var radtheta = Math.PI * theta / 180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                        dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180 / Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit == "K") { dist = dist * 1.609344 }
                if (unit == "N") { dist = dist * 0.8684 }
                return dist;
        }
}