d3.select(window).on("load", () => {
    var map = new google.maps.Map(d3.select("#map").node(), {
        zoom: 16,
        center: new google.maps.LatLng(27.856601, -115.172974),
        mapTypeId: 'satellite'
    });
});