var tagList = ["cat"];
var img = 0;
var isPlaying = false;

function renderStatus(statusText) {
$('#status').text(statusText);
}

function renderImage(imageData) {
    $('#image-wrap').attr('href', imageData.url)
    $('#image').attr('src', imageData.image_original_url)
}

async function getBoobsUrl() {
    let tag = tagList[Math.floor(Math.random()*tagList.length)];
    if (tag === undefined) {
        return;
    }
    renderStatus('Loading for ' + tag + ' ...');
    let url = 'https://api.giphy.com/v1/gifs/random?api_key=6Mlyf4s706n6UOGc8MxfbIJIMXpLwj4i&tag=' + tag;
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
    isPlaying = true;
}

function pauseImg() {
    $("#content1").hide();
    console.log(img);
    clearInterval(img);
    isPlaying = false;
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
    // $(window).on( "blur", function(e){
    //     console.log('chuyen tab ra')
    // });

    // $(window).on( "focus", function(e){
    //     console.log('chuyen tab vào')
    // });

    chrome.runtime.onMessage.addListener((request, port, sendResponse) => {
        switch (request.message) {
            case 'get status':
                sendResponse({tagList: tagList, isPlaying: isPlaying});
                break;
            case 'add tag':
                tagList.push(request.tag);
                console.log(tagList, 'thêm')
                break;
            case 'delete tag':
                let id = tagList.indexOf(request.tag);
                console.log(id)
                if (id !== -1) {
                    tagList.splice(id, 1);
                }
                console.log(tagList, 'xóa')
        }
    })

});