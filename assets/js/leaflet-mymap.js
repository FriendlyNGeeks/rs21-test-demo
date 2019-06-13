// Set Focus to Map and close Data Controls
$("#map").focus(function() {
    data_io_close();
});

function data_io_close() {
    $("#display-controls").removeClass('controlsSlideOut');
    $("#display-toggle").removeClass('display-toggle-slideIn');
}

function data_io_open() {
    $("#display-toggle").addClass('display-toggle-slideIn');
    $("#display-controls").addClass('controlsSlideOut');
}

function data_option_selected() {
    $("#data-set-filter-container").addClass('data-set-filter-container-slideUp');
}

// Show Warning Modal on page load
$('#exampleModalCenter').modal('show');

// Redirect page on modal cancel click
$('.modal-cancel').click(function(){window.location.replace("https://rs21.io")});

function alertNumber(n, t) {
    alert('My object number is ' + n);
    console.log(t);
}