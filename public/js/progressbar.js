$(document).ready(function() {
  const unfinishedNum = $("#unfinishedTopics").children().length;
  const finishedNum = $("#finishedTopics").children().length;
  console.log(unfinishedNum);
  console.log(finishedNum);
  const total = unfinishedNum + finishedNum;
  const progressTopic = Math.round((unfinishedNum * 100) / total);
  console.log(progressTopic);
  $("#progressTopic")
    .attr("style", "width: " + progressTopic + "%" ).text(progressTopic + "%")
});
