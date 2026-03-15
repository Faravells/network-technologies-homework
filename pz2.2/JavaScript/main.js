document.addEventListener("DOMContentLoaded", function() {
  const width = 600;
  const height = 600;
  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

  const settingForm = document.getElementById("setting");
  d3.select("#animateBtn")
    .on("click", function() {
      runAnimation(settingForm);
    });
  d3.select("#clearBtn")
    .on("click", function() {
      svg.selectAll('*').remove();
    })
})

const runAnimation = (dataForm) => {
  const svg = d3.select("svg")
  let pict = drawSmile(svg);
  pict.attr("transform", `scale(${dataForm.xzoom.value}, ${dataForm.yzoom.value})
    rotate(${dataForm.angle.value})`);
  let path = drawPath();
  pict.transition()
    .ease(d3.easeLinear)
    .duration(dataForm.time.value)
    .attrTween("transform", translateAlong(path.node(), dataForm));
}