(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,t,a){e.exports=a(35)},29:function(e,t,a){},34:function(e,t,a){e.exports={App:"_1o-FpbQrR11SDFN-G7O4U3","App-logo":"_3JCPttIlaO1n9gbarj-AYQ","App-logo-spin":"RvI1Jd7nZvV5oabR4RbAY","App-header":"_3iH8LjVH-8aINDFVrlCaZ1","App-link":"_13fTZYk7Fx94Q52NR6_8FR"}},35:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(20),i=a.n(r),l=(a(29),a(22)),c=a(1),s=a(2),u=a(4),m=a(3),p=a(5),d=(a(34),a(23)),f=function(e,t){return console.log(t),new Promise(function(a,n){var o=new XMLHttpRequest;o.open("POST",e),o.send(t),o.onreadystatechange=function(e){200===e.srcElement.status&&4===e.srcElement.readyState&&a(e)}})},h=function(e,t){return new Promise(function(a,n){var o=new XMLHttpRequest;o.open("POST",e),o.setRequestHeader("Content-type","application/json"),o.withCredentials=!0,o.send(t),o.onreadystatechange=function(e){200===e.srcElement.status&&4===e.srcElement.readyState&&a(e.srcElement)}})},v=a(6),E=a.n(v),g=["audio/mp3","audio/wma","audio/flac","audio/acc","audio/mmf","audio/amr","audio/m4a","audio/m4r","audio/ogg","audio/mp2","audio/wav","audio/wv"],b=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handlerFile=function(e){var t=e.target.files;if(0!==t.length)if(1===t.length){var n=t[0].type;if(!g.includes(n))return void alert("\u53ea\u80fd\u4e0a\u4f20\u97f3\u9891");a.setState({file:t[0],fileName:t[0].name})}else{var o=Object(d.a)(t),r=o.map(function(e){return e.name});a.setState({file:o,fileName:r}),console.log(r)}},a.submit=function(){var e=new FormData,t=window.location.origin+"/uploadConvert";e.append("filename",a.state.fileName),e.append("file",a.state.file),e.append("sampleRate",a.state.sampleRate),e.append("bitdpth",a.state.bitdpth),e.append("countOfChannel",a.state.countOfChannel),e.append("format",a.state.outputFormat),f(t,e).then(function(e){a.setState({fileInformation:JSON.parse(e.srcElement.response).stderr})})},a.submitMulitpleAudio=function(){var e=new FormData,t=window.location.origin+"/mulitpleAudioConvert";console.log(a.state.file instanceof Array),a.state.file instanceof Array?(a.state.file.map(function(t){e.append("files",t,t.name)}),e.append("filename",a.state.fileName),e.append("sampleRate",a.state.sampleRate),e.append("bitdpth",a.state.bitdpth),e.append("countOfChannel",a.state.countOfChannel),e.append("format",a.state.outputFormat),f(t,e).then(function(e){console.log(JSON.parse(e.srcElement.response))})):alert("\u8bf7\u4f7f\u7528\u5355\u6587\u4ef6\u4e0a\u4f20\u529f\u80fd")},a.audio=o.a.createRef(),a.state={sampleRate:16e3,countOfChannel:1,bitdpth:"pcm_s16be",file:void 0,fileName:"",outputFormat:"audio/wav",fileInformation:[]},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){console.log(window.location.origin)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:E.a.container},o.a.createElement("div",{className:E.a.parameterArea},o.a.createElement("div",{className:E.a.parameterItem},o.a.createElement("label",null,"Sample Rate"),o.a.createElement("select",{onChange:function(t){e.setState({sampleRate:t.target.value})}},o.a.createElement("option",{value:"8000"},"8000hz "),o.a.createElement("option",{value:"16000"},"16000hz"),o.a.createElement("option",{value:"44100"},"44100hz"),o.a.createElement("option",{value:"48000"},"48000zh"))),o.a.createElement("div",{className:E.a.parameterItem},o.a.createElement("label",null,"Count Of Channel"),o.a.createElement("select",{onChange:function(t){e.setState({countOfChannel:t.target.value})}},o.a.createElement("option",{value:"1"},"1 "),o.a.createElement("option",{value:"2"},"2 "),o.a.createElement("option",{value:"4"},"4 "),o.a.createElement("option",{value:"5.1"},"5.1"))),o.a.createElement("div",{className:E.a.parameterItem},o.a.createElement("label",null,"bitdpth"),o.a.createElement("select",{onChange:function(t){e.setState({bitdpth:t.target.value})}},o.a.createElement("option",{value:"pcm_s16be"},"16bit"),o.a.createElement("option",{value:"pcm_u8"},"8bit"),o.a.createElement("option",{value:"pcm_s32be"},"32bit"))),o.a.createElement("div",{className:E.a.parameterItem},o.a.createElement("label",null,"Format"),o.a.createElement("select",{onChange:function(t){e.setState({outputFormat:t.target.value})}},g.map(function(e,t){return o.a.createElement("option",{value:e,key:t},e)}))),o.a.createElement("div",{className:E.a.parameterItem},o.a.createElement("div",null,"\u5355\u6587\u4ef6\u4e0a\u4f20"),o.a.createElement("input",{type:"file",onChange:function(t){return e.handlerFile(t)}}),o.a.createElement("button",{onClick:this.submit},"submit")),o.a.createElement("div",{className:E.a.parameterItem},o.a.createElement("div",null,"\u591a\u6587\u4ef6\u4e0a\u4f20"),o.a.createElement("input",{type:"file",multiple:!0,placeholder:"\u591a\u6587\u4ef6\u4e0a\u4f20",onChange:function(t){return e.handlerFile(t)}}),o.a.createElement("button",{onClick:this.submitMulitpleAudio},"submit"))),o.a.createElement("div",{className:E.a.fileInformation},this.state.fileInformation.length?this.state.fileInformation.map(function(e,t){return t>1?o.a.createElement("p",{key:t},e):""}):o.a.createElement("p",null,"\u6682\u65e0\u97f3\u9891\u6587\u4ef6\u4fe1\u606f\u6570\u636e")))}}]),t}(n.Component),O=a(10),w="isLogin",C="unlogin",N=function(e){return{type:"isLogin",status:!1}},j=Object(O.b)({isLogin:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case w:return t.status=!0,t;case C:return t.state=!1,t;default:return e}}}),y=Object(O.c)(j),_=a(15),k=a(8),S=a.n(k),A=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).isLogin=function(){},a.hidden=function(){y.dispatch({type:C})},a.login=function(){var e={expires:new Date(Date.now()+864e5)};if(""!==a.state.account&&""!==a.state.password){h("http://112.74.165.209:5000/signIn",JSON.stringify({password:a.state.password,account:a.state.account})).then(function(t){a.hidden(),a.props.cookies.set("username",JSON.parse(t.response)[0].user_name,e),a.props.cookies.set("root",JSON.parse(t.response)[0].root,e),a.props.cookies.set("userID",JSON.parse(t.response)[0].user_id,e),a.props.cookies.set("account",JSON.parse(t.response)[0].account,e)})}else alert("\u8d26\u53f7\u548c\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a")},a.state={account:"",password:"",root:NaN,user_id:NaN,user_name:""},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props.cookies.getAll())}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:S.a.container},o.a.createElement("div",{className:S.a.formArea},o.a.createElement("header",null,"Sign In"),o.a.createElement("div",{className:S.a.inputArea},o.a.createElement("input",{className:S.a.input,onChange:function(t){console.log(t.target.value),e.setState({account:t.target.value})},placeholder:"account"}),o.a.createElement("input",{className:S.a.input,type:"password",onChange:function(t){e.setState({password:t.target.value})},placeholder:"password"})),o.a.createElement("div",{className:S.a.buttonGroup},o.a.createElement("button",{onClick:this.login},"Login"),o.a.createElement("button",{onClick:this.hidden},"Cancel"))))}}]),t}(n.Component),I=_.b(A),F=a(9),R=a.n(F),J=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).showLoginPage=function(){y.dispatch({type:w})},a.state={loginPageStatus:!1},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:R.a.container},o.a.createElement("div",{className:R.a.userInfo},o.a.createElement("div",{className:R.a.header},o.a.createElement("div",null,o.a.createElement("img",null)),o.a.createElement("div",{className:R.a.loginController},o.a.createElement("button",{onClick:this.showLoginPage},"\u767b\u5f55"))),o.a.createElement("div",{className:R.a.userDesc},"test")),o.a.createElement("div",{className:R.a.listContainer}))}}]),t}(n.Component),D=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={isLogin:!1},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;y.subscribe(function(){var t=y.getState().isLogin;e.setState({isLogin:t.status})})}},{key:"render",value:function(){return o.a.createElement("div",{style:{display:"flex"}},o.a.createElement(J,null),this.state.isLogin?o.a.createElement(I,null):null,o.a.createElement(b,null))}}]),t}(n.Component),L=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(_.a,null,o.a.createElement("div",null,o.a.createElement(D,null)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(l.a,{store:y},o.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},6:function(e,t,a){e.exports={container:"_2gMcu1GDOEnrQrj57UudCk",parameterArea:"_2xOI6JUwuFfYt-Df5yHsf2",parameterItem:"_2JBQxehD-n--j5OSIVOCHA",fileInformation:"_21b1lAiTKpj2vz98ZgpuHX"}},8:function(e,t,a){e.exports={container:"_2bpTTX-dBxeg0BAjur_v_C",formArea:"_1xL-WgAwpJpHHct1Ebjss_",inputArea:"_3Za01WKEH9a5BV9ZVQoSbm",input:"J31X_-Yb9F_PLQ7sBu93",buttonGroup:"_3hND9kJc4TA6HAFGF3PMri"}},9:function(e,t,a){e.exports={container:"_3iXiG51366e7S49h9Wm0q6",userInfo:"_35RvdGyCfRrFyfJ_BdwmGC",header:"_2jPEgaM0E5VgOPWekYerxn",loginController:"_2cYuvjChPZm0dE_wAzggQx",userDesc:"_23NlnBfJqzy7E9xpQhB5o2"}}},[[24,1,2]]]);
//# sourceMappingURL=main.faa915de.chunk.js.map