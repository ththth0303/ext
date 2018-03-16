var tagList = ["cats", "dogs"];
var img = 0;

function renderStatus(statusText) {
document.getElementById('status').textContent = statusText;
}

function renderImage(imageData) {
document.getElementById('image-wrap').href = imageData.url;
document.getElementById('image').src = imageData.image_original_url;

}

async function getBoobsUrl() {
    let tag = tagList[Math.floor(Math.random()*tagList.length)];
    renderStatus('Loading for ' + tag + ' ...');
    let url = 'https://api.giphy.com/v1/gifs/random?api_key=a89c66e48519481ab448a3f8356e635c&tag=' + tag;
    let result = await fetch(url);
    let jsonResult =  await result.json();
    await renderImage(jsonResult.data);
    renderStatus('');
}
var textnode = '\
    <div id="wrap-extension">\
        <div id="content1" style="display: none;">\
            <a id="image-wrap" href="" target="_blank"><img width="100%" id="image" /></a>\
            <div id="status"></div>\
            <br/>\
        </div>\
    </div>';

function playImg() {
    $("#content1").show();
    getBoobsUrl();
    img = setInterval(() => {
        getBoobsUrl();
    }, 5000);
}

function pauseImg() {
    $("#content1").hide();
    console.log(img);
    clearInterval(img);
}

$(document).ready(function(){

    $("body").append(textnode);

    $("#head1").on("click", function(ev) {
        var content = $("#content1");
        if (content.css('display') === "none") {
            content.show();
            playImg();
        } else {
            pauseImg();
        }
    });
    
    $('head').prepend('<script>isVip=true;</script>');
    $('#wrap-extension').draggable({ containment: "window" }).resizable({handles: 'e, w'});
    $(window).on( "blur", function(e){
        console.log('chuyen tab ra')
    });

    $(window).on( "focus", function(e){
        console.log('chuyen tab vào')
    });

});