
window.onerror = function(sMessage,sUrl,sLine){
    alert(sMessage + ",url=" + sUrl+ ", line:" + sLine);
};


$(document).ready(function () {
    var str = "";
    if (!isPCDevice()) {
        alert("抱歉暂时不支持手机显示，请使用PC打开本页面。");
        return;
    }

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

    str += "<div class='onerecord'>";
    str += "    <div class='date'>" + date + "</div>";
    str += "    <div class='content'>";
    str += "        <div class='role'>" + jobTitle + "</div>";
    str += procPref(perf);
    str += "    </div>";
    str += "</div>";
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

/**
 * 判断是否是pc设备
 */
function isPCDevice() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    if(window.screen.width>=768){
        flag = true;
    }
    return flag;
}