
window.onerror = function(sMessage,sUrl,sLine){
    alert(sMessage + ",url=" + sUrl+ ", line:" + sLine);
};


$(document).ready(function () {
    var str = "";
    $.getJSON("resume.json", function (jsonArray) {

        for (var i = 0; i < jsonArray.length; i++ ) {
            str += procCompany(jsonArray[i]);
        }
        $("#resumecont").html("<p>" + str + "</p>");
    });

});


function procCompany(comp) {
    var str = "";
    // var name = comp.name;
    var logo = comp.logo;
    var text = comp.business;
    var location = comp.location;
    var website = comp.website;

    str += "<div class='comp'>";
    str += "<p><img src='" + logo + "' alt='company logo'></p>";
    str += text;
    str += location;
    str += "<p class='website'><a href='" + website + "'>" + website + "</a></p><br/>";

    str += "<div class='record'>";

    var recordArray = comp.record;
    for (var i = 0; i < recordArray.length; i++) {
        str += procRecord(recordArray[i]);
    }
    str += "</div>";
    str += "</div>";
    str += "<br/><br/>";

    return str;
}

function procRecord(record) {
    var str = "";
    var date = record.date;
    var jobTitle = record.jobTitle;
    var perf = record.perf;

    str += "<div class='onerecord'>"
    str += "    <div class='date'>" + date + "</div>";
    str += "    <div class='content'>"
    str += "        <div class='role'>" + jobTitle + "</div>";
    str += procPref(perf);
    str += "    </div>"
    str += "</div>"
    return str;
}

function procPref(perf) {
    var str = "<B>主要绩效</B>" + "<p class='perf'>";
    var peArray = perf;
    for (var i = 0; i < peArray.length; i++) {
        str += "<p class='perf'>" + peArray[i] + "</p>";
    }
    str += "</p>";
    return str;
}