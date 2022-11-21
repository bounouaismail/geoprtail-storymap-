$(window).on('load', function() {
  var documentSettings = {};

  // Some constants, such as default settings
  const CHAPTER_ZOOM = 15;

  // First, try reading Options.csv
  $.get('csv/Options.csv', function(options) {

    $.get('csv/Chapters.csv', function(chapters) {
      initMap(
        $.csv.toObjects(options),
        $.csv.toObjects(chapters)
      )
    }).fail(function(e) { alert('Found Options.csv, but could not read Chapters.csv') });

  // If not available, try from the Google Sheet
  }).fail(function(e) {

    var parse = function(res) {
      return Papa.parse(Papa.unparse(res[0].values), {header: true} ).data;
    }

    // First, try reading data from the Google Sheet
    if (typeof googleDocURL !== 'undefined' && googleDocURL) {

      if (typeof googleApiKey !== 'undefined' && googleApiKey) {

        var apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/'
        var spreadsheetId = googleDocURL.split('/d/')[1].split('/')[0];

        $.when(
          $.getJSON(apiUrl + spreadsheetId + '/values/Options?key=' + googleApiKey),
          $.getJSON(apiUrl + spreadsheetId + '/values/Chapters?key=' + googleApiKey),
        ).then(function(options, chapters) {
          initMap(parse(options), parse(chapters))
        })

      } else {
        alert('You load data from a Google Sheet, you need to add a free Google API key')
      }

    } else {
      alert('You need to specify a valid Google Sheet (googleDocURL)')
    }

  })



  /**
  * Reformulates documentSettings as a dictionary, e.g.
  * {"webpageTitle": "Leaflet Boilerplate", "infoPopupText": "Stuff"}
  */
  function createDocumentSettings(settings) {
    for (var i in settings) {
      var setting = settings[i];
      documentSettings[setting.Setting] = setting.Customize;
    }
  }

  /**
   * Returns the value of a setting s
   * getSetting(s) is equivalent to documentSettings[constants.s]
   */
  function getSetting(s) {
    return documentSettings[constants[s]];
  }

  /**
   * Returns the value of setting named s from constants.js
   * or def if setting is either not set or does not exist
   * Both arguments are strings
   * e.g. trySetting('_authorName', 'No Author')
   */
  function trySetting(s, def) {
    s = getSetting(s);
    if (!s || s.trim() === '') { return def; }
    return s;
  }

  /**
   * Loads the basemap and adds it to the map
   */
  function addBaseMap() {
    var basemap = trySetting('_tileProvider', 'Stamen.TonerLite');
    L.tileLayer.provider(basemap, {
      maxZoom: 18
    }).addTo(map);
  }
  var Auberge = {
    "type": "FeatureCollection",
    "name": "Auberge",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
    { "type": "Feature", "properties": { "id": 1, "Nom": "Auberge Tislite", "Parc": "Parc National du Haut Atlas Oriental" }, "geometry": { "type": "Point", "coordinates": [ -5.642542827961051, 32.196943244253312 ] } },
    { "type": "Feature", "properties": { "id": 2, "Nom": "Camping Amskou Imilchil", "Parc": "Parc National du Haut Atlas Oriental" }, "geometry": { "type": "Point", "coordinates": [ -5.638898117597736, 32.190673568278434 ] } },
    { "type": "Feature", "properties": { "id": 3, "Nom": "Rex", "Parc": "Parc National du Haut Atlas Oriental" }, "geometry": { "type": "Point", "coordinates": [ -5.435547684515845, 32.222191291062359 ] } },
    { "type": "Feature", "properties": { "id": 4, "Nom": "Palacio Sidi Hamza", "Parc": "Parc National du Haut Atlas Oriental" }, "geometry": { "type": "Point", "coordinates": [ -4.723826175519385, 32.446520244039654 ] } },
    { "type": "Feature", "properties": { "id": 5, "Nom": "Tighratin", "Parc": "Parc National du Haut Atlas Oriental" }, "geometry": { "type": "Point", "coordinates": [ -4.920299141911621, 32.339294666517986 ] } },
    { "type": "Feature", "properties": { "id": 6, "Nom": "Sahara Erg Chegaga Luxury Camp", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.242840667098961, 29.866508723447787 ] } },
    { "type": "Feature", "properties": { "id": 8, "Nom": "Nubia Luxury Desert Camp", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.224560992657787, 29.864078885598694 ] } },
    { "type": "Feature", "properties": { "id": 10, "Nom": "Atta Desert Camp", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.220127072440707, 29.854824280531084 ] } },
    { "type": "Feature", "properties": { "id": 10, "Nom": "Camp Al Koutban", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.22681148661671, 29.856834257232894 ] } },
    { "type": "Feature", "properties": { "id": 11, "Nom": "Sun Bivouc Chegaga", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.234807446940957, 29.859445227621752 ] } },
    { "type": "Feature", "properties": { "id": 10, "Nom": "Erg Chegaga Lodge", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.204224575393231, 29.844434447065321 ] } },
    { "type": "Feature", "properties": { "id": 10, "Nom": "Bivouac sous les étoiles Chegaga", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.192674026928568, 29.830959986333614 ] } },
    { "type": "Feature", "properties": { "id": 11, "Nom": "Aladin Desert Camp", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.171290608335436, 29.81969809314753 ] } },
    { "type": "Feature", "properties": { "id": 20, "Nom": "Authentic Desert Camp Erg Chegaga", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.175881019854295, 29.817861935146812 ] } },
    { "type": "Feature", "properties": { "id": 52, "Nom": "Umnya luxury camp", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.169375452880325, 29.807626676044599 ] } },
    { "type": "Feature", "properties": { "id": 12, "Nom": "Maison Bouzgarne", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.641582104277662, 30.201964761605268 ] } },
    { "type": "Feature", "properties": { "id": 15, "Nom": "Kasbah D'Aknari", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.649026177780895, 30.129180486730409 ] } },
    { "type": "Feature", "properties": { "id": 20, "Nom": "La dune", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.6641250351324, 30.085708020290422 ] } },
    { "type": "Feature", "properties": { "id": 21, "Nom": "Ksar Massa", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.666330572612493, 30.08546808734279 ] } },
    { "type": "Feature", "properties": { "id": 21, "Nom": "El menzeh", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.666638178955603, 30.085280447473494 ] } },
    { "type": "Feature", "properties": { "id": 21, "Nom": "Camping Sidi-Wassay", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.688622804297621, 30.055900965643122 ] } },
    { "type": "Feature", "properties": { "id": 23, "Nom": "Les Grottes D'Aglou", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.828971274404662, 29.81193529885962 ] } },
    { "type": "Feature", "properties": { "id": 30, "Nom": "Refuge Toubkal Les Mouflons", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.93741220281766, 31.064026924073616 ] } },
    { "type": "Feature", "properties": { "id": 31, "Nom": "Refuge Club Alpin Français", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.93758138630637, 31.0635009172269 ] } },
    { "type": "Feature", "properties": { "id": 31, "Nom": "Refuge Lepiney", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.962214502262563, 31.076043565867174 ] } },
    { "type": "Feature", "properties": { "id": 35, "Nom": "Hotel le Village du Toubkal", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.914306352354998, 31.13238474367105 ] } },
    { "type": "Feature", "properties": { "id": 34, "Nom": "Azib tamsoult", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.96795905072011, 31.097434510966956 ] } },
    { "type": "Feature", "properties": { "id": 101, "Nom": "Jbel Anaffou", "Parc": "Parc national de Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.148861646366706, 35.313377080214593 ] } },
    { "type": "Feature", "properties": { "id": 102, "Nom": "Gite montagne", "Parc": "Parc national de Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.198490196893271, 35.175864182184341 ] } },
    { "type": "Feature", "properties": { "id": 103, "Nom": "Gite Taourarte", "Parc": "Parc national de Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.126321388272556, 35.207068909040743 ] } },
    { "type": "Feature", "properties": { "id": 104, "Nom": "Akchour", "Parc": "Parc national de Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.214083457481673, 35.253118893769845 ] } },
    { "type": "Feature", "properties": { "id": 106, "Nom": "Bourfie Tourrist", "Parc": "Parc national Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.211866615881198, 35.138312778289119 ] } },
    { "type": "Feature", "properties": { "id": 107, "Nom": "Villa Azirdozoy", "Parc": "Parc national Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.001782414331923, 35.231444364469056 ] } },
    { "type": "Feature", "properties": { "id": 108, "Nom": "Chafarina's Beach", "Parc": "Parc national Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -3.980941421814722, 35.235771569440125 ] } },
    { "type": "Feature", "properties": { "id": 108, "Nom": "Gite Colina Del viente", "Parc": "Parc national Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -3.984577350365385, 35.225749247671764 ] } },
    { "type": "Feature", "properties": { "id": 109, "Nom": "Casa abdeslam chabbout", "Parc": "Parc national Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.140709869846753, 35.142808418783524 ] } },
    { "type": "Feature", "properties": { "id": 109, "Nom": "Gite Rural jnanate", "Parc": "Parc national Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.321556707792766, 35.127420038074696 ] } },
    { "type": "Feature", "properties": { "id": 110, "Nom": "Elghala Boubrisse", "Parc": "Parc national de Tazzeka" }, "geometry": { "type": "Point", "coordinates": [ -4.195898517297875, 34.147925319286891 ] } },
    { "type": "Feature", "properties": { "id": 111, "Nom": "Ain Sahla", "Parc": "Parc national de Tazzeka" }, "geometry": { "type": "Point", "coordinates": [ -4.317371016849563, 34.10481545804754 ] } },
    { "type": "Feature", "properties": { "id": 112, "Nom": "Le Relaise De Tahla", "Parc": "Parc national de Tazzeka" }, "geometry": { "type": "Point", "coordinates": [ -4.308075034575706, 34.000798098724466 ] } },
    { "type": "Feature", "properties": { "id": 113, "Nom": "Admane à Tazzeka", "Parc": "Parc national de Tazzeka" }, "geometry": { "type": "Point", "coordinates": [ -4.15559093824483, 34.039943807274902 ] } },
    { "type": "Feature", "properties": { "id": 114, "Nom": "Douar El Kalaa", "Parc": "Parc national de Tazzeka" }, "geometry": { "type": "Point", "coordinates": [ -4.127515572425799, 34.104743038160336 ] } },
    { "type": "Feature", "properties": { "id": 115, "Nom": "Dar Chaib", "Parc": "Parc national de Tazzeka" }, "geometry": { "type": "Point", "coordinates": [ -4.095529396859833, 34.104329209044373 ] } },
    { "type": "Feature", "properties": { "id": 117, "Nom": "Atlas Lake Inn", "Parc": "Parc national de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -4.994240973464827, 33.080589462989657 ] } },
    { "type": "Feature", "properties": { "id": 118, "Nom": "Ajdir", "Parc": "Parc national de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.388195706119084, 32.948158396876892 ] } },
    { "type": "Feature", "properties": { "id": 118, "Nom": "IFRI", "Parc": "Parc national de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.369004000779507, 32.903019415104872 ] } },
    { "type": "Feature", "properties": { "id": 119, "Nom": "Dar Dyafa HASSAN", "Parc": "Parc national de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.456591145591, 32.978685461202723 ] } },
    { "type": "Feature", "properties": { "id": 119, "Nom": "Dar Zayane", "Parc": "Parc national de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.565943883307148, 32.926011290811552 ] } },
    { "type": "Feature", "properties": { "id": 120, "Nom": "Sous les étoiles", "Parc": "Parc national de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.346838580680284, 33.132742365949547 ] } },
    { "type": "Feature", "properties": { "id": 121, "Nom": "Lac Ouiouane", "Parc": "Parc national de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.343939833519618, 33.127552535205993 ] } },
    { "type": "Feature", "properties": { "id": 123, "Nom": "Villa Salam", "Parc": "Parc national D'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.011483521230867, 33.644430481286484 ] } },
    { "type": "Feature", "properties": { "id": 125, "Nom": "Charlets", "Parc": "Parc national D'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.041870388018534, 33.657909967618302 ] } },
    { "type": "Feature", "properties": { "id": 126, "Nom": "Atlas Grown", "Parc": "Parc national D'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.027076781819275, 33.509186217522029 ] } },
    { "type": "Feature", "properties": { "id": 127, "Nom": "COS ONE", "Parc": "Parc national D'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.093448096118653, 33.524853416492498 ] } },
    { "type": "Feature", "properties": { "id": 128, "Nom": "SMT D'Ifrane", "Parc": "Parc national D'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.091249046548493, 33.509519591722935 ] } },
    { "type": "Feature", "properties": { "id": 128, "Nom": "Tourtite", "Parc": "Parc national D'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.159619496820744, 33.465836637642909 ] } },
    { "type": "Feature", "properties": { "id": 129, "Nom": "Le Palaise des Cerisiers", "Parc": "Parc national D'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.180210597341333, 33.444987771519195 ] } },
    { "type": "Feature", "properties": { "id": 130, "Nom": "Ras Alma", "Parc": "Parc national D'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.146325242601139, 33.463209956543274 ] } },
    { "type": "Feature", "properties": { "id": 131, "Nom": "Forest Tagroumt", "Parc": "Parc national D'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.155521268076352, 33.444820960379175 ] } },
    { "type": "Feature", "properties": { "id": 132, "Nom": "Cedre gouraud", "Parc": "Parc national D'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.166516515927153, 33.440275233347741 ] } }
    ]
    };
    var hotelIcon = L.icon({
      iconUrl: 'hotel.png',
      iconSize:     [38, 38], // size of the icon
      iconAnchor:   [22, 24], // point of the icon which will correspond to marker's location
      popupAnchor:  [-5, -5] // point from which the popup should open relative to the iconAnchor
    });
    function onEachFeature(feature, layer) {
      // does this feature have a property named popupContent?
      if (feature.properties && feature.properties.Nom) {
          layer.bindPopup(feature.properties.Nom);
      }
    };
    L.geoJSON(Auberge,{
      pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: hotelIcon},);
      },onEachFeature: onEachFeature
    }).addTo(map);

    
    var Site_touristique = {
      "type": "FeatureCollection",
      "name": "Site_Touristique",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features": [
      { "type": "Feature", "properties": { "id": 1, "Nom": "Lac Tislit", "Parc": "Parc National du Haut Atlas Oriental" }, "geometry": { "type": "Point", "coordinates": [ -5.635892879131278, 32.195946001605726 ] } },
      { "type": "Feature", "properties": { "id": 2, "Nom": "Parc National du Haut Atlas Oriental", "Parc": "Parc National du Haut Atlas Oriental" }, "geometry": { "type": "Point", "coordinates": [ -5.575859834982034, 32.209112152924945 ] } },
      { "type": "Feature", "properties": { "id": 3, "Nom": "Lac Isli", "Parc": "Parc National du Haut Atlas Oriental" }, "geometry": { "type": "Point", "coordinates": [ -5.541752183160895, 32.217869614779737 ] } },
      { "type": "Feature", "properties": { "id": 5, "Nom": "Montagne de Bab N'", "Parc": "Parc National du Haut Atlas Oriental" }, "geometry": { "type": "Point", "coordinates": [ -5.647741506266, 32.218607245839877 ] } },
      { "type": "Feature", "properties": { "id": 6, "Nom": "Parc National D'Iriqui", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.516611021611735, 29.841451411772674 ] } },
      { "type": "Feature", "properties": { "id": 7, "Nom": "Erg Chigaga", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.153342546414701, 29.805874356731291 ] } },
      { "type": "Feature", "properties": { "id": 9, "Nom": "EL KHANDAG", "Parc": "Parc National Iriqui" }, "geometry": { "type": "Point", "coordinates": [ -6.195692073462884, 29.833959495849658 ] } },
      { "type": "Feature", "properties": { "id": 8, "Nom": "Lac Neila", "Parc": "Parc National Khenifiss" }, "geometry": { "type": "Point", "coordinates": [ -12.244287052308838, 28.029648766567391 ] } },
      { "type": "Feature", "properties": { "id": 8, "Nom": "Plage Sidi Toual", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.628227374891585, 30.256121934373144 ] } },
      { "type": "Feature", "properties": { "id": 11, "Nom": "Plage Tifnit", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.637966191714414, 30.197516773883915 ] } },
      { "type": "Feature", "properties": { "id": 21, "Nom": "Ecomusée", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.654783030492167, 30.057725071257774 ] } },
      { "type": "Feature", "properties": { "id": 22, "Nom": "Plage Sidi Wasay", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.688382871349994, 30.05769431062345 ] } },
      { "type": "Feature", "properties": { "id": 25, "Nom": "Plage de Tabelbalt", "Parc": "Parc National Souss Massa" }, "geometry": { "type": "Point", "coordinates": [ -9.722131901284206, 29.993824467571827 ] } },
      { "type": "Feature", "properties": { "id": 26, "Nom": "Lac Ifni", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.882307602513058, 31.030756222002925 ] } },
      { "type": "Feature", "properties": { "id": 36, "Nom": "Mont Toubkal", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.91491541291433, 31.059980362629911 ] } },
      { "type": "Feature", "properties": { "id": 34, "Nom": "Jbel Ouanoukrim", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.949404236103746, 31.036405412494009 ] } },
      { "type": "Feature", "properties": { "id": 35, "Nom": "Sommet Imouzzer", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.912737560005112, 31.06806425732681 ] } },
      { "type": "Feature", "properties": { "id": 35, "Nom": "Jebel n'Tarourt", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.765000385536569, 31.082214149109824 ] } },
      { "type": "Feature", "properties": { "id": 40, "Nom": "Cascade Tamasoult", "Parc": "Parc National Toubkal" }, "geometry": { "type": "Point", "coordinates": [ -7.966983938612427, 31.086809787875765 ] } },
      { "type": "Feature", "properties": { "id": 50, "Nom": "Ichroub", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.216104775751703, 35.365277142234497 ] } },
      { "type": "Feature", "properties": { "id": 51, "Nom": "Grand Cascade D'akchour", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.138266597558574, 35.218388255036373 ] } },
      { "type": "Feature", "properties": { "id": 52, "Nom": "The God's bridge", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.175346989532464, 35.228902566097048 ] } },
      { "type": "Feature", "properties": { "id": 54, "Nom": "Plaza Espana", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.137347248997238, 35.140991100939665 ] } },
      { "type": "Feature", "properties": { "id": 55, "Nom": "Vue panoramique de la plage", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.219399108096487, 35.186649308479403 ] } },
      { "type": "Feature", "properties": { "id": 56, "Nom": "Ain Danou", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.178947771397696, 35.187776347338705 ] } },
      { "type": "Feature", "properties": { "id": 57, "Nom": "Cascade sur oued laou", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.235794157440314, 35.279890152864219 ] } },
      { "type": "Feature", "properties": { "id": 57, "Nom": "Csacade ifhsa", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.245600542094569, 35.300526309354076 ] } },
      { "type": "Feature", "properties": { "id": 58, "Nom": "jbel kel", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.274349337731353, 35.357045540614337 ] } },
      { "type": "Feature", "properties": { "id": 59, "Nom": "ouad ifertene", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.186829270001653, 35.345563632236946 ] } },
      { "type": "Feature", "properties": { "id": 53, "Nom": "Cascade ElKanar", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.02002496540423, 35.215548218622168 ] } },
      { "type": "Feature", "properties": { "id": 60, "Nom": "jbel isk", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.038297018060788, 35.234698936228469 ] } },
      { "type": "Feature", "properties": { "id": 61, "Nom": "jbel tzaouat", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.10096594499187, 35.239767487257971 ] } },
      { "type": "Feature", "properties": { "id": 62, "Nom": "Imuracine", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.110006205845009, 35.210352963766844 ] } },
      { "type": "Feature", "properties": { "id": 64, "Nom": "Mont Taloussis", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.087558778472373, 35.122437091978746 ] } },
      { "type": "Feature", "properties": { "id": 64, "Nom": "Houta Taloussis", "Parc": "parc national Talassemtane" }, "geometry": { "type": "Point", "coordinates": [ -5.101655456412863, 35.128703165073503 ] } },
      { "type": "Feature", "properties": { "id": 70, "Nom": "Plage Thara Youssef", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -3.976526042097635, 35.237655629487612 ] } },
      { "type": "Feature", "properties": { "id": 71, "Nom": "Boumehdi", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.013529821691413, 35.233494326594951 ] } },
      { "type": "Feature", "properties": { "id": 72, "Nom": "Plage Boussekuor", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.034263047059045, 35.233517793187211 ] } },
      { "type": "Feature", "properties": { "id": 73, "Nom": "Forêt Bouskoura", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.037164740955761, 35.23106158636778 ] } },
      { "type": "Feature", "properties": { "id": 74, "Nom": "Plage taoussarte", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.085612494828667, 35.219569618329281 ] } },
      { "type": "Feature", "properties": { "id": 75, "Nom": "Tikkit Beach", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.14039034660828, 35.199038050641803 ] } },
      { "type": "Feature", "properties": { "id": 76, "Nom": "Plage Boumeksoud", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.154965851924463, 35.197707701411375 ] } },
      { "type": "Feature", "properties": { "id": 77, "Nom": "Plage Mod Amoggar", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.174846764563356, 35.198678075941444 ] } },
      { "type": "Feature", "properties": { "id": 78, "Nom": "jbel Amssiouan", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.176685461686028, 35.189412091208503 ] } },
      { "type": "Feature", "properties": { "id": 79, "Nom": "Ettrakna", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.209398947993573, 35.18842595291305 ] } },
      { "type": "Feature", "properties": { "id": 80, "Nom": "Mas Acharki", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.217807156710792, 35.184011663386265 ] } },
      { "type": "Feature", "properties": { "id": 81, "Nom": "Plage Badis", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.293806637781251, 35.170861295027812 ] } },
      { "type": "Feature", "properties": { "id": 82, "Nom": "Plage de Torres", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.326060449808126, 35.15789670726079 ] } },
      { "type": "Feature", "properties": { "id": 85, "Nom": "Iboulifen", "Parc": "Parc National Al Hoceima" }, "geometry": { "type": "Point", "coordinates": [ -4.083543960565666, 35.142956685334561 ] } },
      { "type": "Feature", "properties": { "id": 1, "Nom": "Khénifra National Park", "Parc": "Parc National de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.436585169214908, 32.928699278368967 ] } },
      { "type": "Feature", "properties": { "id": 2, "Nom": "Foret ajdir", "Parc": "Parc National de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.409327454713897, 32.922842414314623 ] } },
      { "type": "Feature", "properties": { "id": 3, "Nom": "3ari OZROU", "Parc": "Parc National de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.404460193664559, 32.911018160920513 ] } },
      { "type": "Feature", "properties": { "id": 4, "Nom": "Lake Tiglmamines", "Parc": "Parc National de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.349269373731047, 32.912637637893887 ] } },
      { "type": "Feature", "properties": { "id": 6, "Nom": "DADDA MOSA", "Parc": "Parc National de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.188812302649145, 32.922168195670281 ] } },
      { "type": "Feature", "properties": { "id": 7, "Nom": "Ain ait oufella", "Parc": "Parc National de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.055554304797692, 32.934473261153492 ] } },
      { "type": "Feature", "properties": { "id": 8, "Nom": "Ait aziza", "Parc": "Parc National de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.500039868179424, 33.002363145758551 ] } },
      { "type": "Feature", "properties": { "id": 9, "Nom": "Aguelmam azegza", "Parc": "Parc National de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.442808844264808, 32.974354336675681 ] } },
      { "type": "Feature", "properties": { "id": 10, "Nom": "Atlas Cedar", "Parc": "Parc National de Khénifra" }, "geometry": { "type": "Point", "coordinates": [ -5.308405037127764, 33.019199939317787 ] } },
      { "type": "Feature", "properties": { "id": 1, "Nom": "Parc bouhayati", "Parc": "Parc National de Tazekka" }, "geometry": { "type": "Point", "coordinates": [ -4.098415649420663, 34.093651718143263 ] } },
      { "type": "Feature", "properties": { "id": 2, "Nom": "DR BNI ABDELKRIM", "Parc": "Parc National de Tazekka" }, "geometry": { "type": "Point", "coordinates": [ -4.24515222982953, 34.075770112687657 ] } },
      { "type": "Feature", "properties": { "id": 3, "Nom": "kaf el hijre", "Parc": "Parc National de Tazekka" }, "geometry": { "type": "Point", "coordinates": [ -4.310124148947897, 34.084049103173122 ] } },
      { "type": "Feature", "properties": { "id": 3, "Nom": "Barrage Bab laouta", "Parc": "Parc National de Tazekka" }, "geometry": { "type": "Point", "coordinates": [ -4.324917755147155, 34.01149764716822 ] } },
      { "type": "Feature", "properties": { "id": 4, "Nom": "Parc ain ainin", "Parc": "Parc National de Tazekka" }, "geometry": { "type": "Point", "coordinates": [ -4.368898746550358, 33.894921219025704 ] } },
      { "type": "Feature", "properties": { "id": 5, "Nom": "Parc National de Tazekka", "Parc": "EL GHAR MAROC" }, "geometry": { "type": "Point", "coordinates": [ -4.275739010214483, 33.901060801114973 ] } },
      { "type": "Feature", "properties": { "id": 100, "Nom": "DAYAT Aoua", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.033111673537364, 33.652012952104336 ] } },
      { "type": "Feature", "properties": { "id": 101, "Nom": "Ifrane palace", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.011720918627623, 33.509696696244632 ] } },
      { "type": "Feature", "properties": { "id": 102, "Nom": "Parc Ras ELma", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.118874606773608, 33.496610821604413 ] } },
      { "type": "Feature", "properties": { "id": 104, "Nom": "Throne summit", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.150161084749069, 33.404119886743729 ] } },
      { "type": "Feature", "properties": { "id": 106, "Nom": "Atlas parc aventure", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.172551407645244, 33.420390091641195 ] } },
      { "type": "Feature", "properties": { "id": 105, "Nom": "Club ski ifrane", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.078691973718863, 33.418971784800625 ] } },
      { "type": "Feature", "properties": { "id": 108, "Nom": "Michifen", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.076692837745989, 33.413965810778052 ] } },
      { "type": "Feature", "properties": { "id": 109, "Nom": "ELMERS OULI", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.143164108844012, 33.421891803043977 ] } },
      { "type": "Feature", "properties": { "id": 110, "Nom": "Station de ski Habri", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.14116497287114, 33.3638902030048 ] } },
      { "type": "Feature", "properties": { "id": 112, "Nom": "Obsrvatoire d'oiseaux Lac Afenourir", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.255915377714039, 33.281369545207191 ] } },
      { "type": "Feature", "properties": { "id": 114, "Nom": "AICHA A MBARK", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.249118315406273, 33.382671936176941 ] } },
      { "type": "Feature", "properties": { "id": 115, "Nom": "Les falaises", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -5.226727992510098, 33.403535771439188 ] } },
      { "type": "Feature", "properties": { "id": 116, "Nom": "Lac Shipyard", "Parc": "Parc National d'Ifrane" }, "geometry": { "type": "Point", "coordinates": [ -4.980734311048096, 33.583757086393511 ] } }
      ]
      };
      var parcIcon = L.icon({
        iconUrl: 'parc.png',
        iconSize:     [38, 38], // size of the icon
        iconAnchor:   [22, 24], // point of the icon which will correspond to marker's location
        popupAnchor:  [-5, -5] // point from which the popup should open relative to the iconAnchor
      });
      function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.Nom) {
            layer.bindPopup(feature.properties.Nom);
        }
      };
      L.geoJSON(Site_touristique,{
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: parcIcon},);
        },onEachFeature: onEachFeature
      }).addTo(map);

  function initMap(options, chapters) {
    createDocumentSettings(options);

    var chapterContainerMargin = 70;

    document.title = getSetting('_mapTitle');
    $('#header').append('<h1>' + (getSetting('_mapTitle') || '') + '</h1>');
    $('#header').append('<h2>' + (getSetting('_mapSubtitle') || '') + '</h2>');

    // Add logo
    if (getSetting('_mapLogo')) {
      $('#logo').append('<img src="' + getSetting('_mapLogo') + '" />');
      $('#top').css('height', '60px');
    } else {
      $('#logo').css('display', 'none');
      $('#header').css('padding-top', '25px');
    }

    // Load tiles
    addBaseMap();

    // Add zoom controls if needed
    if (getSetting('_zoomControls') !== 'off') {
      L.control.zoom({
        position: getSetting('_zoomControls')
      }).addTo(map);
    }

    var markers = [];

    var markActiveColor = function(k) {
      /* Removes marker-active class from all markers */
      for (var i = 0; i < markers.length; i++) {
        if (markers[i] && markers[i]._icon) {
          markers[i]._icon.className = markers[i]._icon.className.replace(' marker-active', '');

          if (i == k) {
            /* Adds marker-active class, which is orange, to marker k */
            markers[k]._icon.className += ' marker-active';
          }
        }
      }
    }

    var pixelsAbove = [];
    var chapterCount = 0;

    var currentlyInFocus; // integer to specify each chapter is currently in focus
    var overlay;  // URL of the overlay for in-focus chapter
    var geoJsonOverlay;

    for (i in chapters) {
      var c = chapters[i];

      if ( !isNaN(parseFloat(c['Latitude'])) && !isNaN(parseFloat(c['Longitude']))) {
        var lat = parseFloat(c['Latitude']);
        var lon = parseFloat(c['Longitude']);

        chapterCount += 1;

        markers.push(
          L.marker([lat, lon], {
            icon: L.ExtraMarkers.icon({
              icon: 'fa-number',
              number: c['Marker'] === 'Numbered'
                ? chapterCount
                : (c['Marker'] === 'Plain'
                  ? ''
                  : c['Marker']), 
              markerColor: c['Marker Color'] || 'blue'
            }),
            opacity: c['Marker'] === 'Hidden' ? 0 : 0.9,
            interactive: c['Marker'] === 'Hidden' ? false : true,
          }
        ));

      } else {
        markers.push(null);
      }

      // Add chapter container
      var container = $('<div></div>', {
        id: 'container' + i,
        class: 'chapter-container'
      });


      // Add media and credits: YouTube, audio, or image
      var media = null;
      var mediaContainer = null;

      // Add media source
      var source = '';
      if (c['Media Credit Link']) {
        source = $('<a>', {
          text: c['Media Credit'],
          href: c['Media Credit Link'],
          target: "_blank",
          class: 'source'
        });
      } else {
        source = $('<span>', {
          text: c['Media Credit'],
          class: 'source'
        });
      }

      // YouTube
      if (c['Media Link'] && c['Media Link'].indexOf('youtube.com/') > -1) {
        media = $('<iframe></iframe>', {
          src: c['Media Link'],
          width: '100%',
          height: '100%',
          frameborder: '0',
          allow: 'autoplay; encrypted-media',
          allowfullscreen: 'allowfullscreen',
        });

        mediaContainer = $('<div></div>', {
          class: 'img-container'
        }).append(media).after(source);
      }

      // If not YouTube: either audio or image
      var mediaTypes = {
        'jpg': 'img',
        'jpeg': 'img',
        'png': 'img',
        'tiff': 'img',
        'gif': 'img',
        'mp3': 'audio',
        'ogg': 'audio',
        'wav': 'audio',
      }

      var mediaExt = c['Media Link'] ? c['Media Link'].split('.').pop().toLowerCase() : '';
      var mediaType = mediaTypes[mediaExt];

      if (mediaType) {
        media = $('<' + mediaType + '>', {
          src: c['Media Link'],
          controls: mediaType === 'audio' ? 'controls' : '',
          alt: c['Chapter']
        });

        var enableLightbox = getSetting('_enableLightbox') === 'yes' ? true : false;
        if (enableLightbox && mediaType === 'img') {
          var lightboxWrapper = $('<a></a>', {
            'data-lightbox': c['Media Link'],
            'href': c['Media Link'],
            'data-title': c['Chapter'],
            'data-alt': c['Chapter'],
          });
          media = lightboxWrapper.append(media);
        }

        mediaContainer = $('<div></div', {
          class: mediaType + '-container'
        }).append(media).after(source);
      }

      container
        .append('<p class="chapter-header">' + c['Chapter'] + '</p>')
        .append(media ? mediaContainer : '')
        .append(media ? source : '')
        .append('<p class="description">' + c['Description'] + '</p>');

      $('#contents').append(container);

    }

    changeAttribution();

    /* Change image container heights */
    imgContainerHeight = parseInt(getSetting('_imgContainerHeight'));
    if (imgContainerHeight > 0) {
      $('.img-container').css({
        'height': imgContainerHeight + 'px',
        'max-height': imgContainerHeight + 'px',
      });
    }

    // For each block (chapter), calculate how many pixels above it
    pixelsAbove[0] = -100;
    for (i = 1; i < chapters.length; i++) {
      pixelsAbove[i] = pixelsAbove[i-1] + $('div#container' + (i-1)).height() + chapterContainerMargin;
    }
    pixelsAbove.push(Number.MAX_VALUE);

    $('div#contents').scroll(function() {
      var currentPosition = $(this).scrollTop();

      // Make title disappear on scroll
      if (currentPosition < 200) {
        $('#title').css('opacity', 1 - Math.min(1, currentPosition / 100));
      }

      for (var i = 0; i < pixelsAbove.length - 1; i++) {

        if ( currentPosition >= pixelsAbove[i]
          && currentPosition < (pixelsAbove[i+1] - 2 * chapterContainerMargin)
          && currentlyInFocus != i
        ) {

          // Update URL hash
          location.hash = i + 1;

          // Remove styling for the old in-focus chapter and
          // add it to the new active chapter
          $('.chapter-container').removeClass("in-focus").addClass("out-focus");
          $('div#container' + i).addClass("in-focus").removeClass("out-focus");

          currentlyInFocus = i;
          markActiveColor(currentlyInFocus);

          // Remove overlay tile layer if needed
          if (map.hasLayer(overlay)) {
            map.removeLayer(overlay);
          }

          // Remove GeoJson Overlay tile layer if needed
          if (map.hasLayer(geoJsonOverlay)) {
            map.removeLayer(geoJsonOverlay);
          }

          var c = chapters[i];
          
          // Add chapter's overlay tiles if specified in options
          if (c['Overlay']) {

            var opacity = parseFloat(c['Overlay Transparency']) || 1;
            var url = c['Overlay'];

            if (url.split('.').pop() === 'geojson') {
              $.getJSON(url, function(geojson) {
                overlay = L.geoJson(geojson, {
                  style: function(feature) {
                    return {
                      fillColor: feature.properties.fillColor || '#ffffff',
                      weight: feature.properties.weight || 1,
                      opacity: feature.properties.opacity || opacity,
                      color: feature.properties.color || '#cccccc',
                      fillOpacity: feature.properties.fillOpacity || 0.5,
                    }
                  }
                }).addTo(map);
              });
            } else {
              overlay = L.tileLayer(c['Overlay'], { opacity: opacity }).addTo(map);
            }

          }

          if (c['GeoJSON Overlay']) {
            $.getJSON(c['GeoJSON Overlay'], function(geojson) {

              // Parse properties string into a JS object
              var props = {};

              if (c['GeoJSON Feature Properties']) {
                var propsArray = c['GeoJSON Feature Properties'].split(';');
                var props = {};
                for (var p in propsArray) {
                  if (propsArray[p].split(':').length === 2) {
                    props[ propsArray[p].split(':')[0].trim() ] = propsArray[p].split(':')[1].trim();
                  }
                }
              }

              geoJsonOverlay = L.geoJson(geojson, {
                style: function(feature) {
                  return {
                    fillColor: feature.properties.fillColor || props.fillColor || '#ffffff',
                    weight: feature.properties.weight || props.weight || 1,
                    opacity: feature.properties.opacity || props.opacity || 0.5,
                    color: feature.properties.color || props.color || '#cccccc',
                    fillOpacity: feature.properties.fillOpacity || props.fillOpacity || 0.5,
                  }
                }
              }).addTo(map);
            });
          }
          var popup = L.popup();

          function onMapClick(e) {
              popup
                  .setLatLng(e.latlng)
                  .setContent("" + e.latlng.toString())
                  .openOn(map);
          }
          
          map.on('click', onMapClick);
          // Fly to the new marker destination if latitude and longitude exist
          if (c['Latitude'] && c['Longitude']) {
            var zoom = c['Zoom'] ? c['Zoom'] : CHAPTER_ZOOM;
            map.flyTo([c['Latitude'], c['Longitude']], zoom, {
              animate: true,
              duration: 2, // default is 2 seconds
            });
          }

          // No need to iterate through the following chapters
          break;
        }
      }
    });


    $('#contents').append(" \
      <div id='space-at-the-bottom'> \
        <a href='#top'>  \
          <i class='fa fa-chevron-up'></i></br> \
          <small>Top</small>  \
        </a> \
      </div> \
    ");

    /* Generate a CSS sheet with cosmetic changes */
    $("<style>")
      .prop("type", "text/css")
      .html("\
      #narration, #title {\
        background-color: " + trySetting('_narrativeBackground', 'white') + "; \
        color: " + trySetting('_narrativeText', 'black') + "; \
      }\
      a, a:visited, a:hover {\
        color: " + trySetting('_narrativeLink', 'blue') + " \
      }\
      .in-focus {\
        background-color: " + trySetting('_narrativeActive', '#f0f0f0') + " \
      }")
      .appendTo("head");


    endPixels = parseInt(getSetting('_pixelsAfterFinalChapter'));
    if (endPixels > 100) {
      $('#space-at-the-bottom').css({
        'height': (endPixels / 2) + 'px',
        'padding-top': (endPixels / 2) + 'px',
      });
    }

    var bounds = [];
    for (i in markers) {
      if (markers[i]) {
        markers[i].addTo(map);
        markers[i]['_pixelsAbove'] = pixelsAbove[i];
        markers[i].on('click', function() {
          var pixels = parseInt($(this)[0]['_pixelsAbove']) + 5;
          $('div#contents').animate({
            scrollTop: pixels + 'px'});
        });
        bounds.push(markers[i].getLatLng());
      }
    }
    map.fitBounds(bounds);

    $('#map, #narration, #title').css('visibility', 'visible');
    $('div.loader').css('visibility', 'hidden');

    $('div#container0').addClass("in-focus");
    $('div#contents').animate({scrollTop: '1px'});

    // On first load, check hash and if it contains an number, scroll down
    if (parseInt(location.hash.substr(1))) {
      var containerId = parseInt( location.hash.substr(1) ) - 1;
      $('#contents').animate({
        scrollTop: $('#container' + containerId).offset().top
      }, 2000);
    }

    // Add Google Analytics if the ID exists
    var ga = getSetting('_googleAnalytics');
    if ( ga && ga.length >= 10 ) {
      var gaScript = document.createElement('script');
      gaScript.setAttribute('src','https://www.googletagmanager.com/gtag/js?id=' + ga);
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ga);
    }


  }


  /**
   * Changes map attribution (author, GitHub repo, email etc.) in bottom-right
   */
  function changeAttribution() {
    var attributionHTML = $('.leaflet-control-attribution')[0].innerHTML;
    var credit = 'View <a href="'
      // Show Google Sheet URL if the variable exists and is not empty, otherwise link to Chapters.csv
      + (typeof googleDocURL !== 'undefined' && googleDocURL ? googleDocURL : './csv/Chapters.csv')
      + '" target="_blank">data</a>';

    var name = getSetting('_authorName');
    var url = getSetting('_authorURL');

    if (name && url) {
      if (url.indexOf('@') > 0) { url = 'mailto:' + url; }
      credit += ' by <a href="' + url + '">' + name + '</a> | ';
    } else if (name) {
      credit += ' by ' + name + ' | ';
    } else {
      credit += ' | ';
    }

    credit += 'View <a href="' + getSetting('_githubRepo') + '">code</a>';
    if (getSetting('_codeCredit')) credit += ' by ' + getSetting('_codeCredit');
    credit += ' with ';
    $('.leaflet-control-attribution')[0].innerHTML = credit + attributionHTML;
  }

});
