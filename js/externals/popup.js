function click(e) {
  chrome.tabs.executeScript(null,
      {code:"clearInterval(img)"});
  // window.close();
}

document.addEventListener('DOMContentLoaded', function () {
    
    $("#pause").hide();
    $('#play').on('click', () => {
        chrome.tabs.executeScript(null,
      {code:"playImg()"});
        $("#pause").show();
        $("#play").hide();
    });

    $('#pause').on('click', () => {
        chrome.tabs.executeScript(null,
      {code:"pauseImg()"});
        $("#pause").hide();
        $("#play").show();
    });

});