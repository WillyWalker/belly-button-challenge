
var URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(URL).then(function (Json) {

  function init() {

    const take = (arr, n = 1) => arr.slice(0, n);

    //var idList = [];
    //var sampleValList = [];

    samplesampleList = take(Json.samples[0].sample_values, 10)
    idsampleList = take(Json.samples[0].otu_ids, 10)


    function graph1() {
      data1 = [{
      x: samplesampleList,
      y: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      type: "bar",
      text: take(Json.samples[0].otu_labels, 10),
      orientation:"h",
    }];
    const layout1 = {
      hovermode: "closest",
      xaxis: {range: [0, 250], title: "Sample Values"},
      yaxis: {range: idsampleList, title: "OTU IDs"},
      title: "OTU IDs vs. Sample Values"
    };
    Plotly.newPlot("bar", data1, layout1);
    };


    function graph2() {
      data2 = [{
      x: Json.samples[0].otu_ids,
      y: Json.samples[0].sample_values,
      mode:"markers",
      type:"scatter",
      name: 'Name',
      text: Json.samples[0].otu_labels,
      marker: {
        size: Json.samples[0].sample_values,
        color: Json.samples[0].otu_ids,
        colorscale: 'YlGnBu'
              }
    }];
    const layout2 = {
      hovermode: "closest",
      xaxis: {range: [-500, 4000], title: "OTU IDs"},
      yaxis: {range: [0, 250], title: "Sample Values"},
      marker: Json.samples[0].sample_values
    };
    Plotly.newPlot("bubble", data2, layout2);
    };


    function graph3() {
      data3 = [{
      x: samplesampleList,
      y: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      type: "bar",
      orientation:"h",
    }];
    const layout3 = {
      hovermode: "closest",
      xaxis: {range: [0, 250], title: "Sample Values"},
      yaxis: {range: idsampleList, title: "OTU IDs"},
      title: "OTU IDs vs. Sample Values"
    };
    Plotly.newPlot("gauge", data3, layout3);
    };


  graph1();
  graph2();
  graph3();

  }


  d3.selectAll("#selDataset").on("change", updatePlotly);


  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays
    let x = [];
    let y = [];
  

    for (let i = 0; i < Json.samples.length; i++) { 

      idList = Json.samples[i].otu_ids;
      sampleValList = Json.samples[i].sample_values;

      if (dataset == Json.names[i]) {
        x = take(sampleValList, 10),
        y =  [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        type = "bar",

        layout = {
          xaxis: {range: [0, take(idList, 1)], title: "Sample Values"},
          yaxis: {range: take(idList, 10), title: "OTU IDs"},
          title: "OTU IDs vs. Sample Values"
        };
      }  
  }
  
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
  }

  init();

  //console.log(xList)

});