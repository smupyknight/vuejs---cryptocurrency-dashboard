$( document ).ready(function() {
    $('#cryptsDropdown').ddslick({
        onSelected: function(selectedData){
            //callback function: do something with selectedData;
        }
    });
});

window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer1", {
    animationEnabled: true,
    title:{
        text: "By Order Quantity",
        horizontalAlign: "center",
        verticalAlign: "bottom",
        fontFamily: "HelveticaNeue",
        fontSize: 18
    },
    data: [{
        type: "doughnut",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: [
            { y: 70, label: "BTC to ALT 30%", color: "#f0f0f1" },
            { y: 30, label: "BTC to ALT 30%", color: "#0198e7" },

        ]
    }]
});
chart.render();

var chart2 = new CanvasJS.Chart("chartContainer2", {
    animationEnabled: true,
    title:{
        text: "By Value",
        horizontalAlign: "center",
        verticalAlign: "bottom",
        fontFamily: "HelveticaNeue",
        fontSize: 18
    },
    data: [{
        type: "doughnut",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: [
            { y: 70, label: "BTC to ALT 30%", color: "#f0f0f1" },
            { y: 30, label: "BTC to ALT 30%", color: "#0198e7" },

        ]
    }]
});
chart2.render();

}