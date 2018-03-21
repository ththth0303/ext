function addTag(tagName) {
    chrome.storage.sync.get('myTags', function(data) {
        console.log(data)
        console.log(Array.isArray(data.myTags))
        if (Array.isArray(data.myTags)) {
            console.log(data, 'tagname')
            data.myTags.push(tagName);
        } else {
            data = [tagName];
        }
        chrome.storage.sync.set({myTags: data.myTags}, function() {
            console.log('The number is set to ' + data);
            $(".my-tags").append(` <div class="checkbox-inline">
                <label><input type="checkbox" value="${tagName}">${tagName}</label>
                </div>`);
        });
    });
}

function renderTag() {
    chrome.storage.sync.get('myTags', function(data) {
        console.log(data)
        console.log(Array.isArray(data.myTags))
        if (Array.isArray(data.myTags)) {
            data.myTags.forEach((item) => {
                $(".my-tags").append(` <div class="checkbox-inline">
                    <label><input type="checkbox" value="${item}">${item}</label>
                    </div>`);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderTag();
    $("#pause").hide();
    $('#play').on('click', () => {
        chrome.tabs.executeScript(null, {code:"playImg()"});

        $("#pause").show();
        $("#play").hide();
    });

    $('#pause').on('click', () => {
        chrome.tabs.executeScript(null,
          {code:"pauseImg()"});
        window.close();
        $("#pause").hide();
        $("#play").show();
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "get status"}, function(response) {
            console.log(response);
            if (response.isPlaying) {
                $("#pause").show();
                $("#play").hide();
            }
            $(".checkbox-inline input").each((index, element) => {
                let thth = $(element)[0].value;
                let id = response.tagList.findIndex((tag) => { return tag === $(element)[0].value});
                if (id >= 0) {
                    $(element).attr('checked', true);
                }
            });
        });
    });

    $(".checkbox-inline input").on('change', (e) => {
        let tag = e.target.value;
        console.log(tag)
        let message = '';
        if (e.target.checked) {
            message = 'add tag';
            
        } else {
            message = 'delete tag';
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {message: message, tag: tag});
        });
        console.log(e.target.checked);
    })

    $(".input-group-addon").on('click', () => {
        let tag = $('#tag').val();
        if (tag !== '') {
            addTag(tag);
        } else {
            console.log('khong nhap gi');
        }
        
    });

    chrome.storage.sync.get('myTags', function(data) {
        console.log(data.myTags, 'vào')
    });

    $( ".checkbox-inline" ).hover(
        function() {
            $( this ).find("span").css('display', 'inline');
        }, function() {
            $( this ).find("span").css('display', 'none');
        }
    );
});

