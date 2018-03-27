var tagList = ["cat"]; // tag mặc định
var img = 0; // biến cục bộ để setInterval
var isPlaying = false; //trang thái ảnh có đang chạy hay không

function renderStatus(statusText) { // hiển thị trạng thái load ảnh
$('#status').text(statusText);
}

function renderImage(imageData) { //append url image nhận được vào thẻ html
    $('#image-wrap').attr('href', imageData.url)
    $('#image').attr('src', imageData.image_original_url)
}

async function getUrl() { // get random url của ảnh
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

function playImg() { // thực hiện play ảnh
    $("#content1").show();
    getUrl();
    img = setInterval(() => {
        getUrl();
    }, 5000);
    isPlaying = true;
}

function pauseImg() { // dừng hiển thị
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