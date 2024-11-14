$(window).on("load", function() {
    checkConsent();
    loadTheme();

    setTimeout(function () {
        $('#loader-container').css("opacity", 0.5);
    }, 250);

    setTimeout(function () {
        $('#loader-container').css({"opacity": 0, "display": "none"});
    }, 500);

    $(".nav-link").click(function(){
        $('#navbar-offcanvas').offcanvas('hide');
    });
});

function getCookie(name) {
    cookies = document.cookie.split(";");
    
    for (i=0; i<cookies.length; i++) {
        temp = cookies[i].split("=");
        cookie = temp[0].trim();
        value = decodeURIComponent(temp[1]);

        if (name == cookie) return value;
    }

    return null;
}

function setCookie(name, value, minutes=15) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=" + (minutes * 60) + ";";
}

function goGithubPage() {
    window.open("https://github.com/matyo-17", "_blank");
}

function goLinkedinPage() {
    window.open("https://www.linkedin.com/in/filson-teo-7a380a20b/", "_blank");
}

function toggleDarkTheme() {
    current_theme = $("body").attr("data-bs-theme");
    new_theme = (current_theme == "dark") ? "light" : "dark";
    iconTheme(new_theme);
    setCookie('theme', new_theme);
    $("body").attr("data-bs-theme", new_theme);
}

function checkConsent() {
    consent = getCookie('consent');
    if (!consent) {
        displayConcent();
        return;
    }
    hideRejectConsent();
}

function hideRejectConsent() {
    $('#reject-consent').addClass('invisible');
}

function displayConcent() {
    $('#consent').modal('show');
}

function giveConsent() {
    setCookie('consent', 1, 60);
    $('#consent').modal('hide');
    hideRejectConsent();
}

function rejectConsent() {
    toast('danger', 'Error', 'Rejecting is not an option!!!');
}

function toast(type, title, message) {
    toast_item = $('#toast');
    toast_item.addClass("text-bg-"+type)
    $('#toast-title').html(title);
    $('#toast-message').html(message);

    toast_item.toast({
        animation: true, 
        autohide: true,
        delay: 2000
    });
    toast_item.toast("show");
}

function loadTheme() {
    theme = getCookie('theme');

    if (theme) {
        iconTheme(theme);
        $("body").attr("data-bs-theme", theme);
        return;
    }

    theme = "light";
    iconTheme(theme);
    setCookie('theme', theme);
    $("body").attr("data-bs-theme", theme);
}

function iconTheme(theme) {
    $("#github-icon").attr("src", "images/github-" + theme + ".png");
}