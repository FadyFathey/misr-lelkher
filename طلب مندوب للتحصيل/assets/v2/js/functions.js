$(document).ready(function(){$('.main-indicators button').click(function(){$('.main-indicators button').removeClass('active');$(this).addClass('active');});$("input[name='quick_donation_type']:checked").parent().addClass("selected");$('input[type=radio][name=quick_donation_type]').change(function(){$("input[name='quick_donation_type']").parent().removeClass("selected");$("input[name='quick_donation_type']:checked").parent().addClass("selected");});async function makeQuickDonation(btn,donationType,donationAmount)
{var btnText=btn.html();var loadingSpinner='<span id="loadingSpinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';btn.html(loadingSpinner);btn.prop('disabled',true);let data={"type":donationType,"currency":visitorCurrency,"amount":donationAmount,"_token":csrf};var response=await sendajaxPost(addQuickDonationURL,data);if(response.success==true)
{location.href=response.url;}
else
{Swal.fire({title:"",text:langStrings['unexpected_error'],icon:"error",confirmButtonText:langStrings['ok'],});btn.prop('disabled',false);btn.html(btnText);return;}}
$(document).on("click","#confirm_quick_donation",function(){var btn=$(this);var donationType=$("input[name='quick_donation_type']:checked").val();var donationAmount=$(".quick-donation-amount").val();if(!donationType){Swal.fire({title:"",text:langStrings['donation_type_required'],icon:"error",confirmButtonText:langStrings['ok'],});return;}
if(!donationAmount||isNaN(donationAmount)||donationAmount<10){if(visitorCurrency==0&&donationAmount<10)
{Swal.fire({title:"",text:langStrings['amount_required_10'],icon:"error",confirmButtonText:langStrings['ok'],});return;}
else if(donationAmount==0)
{$(".quick-donation-amount").focus();return;}}
makeQuickDonation(btn,donationType,donationAmount)})});async function changeCurrency(currency)
{if(currency=="0")
{$(".currency-label").html(langStrings['egp']);$(".egp-btn").addClass("selected");$(".usd-btn").removeClass("selected");}
else
{$(".currency-label").html(langStrings['usd']);$(".egp-btn").removeClass("selected");$(".usd-btn").addClass("selected");}
try{let data={"currency":currency,"_token":csrf};var response=await sendajaxPost(changCurrencyURL,data);if(response.status=="success")
{location.reload();}}catch(error){}}
function showChangeCurrency()
{$(".nav-currency-dropdown").removeClass("hide");}
function handleCurrencyMenu()
{if(visitorCurrency=="0")
{$(".currency-label").html(langStrings['egp']);$(".egp-btn").addClass("selected");$(".usd-btn").removeClass("selected");}
else
{$(".currency-label").html(langStrings['usd']);$(".egp-btn").removeClass("selected");$(".usd-btn").addClass("selected");}}
function sendajaxPost(url,data)
{return new Promise(function(resolve,reject){$.ajax({type:'Post',url:url,data:data,success:function(data){resolve(data);},error:function(error){reject(error);}});});}
function sendajaxGet(url)
{return new Promise(function(resolve,reject){$.ajax({type:'Get',url:url,success:function(data){resolve(data);},error:function(error){reject(error);}});});}
function updateCartAmount(amount,type="Sadaka")
{$(".cart-amount").html(amount+" "+currencyLabel);var option="";if(type=="Sadaka")
option="sadaka";else if(type=="Zakat")
option="zakat";else if(type=="Sadaka_garia")
option="sadaka_garia";else if(type=="Campaign")
option="general";if(amount==0)
{$(".submit-cart-btn").prop('disabled',true);}
else
{$(".submit-cart-btn").prop('disabled',false);}
$('input[name=quick_donation_type][value='+option+']').attr('checked',true);}
function updateCartItemAmount(id,amount)
{$(".cart-amount-"+id).html(amount+" "+currencyLabel);}
async function changeItemInCart(id,number,btn)
{let data={"id":id,"number":number,"_token":csrf};var response=await sendajaxPost(changeItemInCartURL,data);if(response.success==true)
{$(".cart-item-input-"+id).val(number);updateCartAmount(response.cart_total);updateCartItemAmount(id,response.item_total);cartTotal=response.cart_total;btn.prop('disabled',false);}
else
{Swal.fire({title:"",text:langStrings['unexpected_error'],icon:"error",confirmButtonText:langStrings['ok'],});btn.prop('disabled',false);return;}}
async function changeTypeOfDonation()
{var donationType=$("input[name='quick_donation_type']:checked").val();let data={"type":donationType,"_token":csrf};var response=await sendajaxPost(changeTypeOfDonationURL,data);if(response.success==true)
{location.href=CheckoutFormURL;}
else
{}}
async function removeItemFromCart(id)
{let data={"id":id,"_token":csrf};var response=await sendajaxPost(removeItemFromCartURL,data);if(response.success==true)
{$(".cart-item-"+id).remove();updateCartAmount(response.cart_total);cartTotal=response.cart_total;}
else
{Swal.fire({title:"",text:langStrings['unexpected_error'],icon:"error",confirmButtonText:langStrings['ok'],});return;}}
async function addToCart(btn,type,id)
{fbq('track','AddToCart');ttq.track('AddToCart');var btnText=btn.html();var loadingSpinner='<span id="loadingSpinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';btn.html(loadingSpinner);btn.prop('disabled',true);if(type=="cause")
{var amount=$(".cause-input-"+id).val()??0;if(amount==0)
{$(".cause-input-"+id).focus();btn.prop('disabled',false);btn.html(btnText);return;}
else if(visitorCurrency==0&&amount<10)
{Swal.fire({title:"",text:langStrings['amount_required_10'],icon:"error",confirmButtonText:langStrings['ok'],});btn.prop('disabled',false);btn.html(btnText);return;}
let data={"currency":visitorCurrency,"id":id,"amount":amount,"_token":csrf};var response=await sendajaxPost(addCauseToCartURL,data);if(response.success==true)
{btn.prop('disabled',false);btn.html(btnText);updateCartAmount(response.cart_total);cartTotal=response.cart_total;showCart();}
else
{Swal.fire({title:"",text:langStrings['ended_product'],icon:"error",confirmButtonText:langStrings['ok'],});btn.prop('disabled',false);btn.html(btnText);return;}}
else
{var quantity=$(".product-quantity-"+id).val()??0;if(quantity==0)
{$(".product-quantity-"+id).focus();btn.prop('disabled',false);btn.html(btnText);return;}
let data={"currency":visitorCurrency,"id":id,"quantity":quantity,"_token":csrf};var response=await sendajaxPost(addProductToCartURL,data);if(response.success==true)
{btn.prop('disabled',false);btn.html(btnText);updateCartAmount(response.cart_total);cartTotal=response.cart_total;showCart();}
else
{Swal.fire({title:"",text:langStrings['ended_product'],icon:"error",confirmButtonText:langStrings['ok'],});btn.prop('disabled',false);btn.html(btnText);return;}}}
function showCart()
{$(".openCart").trigger('click');$("#cart-modal").modal('show');}
async function openCart()
{var response=await sendajaxGet(getCartURL);if(response.success==true)
{$(".cart-items").html(response.data);}
else
{}}
function openLink(url)
{location.href=url;}
$(document).on("click",".donateButton",function(){var type=$(this).data('type');var id=$(this).data('id');addToCart($(this),type,id);});$(document).on("click",".quick-donation-btn",function(){$(".charity-label").addClass("selected");$('.charity-radio').attr('checked',true);});$(document).on("click",".openCart",function(){openCart();});$(document).on("click",".cart-delete-item-btn",function(){var id=$(this).data('id');removeItemFromCart(id);});$(document).on("click",".cart-increase-item-btn",function(){$(this).prop('disabled',true);var id=$(this).data('id');var number=parseInt($(".cart-item-input-"+id).val())+1;changeItemInCart(id,number,$(this));});$(document).on("click",".cart-decrease-item-btn",function(){$(this).prop('disabled',true);var id=$(this).data('id');var number=parseInt($(".cart-item-input-"+id).val())-1;if(number>0)
{changeItemInCart(id,number,$(this));}});$(document).on("change",".cart-item-input",function(){$(this).prop('disabled',true);var id=$(this).data('id');var number=parseInt($(this).val());if(number>0)
{changeItemInCart(id,number,$(this));}});$(document).on("click",".submit-cart-btn",function(){changeTypeOfDonation();});$(document).on("click",".product-increase-item-btn",function(){var id=$(this).data('id');var number=parseInt($(".product-item-input-"+id).val())+1;$(".product-item-input-"+id).val(number);});$(document).on("click",".product-decrease-item-btn",function(){var id=$(this).data('id');var number=parseInt($(".product-item-input-"+id).val())-1;if(number>0)
{$(".product-item-input-"+id).val(number);}});$(document).ready(function(){$('html').attr('data-bs-theme','light');const animationDuration=3000;const initialValues=[];$('.counter-value').each(function(index){const rawValue=$(this).text().trim();initialValues[index]=$.isNumeric(rawValue)?parseFloat(rawValue):rawValue;if($.isNumeric(rawValue))
{$(this).text(0);}});function startCounterAnimation(entry){const counterValueElement=$(entry.target).find('.counter-value');const targetIndex=$('.counter-value').index(counterValueElement);const targetNumber=initialValues[targetIndex];if($.isNumeric(targetNumber)){const startTime=performance.now();function updateCounter(timestamp){const elapsedTime=timestamp-startTime;const progress=elapsedTime/animationDuration;const currentValue=Math.min(progress*targetNumber,targetNumber);counterValueElement.text(currentValue.toFixed(0));if(progress<1){requestAnimationFrame(updateCounter);}}
requestAnimationFrame(updateCounter);}}
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){startCounterAnimation(entry);observer.unobserve(entry.target);}});},{threshold:0.5});$('.counter-items').each(function(){observer.observe(this);});});$(document).ready(function(){const formattedNumberElements=$('.formatted-number');formattedNumberElements.each(function(){const rawNumber=parseFloat($(this).text());const formattedNumber=rawNumber.toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:0});$(this).text(formattedNumber);});window.addEventListener('scroll',function(){var maxScroll=document.documentElement.scrollHeight-window.innerHeight;var buttons=document.querySelectorAll('.landing-quick-buttons');buttons.forEach(function(button){if(window.scrollY>=maxScroll-45){button.style.display='none';}else{button.style.display='inline-block';}});});});function HandleCountryValidProducts(country)
{if(country=="EG")
{$('.valid_2').remove();}
else
{$('.valid_1').remove();}}