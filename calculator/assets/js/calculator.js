let money = $('#money-value'),
    bonds = $('#bonds-value'),
    profit = $('#profit-value'),
    shares = $('#property-shares'),
    buildings = $('#building-value'),
    formMoney = $('#form-money-result'),
    formProperty = $('#form-property-result'),
    formGold = $('#form-gold-result'),
    formBuildings = $('#form-buildings-result'),
    zakatTotal = $('#zakat-total'),
    formzakatTotal = $('#form-zakat-total');
money.keyup(function(e) {
    let res = Math.ceil(e.target.value / 40);
    res = res.toFixed(2);
    $('#money-result').text(res);
    formMoney.val(res);
    $('.donition-fields').show();
});
$('#bonds-value, #profit-value, #property-shares').keyup(function(e) {
    let result1 = (Number(profit.val()) + Number(shares.val())) / 40;
    let result2 = bonds.val() / 40;
    let res = Number(result1) + Number(result2);
    res = res.toFixed(2);
    $('#property-result').text(res);
    formProperty.val(res);
    $('.donition-fields').show();
});
$('#gold-value-18, #gold-value-21').keyup(function(e) {
    let res = (($("#gold-value-18").val() * $('#gold-price-18').val()) + ($("#gold-value-21").val() * $('#gold-price-21').val())) / 40;
    res = res.toFixed(2);
    $('#gold-result').text(res);
    formGold.val(res);
    $('.donition-fields').show();
});
buildings.keyup(function(e) {
    let res = e.target.value * 0.3;
    res = res.toFixed(2);
    $('#building-result').text(res);
    formBuildings.val(res);
    $('.donition-fields').show();
});
$('#money-value, #bonds-value, #profit-value, #property-shares, #gold-value-18, #gold-value-21, #building-value').keyup(function(e) {
    let res = Number(formMoney.val()) + Number(formProperty.val()) + Number(formGold.val()) + Number(formBuildings.val());
    res = res.toFixed(2);
    zakatTotal.text(res);
    formzakatTotal.val(res);
    $('.donition-fields').show();
});