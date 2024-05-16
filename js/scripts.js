$(window).on("load", function() {
    updateClock();
    setInterval(updateClock, 1000);
    loadTheme();

    setTimeout(function () {
        $('#loader-container').css("opacity", 0.5);
    }, 250);

    setTimeout(function () {
        $('#loader-container').css({"opacity": 0, "display": "none"});
    }, 500);
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

function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=" + (15 * 60) + ";";
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
    t = new Date();

    y = t.getFullYear().toString();
    m = t.getMonth().toString();
    d = t.getDate().toString();

    h = t.getHours().toString();
    i = t.getMinutes().toString();
    s = t.getSeconds().toString();

    date = y + '-' + m.padStart(2, '0') + '-' + d.padStart(2, '0');
    time = h.padStart(2, '0') + ':' + i.padStart(2, '0') + ':' + s.padStart(2, '0');

    $("#clock").html(date + " " + time);
}