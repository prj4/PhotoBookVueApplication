(function(t){function e(e){for(var a,r,i=e[0],l=e[1],u=e[2],c=0,m=[];c<i.length;c++)r=i[c],n[r]&&m.push(n[r][0]),n[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);p&&p(e);while(m.length)m.shift()();return s.push.apply(s,u||[]),o()}function o(){for(var t,e=0;e<s.length;e++){for(var o=s[e],a=!0,i=1;i<o.length;i++){var l=o[i];0!==n[l]&&(a=!1)}a&&(s.splice(e--,1),t=r(r.s=o[0]))}return t}var a={},n={app:0},s=[];function r(e){if(a[e])return a[e].exports;var o=a[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=a,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(o,a,function(e){return t[e]}.bind(null,a));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var p=l;s.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"56d7":function(t,e,o){"use strict";o.r(e);var a=o("2b0e"),n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("header",{staticClass:"topnav"},[o("nav",[o("router-link",{staticClass:"alignleft",attrs:{tag:"img",src:"images/titleonlyp.png",to:"/"}}),o("router-link",{staticClass:"alignleft",attrs:{to:"/HostSignUp"}},[t._v(" Signup as Event Host")]),o("a",{staticClass:"alignright"},[t._v(" Privacy")]),o("a",{staticClass:"alignright"},[t._v(" About Photobook")])],1)]),o("br"),o("router-view")],1)},s=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("div",{attrs:{id:"Wrapper"}},[a("img",{attrs:{src:o("865c"),width:"90%",height:"90%"}}),a("form",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.GuestName,expression:"GuestName"}],staticClass:"textbox",attrs:{type:"text",placeholder:"Your Name"},domProps:{value:t.GuestName},on:{input:function(e){e.target.composing||(t.GuestName=e.target.value)}}}),a("br"),a("br"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.EventPin,expression:"EventPin"}],staticClass:"textbox",attrs:{type:"text",placeholder:"Event Pin"},domProps:{value:t.EventPin},on:{input:function(e){e.target.composing||(t.EventPin=e.target.value)}}}),a("br"),a("br"),a("input",{staticClass:"button",attrs:{type:"submit",value:"Click to login to event"},on:{click:t.GuestLogin}}),a("br"),a("br"),a("br")]),a("router-link",{attrs:{to:"/hostlogin"}},[a("button",{staticClass:"button",attrs:{type:"button",width:"100px",Height:"50px"}},[t._v(" Login as Host")])]),a("br")],1)])},i=[],l={name:"Home",methods:{GuestLogin:function(){}},data:function(){return{GuestName:null,EventPin:null}},props:{msg:String}},u=l,p=o("2877"),c=Object(p["a"])(u,r,i,!1,null,"b60bd3f0",null),m=c.exports,d={name:"app",components:{Home:m}},v=d,h=Object(p["a"])(v,n,s,!1,null,null,null),g=h.exports,b=o("4af9"),f=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"Wrapper"}},[o("img",{attrs:{src:"images/photobooktitle.png",width:"90%",height:"90%"}}),o("form",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.HostEmail,expression:"HostEmail"}],staticClass:"textbox",attrs:{type:"email",placeholder:"Email"},domProps:{value:t.HostEmail},on:{input:function(e){e.target.composing||(t.HostEmail=e.target.value)}}}),o("br"),o("br"),o("input",{directives:[{name:"model",rawName:"v-model",value:t.HostPassword,expression:"HostPassword"}],staticClass:"textbox",attrs:{type:"password",placeholder:"Password"},domProps:{value:t.HostPassword},on:{input:function(e){e.target.composing||(t.HostPassword=e.target.value)}}}),o("br"),o("br"),o("input",{staticClass:"button",attrs:{type:"button",value:"Click to login as host",width:"100px",Height:"50px"},on:{click:t.postHostLogin}}),o("br")])])},H=[],E=o("f499"),w=o.n(E),x={methods:{autoLogin:function(){if("True"==this.$cookie.get("LoggedIn")){var t=this.$cookie.get("LoggedInEmail");this.$router.push({name:"HostHomePage",params:{HostEmail:t}})}},postHostLogin:function(){var t="https://photobookwebapi1.azurewebsites.net/api/Account/Login",e={userName:this.HostEmail,passWord:this.HostPassword},o=this.$router,a=this.$cookie,n=this;"True"==a.get("LoggedIn")?o.push({name:"HostHomePage",params:{HostEmail:e.userName}}):fetch(t,{method:"POST",credentials:"include",headers:new Headers({"Content-Type":"application/json",Accept:"application/json"}),mode:"cors",body:w()(e)}).then(function(t){"200"==t.status||"204"==t.status?(a.set("LoggedIn","True",{expires:"4h"}),a.set("LoggedInEmail",n.HostEmail,{expires:"4h"}),o.push({name:"HostHomePage",params:{HostEmail:e.userName}})):alert("Email or password was wrong")})}},data:function(){return{HostEmail:null,HostPassword:null,HostId:null,HostName:null}},beforeMount:function(){this.autoLogin()},name:"hostlogin",props:{}},P=x,y=Object(p["a"])(P,f,H,!1,null,"5ec1da2a",null),C=y.exports,N=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"Wrapper"}},[o("img",{attrs:{src:"images/photobooktitle.png",width:"90%",height:"90%"}}),o("form",{attrs:{id:"signup",method:"post"},on:{submit:t.postHostSignUp}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.HostName,expression:"HostName"}],staticClass:"textbox",attrs:{type:"name",placeholder:"Name",required:""},domProps:{value:t.HostName},on:{input:function(e){e.target.composing||(t.HostName=e.target.value)}}}),o("br"),o("br"),o("input",{directives:[{name:"model",rawName:"v-model",value:t.HostEmail,expression:"HostEmail"}],staticClass:"textbox",attrs:{type:"email",placeholder:"Email",required:""},domProps:{value:t.HostEmail},on:{input:function(e){e.target.composing||(t.HostEmail=e.target.value)}}}),o("br"),o("br"),o("input",{directives:[{name:"model",rawName:"v-model",value:t.HostPassword,expression:"HostPassword"}],staticClass:"textbox",attrs:{type:"password",placeholder:"Password",required:"",pattern:"[\\w]{6,}"},domProps:{value:t.HostPassword},on:{input:function(e){e.target.composing||(t.HostPassword=e.target.value)}}}),o("br"),o("br"),o("input",{directives:[{name:"model",rawName:"v-model",value:t.HostConfirmPassword,expression:"HostConfirmPassword"}],staticClass:"textbox",attrs:{type:"password",placeholder:"Confirm Password",required:"",pattern:"[\\w]{6,}"},domProps:{value:t.HostConfirmPassword},on:{input:function(e){e.target.composing||(t.HostConfirmPassword=e.target.value)}}}),o("br"),o("br")]),o("router-link",{attrs:{to:"/hostlogin"}},[o("button",{staticClass:"button",attrs:{type:"button",width:"100px",Height:"50px"}},[t._v(" Sign up as Host")])])],1)},_=[],k={methods:{postHostSignUp:function(t){var e=this;t.preventDefault();this.HostName,this.HostEmail,this.HostPassword,this.confirmPassword;this.errors=[],""===this.HostName?this.errors.push("Name is required"):fetch(apiURL+encodeURIComponent(this.HostName)).then(function(t){return t.json()}).then(function(t){t.error?e.errors.push(t.error):alert("You are now signed up as a Host")})}}},D=k,L=Object(p["a"])(D,N,_,!1,null,"0d096c08",null),j=L.exports,S=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"Wrapper",attrs:{id:"WrapperInternalPage"}},[o("a",{staticClass:"alignleft"},[t._v("Welcome "+t._s(t.HostName)+" ")]),o("router-link",{attrs:{to:"/AddEvent"}},[o("input",{staticClass:"smallbuttonright",attrs:{type:"button",value:"Add Event"}})]),o("input",{staticClass:"smallbuttonright",attrs:{type:"button",value:"Delete Event"}}),o("input",{staticClass:"smallbuttonright",attrs:{type:"button",value:"Logout"},on:{click:t.Logout}}),o("br")],1)},A=[],O=(o("7f7f"),{methods:{Logout:function(){var t="https://photobookwebapi1.azurewebsites.net/api/Account/Logout",e=this.$router,o=this.$cookie;fetch(t,{method:"POST",credentials:"include",headers:new Headers({"Content-Type":"application/json",Accept:"application/json"}),mode:"cors"}).then(function(t){"200"==t.status||"204"==t.status?(o.delete("LoggedIn"),o.delete("LoggedInEmail"),e.push({name:"Home"})):alert("Failed to log out")})},getData:function(){var t="https://photobookwebapi1.azurewebsites.net/api/Account/"+this.HostEmail,e=this;fetch(t).then(function(t){"200"==t.status?t.json().then(function(t){return{body:t}}).then(function(t){e.HostName=t.body.name}):alert("Error return to start page")});var o="https://photobookwebapi1.azurewebsites.net/api/Event/Host";fetch(o,{credentials:"include",headers:new Headers({"Content-Type":"application/json",Accept:"application/json","Accept-Encoding":"gzip, deflate, br","Accept-Language":"da, en-US; q=0.9, en; q=0.8, de; q=0.7, nb; q=0.6"}),mode:"cors"}).then(function(t){"200"==t.status&&t.json().then(function(t){return{body:t}}).then(function(t){e.HostEvents=t.body})})}},data:function(){return{HostEvents:[],HostID:null,HostName:null,HostPassword:null,HostEmail:this.$cookie.get("LoggedInEmail")}},beforeMount:function(){this.getData()},name:"HostHomePage",props:{}}),$=O,T=Object(p["a"])($,S,A,!1,null,"12b469f6",null),I=T.exports,W=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"Wrapper",attrs:{id:"Wrapper"}},[o("form",{attrs:{method:"post",action:"https://photobookwebapi1.azurewebsites.net/api/Event"}},[o("h1",[t._v("Add Event")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.EventName,expression:"EventName"}],staticClass:"textbox",attrs:{type:"text",placeholder:"Event Name",name:"name"},domProps:{value:t.EventName},on:{input:function(e){e.target.composing||(t.EventName=e.target.value)}}}),o("br"),o("br"),o("input",{directives:[{name:"model",rawName:"v-model",value:t.EventLocation,expression:"EventLocation"}],staticClass:"textbox",attrs:{type:"text",placeholder:"Location",name:"location"},domProps:{value:t.EventLocation},on:{input:function(e){e.target.composing||(t.EventLocation=e.target.value)}}}),o("br"),o("br"),o("input",{directives:[{name:"model",rawName:"v-model",value:t.EventDescription,expression:"EventDescription"}],staticClass:"bigtextbox",attrs:{type:"text",placeholder:"Description",name:"description"},domProps:{value:t.EventDescription},on:{input:function(e){e.target.composing||(t.EventDescription=e.target.value)}}}),o("br"),o("br"),o("input",{directives:[{name:"model",rawName:"v-model",value:t.StartDate,expression:"StartDate"}],staticClass:"textbox",attrs:{type:"datetime-local",placeholder:"Start Date",name:"startDate"},domProps:{value:t.StartDate},on:{input:function(e){e.target.composing||(t.StartDate=e.target.value)}}}),o("br"),o("br"),o("input",{directives:[{name:"model",rawName:"v-model",value:t.EndDate,expression:"EndDate"}],staticClass:"textbox",attrs:{type:"datetime-local",placeholder:"End Date",name:"endDate"},domProps:{value:t.EndDate},on:{input:function(e){e.target.composing||(t.EndDate=e.target.value)}}}),o("br"),o("br"),o("input",{staticClass:"button",attrs:{type:"submit",value:"Click to create event",width:"100px",Height:"50px"}}),o("br")])])},G=[],q={methods:{postAddEvent:function(){var t="https://photobookwebapi1.azurewebsites.net/api/Event",e={location:this.EventLocation,description:this.EventDescription,name:this.EventName,startDate:this.StartDate,endDate:this.EndDate},o=this.$router;fetch(t,{method:"POST",credentials:"include",headers:new Headers({"Content-Type":"application/json",Accept:"application/json"}),mode:"cors",body:w()(e)}).then(function(t){"200"==t.status?o.push({name:"HostHomePage",params:{HostEmail:e.userName}}):"204"==t.status?alert("Unable to create event, try again later"):alert("Email or password was wrong"+t.status)})}},data:function(){return{EventName:null,EventLocation:null,EventDescription:null,StartDate:null,EndDate:null}},name:"AddEvent",props:{}},U=q,z=Object(p["a"])(U,W,G,!1,null,"5e4e16d2",null),M=z.exports,J=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"Wrapper",attrs:{id:"WrapperInternalPage"}},[o("a",{staticClass:"alignleft"},[t._v("Welcome "+t._s(t.HostName)+" To "+t._s(t.EventName))]),o("router-link",{attrs:{to:"/AddEvent"}},[o("input",{staticClass:"smallbuttonright",attrs:{type:"button",value:"Add Photos"}})]),o("br")],1)},R=[],Y={methods:{},data:function(){return{}},beforeMount:function(){},name:"GuestEventPage",props:{}},F=Y,B=Object(p["a"])(F,J,R,!1,null,"38039fd6",null),K=B.exports;a["a"].use(b["a"]);var Q=new b["a"]({mode:"history",base:"/",routes:[{path:"/",name:"Home",component:m},{path:"/hostlogin",name:"hostlogin",component:C},{path:"/HostSignUp",name:"HostSignUp",component:j},{path:"/HostHomePage",name:"HostHomePage",component:I},{path:"/AddEvent",name:"AddEvent",component:M},{path:"/GuestEventPage",name:"GuestEventPage",component:K}]}),V=o("180c"),X=o.n(V);a["a"].use(X.a),a["a"].config.productionTip=!1,new a["a"]({router:Q,render:function(t){return t(g)}}).$mount("#app")},"865c":function(t,e,o){t.exports=o.p+"img/photobooktitle.961f1431.png"}});
//# sourceMappingURL=app.65c387c0.js.map