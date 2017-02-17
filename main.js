var requestProtocol = "http://",
    basePath = "211.138.24.191:20012",
    actionPath = "/och/front/sh/app",
    httpMethod = "POST",
    secretCode = "1111",
    x = 0,
    isgetTicket = false,
    // customer = {
    //     aptDate: "2017-02-24",
    //     deptCode: "28",
    //     accessKeyId: "7397516fae88673149f5c5208188e04c204a5341074b6b25316595a31e5a6885",
    //     departments: ["牙科副主任医师", "牙科普通门诊"]
    // },
    // patientInfo = {
    //     contactIDCardNo: "110222198801142035",
    //     contactName: "吴雷",
    //     contactPhone: "13811339645",
    //     ptBirthDate: "2013-07-03",
    //     ptCardId: "0008798897",
    //     ptGender: "0",
    //     ptIDCardNo: "110113201307032036",
    //     ptMedId: "0009063766",
    //     ptName: "吴宇浩"
    // },
    customer = {
        aptDate: "2017-02-24",
        deptCode: "27",
        accessKeyId: "108fabeee5ff4dcf90d7dc6cbe624c323f7a6e82f010dd470d55572be1514bca",
        departments: ["眼科综合普通门诊","眼科综合主任医师","眼科综合副主任医师"]
    },
    patientInfo = {
        contactIDCardNo: "110222198105314518",
        contactName: "张伟",
        contactPhone: "18511985198",
        ptBirthDate: "2011-08-31",
        ptCardId: "",
        ptGender: "0",
        ptIDCardNo: "110113201108314559",
        ptMedId: "",
        ptName: "张英杰"
    },
    signatureValue, Timestamp,
    intervalTime = 100;
    
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
                        if (rData[i].SpecName == departments[j] && rData[i].ValidNumber != 0) {
                            ableTickets.push(rData[i].SourceSeq)
                        }
                    }
                }
            }
            if (ableTickets.length) {
                d.resolve(ableTickets);
                console.info("get tickets list");
            }
        }
    });
    return d.promise()
};
$.when(first()).then(function(tickets) {
    var len = tickets.length,
        i, timing;
    timing = setInterval(function() {
        x++;
        if (x > intervalTime || isgetTicket) {
            clearInterval(timing);
        }
        for (i = len - 1; i >= 0; i--) {
            lockTicket(tickets[i]);
        }
    }, 100);

});


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

function lockTicket(currentTicket) {
    var requestAction = "LockAppointmentSource",
        params = {
            aptVisitDate: customer.aptDate,
            contactIDCardNo: patientInfo.contactIDCardNo,
            contactName: patientInfo.contactName,
            contactPhone: patientInfo.contactPhone,
            ptBirthDate: patientInfo.ptBirthDate,
            ptCardId: patientInfo.ptCardId,
            ptGender: patientInfo.ptGender,
            ptIDCardNo: patientInfo.ptIDCardNo,
            ptMedId: patientInfo.ptMedId,
            ptName: patientInfo.ptName,
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
    $.ajax({
        url: requestProtocol + basePath + actionPath,
        type: "post",
        data: $.param(paramslist, true),
        success: function(data) {
            if (data.code == "000000") {
                isgetTicket = true;
                console.log("ticket:success");
            }
        }
    });
}