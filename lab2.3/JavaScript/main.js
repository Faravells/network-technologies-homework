document.addEventListener("DOMContentLoaded", function() {
  showTable('build', buildings);
  d3.select("#tableBtn")
    .on("click", function() {
      if (d3.select("#tableBtn").node().value === "Скрыть таблицу") {
        d3.selectAll("tr")
          .remove();
        d3.select("#tableBtn")
          .attr("value", "Показать таблицу");
      }
      else {
        showTable('build', buildings);
        d3.select("#tableBtn")
          .attr("value", "Скрыть таблицу");
      }
    });

  const settingForm = document.getElementById('setting');
  drawGraph(buildings, settingForm);
  d3.select("#buildBtn")
    .on("click", function() {
      if (settingForm.querySelectorAll('input[name="oy"]:checked').length === 0) {
        d3.select('#checkboxP')
          .style('color', 'red');
      }
      else {
        drawGraph(buildings, settingForm);
      }
    })
  d3.select('#checkboxP')
    .selectAll('input')
    .on("click", function() {
      d3.select('#checkboxP')
        .style('color', 'black');
    })
})