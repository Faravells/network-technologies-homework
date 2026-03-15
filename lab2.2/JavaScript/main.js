document.addEventListener("DOMContentLoaded", function() {
  const width = 600;
  const height = 600;
  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

  const settingForm = document.getElementById("setting");
  document.getElementById('drawBtn').addEventListener("click", function() {
    draw(settingForm);
  })
  document.getElementById('clearBtn').addEventListener("click", function() {
    svg.selectAll('*').remove();
  })

  d3.select("#toggleAnim")
    .on("change", function() {
      d3.selectAll(".animElems")
        .style("display", this.checked ? "inline-block" : "none");
      d3.select("#drawBtn")
        .style("display", this.checked ? "none" : "inline-block");
    });
  d3.select("#animateBtn")
    .on("click", function() {
      runAnimation(settingForm);
    })
  d3.select("#toggleWay")
    .on("change", function() {
      d3.selectAll(".wayElems")
        .style("display", this.checked ? "none" : "inline-block");
      d3.select("#way")
        .style("display", this.checked ? "inline-block" : "none");
    });
})

const draw = (dataForm) => {
  const svg = d3.select("svg");
  let pict = drawSmile(svg);
  console.log(dataForm);
  pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value})
    scale(${dataForm.xzoom.value}, ${dataForm.yzoom.value})
    rotate(${dataForm.angle.value})`);
}

const runAnimation = (dataForm) => {
  const svg = d3.select("svg")
  let pict = drawSmile(svg);
  if (!d3.select("#toggleWay").node().checked) {
    const animations = {
      'linear': d3.easeLinear,
      'elastic': d3.easeElastic,
      'bounce': d3.easeBounce
    }
    const d3animation = animations[d3.select("#animationEffect").node().value];
    pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value})
    scale(${dataForm.xzoom.value}, ${dataForm.yzoom.value})
    rotate(${dataForm.angle.value})`)
      .transition()
      .duration(6000)
      .ease(d3animation)
      .attr("transform", `translate(${dataForm.cx2.value}, ${dataForm.cy2.value})
      scale(${dataForm.xzoom2.value}, ${dataForm.yzoom2.value})
      rotate(${dataForm.angle2.value})`);
  } else {
    let path = drawPath(d3.select("#waySelect").node().value);
    pict.transition()
      .ease(d3.easeLinear) // установить в зависимости от настроек формы
      .duration(6000)
      .attrTween('transform', translateAlong(path.node()));
  }

}