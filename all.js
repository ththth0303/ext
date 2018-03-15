
$('head').prepend('<script>isVip=true;</script>');

function renderStatus(statusText) {
document.getElementById('status').textContent = statusText;
}

function renderImage(imageData) {
document.getElementById('image-wrap').href = imageData.url;
document.getElementById('image').src = imageData.image_original_url;

}

async function getBoobsUrl() {
    renderStatus('Loading ...');
    let url = 'https://api.giphy.com/v1/gifs/random?api_key=a89c66e48519481ab448a3f8356e635c&tag=dogs';
    let result = await fetch(url);
    let jsonResult =  await result.json();
    await renderImage(jsonResult.data);
    renderStatus('');
}
var textnode = '\
    <div id="wrap-extension">\
        <div id="head1">Play</div>\
        <div id="content1" style="display: none;">\
            <div id="status"></div>\
            <a id="image-wrap" href="" target="_blank"><img width="100%" id="image" /></a>\
            <br/>\
        </div>\
    </div>';

$(document).ready(function(){

    $("body").append(textnode);

    $("#head1").on("click", function(ev) {
        var content = $("#content1");
        if (content.css('display') === "none") {
            content.show();
            getBoobsUrl();
            img = setInterval(() => {
                getBoobsUrl();
            }, 5000);

        } else {
            content.hide();
            clearInterval(img);
        }
    });
    
    $('head').prepend('<script>isVip=true;</script>');
    $('#wrap-extension').draggable();
    $( "#content1" ).resizable({handles: 'e, w'});
    $(window).on( "blur", function(e){
        console.log('chuyen tab ra')
    });

    $(window).on( "focus", function(e){
        console.log('chuyen tab vào')
    });


    // $(window).on('focus', function() {
    //     console.log('vào focus')
    // }).on( "blur", function(){
    //     console.log('vào blur')
    // });​

});