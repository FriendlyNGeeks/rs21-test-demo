
// Set Focus to Map and close Data Controls
$("#map").focus(function() {
    data_io_close();
});
// Close Data Controls Panel
function data_io_close() {
    $("#display-controls").removeClass('controlsSlideOut');
    $("#display-toggle").removeClass('display-toggle-slideIn');
}
// Open Data Controls Panel
function data_io_open() {
    $("#display-toggle").addClass('display-toggle-slideIn');
    $("#display-controls").addClass('controlsSlideOut');
}
// Enables Data-IO Map Dropdown and Clear Buttons and clears filter bar
function data_option_selected() {
    $("#data-set-filter-container").addClass('data-set-filter-container-slideUp');
    $(".data-io-clear, .data-io-map").attr("disabled", false);  
    searchFilterClear();
}
// Place Marker on the map upon Data-io item press
function populateMarkerThisItem( a, b, c, d, e) {
    if (MyVue.data_set_type == "Twitter"){
        currentType = "Temp_"+ MyVue.data_set_type;
        MyVue[currentType] = ([{
            "Tweet": e,
            "Username": a,
            "Lat": b,
            "Long": c,
            "Time": d,
        }]);
        MyVue.Temp_Single = ([{
            "d": e,
            "a": a,
            "b": b,
            "c": c,
            "Time": d,
        }]);
    }else if (MyVue.data_set_type == "Facebook") {
        currentType = "Temp_"+ MyVue.data_set_type;
        MyVue[currentType] = ([{
            "Name": a,
            "Lat": b,
            "Long": c,
            "Checkins": d,
        }]);
        MyVue.Temp_Single = ([{
            "a": a,
            "b": b,
            "c": c,
            "d": d,
        }]);
    }else if (MyVue.data_set_type == "Census") {
        currentType = "Temp_"+ MyVue.data_set_type;
        MyVue[currentType] = ([{
            "geometry": {
                "coordinates" : [ [[c,b]] ]
                },
            "properties" : {
                "GEOID" : a
            },
            }
        ]);
        MyVue.Temp_Single = ([{
            "a": a,
            "b": b,
            "c": c,
        }]);
    }
}

// Show Warning Modal on page load
$('#exampleModalCenter').modal('show');
//fix to move backdrop after body tag for VUE component modal
$("#exampleModalCenter").appendTo("body");
// Redirect page on modal cancel click
$('.modal-cancel').click(function(){window.location.replace("https://rs21.io")});

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