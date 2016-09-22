var requestProtocol = "http://",
    basePath = "211.138.24.191:20012",
    actionPath = "/och/front/sh/app",
    httpMethod = "POST",
    secretCode = "1111",
    x = 0,
    isgetTicket = false,
    customer = {
        aptDate: "2016-09-30",
        deptCode: "28",
        accessKeyId: "29b49a5edf5ddd619a67a7e4a6578d0875e794490069848ce4fa938ce39ed724",
        departments: ["牙科副主任医师","牙科普通门诊"]
    },
    signatureValue, Timestamp,
    intervalTime = 1000;
//["内科普通门诊"]
//
// function getCookie(key) {
//     var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
//     if (arr = document.cookie.match(reg)) {
//         return unescape(arr[2])
//     } else {
//         return null
//     }
// }

function formatDate(date) {
    var offset = date.getTimezoneOffset(),
        offsetDirection = "-",
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        offsetHour, offsetMin;
    if (month < 10) {
        month = "0" + month
    }
    if (day < 10) {
        day = "0" + day
    }
    if (hour < 10) {
        hour = "0" + hour
    }
    if (min < 10) {
        min = "0" + min
    }
    if (sec < 10) {
        sec = "0" + sec
    }
    if (offset < 0) {
        offsetDirection = "+";
        offset = 0 - offset
    }
    offsetHour = offset / 60;
    offsetMin = offset % 60;
    if (offsetHour < 10) {
        offsetHour = "0" + offsetHour
    }
    if (offsetMin < 10) {
        offsetMin = "0" + offsetMin
    }
    return (year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec + offsetDirection + offsetHour + ":" + offsetMin)
}

function buildSHA(cfg) {
    var signatureArray = [];
    signatureArray.push(httpMethod, basePath, actionPath, "accessKeyId=" + customer.accessKeyId + "&" + "action=" + cfg.requestAction + "&" + "params=" + encodeURIComponent(JSON.stringify(cfg.params, true)) + "&" + "timestamp=" + encodeURIComponent(cfg.Timestamp), secretCode);
    return SHA256(signatureArray.join(";"))
}
function first() {
    var d = jQuery.Deferred(),
        params = {
            AptDate: customer.aptDate,
            DeptCode: customer.deptCode
        },
        paramslist, requestAction = "GetAppointmentSource",
        requestUid = "108";
    Timestamp = formatDate(new Date());
    signatureValue = buildSHA({
        requestAction: requestAction,
        Timestamp: Timestamp,
        params: params
    });
    paramslist = {
        uid: requestUid,
        accessKeyId: customer.accessKeyId,
        action: requestAction,
        params: JSON.stringify(params),
        timestamp: Timestamp,
        signature: signatureValue
    };
    $.ajax({
        url: requestProtocol + basePath + actionPath,
        data: $.param(paramslist, true),
        type: "post",
        success: function(result) {
            var ableTickets = [];
            if (result.data && result.data.length) {
                var rData = result.data,
                    len = rData.length,
                    i, j, departments = customer.departments,
                    dlen = departments.length;
                for (i = len - 1; i >= 0; i--) {
                    for (j = dlen - 1; j >= 0; j--) {
                        if (rData[i].SpecName == departments[j]) {
                            ableTickets.push(rData[i].SourceSeq)
                        }
                    }
                }
            }
            if (ableTickets.length) {
                d.resolve(ableTickets);
            } else {
                console.info("ticket source none");
            }
        }
    });
    return d.promise()
};
var timing = setInterval(function() {
    x++;
    if (x > intervalTime || isgetTicket) {
        clearInterval(timing);
    }
    $.when(first()).then(function(tickets) {
        var len = tickets.length,
            i;
        for (i = len - 1; i >= 0; i--) {
            lockTicket(tickets[i]);
        }

        function lockTicket(currentTicket) {
            var requestAction = "LockAppointmentSource",
                params = {
                    aptVisitDate: customer.aptDate,
                    contactIDCardNo: "110222198801142035",
                    contactName: "吴雷",
                    contactPhone: "13811339645",
                    ptBirthDate: "2013-07-03",
                    ptCardId: "0008798897",
                    ptGender: "0",
                    ptIDCardNo: "110113201307032036",
                    ptMedId: "0009063766",
                    ptName: "吴宇浩",
                    sourceSeq: currentTicket
                };
            Timestamp = formatDate(new Date());
            signatureValue = buildSHA({
                requestAction: requestAction,
                Timestamp: Timestamp,
                params: params
            });
            var paramslist = {
                uid: "106",
                accessKeyId: customer.accessKeyId,
                action: requestAction,
                params: JSON.stringify(params),
                signature: signatureValue,
                timestamp: Timestamp,
            };
            if(isgetTicket){
                return;
            }
            $.ajax({
                url: requestProtocol + basePath + actionPath,
                type: "post",
                data: $.param(paramslist, true),
                success: function(data) {
                    if(data.code == "000000"){
                        isgetTicket = true;
                        console.log("ticket:success");
                    }
                    console.log(x);
                }
            });
        }
    })
}, 10);
timing;