var Dams = /* color: #0b4a8b */ee.FeatureCollection([]),
    Locks = /* color: #d61915 */ee.FeatureCollection([]),
    Channel_Dams = /* color: #ffc60f */ee.FeatureCollection([]),
    Partial_Dams_gte50 = /* color: #1bc7cc */ee.FeatureCollection([]),
    Partial_Dams_lt50 = /* color: #16a6ab */ee.FeatureCollection([]),
    Low_Permeable_Dams = /* color: #60ff5a */ee.FeatureCollection([]),
    Natural_riffles = /* color: #d790ff */ee.FeatureCollection([]),
    Uncertain = /* color: #a9a9a9 */ee.FeatureCollection([]);

// Import related datasets
var GRWL = ee.FeatureCollection("users/eeProject/GRWL_summaryStats"),
    GRanD = ee.FeatureCollection("users/eeProject/GRanD_reservoirs_v1_1"),
    hydroLakes = ee.FeatureCollection("users/eeProject/HydroLAKES_polys_v10"),
    gRoadsNA = ee.FeatureCollection("users/eeProject/gROADS-v1-americas"),
    hydroBasinNA = ee.FeatureCollection("users/eeProject/hybas_na_lev00_v1c"),
    fd = ee.FeatureCollection("ft:1ck8tnlEJKzdrtarlcxypr6vXnFt8jloCaSOA0wIA"),
    gridFiltered = ee.FeatureCollection("users/eeProject/fixed_grid");

// Define functions
var addLatLon = function(f) {
  // add the coordinates of a feature as its properties
  var xy = f.geometry().coordinates();
  return f.set({lon: xy.get(0), lat: xy.get(1)}).setGeometry(null);
};
var mergeCollection = function() {
  // assign point class as property to each feature and return the merged featurecollection
  Dams = Dams.map(function(f) {
    return f.set({class: 'Dam'});
  });

  Locks = Locks.map(function(f) {
    return f.set({class: 'Locks'});
  });

  Channel_Dams = Channel_Dams.map(function(f) {
    return f.set({class: 'Channel_Dams'});
  });

  Partial_Dams_gte50 = Partial_Dams_gte50.map(function(f) {
    return f.set({class: 'Partial_Dams_gte50'});
  });

  Partial_Dams_lt50 = Partial_Dams_lt50.map(function(f) {
    return f.set({class: 'Partial_Dams_lt50'});
  });
  
  Low_Permeable_Dams = Low_Permeable_Dams.map(function(f) {
    return f.set({class: 'Low_Permeable_Dams'});
  });

  Natural_riffles = Natural_riffles.map(function(f) {
    return f.set({class: 'Natural_riffles'});
  });

  Uncertain = Uncertain.map(function(f) {
    return f.set({class: 'Uncertain'});
  });

  return (Dams
  .merge(Locks)
  .merge(Channel_Dams)
  .merge(Partial_Dams_gte50)
  .merge(Partial_Dams_lt50)
  .merge(Low_Permeable_Dams)
  .merge(Natural_riffles)
  .merge(Uncertain)
  .map(addLatLon));
};
var getCellByIndex = function(index, grid) {
  var cell = ee.Feature(grid.filterMetadata('fxd_ndx', 'equals', index).first());
  return cell;
};
var updateMapOnClick = function(i, gridFiltered, GRWL) {

  var currentCell = getCellByIndex(i, gridFiltered);

  Map.centerObject(currentCell, 7);
  layers.set(5, ui.Map.Layer(ee.Image(1).mask(ee.Image(1).toByte().paint(ee.FeatureCollection(currentCell), 0)), {palette: 'black'}, 'GRID_background', true, 0.5));
  layers.set(6, ui.Map.Layer(GRWL.filterBounds(currentCell.geometry()), {color: 'yellow'}, 'GRWL', true, 0.7));
};

// Define UI widgets

// 1. buttons and labels
var layers = Map.layers();
var label_gridId = ui.Label('', {
  padding: '4px',
  color: 'blue',
  fontWeight: 'bold'});
var jumpToId = ui.Textbox({
  placeholder: 'Enter grid ID here...',
  onChange: function(ID) {
    i = parseInt(ID);
    updateMapOnClick(i, gridFiltered, GRWL);
    label_gridId.setValue('Current grid ID: ' + i);
  }
});
var button_next = ui.Button({
  label: 'Next cell',
  onClick: function() {
    i = i + 1;
    updateMapOnClick(i, gridFiltered, GRWL);
    label_gridId.setValue('Current grid ID: ' + i);
  }
});
var button_prev = ui.Button({
  label: 'Previous cell',
  onClick: function() {
    i = i - 1;
    updateMapOnClick(i, gridFiltered, GRWL);
    label_gridId.setValue('Current grid ID: ' + i);
  }
});

// 2. panels
var panel1 = ui.Panel([button_prev, label_gridId, button_next, jumpToId], ui.Panel.Layout.flow('horizontal'));
panel1.style().set({
  padding: '0px',
  position: 'bottom-center'
});

// Draw UI
var i = -1; // initiate i value

Map.setOptions('satellite');
Map.addLayer(gridFiltered, {color: 'red'}, 'GRID', false, 0.3);
Map.add(panel1);
Map.addLayer(hydroBasinNA, {color: 'grey'}, 'hydroBasinNA', false);
Map.addLayer(GRanD, {color: 'green'}, 'GRanD', false);
Map.addLayer(hydroLakes, {color: 'cyan'}, 'hydroLakes', false);
Map.addLayer(gRoadsNA, {color: 'orange'},'gRoadsNA', false);

// Program starts
var merged = mergeCollection();
Export.table.toDrive({
  collection: merged,
  description: 'export_data',
  folder: '',
  fileNamePrefix: 'Dataset',
  fileFormat: 'csv'});


//Add in grid cell viz
//Import fusion table
var fusionTable = ee.FeatureCollection("ft:1RJiOn0HkkHGui49Pgu6TuiLF7_l2m6-d7IyRggVW")
//Join fusion table to grid
var filter = ee.Filter.equals({
 leftField: 'fxd_ndx',
 rightField: 'Grid Cell'
});
var simpleJoin = ee.Join.saveFirst({
 matchKey: "test"
})
var simpleJoined = simpleJoin.apply(gridFiltered, fusionTable,filter)

var getProp = function (feature){
 var f2 = ee.Feature(feature.get("test"))
 var keep = ["Name","Date Completed mm/dd/yy:"]
 var newFeature = feature.copyProperties(f2, keep)
 return(newFeature)
}

var final = simpleJoined.map(getProp).aside(print)
//select done grid cells
var notdone = final.filterMetadata("Name", "equals", "")
var done = final.filterMetadata("Name", "not_equals", "")
//Plot them!
Map.addLayer(done, {color:"black"}, "done"),
Map.addLayer(notdone, {color:"red"}, "not done")
