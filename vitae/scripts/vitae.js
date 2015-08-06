$(document).ready(function () {
    var str = "";
    $.get("vitae.xml", function (xml) {
        var comp = $(xml).find("company");
        for (var i = 0; i < comp.length; i++) {
            str += procCompany($(comp.get(i)));
        }
        $("#vitaecont").html("<p>" + str + "</p>");
    });
});

function procCompany(comp) {
    var str = "";
    var name = comp.attr("name");
    var logo = comp.attr("logo");
    var text = comp.attr("text");
    var location = comp.attr("location");
    var website = comp.attr("website");

    str += "<div>";
    str += "<p><img src='" + logo + "' alt='company logo'></img></p>";
    str += text;
    str += location;
    str += "<p class='website'><a href='" + website + "'>" + website + "</a></p><br/>";

    str += "<div class='record'>";

    var recordArray = comp.children("record");
    for (var i = 0; i < recordArray.length; i++) {
        str += procRecord($(recordArray.get(i)));
    }
    str += "</div>";
    str += "</div>";
    str += "<br/><br/>";

    return str;
}

function procRecord(record) {
    var str = "";
    var date = record.children("date").attr("text");
    var jobTitle = record.children("jobTitle").attr("text");
    var perf = record.children("perf");

    str += "<div class='date'>" + date + "</div>";
    str += "<div class='role'>" + jobTitle + "</div>";
    str += procPref(perf);

    return str;
}

function procPref(perf) {
    var str = perf.attr("text") + "<ul id='perf'>";
    var peArray = perf.children("pe");
    for (var i = 0; i < peArray.length; i++) {
        var pet = $(peArray.get(i)).attr("text");
        str += "<li>" + pet + "</li>";
    }
    str += "</ul>";
    return str;
}