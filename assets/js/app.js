Vue.component('card', {

  props: ['currentday', 'currentmonth', 'day', 'year'],

  template: `
  <div class="container my-6">
    <div class="row">
        <div class="col-md-6 offset-md-3 text-center bg-white">
            <h3>Welcome to the RS21 Demo<br>
                Today is {{ currentday }}, {{ currentmonth }} {{ day }}, {{ year }}</h3>
        </div>
    </div>
  </div>`

})

new Vue({
    el: '#app',
    data:  {
      date: new Date(),
      
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
      }
    },
    computed: {
      
    }
  })