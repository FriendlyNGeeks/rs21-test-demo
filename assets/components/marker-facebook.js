Vue.component('custom-marker-facebook', {
    components: {
      'l-marker': Vue2Leaflet.LMarker,
      'l-popup': Vue2Leaflet.LPopup,
      'l-control-attribution': Vue2Leaflet.LControlAttribution,
    },
    props: ['index', 'name', 'checkins', 'lat', 'lng'],

    computed: {
        latLng : function(){
          return [this.lat, this.lng]
        }
    },

    template: `
    <l-marker :lat-lng="latLng">
      <l-popup>List Item: {{ index }}<br>
       Name: {{ name }}<br>
       Check-ins: {{ checkins }}
      </l-popup> 
    </l-marker>
    `
})