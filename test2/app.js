// (function() {

var telInput = $("#phone");

telInput.intlTelInput(" dialCode");
telInput.intlTelInput({
    initialCountry: "auto",
    geoIpLookup: function (callback) {
        $.get('http://ipinfo.io', function () {
        }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
        });
    },
    utilsScript: "CSS/intl-tel-input-11.0.0/build/js/utils.js"
});


telInput.on("countrychange", function (e, countryData) {
    var selectedCountryDialCode = countryData.dialCode;
    telInput.val("+" + selectedCountryDialCode);
});

function sendSms() {
    // Get the phone number entered
    var telNumber = telInput.val();
    errorMsg = $("#error-msg");
    validMsg = $("#valid-msg");

// initialise plugin
    telInput.intlTelInput({
        utilsScript: "CSS/intl-tel-input-11.0.0/build/js/utils.js"
    });

    var reset = function () {
        telInput.removeClass("error");
        errorMsg.addClass("hide");
        validMsg.addClass("hide");
    };

// on blur: validate
    telInput.blur(function () {
        reset();
        if ($.trim(telInput.val())) {
            if (telInput.intlTelInput("isValidNumber")) {
                validMsg.removeClass("hide");
            } else {
                telInput.addClass("error");
                errorMsg.removeClass("hide");
            }
        }
    });

// on keyup / change flag: reset
    telInput.on("keyup change", reset);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ACefc54d3d5a5c4e27e8a667bf697ade5a:9623be183dfdebc758938f6a740578e8@api.twilio.com/2010-04-01/Accounts/ACefc54d3d5a5c4e27e8a667bf697ade5a/Messages.json",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "authorization": "Basic QUNlZmM1NGQzZDVhNWM0ZTI3ZThhNjY3YmY2OTdhZGU1YTo5NjIzYmUxODNkZmRlYmM3NTg5MzhmNmE3NDA1NzhlOA=="
        },
        "data": {
            "From": "+16475562482",

            // Sms can only be sent to verified numbers
            "To": telNumber,

            "Body": "Link to the application"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}


// })();