$(window).on("load", function() {
    checkConsent();
    loadTheme();
    updateClock();
    setInterval(updateClock, 1000);

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

        if (name == cookie) {
            return value;
        }
    }

    return null;
}

function setCookie(name, value, minutes=15) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=" + (minutes * 60) + ";";
}

function goGithubPage() {
    window.open("https://github.com/matyo-17", "_blank");
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

    theme = "dark";
    iconTheme(theme);
    setCookie('theme', theme);
    $("body").attr("data-bs-theme", theme);
}

function iconTheme(theme) {
    $("#github-icon").attr("src", "images/github-" + theme + ".png");
}

function updateClock() {
    local = new Date();
    utc = local.getTime() + (local.getTimezoneOffset() * 60000);
    t = new Date(utc + (3600000 * 8));

    y = t.getFullYear().toString();
    m = t.getMonth().toString();
    d = t.getDate().toString();

    h = t.getHours().toString();
    i = t.getMinutes().toString();
    s = t.getSeconds().toString();

    date = y + '-' + m.padStart(2, '0') + '-' + d.padStart(2, '0');
    time = h.padStart(2, '0') + ':' + i.padStart(2, '0') + ':' + s.padStart(2, '0');

    alpha = (s >= 55) ? 1 : (0.6 + (s/200));
    $("#time").css("color", "rgba(255, 0, 0, " + alpha + ")");


    $("#date").html(date);
    $("#time").html(time);
}