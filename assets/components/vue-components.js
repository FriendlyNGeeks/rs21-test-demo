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
    </div>
    `
})

Vue.component('addresses', {

  props: ['name', 'category'],

  template: `
  <li id='test' class="card">{{ name }} {{category}}</li>
  `
})