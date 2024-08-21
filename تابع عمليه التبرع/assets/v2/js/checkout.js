$(document).on("change", "#country_id", function() {
    let parent_id = $(this).val();
    if ($(this).val() === '0') {
        $('.pay_home').addClass('hide');
        $('.address_div').addClass('hide');
        $('.governorate_div').addClass('hide');
        $('.city_div').addClass('hide');
        $('.district_div').addClass('hide');
        $("#governorate_id").prop('required', false);
        requireCard(true);
    } else {
        $('.pay_home').removeClass('hide');
        $('.address_div').removeClass('hide');
        $('.city_div').addClass('hide');
        $('.district_div').addClass('hide');
        $('#governorate_id').find('option').not(':first').remove();
        $('#city_id').find('option').not(':first').remove();
        $('#district_id').find('option').not(':first').remove();
        $("#governorate_id").prop('required', true);
        $.ajax({
            type: 'get',
            url: gevernoratesURL + "?parent=" + parent_id,
            dataType: 'json',
            success: function(response) {
                $.each(response.data, function(index, item) {
                    $('#governorate_id').append('<option value="' + item.id + '">' + item.value_ar + '</option>');
                });
                $('#governorate_id').val("");
                $('#city_id').val("");
                $('#district_id').val("");
                $('.governorate_div').removeClass('hide');
            }
        });
    }
});
$('#governorate_id').on('change', function() {
    let parent_id = $(this).val();
    $('.district_div').addClass('hide');
    $('#city_id').find('option').not(':first').remove();
    $('#district_id').find('option').not(':first').remove();
    $.ajax({
        type: 'get',
        url: citiesURL + "?parent=" + parent_id,
        dataType: 'json',
        success: function(response) {
            $.each(response.data, function(index, item) {
                $('#city_id').append('<option value="' + item.id + '">' + item.value_ar + '</option>');
            });
            $('#city_id').val("");
            $('#district_id').val("");
            $('.city_div').removeClass('hide');
        }
    });
});
$('#city_id').on('change', function() {
    let parent_id = $(this).val();
    $('#district_id').find('option').not(':first').remove();
    $.ajax({
        type: 'get',
        url: districtsURL + "?parent=" + parent_id,
        dataType: 'json',
        success: function(response) {
            $.each(response.data, function(index, item) {
                $('#district_id').append('<option value="' + item.id + '">' + item.value_ar + '</option>');
            });
            $('#district_id').val("");
            $('.district_div').removeClass('hide');
        }
    });
});
$(document).on("change", ".direct", function() {
    if ($('#yes_direct').is(':checked')) {
        $("#direct_governorate").prop('required', true);
        $(".direct_gov").removeClass("hide");
    } else if ($('#no_direct').is(':checked')) {
        $("#direct_governorate").prop('required', false);
        $(".direct_gov").addClass("hide");
    }
});
$("input[name='pay']:checked").parent().addClass("selected");
$('input[type=radio][name=pay]').change(function() {
    $("input[name='pay']").parent().removeClass("selected");
    $("input[name='pay']:checked").parent().addClass("selected");
});

function limitAndFormatInput(inputElement, maxLength) {
    inputElement.value = inputElement.value.replace(/[^0-9\u0660-\u0669.]/g, '').replace(/(\..*)\./g, '$1');
    if (inputElement.value.length > maxLength) {
        inputElement.value = inputElement.value.slice(0, maxLength);
    }
}
$('.payment_method').on('change', function() {
    let value = $(this).val();
    if (value === "online") {
        $('.card_info_div').removeClass('hide');
        requireAddress(false);
        requireCard(true);
    } else {
        $('.card_info_div').addClass('hide');
        requireAddress(true);
        requireCard(false);
    }
});
$("input[name='type_of_donation']:checked").parent().addClass("selected");
$('input[type=radio][name=type_of_donation]').change(function() {
    $("input[name='type_of_donation']").parent().removeClass("selected");
    $("input[name='type_of_donation']:checked").parent().addClass("selected");
    var fd = new FormData();
    fd.append('type_of_donation', $("input[name='type_of_donation']:checked").val());
    fd.append('channel', channel);
    fd.append('_token', csrfToken);
    $.ajax({
        type: 'post',
        url: saveTypeOfDonation,
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {
            if (channel == "payfort") {
                $("input[name='merchant_identifier']").val(data.request_param.merchant_identifier);
                $("input[name='merchant_reference']").val(data.request_param.merchant_reference);
                $("input[name='access_code']").val(data.request_param.access_code);
                $("input[name='signature']").val(data.signature);
            }
        },
        error: function() {},
        complete: function() {}
    });
});

function requireAddress(require) {
    if (require) {
        $(".country_div").removeClass("hide");
        $("#country_id").prop('required', true);
        $(".governorate_div").removeClass("hide");
        $("#governorate_id").prop('required', true);
        $("#city_id").prop('required', true);
        $("#district_id").prop('required', true);
        $('.address_div').removeClass('hide');
        $("#street").prop('required', true);
        $("#mainStreetSquare").prop('required', true);
        $("#landmark").prop('required', true);
        $("#building").prop('required', true);
        $("#floor").prop('required', true);
        $("#flat").prop('required', true);
        $(".cartCity_required").removeClass('hide');
        $(".cartCity_optional").addClass('hide');
        $(".cartDistrict_required").removeClass('hide');
        $(".cartDistrict_optional").addClass('hide');
        $(".cartAddress_required").removeClass('hide');
        $(".cartAddress_optional").addClass('hide');
    } else {
        $(".country_div").addClass("hide");
        $(".governorate_div").addClass("hide");
        $(".city_div").addClass("hide");
        $(".district_div").addClass("hide");
        $('.address_div').addClass('hide');
        $("#country_id").prop('required', false);
        $("#governorate_id").prop('required', false);
        $("#city_id").prop('required', false);
        $("#district_id").prop('required', false);
        $("#street").prop('required', false);
        $("#mainStreetSquare").prop('required', false);
        $("#landmark").prop('required', false);
        $("#building").prop('required', false);
        $("#floor").prop('required', false);
        $("#flat").prop('required', false);
    }
}

function requireCard(require) {
    if (require) {
        $(".card_info_div").removeClass("hide");
        $("#card_number").prop('required', true);
        $("#expire_year").prop('required', true);
        $("#expire_month").prop('required', true);
        $("#card_holder_name").prop('required', true);
        $("#card_security_code").prop('required', true);
    } else {
        $(".card_info_div").addClass("hide");
        $("#card_number").prop('required', false);
        $("#expire_year").prop('required', false);
        $("#expire_month").prop('required', false);
        $("#card_holder_name").prop('required', false);
        $("#card_security_code").prop('required', false);
    }
}

function getDeliveryJson() {
    let data = [];
    $('.receivable_product').each(function(i, obj) {
        let product_id = $(this).val();
        let data_obj = {
            product_id: product_id,
            want_to_receive: $("input[name='want_to_receive" + product_id + "']:checked").val(),
            quantity_to_be_received: $("#quantity_to_receive_data" + product_id).val(),
            delivery_method: $("input[name='recieveplace" + product_id + "']:checked").val(),
            delivery_date: $("#receive_date" + product_id).val(),
            stores_lookups_id: $("#branch" + product_id).val(),
        };
        data.push(data_obj);
    });
    return JSON.stringify(data);
}

function submitCheckoutNBE() {
    if ($("#paymentForm").valid()) {
        var myform = document.getElementById("paymentForm");
        var fd = new FormData(myform);
        $("#submit-btn").prop('disabled', true);
        var deliveryJson = getDeliveryJson();
        fd.append('delivery_data', deliveryJson);
        $.ajax({
            type: 'post',
            url: paymentUrl,
            data: fd,
            cache: false,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success) {
                    location.href = data.url;
                } else {
                    $("#submit-btn").prop('disabled', false);
                    Swal.fire({
                        title: "",
                        text: checkoutStrings['donation_error'],
                        icon: "error",
                        confirmButtonText: checkoutStrings['ok'],
                    });
                }
            },
            error: function() {
                $("#submit-btn").prop('disabled', false);
                Swal.fire({
                    title: "",
                    text: checkoutStrings['donation_error'],
                    icon: "error",
                    confirmButtonText: checkoutStrings['ok'],
                });
                location.reload();
            },
            complete: function() {}
        });
    }
}

function submitCheckoutPayfort() {
    if ($("#paymentForm").valid()) {
        var myform = document.getElementById("paymentForm");
        var fd = new FormData(myform);
        $("#submit-btn").prop('disabled', true);
        var deliveryJson = getDeliveryJson();
        fd.append('delivery_data', deliveryJson);
        $.ajax({
            type: 'post',
            url: saveInfoURL,
            data: fd,
            cache: false,
            processData: false,
            contentType: false,
            success: function(data) {
                $("#paymentForm").off('submit');
                var year = $('#expire_year');
                var month = $('#expire_month');
                var expiry = year.val() + month.val();
                $("#payfort_card_number").val($("#card_number").val());
                $("#payfort_card_security_code").val($("#card_security_code").val());
                $("#payfort_expiry_date").val(expiry);
                $("#payfortForm").submit();
            },
            error: function() {
                $("#submit-btn").prop('disabled', false);
                location.reload();
            },
            complete: function() {}
        });
    }
}

function submitCheckoutHome() {
    if ($("#paymentForm").valid()) {
        var myform = document.getElementById("paymentForm");
        var fd = new FormData(myform);
        $("#submit-btn").prop('disabled', true);
        $.ajax({
            type: 'post',
            url: homeUrl,
            data: fd,
            cache: false,
            processData: false,
            contentType: false,
            success: function(data) {
                location.href = successHomeRoute;
            },
            error: function() {
                $("#submit-btn").prop('disabled', false);
            },
            complete: function() {}
        });
    }
}

function setCustomerIp() {
    myRegexp = /^(?:ip)=(.*)$/gm;
    $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
        let resultString = "";
        match = myRegexp.exec(data);
        while (match != null) {
            resultString = resultString.concat(match[1] + "\n");
            match = myRegexp.exec(data);
            $('#customer_ip').val(resultString);
        }
    });
}

function addDeliverySection() {
    $.ajax({
        type: 'Post',
        url: deliverySectionUrl,
        data: {
            "_token": csrfToken
        },
        success: function(data) {
            $(".wantToReceiveProducts").html(data);
        }
    });
}
$(document).on("change", ".want_to_receive", function() {
    let product_id = $(this).data('id');
    if ($('#want1_' + product_id).is(':checked')) {
        requireAddress(true);
        $("#frombranch" + product_id).prop('required', true);
        $("#deliverytohome" + product_id).prop('required', true);
        $("#quantity_to_receive_data" + product_id).prop('required', true);
        $(".receive_place" + product_id).show();
        $(".quantity_to_receive" + product_id).show();
        if ($('#frombranch' + product_id).is(':checked')) {
            $("#branch" + product_id).prop('required', true);
            $("#receive_date" + product_id).prop('required', true);
            $(".receive_branch" + product_id).show();
            $(".receive_date" + product_id).show();
        } else if ($('#deliverytohome' + product_id).is(':checked')) {
            $("#branch" + product_id).prop('required', false);
            $("#receive_date" + product_id).prop('required', true);
            $(".receive_date" + product_id).show();
        }
    } else if ($('#want2_' + product_id).is(':checked')) {
        let receive_it = false;
        $('.want1_to_receive').each(function(i, obj) {
            if ($(this).is(':checked'))
                receive_it = true;
        });
        if (!receive_it)
            requireAddress(false);
        $("#frombranch" + product_id).prop('required', false);
        $("#deliverytohome" + product_id).prop('required', false);
        $("#branch" + product_id).prop('required', false);
        $("#receive_date" + product_id).prop('required', false);
        $("#quantity_to_receive_data" + product_id).prop('required', false);
        $(".receive_place" + product_id).hide();
        $(".quantity_to_receive" + product_id).hide();
        $(".quantity_to_receive_campaign" + product_id).hide();
        $(".receive_date" + product_id).hide();
        $(".receive_branch" + product_id).hide();
    }
});
$(document).on("change", ".recieveProductPlace", function() {
    let product_id = $(this).data('id');
    if ($('#frombranch' + product_id).is(':checked')) {
        $(".quantity_to_receive_campaign" + product_id).show();
        $(".quantity_to_receive_data" + product_id + "_2").hide();
        $(".quantity_to_receive_data" + product_id + "_1").show();
        $(".quantity_to_receive_data" + product_id + "_1").prop('required', true);
        $(".quantity_to_receive_data" + product_id + "_2").prop('required', false);
        $(".quantity_to_receive_data" + product_id + "_1").prop('disabled', false);
        $(".quantity_to_receive_data" + product_id + "_2").prop('disabled', true);
        $(".quantity_to_receive_data" + product_id + "_1").attr('id', "quantity_to_receive_data" + product_id);
        $(".quantity_to_receive_data" + product_id + "_2").attr('id', "dummy");
        $("#branch" + product_id).prop('required', true);
        $("#receive_date" + product_id).prop('required', true);
        $(".receive_branch" + product_id).show();
        $(".receive_date" + product_id).show();
        $('#receive_date' + product_id + ' option').prop("selected", false);
        $('#receive_date' + product_id + ' option').show();
        $('#receive_date' + product_id + ' option').prop('disabled', false);
        $('#receive_date' + product_id + ' option[data-store="0"]').hide();
    } else if ($('#deliverytohome' + product_id).is(':checked')) {
        $(".quantity_to_receive_campaign" + product_id).show();
        $(".quantity_to_receive_data" + product_id + "_1").hide();
        $(".quantity_to_receive_data" + product_id + "_2").show();
        $(".quantity_to_receive_data" + product_id + "_2").prop('required', true);
        $(".quantity_to_receive_data" + product_id + "_1").prop('required', false);
        $(".quantity_to_receive_data" + product_id + "_2").prop('disabled', false);
        $(".quantity_to_receive_data" + product_id + "_1").prop('disabled', true);
        $(".quantity_to_receive_data" + product_id + "_2").attr('id', "quantity_to_receive_data" + product_id);
        $(".quantity_to_receive_data" + product_id + "_1").attr('id', "dummy");
        $("#branch" + product_id).prop('required', false);
        $("#receive_date" + product_id).prop('required', true);
        $(".receive_branch" + product_id).hide();
        $(".receive_date" + product_id).show();
        $('#receive_date' + product_id + ' option').prop("selected", false);
        $('#receive_date' + product_id + ' option').show();
        $('#receive_date' + product_id + ' option[data-home="0"]').hide();
        $('#receive_date' + product_id + ' option[data-home="0"]').prop('disabled', true);
        $('#receive_date' + product_id).trigger("change");
        $('input[type="date"]#receive_date' + product_id).prop('min', after3Days);
    }
});
$(document).ready(function() {
    requireCard(true);
    setCustomerIp();
    addDeliverySection();
    $(document).on("click", ".cart-increase-item-btn", function() {
        addDeliverySection();
    });
    $(document).on("click", ".cart-decrease-item-btn", function() {
        addDeliverySection();
    });
    $(document).on("change", ".cart-item-input", function() {
        addDeliverySection();
    });
    $(document).on("click", ".cart-delete-item-btn", function() {
        var toBeDeleted = $(this).data('product');
        let receive_it = false;
        $('.want1_to_receive').each(function(i, obj) {
            if ($(obj).data('id') != toBeDeleted) {
                if ($(this).is(':checked'))
                    receive_it = true;
            }
        });
        if (!receive_it)
            requireAddress(false);
        addDeliverySection();
    });
    $("#paymentForm").submit(function(e) {
        e.preventDefault();
        var validator = $("#paymentForm").validate({});
        if ($('#paymentForm').valid()) {
            let phone = getFullInternationalNumber();
            $("#phone").val(phone);
            var methodVal = $('.payment_method:checked').val();
            if (methodVal == "home") {
                submitCheckoutHome();
            } else if ($(this).hasClass("NBE")) {
                e.preventDefault();
                e.returnValue = false;
                submitCheckoutNBE();
            } else {
                submitCheckoutPayfort();
            }
        } else {
            validator.focusInvalid();
            e.preventDefault();
            return false;
        }
    });
});