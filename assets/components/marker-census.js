Vue.component('custom-marker-census', {
    components: {
      'l-marker': Vue2Leaflet.LMarker,
      'l-popup': Vue2Leaflet.LPopup,
      'l-control-attribution': Vue2Leaflet.LControlAttribution,
    },
    props: ['index', 'id', 'lat', 'lng'],

    computed: {
        latLng : function(){
            return [this.lat, this.lng]
        }
    },
  
    template: `
    <l-marker :lat-lng="latLng">
      <l-popup>List Item: {{index}}<br>
        GEOID: {{id}}
      </l-popup> 
    </l-marker>
    `
  })