(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cart/cart"],{"3a32":function(t,e,n){"use strict";n.r(e);var r=n("4ad2"),o=n("4907");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("9134");var i,u=n("f0c5"),s=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=s.exports},4907:function(t,e,n){"use strict";n.r(e);var r=n("6f85"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=o.a},"4ad2":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={myAddress:function(){return n.e("components/my-address/my-address").then(n.bind(null,"b969"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"c93a"))},itemList:function(){return n.e("components/item-list/item-list").then(n.bind(null,"fbe8"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"6f85":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("a34a")),o=i(n("1efe")),a=n("26cb");function i(t){return t&&t.__esModule?t:{default:t}}function u(t,e){return f(t)||l(t,e)||c(t,e)||s()}function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,e){if(t){if("string"===typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function l(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=t[Symbol.iterator]();!(r=(i=u.next()).done);r=!0)if(n.push(i.value),e&&n.length===e)break}catch(s){o=!0,a=s}finally{try{r||null==u["return"]||u["return"]()}finally{if(o)throw a}}return n}}function f(t){if(Array.isArray(t))return t}function m(t,e,n,r,o,a,i){try{var u=t[a](i),s=u.value}catch(c){return void n(c)}u.done?e(s):Promise.resolve(s).then(r,o)}function p(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){m(a,r,o,i,u,"next",t)}function u(t){m(a,r,o,i,u,"throw",t)}i(void 0)}))}}function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function b(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){v(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function v(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var g={mixins:[o.default],computed:b(b(b(b({},(0,a.mapState)("m_cart",["cart"])),(0,a.mapState)("m_user",["token"])),(0,a.mapGetters)("m_cart",["priceTotal","total","watchCheckAll"])),(0,a.mapGetters)("m_user",["addressStr"])),data:function(){return{getId:0,wh:0,second:3,timer:null}},onLoad:function(){var e=t.getSystemInfoSync();this.wh=e.windowHeight},methods:b(b({},(0,a.mapMutations)("m_cart",["checkCartItem","saveCart","valueCartItem","delCartItem","updateCheckedAll"])),{},{radioHandler:function(t){this.checkCartItem(t.goods_id)},valueHandler:function(t){var e={id:this.getId,count:t};this.valueCartItem(e),this.setBadge()},valueHandler2:function(t){this.getId=t},delItem:function(){var t=this.getId;this.delCartItem(t)},clickCheckAll:function(){!0===this.watchCheckAll?this.updateCheckedAll(!1):this.updateCheckedAll(!0)},goToHome:function(){t.switchTab({url:"/pages/home/home"})},pay:function(){return 0===this.total?t.$showMsg("请勾选要结算的商品"):this.addressStr?void(this.token?this.payOrder():this.delayToLogin()):t.$showMsg("请选择送货地址")},payOrder:function(){var e=this;return p(r.default.mark((function n(){var o,a,i,s,c,d,l,f,m;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o={order_price:.01,consignee_addr:e.addressStr,goods:e.cart.filter((function(t){return t.goods_state})).map((function(t){return{goods_id:t.goods_id,goods_number:t.goods_count,goods_price:t.goods_price}}))},n.next=3,t.$http.post("/api/public/v1/my/orders/create",o);case 3:if(a=n.sent,200===a.statusCode){n.next=6;break}return n.abrupt("return",t.$showMsg("创建支付订单失败,请重试"));case 6:return console.log(a.data.message.order_number),i={order_number:a.data.message.order_number},n.next=10,t.$http.post("/api/public/v1/my/orders/req_unifiedorder",i);case 10:if(s=n.sent,200===s.statusCode){n.next=13;break}return n.abrupt("return",t.$showMsg("创建预付订单失败,请重试"));case 13:return console.log(s.data.message.pay),c=s.data.message.pay,n.next=17,t.requestPayment(c);case 17:if(d=n.sent,l=u(d,2),f=l[0],m=l[1],!f){n.next=23;break}return n.abrupt("return",t.$showMsg("订单未支付"));case 23:console.log(m);case 24:case"end":return n.stop()}}),n)})))()},showTips:function(e){t.showToast({title:"请登录再结算"+e+"秒后将自动跳转",icon:"none",mask:!0,duration:1500})},delayToLogin:function(){var e=this;this.showTips(this.second),this.timer=setInterval((function(){if(e.second<=1)return clearInterval(e.timer),t.switchTab({url:"/pages/my/my"}),void(e.second=3);e.second--,e.showTips(e.second)}),1e3)}})};e.default=g}).call(this,n("543d")["default"])},9134:function(t,e,n){"use strict";var r=n("bbf4"),o=n.n(r);o.a},bbf4:function(t,e,n){},ed8e:function(t,e,n){"use strict";(function(t){n("726f");r(n("66fd"));var e=r(n("3a32"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])}},[["ed8e","common/runtime","common/vendor"]]]);