new Vue({
    el: '#app',
    data:  {
        listings: [],
        date: new Date()
    },
    components: {
    
    },
    created: function() {
      console.log("Vue instances created")
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
      getAddresses: function() {
        c = [];
        $.getJSON( "assets/data-sets/dataset_1.json", function( data ) {
          $.each( data, function( key, val ) {
            //Push objects returned in data to temp array
            c.push(val);
          });
        });
        //Push temp array to global VUE Array data.[listings]
        this.listings = c;
      }
    },
    computed: {
      
    },
    mounted: function() {
      //Used to read data sets to javascript variables on load of VUE instances
      console.log("VUE instances mounted");
      this.getAddresses();
    }
  })