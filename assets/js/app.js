new Vue({
    el: '#app',
    data:  {
      date: new Date(),
      listings: [],
      data_sets: [],
      center: 0,
      style_id: '',
      zoom: 0,
      url: '',
      mapbox_token: '',
      toto: { zoomControl: false, dragging: false},
    },
    components: {
      'l-map': window.Vue2Leaflet.LMap,
      'l-tile-layer': window.Vue2Leaflet.LTileLayer,
      'l-marker': window.Vue2Leaflet.LMarker,
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
        this.center = L.latLng(35.083594,-106.6508292);
        this.style_id = 'mapbox.streets';
        this.zoom = 15;
        this.mapbox_token = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        this.url = 'https://api.tiles.mapbox.com/v4/'+ this.style_id +'/{z}/{x}/{y}.png?access_token='+ this.mapbox_token+'';
        return this.center
      },
      get_datasets: function(d) {
        $.getJSON( "assets/data-sets/dataset_type.json", function( data ) {
          $.each( data, function( key, val ) {
            //Push objects returned in data to global VUE Array data.[data_sets]
            d.push(val);
          });
        });
      },
      get_dataset_Facebook: function(d) {
        $.getJSON( "assets/data-sets/dataset_facebook.json", function( data ) {
          $.each( data, function( key, val ) {
            //Push objects returned in data to global VUE Array data.[listings]
            // d.push(val);
          });
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
      this.get_datasets(this.data_sets);
      this.get_dataset_Facebook(this.listings);
    }
  })