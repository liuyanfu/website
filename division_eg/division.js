/**
 * Created by lyf219 on 2015/7/26.
 */

/*
 * m 被除数
 * n 除数
 */
function division(m, n) {
    var iPart = 0;
    var iRem = 0;
    var s = [];
    var remainder = [];
    //var m = 22;
    //var n = 7;
    var loopbeg = -1;

    m = parseFloat(m);
    n = parseFloat(n);
    if (isNaN(m) || isNaN(n)) {
        output("input is not a number");
        return;
    }

    iPart = parseInt(m / n);
    iRem = m % n;
    if (iRem != 0) {
        while (true) {
            remainder.push(iRem);
            iRem *= 10;
            m = parseInt(iRem / n);
            iRem = iRem % n;
            s.push(m);

            if (iRem == 0) {
                break;
            }

            for (var i = 0; i < remainder.length; i++) {
                if (iRem == remainder[i]) {
                    loopbeg = i;
                    break;
                }
            }

            if (loopbeg != -1) {
                break;
            }

            //先随便确定一个上限
            if (s.length > 64) {
                output('result number is too large to show.');
                return;
            }
        }
    }

    //output
    var ostr = "";
    if (loopbeg == -1) {
        ostr = iPart;
        if (s.length != 0) {
            ostr += ".";
            for (var i = 0; i < s.length; i++) {
                ostr += s[i];
            }
        }
    }
    else {
        ostr = iPart + "."
        for (var i = 0; i < s.length; i++) {
            if (loopbeg == i) {
                ostr += "(";
            }
            ostr += s[i];
        }
        ostr += ")";
    }
    output(ostr);
}

function output(o) {
    document.getElementById("output").innerHTML = o;
}