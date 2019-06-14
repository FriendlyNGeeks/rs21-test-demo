// CALL IN COMPONENT SINGLE FILES THAT ARE NOT RENDERED ON PAGE LOAD
$.getScript('assets/components/vue-components-pipe.js');

Vue.component('card', {

    props: ['a', 'b', 'c', 'd'],
  
    template: `
    <div class="container my-6">
      <div class="row">
          <div class="col-md-12 bg-white">
              <div style="font-size:1.5vh">Name/User/Id: {{ a }}<br>
                  Lat: {{ b }}, Long: {{ c }}<br>
                  Checkins/Tweet:{{ d }}</div>
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

Vue.component('modal', {
  
  template: `
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">RS21 Demo | {WARNING}</h5>
        </div>
        <div class="modal-body">
            The data in this demo has been sanitized of all personal data and made available to the general public.
            <p></p>
            <p class="section-title">
                Children's privacy
            </p>
            <p>
                This website is not intended for use by children under the age of 18.
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary modal-cancel" >Cancel</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Accept</button>
        </div>
    </div>
    </div>
</div>
  `
})