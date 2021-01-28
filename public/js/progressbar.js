$(document).ready(function() {
  // calculating percentage between finished and unfinished topic to populate progress bar
  const unfinishedHtml = $("#unfinishedHtml").children().length;
  const finishedHtml = $("#finishedHtml").children().length;
  const unfinishedCss = $("#unfinishedCss").children().length;
  const finishedCss = $("#finishedCss").children().length;
  const finishedFront = finishedHtml + finishedCss;
  const totalFront = unfinishedHtml + finishedHtml + unfinishedCss + finishedCss;
  const progressFrontEnd = Math.round((finishedFront * 100) / totalFront);
  $("#progressFrontEnd")
    .attr("style", "width: " + progressFrontEnd + "%")
    .text(progressFrontEnd + "%");

  const unfinishedPhp = $("#unfinishedPhp").children().length;
  const finishedPhp = $("#finishedPhp").children().length;
  const unfinishedPython = $("#unfinishedPython").children().length;
  const finishedPython = $("#finishedPython").children().length;
  const finishedBack = finishedPhp + finishedPython;
  const totalBack = unfinishedPhp + finishedPhp + unfinishedPython + finishedPython;
  const progressBackEnd = Math.round((finishedBack * 100) / totalBack);
  $("#progressBackEnd")
    .attr("style", "width: " + progressBackEnd + "%")
    .text(progressBackEnd + "%");
});
