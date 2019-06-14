Vue.component('custom-marker-twitter', {
    components: {
        'l-marker': Vue2Leaflet.LMarker,
        'l-popup': Vue2Leaflet.LPopup,
        'l-control-attribution': Vue2Leaflet.LControlAttribution,
    },
    props: ['index', 'user', 'dtg', 'lat', 'lng'],

    computed: {
        latLng : function(){
            return [this.lat, this.lng]
        }
    },

    template: `
    <l-marker :lat-lng="latLng">
        <l-popup>List Item: {{ index }}<br>
        Username: {{ user }}<br>
        DTG of Tweet: {{ dtg }}
        </l-popup> 
    </l-marker>
    `
})