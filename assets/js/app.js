new Vue({
    el: '#app',
    data:  {
      date: new Date(),
      listings: [],
      data_sets: [],
      options: [],
      center: '',
      style_id: '',
      zoom: '',
      url: '',
      mapbox_token: '',
      attribution: '',
      marker: '',
      jsonURL: 'https://api.myjson.com/bins/6k2md',
      data_set_type: "dataset_facebook",
    },
    components: {
      'l-map': window.Vue2Leaflet.LMap,
      'l-tile-layer': window.Vue2Leaflet.LTileLayer,
      'l-control-zoom': window.Vue2Leaflet.LControlZoom,
      'l-marker': window.Vue2Leaflet.LMarker,
      'l-control-attribution': window.Vue2Leaflet.LControlAttribution,
    },
    created: function() {
      console.log("Vue instances created")
      this.prepareMap();
    },
    methods: {
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
          // handle error
          console.log(error);
          var alertmsg = "Data set types not found at "+this.jsonURL+" fetching local cache copy";
          alert(alertmsg);
          // ** USED TO PULL IN DATASET TYPES LOCALLY **
          function getLocalDataSets() {
            $.getJSON( "assets/data-sets/dataset_type.json", function( data ) {
              $.each( data, function( key, val ) {
                //Push objects returned in data to global VUE Array data.[data_sets]
                d.push(val);
              });
            });
          }
          getLocalDataSets();
        })
        
        
      },
      get_datasets: function(d) {
        var jsonDataset = "assets/data-sets/" + this.data_set_type + ".json"
        $.getJSON( jsonDataset, function( data ) {
          
          function writeDataSetToDom (d) {
            var c = document.createDocumentFragment();
              for (var i=0; i<d.length; i++) {
                  var e = document.createElement("li");
                  var vueClick = document.createAttribute("v-on:click");       // Create a "class" attribute
                  vueClick.value = "democlass";
                  e.className = "data-set-item card";
                  e.id = "data-set";
                  e.setAttributeNode(vueClick);
                  
                  // e.addEventListener("click", function (e) {
                  //     document.getElementById('userViewersLookup').classList.add('userViewersLookupOpen');
                  //     ajaxViewersTwitchStats(this.innerHTML);
                  // });
                  // e.innerHTML = (d[i].Name +' '+ d[i].Category);
                  e.innerHTML = ([i] +' | '+ d[i].Name);
                  c.appendChild(e);
              }
              document.getElementById("data-set-list-ul").appendChild(c);
          }
          

          //Calculate json(dataset) full length and break up push to array
          function jsonPaginationCheck( key, val ) {
            var l= (Object.keys(data).length);
            var e = Math.floor((Object.keys(data).length) / 200);
            var r = l - (200 * e);
            
            function skippagination () {
              console.log('Pagination skipped');
              // PUSH DATA VALUES TO ARRAY ALL AT ONE TIME
              $.each( data, function( key, val ) {
                //Push objects returned in data to global VUE Array data.[listings]
                d.push(val);
              });
              writeDataSetToDom(d);
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

            //Logic test to paginate or not
            if (l > 200) {
              startpagination(data, e, l);
            }else {
              skippagination();
            }
          };
          //Logic function
          jsonPaginationCheck();
        });
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
      this.get_datasets(this.listings);
    }
  })