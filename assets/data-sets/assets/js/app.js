var MyVue = new Vue({
    el: '#app',
    data:  {
      date: new Date(),
      data_sets: [],
      data_set_type: '',
      Facebook: [],
      Twitter: [],
      Census: [],
      Temp_Facebook: [],
      Temp_Twitter: [],
      Temp_Census: [],
      Temp_L_Facebook: [],
      Temp_L_Twitter: [],
      Temp_L_Census: [],
      Temp_Single: [],
      options: [],
      center: '',
      style_id: '',
      zoom: '',
      url: '',
      mapbox_token: '',
      attribution: '',
      marker: '',
      my_marker: [],
      my_radius: '',
      jsonURL: 'https://api.myjson.com/bins/6k2md',
    },
    components: {
      'l-map': window.Vue2Leaflet.LMap,
      'l-tile-layer': window.Vue2Leaflet.LTileLayer,
      'l-control-zoom': window.Vue2Leaflet.LControlZoom,
      'l-marker': window.Vue2Leaflet.LMarker,
      'l-circle' : window.Vue2Leaflet.LCircle,
      'l-popup': window.Vue2Leaflet.LPopup,
      'l-control-attribution': window.Vue2Leaflet.LControlAttribution,
    },
    created: function() {
      console.log("Vue instances created");
      this.prepareMap();
    },
    methods: {
      openControls(t)  {
          $("#display-controls").addClass('controlsSlideOut');
          this.data_set_type = t;
          d = this[t];
          this.get_datasets(this.data_set_type, d);
      },
      myLocation() {
        this.$refs.map.mapObject.locate({setView: true, maxZoom: 15, enableHighAccuracy: true});
        function onLocationFound(e) {
          radius = e.accuracy / 2;
          MyVue.my_marker = [e.latlng.lat, e.latlng.lng];
          MyVue.my_radius = radius;
        }
        // Run function if location is found
        this.$refs.map.mapObject.on('locationfound', onLocationFound);
      
        function onLocationError(e) {
            alert(e.message);
        }
        // Run function if location is not found
        this.$refs.map.mapObject.on('locationerror', onLocationError);
      },
      populateMarkerF10() {
        this.clearMarkers();
        currentType = "Temp_"+ this.data_set_type;
        this[currentType] = this[this.data_set_type].splice(0, 10);
      },
      populateMarkerL10() {
        this.clearMarkers();
        currentType = "Temp_L_"+ this.data_set_type;
        this[currentType] = this[this.data_set_type].splice(this[this.data_set_type].length - 10, 10);
      },
      currentMonth() {
        date = new Date(),
        months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
        currentMonth = months[date.getMonth()]
        return currentMonth
      },
      currentDayofWeek() {
        date = new Date(),
        days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        currentDayofWeek = days[date.getDay()]
        return currentDayofWeek
      },
      prepareMap() {
        this.options = {"attributionControl": false, "zoomControl": false};
        this.center = L.latLng(35.083594,-106.6508292);
        this.style_id = 'mapbox.streets';
        this.zoom = 15;
        this.attribution = 'Map data &copy; <a href="https://leafletjs.com/">Leaflet</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        this.mapbox_token = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        this.url = 'https://api.tiles.mapbox.com/v4/'+ this.style_id +'/{z}/{x}/{y}.png?access_token='+ this.mapbox_token+'';
        this.marker = L.latLng(35.083594,-106.6508292);
      },
      get_datasets_type: function(d) {
        // var jsonURL = '';
        // ** USED TO PULL IN DATASET TYPES FROM API MYJSON.COM **
        axios.get(this.jsonURL)
        .then(r => {
          $.each( r.data, function( key, val ) {
            //Push objects returned in data to global VUE Array data.[data_sets]
            d.push(val);
          });
        })
        .catch(function (error) {
          // Handle error
          console.log(error);
          var alertmsg = "Data set types not found at "+this.jsonURL+" fetching local cache copy";
          alert(alertmsg);
          // ** USED TO PULL IN DATASET TYPES LOCALLY **
          function getLocalDataSets() {
            $.getJSON( "assets/data-sets/dataset_type.json", function( data ) {
              $.each( data, function( key, val ) {
                // Push objects returned in data to global VUE Array data.[data_sets]
                d.push(val);
              });
            });
          }
          getLocalDataSets();
        })
      },
      //
      get_datasets: function(t, d) {
        var jsonDataset = "assets/data-sets/" + t + ".json"
        console.log(jsonDataset);
        $.getJSON( jsonDataset.toLowerCase(), function( data ) {
          
          function writeDataSetToDom (d, x) {
            // Clear UL for new dataset
            var ul = document.querySelector(".ul-data-list");
            ul.innerHTML = "";
            // Begin Document Fragment to write to DOM
            var c = document.createDocumentFragment();
              for (var i=0; i<d.length; i++) {
                  var e = document.createElement("li");
                  e.className = "data-set-item card";
                  e.id = "data-set";
                  // Filter Logic for creating Data-IO Items list with corresponding attributes to pass to functions
                  if (t == "Twitter"){
                    // Used for single item clicks
                    twlat = d[i].Lat;
                    twlong = d[i].Long;
                    twuser = "'"+ d[i].Username + "'";
                    twdtg = "'" + d[i].Time + "'";
                    twtweet = "'" + d[i].Tweet + "'";
                    $(e).attr('onClick', 'populateMarkerThisItem(' + twuser + ','+ twlat + ',' + twlong + ',' + twdtg + ','+ twtweet + ')');
                    //---------------------------
                    e.innerHTML = ([i] +' | Username: '+ d[i].Username);
                  }else if (t == "Census") {
                    // Used for single item clicks
                    cslat = d[i].geometry.coordinates[0][0][1];
                    cslong = d[i].geometry.coordinates[0][0][0];
                    csid = "'"+ d[i].properties.GEOID + "'";
                    $(e).attr('onClick', 'populateMarkerThisItem(' + csid + ','+ cslat + ',' + cslong + ')');
                    //---------------------------
                    e.innerHTML = ([i] +' | GEOID: '+ d[i].properties.GEOID);
                  }else if(t == "Facebook"){
                    // Used for single item clicks
                    fblat = d[i].Lat;
                    fblong = d[i].Long;
                    fbname = '"' + d[i].Name + '"';
                    fbcheckins = d[i].Checkins;
                    $(e).attr('onClick', 'populateMarkerThisItem(' + fbname + ','+ fblat + ',' + fblong + ',' + fbcheckins + ')');
                    //---------------------------
                    e.innerHTML = ([i] +' | Place: '+ d[i].Name);
                  }
                  
                  c.appendChild(e);
              }
              document.getElementById("data-set-list-ul").appendChild(c);
          }
          
          // Calculate json(dataset) full length and break up push to array
          function jsonPaginationCheck( key, val ) {
            var l= (Object.keys(data).length);
            var e = Math.floor((Object.keys(data).length) / 200);
            var r = l - (200 * e);
            
            function skippagination () {
              console.log('Pagination skipped');
              // PUSH DATA VALUES TO ARRAY ALL AT ONE TIME
              $.each( data, function( key, val ) {
                // Push objects returned in data to global VUE Array data.
                d.push(val);
              });
              writeDataSetToDom(d, x);
            }
            
            function startpagination(f, e) {
              var paginationMsg = "Pagination started on " + l + " items";
              console.log(paginationMsg);
              p = 0;
              i = 0;
              n = 0;
              function countme(n) {
                while (i < 200) {
                  d.push(f[n]);
                  i++;
                  n++
                }
                return i
              }
              while (p < e) {
                countme(n);
                i = 0;
                p++;
              }
              function remainder(f, n) {
                while ( i <= r) {
                  d.push(f[n])
                  i++;
                  n++;
                }
              }
              // No remainder dataset is divisible by 200 exactly
              if (r != 0) {
                remainder(data, r, n);
              }
              writeDataSetToDom(d);
            }
            // Logic test to paginate or not
            if (l > 200) {
              // Check if data set has already been populated
              if (d.length = '0'){
                startpagination(data, e, l);
              }else {
                writeDataSetToDom(d);
              }
            }else {
              // Check if data set has already been populated
              if (d.length = "0"){
                skippagination();
              }else {
                writeDataSetToDom(d);
              }
            }
          };
          // Logic function
          jsonPaginationCheck();
        });
      },
      clearMarkers() {
        var tmap = this.$refs.map.mapObject;
        this.Temp_Census = [];
        this.Temp_Facebook = [];
        this.Temp_Twitter = [];
        this.Temp_L_Census = [];
        this.Temp_L_Facebook = [];
        this.Temp_L_Twitter = [];
        this.Temp_Single = [];
        this.my_marker = [];

      }
    },
    computed: {
          
    },
    beforeMount: function() {
      //Used to read data sets to javascript variables on load of VUE instances
      console.log("VUE instances before mounted");
    },
    mounted: function() {
      //Used to read data sets to javascript variables on load of VUE instances
      console.log("VUE instances mounted");
      this.get_datasets_type(this.data_sets);
    }
  })