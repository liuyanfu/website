$(document).ready(function () {
    var str = "";

    $.get("vitae.xml", function (xml) {
        for (var comp = $(xml).find("company:first"); comp.length != 0; comp = comp.next()) {
            str += procCompany(comp);
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
    str += "<p><img src='" + logo + "'></img></p>";
    str += text;
    str += location;
    str += "<p class='website'><a href='" + website + "'>" + website + "</a></p><br/>";

    str += "<div class='record'>";

    for (var record = comp.find("record:first"); record.length != 0; record = record.next()) {
        str += procRecord(record);
    }
    str += "</div>";
    str += "</div>";
    str += "<br/><br/>";

    return str;
}

function procRecord(record) {
    var str = "";
    var date = record.find("date").attr("text");
    var jobTitle = record.find("jobTitle").attr("text");
    var perf = record.find("perf");

    str += "<div class='date'>" + date + "</div>";
    str += "<div class='role'>" + jobTitle + "</div>";
    str += procPref(perf);

    return str;
}

function procPref(perf) {
    var str = perf.attr("text") + "<ul id='perf'>";
    for (var pe = perf.find("pe:first"); pe.length != 0; pe = pe.next()) {
        var pet = pe.attr("text");
        str += "<li>" + pet + "</li>";
    }
    str += "</ul>";
    return str;
}