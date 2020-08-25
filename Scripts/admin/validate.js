/*
Custom Validation using jQuery Validation Plugin


*/
$(document).ready(function () {

    $(".profileForm").validate({
        rules: {
            name: { required: true, minlength: 1, maxlength: 50 },
            customerID: { required: true, number: true, minlength: 1, maxlength: 20 },
            email: { required: true, email:true, minlength: 1, maxlength: 50 },
            confirmEmail: { equalTo: "#email", required: true, email:true, minlength: 1, maxlength: 50 },
            password: { required: true, minlength: 1, maxlength: 30 },
            oldPassword: { required: true, minlength: 1, maxlength: 30 },
            newPassword: { required: true, minlength: 1, maxlength: 30 },
            confirmPassword:{equalTo: "#password", required: true, minlength: 1, maxlength: 30 },
            confirmNewPassword: { equalTo: "#newPassword", required: true, minlength: 1, maxlength: 30 },
            username: { required: true, email: true, minlength: 1, maxlength: 50 },

        },
        errorContainer: ".validationSummary",
        errorLabelContainer: ".validationSummary ul",
        wrapper: "li",
        errorPlacement: function(error, element){
            error.insertAfter(element.parent()).animate({opacity: .1},1);
            error.insertAfter(element.parent()).animate({opacity: 1},1200);
        }

    });
});

