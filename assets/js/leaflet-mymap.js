// Set Focus to Map and close Data Controls
$("#map").focus(function() {
    $("#display-controls").removeClass('controlsSlideOut');
});

$("#display-toggle").click(function() {
    $("#display-controls").addClass('controlsSlideOut');
})

function openControls()  {
    $("#display-controls").addClass('controlsSlideOut');
}