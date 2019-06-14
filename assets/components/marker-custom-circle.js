Vue.component('custom-marker-circle', {
    components: {
        'l-marker': Vue2Leaflet.LMarker,
        'l-circle': Vue2Leaflet.LCircle,
        'l-popup': Vue2Leaflet.LPopup,
        'l-control-attribution': Vue2Leaflet.LControlAttribution,
    },
    props: ['index', 'lat', 'long', 'radius'],

    computed: {
        latLng : function(){
            return [this.lat, this.long]
        }
    },

    template: `
    <l-circle :lat-lng="latLng" :radius="radius"></l-circle>
    `
})