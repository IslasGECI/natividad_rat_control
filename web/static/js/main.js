d3.select(window).on("load", () => {
    let map = new google.maps.Map(d3.select("#map").node(), {
        zoom: 16,
        center: new google.maps.LatLng(27.856601, -115.172974),
        mapTypeId: 'satellite'
    });
    d3.json("/positions", function (data) {
        let overlay = new google.maps.OverlayView();        
        overlay.onAdd = function () {
            let layer = d3.select(this.getPanes().overlayLayer).append("div")
                .attr("class", "traps");            
            overlay.draw = function () {
                let projection = this.getProjection(),
                    padding = 10;
                let marker = layer.selectAll("svg")
                    .data(data)
                    .each(transform)
                    .enter().append("svg")
                    .each(transform)
                    .attr("class", "marker");                
                marker.append("circle")
                    .attr("r", 4.5)
                    .attr("cx", padding)
                    .attr("cy", padding);                
                marker.append("text")
                    .attr("x", padding + 7)
                    .attr("y", padding)
                    .attr("dy", ".31em")
                    .attr("fill", "white")
                    .attr("stroke", "black")                    
                    .attr("font-size", "1.5em")
                    .text(function (d) { return d["id trampa"]; });
                function transform(d) {                    
                    d = new google.maps.LatLng(d.latitude, d.longitude);
                    d = projection.fromLatLngToDivPixel(d);                    
                    return d3.select(this)                        
                        .style("left", (d.x - padding) + "px")
                        .style("top", (d.y - padding) + "px");
                }
            };
        };
        overlay.setMap(map);
    });
    map.addListener("click", function(e) {
        console.log(e);
    });
});