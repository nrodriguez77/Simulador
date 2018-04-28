
var base1 = new L.tileLayer(
			'http://maps.comsatel.com.pe/mapa1_12/tiles/{z}/{x}/{y}.png',
			{
				minZoom:0, 
				maxZoom: 15
			});

    	var base2 = new L.tileLayer(
    		'http://maps.comsatel.com.pe:8081/geoserver/gwc/service/tms/1.0.0/comsatel@EPSG:900913@png/{z}/{x}/{y}.png8',
    		{
    			attribution: 'Mapa Comsatel',
    			tms:true, 
    			minZoom:16, 
    			maxZoom: 22
    		});

    	mapaBase = L.layerGroup([base1, base2]);
    	myOptionsInicial = {
            center: L.latLng(parseFloat(-12.095142), parseFloat(-77.028998)),
	        zoom: 14,
	        layers: [mapaBase]            
	    };

		var map = new L.Map('map', myOptionsInicial);

        map.on('click', function(ev) {
            marker.setLatLng(ev.latlng);
            console.log("LATITUD: " + ev.latlng.lat + " LONGITUD: " + ev.latlng.lng);
        });

        var myIcon = L.icon({
        iconUrl: 'img/ic_car.svg',
        iconSize: [38, 52],
        iconAnchor: [19, 51]
        });
        var marker = L.marker(
            [-12.097025,  -77.028998],
            {
                draggable: true,
                icon: myIcon
            }
        ).addTo(map);

        marker.on('move', function(ev) {

            $("#latitud1").val(ev.latlng.lat.toFixed(6));
            $("#longitud1").val(ev.latlng.lng.toFixed(6));


        });
