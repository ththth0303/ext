function addTag(tagName) {
    chrome.storage.sync.get('myTags', function(data) {
        console.log(data)
        console.log(Array.isArray(data.myTags))
        if (Array.isArray(data.myTags)) {
            console.log(data, 'tagname')
            data.myTags.push(tagName);
        } else {
            data.myTags = [tagName];
        }
        chrome.storage.sync.set({myTags: data.myTags}, function() {
            console.log('The number is set to ' + data);
            renderTag(tagName);
        });
    });
}

function deleteTag(tagName) {
    chrome.storage.sync.get('myTags', function(data) {
        console.log(data)
        console.log(Array.isArray(data.myTags));
        let id = data.myTags.indexOf(tagName);
        if (id !== -1) {
            data.myTags.splice(id, 1);
        }
        chrome.storage.sync.set({myTags: data.myTags}, function() {
            console.log('The number is set to ' + data);
        });
    });
}

function renderTag(tagName) {
    $(".my-tags").append(`
        <div class="checkbox-inline">
            <label><input type="checkbox" value="${tagName}">${tagName}</label>
            <span class="delete-tag"> x</span>
        </div>`
    );
}

function renderAllTag() {
    chrome.storage.sync.get('myTags', function(data) {
        console.log(data)
        console.log(Array.isArray(data.myTags))
        if (Array.isArray(data.myTags)) {
            data.myTags.forEach((item) => {
                renderTag(item)
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderAllTag();
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

    $(document).on('change', ".checkbox-inline input", (e) => {
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
    })

    $(".input-group-addon").on('click', () => {
        let tag = $('#tag').val();
        if (tag !== '') {
            $('#tag').val('');
            addTag(tag);
        } else {
            console.log('khong nhap gi');
        }
        
    });

    $(document).on("mouseover", ".checkbox-inline", function() {
        if (!$(this).find('input')[0].checked) {
            $(this).find("span").css('display', 'inline');
        }
    });
    $(document).on("mouseout", ".checkbox-inline", function() {
        $(this).find("span").css('display', 'none');
    });

    $(document).on("click", ".delete-tag", function() {
        let tagName = $(this).parent().find("input").val();
        $(this).parent().remove();
        deleteTag(tagName);
    })
});

