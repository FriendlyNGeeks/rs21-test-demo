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
    $(".data-io-clear, .data-io-map").attr("disabled", false);	
    searchFilterClear();
}

// Show Warning Modal on page load
$('#exampleModalCenter').modal('show');

// Redirect page on modal cancel click
$('.modal-cancel').click(function(){window.location.replace("https://rs21.io")});

// Function fired on data list item click
function alertNumber(n, t) {
    alert('My object number is ' + n);
    console.log(t);
}

// Data List Items Filter
function filterDataSetItems() {
	// Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchFilter');
    filter = input.value.toUpperCase();
    ul = document.getElementById("data-set-list-ul");
    li = ul.getElementsByClassName('data-set-item');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
// Clear Search Filter
function searchFilterClear() {
	var searchBox = document.getElementById("searchFilter");
	searchBox.value = "";
}

function removeMarkers(i) {
    var i = 0;
        $.each($(".leaflet-marker-pane"), function() {
          i++;
          $(this).remove();
        })
}