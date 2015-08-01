

var xmlDocu = loadXML("vitae.xml");

if (xmlDocu == null) {
    alert('parse xml failed!');
    exit();
}

var nodes = xmlDocu.documentElement.childNodes;
var htmlstr = parseNodeList(nodes);
fillContent("vitaecont", htmlstr);

function parseNodeList(NodeList) {
    var str = "";
    for (var i = 0; i < NodeList.length; i++) {
        node = NodeList[i];
        if (node.nodeType != 1) {
            continue;
        }
        str += procNode(node);
    }
    return str;
}


delete xmlDocu;

function procNode(node) {
    var str = "";
    switch (node.nodeName) {
        case "company":
            str = "<div>";
            str += "<p><img src='" + node.getAttribute("logo") +"'></img></p>";
            str += "<p>" + node.getAttribute("text") +"</p>";
            str += "<p>" + node.getAttribute("location") +"</p>";
            str += "<p><a href='" + node.getAttribute("website") +"'>" + node.getAttribute("website") + "</a></p>";
            str += parseNodeList(node.childNodes);
            str += "</div>";
            return str;
        case "record":
            str = "<p>";
            str += parseNodeList(node.childNodes);
            str += "</p>";
            return str;
        case "perf":
            str = node.getAttribute("text");
            str += "<ul>";
            str += parseNodeList(node.childNodes);
            str += "</ul>";
            return str;
        case "date":
        case "jobTitle":
        case "pe":
            return "<li>" + getNodeText(node)  +"</li>";
        default:
            alert('error!');
            break;
    }
}

function fillContent(div_id, str)
{
    var cdiv = document.getElementById(div_id);
    cdiv.innerHTML = "<p>" + str + "</p>"
}

function getNodeText(node) {

    var txt = "浏览器不支持!"
    if(!window.DOMParser && window.ActiveXObject){
        txt = node.text;
    }else if(document.implementation && document.implementation.createDocument){
        txt = node.innerHTML;
    }

    return txt;
}

function loadXML(xmlFile){
    var xmlObj=null;
    //判断浏览器的类型
    //支持IE浏览器
    if(!window.DOMParser && window.ActiveXObject){
        var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM',];
        for(var i=0;i<xmlDomVersions.length;i++){
            try{
                xmlObj = new ActiveXObject(xmlDomVersions[i]);
                xmlObj.async = false;
                xmlObj.load(xmlFile);
                break;
            }catch(e){

            }
        }
    }
    //支持Mozilla浏览器
    else if(document.implementation && document.implementation.createDocument){
        try{
            /* document.implementation.createDocument('','',null); 方法的三个参数说明
             * 第一个参数是包含文档所使用的命名空间URI的字符串；
             * 第二个参数是包含文档根元素名称的字符串；
             * 第三个参数是要创建的文档类型（也称为doctype）
             */
            xmlObj = document.implementation.createDocument('','',null);
            //xmlObj = (new DOMParser()).parseFromString(xmlFile, "text/xml");
            xmlObj.async = false;
            try {
                xmlObj.load(xmlFile);
            } catch (e) {
                try {
                    delete  xmldoc;
                    var xmlhttp = new window.XMLHttpRequest();
                    xmlhttp.overrideMimeType("text/xml");
                    xmlhttp.open("GET", "http://liuyanfu.github.io/website/vitae/vitae.xml", false);
                    xmlhttp.send(null);
                    xmlObj = xmlhttp.responseXML;
                }catch (e) {
                    alert(e.message);
                }
            }
        }catch(e){
            alert('load xml failed!');
            return null;
        }
    }
    else{
        return null;
    }

    return xmlObj;
}