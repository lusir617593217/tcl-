"use strict";var cart_list=JSON.parse(localStorage.getItem("cart"));if(null===cart_list)$(".main-w").show().siblings().hide();else{$(".main-w").hide().siblings().show();var str="";cart_list.forEach(function(t){str+='\n      <li>\n        <input class="check_one" type="checkbox">\n        <img src="'.concat(t.url,'" alt="图片">\n        <span class="message">').concat(t.title,'</span>\n        <span class="unit">').concat(t.price,'</span>\n        <p class="count">\n          <button class="sub">-</button>\n          <span>').concat(t.count,'</span>\n          <button class="add">+</button>\n        </p>\n        <span class="price">\n        ').concat((parseInt(t.price)*t.count).toFixed(2),' 元\n        </span>\n        <p class="font">\n          <i class="glyphicon glyphicon-star"></i>\n          <i class="glyphicon glyphicon-trash"></i>\n        </p>\n      </li>\n    '),$(".product").html(str)})}function isAll(){var n=!0;$(".check_one").each(function(t,c){!1===$(c).prop("checked")&&(n=!1)}),$(".check_all").prop("checked",n)}function priceSum(){var n=0,s=0,e=0;return $(".check_one").each(function(t,c){s+=parseInt($(this).siblings(".count").children("span").html()),$(this).prop("checked")&&(n+=parseInt($(this).siblings(".price").html()),e+=parseInt($(this).siblings(".count").children("span").html()))}),{goods_count:s,goods_selected:e,price_sum:n}}function account(){var t=priceSum();0!=t.goods_selected?$(".go_buy").addClass("active"):$(".go_buy").removeClass("active"),$(".goods_count").html(t.goods_count),$(".goods_selected").html(t.goods_selected),$(".price_sum").html(t.price_sum)}$(".check_all").click(function(){$(".check_one").prop("checked",$(this).prop("checked")),account()}),$(".check_one").change(function(){isAll(),account()}),$(".product").on("click",".sub",function(){var t=$(this).next().text();--t<1&&(t=1),$(this).next().text(t);var c=(parseInt($(this).parent().prev().text())*t).toFixed(2);$(this).parent().next().text(c+" 元"),account()}),$(".product").on("click",".add",function(){var t=$(this).prev().text();t++,$(this).prev().text(t);var c=(parseInt($(this).parent().prev().text())*t).toFixed(2);$(this).parent().next().text(c+" 元"),account()}),priceSum(),account();