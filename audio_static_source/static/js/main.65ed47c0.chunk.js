(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports={container:"_2bpTTX-dBxeg0BAjur_v_C",formArea:"_1xL-WgAwpJpHHct1Ebjss_",inputArea:"_3Za01WKEH9a5BV9ZVQoSbm",input:"J31X_-Yb9F_PLQ7sBu93",buttonGroup:"_3hND9kJc4TA6HAFGF3PMri"}},11:function(e,t,a){e.exports={container:"_3iXiG51366e7S49h9Wm0q6",userInfo:"_35RvdGyCfRrFyfJ_BdwmGC",header:"_2jPEgaM0E5VgOPWekYerxn",loginController:"_2cYuvjChPZm0dE_wAzggQx",userDesc:"_23NlnBfJqzy7E9xpQhB5o2"}},128:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(42),o=a.n(i),l=(a(54),a(47)),s=a(1),c=a(2),u=a(4),m=a(3),d=a(5),p=(a(59),a(30)),h=a.n(p),f=a(44),v=a(48);var g=function(e,t){return console.log(t),new Promise(function(a,n){var r=new XMLHttpRequest;r.open("POST",e),r.send(t),r.onreadystatechange=function(e){200===e.srcElement.status&&4===e.srcElement.readyState&&a(e)}})},b=function(e,t){return new Promise(function(a,n){var r=new XMLHttpRequest;r.open("POST",e),r.setRequestHeader("Content-type","application/json"),r.withCredentials=!0,r.send(t),r.onreadystatechange=function(e){200===e.srcElement.status&&4===e.srcElement.readyState&&a(e.srcElement)}})},E=a(7),C=a.n(E),S=a(45),y=0,w=0,O=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).renderFream=function(){Object(S.init)({ac:a.state.audioCtx,container:a.container.current,sampleRate:a.state.audioCtx.sampleRate,samplesPerPixel:4096,zoomLevels:[512,1024,2048,4096],mono:!0,waveHeight:180,state:"cursor",timescale:!0,colors:{waveOutlineColor:"grey",timeColor:"black",fadeColor:"black"},controls:{show:!1}}).load([{src:a.props.audioSrc,name:"Vocals",gain:.5,waveOutlineColor:"#83d0f2",states:{cursor:!0,fadein:!0,fadeout:!0,select:!0,shift:!0}}]),document.querySelector(".playlist-time-scale").style.height="29px"},a.initDrag=function(e){y=e.clientX-w,e.dataTransfer.effectAllowed="move"},a.getPosition=function(e){var t=e.target,n=e.pageX;console.log(n),t.offsetLeft>=a.container.current.clientWidth||0!==e.pageX&&(a.state.draged?(t.style.left=w+"px",a.setState({draged:!1})):(t.style.left=n-y+"px",w=n-y))},a.setEndPosition=function(e){console.log("end"+w),e.target.style.left=w+"px",a.setState({draged:!0})};var n=new AudioContext;return a.container=r.a.createRef(),a.audio=r.a.createRef(),a.ruler=r.a.createRef(),a.state={audioCtx:n,waveform:void 0,draged:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.state.audioCtx.createMediaElementSource(this.audio.current)}},{key:"shouldComponentUpdate",value:function(e){return e.audioSrc===this.props.audioSrc||(this.container.current.innerHTML="",console.log(this.container.current.innerHTML),!0)}},{key:"render",value:function(){return r.a.createElement("div",{style:{position:"relative",width:"100%",height:"50%"}},r.a.createElement("div",{style:{minWidth:"100%",height:"100%",maxWidth:"auto"},ref:this.container}),r.a.createElement("div",{onDragStart:this.initDrag,onDragEnd:this.setEndPosition,draggable:"true",onDrag:this.getPosition,style:{position:"absolute",width:"1px",height:"100%",top:"0px",left:"0px",backgroundColor:"red",zIndex:100},ref:this.ruler}),r.a.createElement("audio",{src:this.props.audioSrc,ref:this.audio,onLoadedMetadata:this.renderFream,crossOrigin:"anonymous"}))}}]),t}(n.Component),j=a(46),k=a.n(j),x=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).postCutData=function(){var e=a.state;a.state.canSubmit?b("http://112.74.165.209:5000/manualCut",JSON.stringify({audioId:9,start:e.startHour+":"+e.startMin+":"+e.startSec,end:e.endHour+":"+e.endMin+":"+e.endSec})):alert("Plase change end time")},a.changeTime=function(e,t){var n=e.target.value;switch((n>59||n<0)&&(alert("Time format is wrong"),n=59),n<10&&(n="0"+e.target.value),a.setState({canSubmit:!0}),t){case"startHour":a.setState({startHour:n});break;case"startMin":a.setState({startMin:n});break;case"startSec":a.setState({startSec:n});break;case"endHour":a.setState({endHour:n});break;case"endMin":a.setState({endMin:n});break;case"endSec":a.setState({endSec:n});break;default:throw"must have type of time"}},a.state={startHour:"00",startMin:"00",startSec:"00",endHour:"00",endMin:"00",endSec:"00",canSubmit:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:k.a.container},r.a.createElement("label",null,"start time"),r.a.createElement("input",{type:"number",value:this.state.startHour,maxLength:2,max:59,min:0,onChange:function(t){return e.changeTime(t,"startHour")},placeholder:"hours"}),r.a.createElement("span",null,":"),r.a.createElement("input",{type:"number",value:this.state.startMin,maxLength:2,max:59,min:0,onChange:function(t){return e.changeTime(t,"startMin")},placeholder:"minutes"}),r.a.createElement("span",null,":"),r.a.createElement("input",{type:"number",value:this.state.startSec,maxLength:2,max:59,min:0,placeholder:"seconds",onChange:function(t){return e.changeTime(t,"startSec")}}),r.a.createElement("span",null,"~"),r.a.createElement("label",null,"end time"),r.a.createElement("input",{type:"number",value:this.state.endHour,maxLength:2,max:59,min:0,placeholder:"hours",onChange:function(t){return e.changeTime(t,"endHour")}}),r.a.createElement("span",null,":"),r.a.createElement("input",{value:this.state.endMin,type:"number",maxLength:2,max:59,min:0,placeholder:"minutes",onChange:function(t){return e.changeTime(t,"endMin")}}),r.a.createElement("span",null,":"),r.a.createElement("input",{type:"number",value:this.state.endSec,maxLength:2,max:59,min:0,placeholder:"seconds",onChange:function(t){return e.changeTime(t,"endSec")}}),r.a.createElement("button",{title:"Start cut",onClick:this.postCutData,style:{backgroundColor:"rgb(0, 136, 255)",fontSize:"18px"}},"cut"),r.a.createElement("button",{title:"Add a group of split paramters ",onClick:this.props.add,style:{backgroundColor:"rgb(0, 255, 34)"}},"+"),r.a.createElement("button",{title:"Remove a group of split paramters ",onClick:function(){return e.props.remove(e.props.index)},style:{backgroundColor:"rgb(255, 0, 0)"}},"-"))}}]),t}(n.Component),A=["audio/mp3","audio/wma","audio/flac","audio/acc","audio/mmf","audio/amr","audio/m4a","audio/m4r","audio/ogg","audio/mp2","audio/wav","audio/wv"],N=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handlerFile=function(e){var t=e.target.files;if(0!==t.length)if(1===t.length){var n=t[0].type;if(!A.includes(n))return void alert("\u53ea\u80fd\u4e0a\u4f20\u97f3\u9891");a.setState({file:t[0],fileName:t[0].name,muiltConvert:"disabled"})}else{var r=Object(v.a)(t),i=r.map(function(e){return e.name});a.setState({file:r,fileName:i,muiltConvert:!1}),console.log(i)}},a.submit=function(){var e=new FormData,t=window.location.origin+"/uploadConvert";e.append("filename",a.state.fileName),e.append("file",a.state.file),e.append("sampleRate",a.state.sampleRate),e.append("bitdpth",a.state.bitdpth),e.append("countOfChannel",a.state.countOfChannel),e.append("format",a.state.outputFormat),g(t,e).then(function(e){a.setState({fileInformation:JSON.parse(e.srcElement.response)})})},a.submitMulitpleAudio=function(){var e=new FormData,t=window.location.origin+"/mulitpleAudioConvert";console.log(a.state.file instanceof Array),a.state.file instanceof Array?(a.state.file.map(function(t){e.append("files",t,t.name)}),e.append("filename",a.state.fileName),e.append("sampleRate",a.state.sampleRate),e.append("bitdpth",a.state.bitdpth),e.append("countOfChannel",a.state.countOfChannel),e.append("format",a.state.outputFormat),g(t,e).then(function(e){a.setState({fileInformation:JSON.parse(e.srcElement.response)})})):alert("\u8bf7\u4f7f\u7528\u5355\u6587\u4ef6\u4e0a\u4f20\u529f\u80fd")},a.removeParams=function(){var e=Object(f.a)(h.a.mark(function e(t){var n,r;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.state.splitArray.concat(),e.next=3,a.state.splitArray.map(function(e,a){if(t!==e.index)return e;n.slice(a,a+1)});case 3:r=e.sent,a.setState({splitArray:r.filter(function(e){return void 0!==e})});case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.addNewSplitParam=function(){var e=a.state.splitArray.concat(),t=Date.now();e.push({element:r.a.createElement(x,{index:t,key:t,add:a.addNewSplitParam,remove:a.removeParams}),index:t}),a.setState({splitArray:e})},a.parameterAreaStatus=function(){a.state.hiddenParamArea?a.setState({hiddenParamArea:!1}):a.setState({hiddenParamArea:!0})},a.audio=r.a.createRef(),a.muiltFileButton=r.a.createRef(),a.state={sampleRate:16e3,countOfChannel:1,bitdpth:"pcm_s16be",file:void 0,fileName:"",outputFormat:"audio/wav",fileInformation:[],audioSrc:"http://112.74.165.209:3030/audio_test.mp3",splitArray:[],muiltConvert:"disabled",autoSplit:!0,hiddenParamArea:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.addNewSplitParam()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:C.a.container},r.a.createElement("div",{style:this.state.hiddenParamArea?{display:"none"}:{},className:C.a.parameterArea},r.a.createElement("header",null,"\u76ee\u6807\u6587\u4ef6\u53c2\u6570\u8bbe\u5b9a\uff1a"),r.a.createElement("div",{className:C.a.parameterItem},r.a.createElement("label",null,"Sample Rate"),r.a.createElement("select",{onChange:function(t){e.setState({sampleRate:t.target.value})}},r.a.createElement("option",{value:"8000"},"8000hz "),r.a.createElement("option",{value:"16000"},"16000hz"),r.a.createElement("option",{value:"44100"},"44100hz"),r.a.createElement("option",{value:"48000"},"48000zh"))),r.a.createElement("div",{className:C.a.parameterItem},r.a.createElement("label",null,"Count Of Channel"),r.a.createElement("select",{onChange:function(t){e.setState({countOfChannel:t.target.value})}},r.a.createElement("option",{value:"1"},"1 "),r.a.createElement("option",{value:"2"},"2 "),r.a.createElement("option",{value:"4"},"4 "),r.a.createElement("option",{value:"5.1"},"5.1"))),r.a.createElement("div",{className:C.a.parameterItem},r.a.createElement("label",null,"bitdpth"),r.a.createElement("select",{onChange:function(t){e.setState({bitdpth:t.target.value})}},r.a.createElement("option",{value:"pcm_s16be"},"16bit"),r.a.createElement("option",{value:"pcm_u8"},"8bit"),r.a.createElement("option",{value:"pcm_s32be"},"32bit"))),r.a.createElement("div",{className:C.a.parameterItem},r.a.createElement("label",null,"Format"),r.a.createElement("select",{onChange:function(t){e.setState({outputFormat:t.target.value})}},A.map(function(e,t){return r.a.createElement("option",{value:e,key:t},e)})))),r.a.createElement("div",{className:C.a.menu},r.a.createElement("div",null,"\u9009\u62e9\u6587\u4ef6",r.a.createElement("input",{type:"file",multiple:!0,onChange:function(t){return e.handlerFile(t)}})),r.a.createElement("button",{style:{backgroundColor:this.state.muiltConvert?"":"rgba(59, 136, 255,.8)"},disabled:"disabled"!==this.state.muiltConvert&&"disabled",onClick:this.submit},"\u5355\u6587\u4ef6\u8f6c\u6362"),r.a.createElement("button",{style:{backgroundColor:this.state.muiltConvert?"rgba(59, 136, 255,.8)":""},disabled:this.state.muiltConvert,onClick:this.submitMulitpleAudio},"\u591a\u6587\u4ef6\u8f6c\u6362"),r.a.createElement("button",{onClick:function(){return e.setState({autoSplit:!0})}},"\u81ea\u52a8\u5207\u5272"),r.a.createElement("button",{onClick:function(){return e.setState({autoSplit:!1})}},"\u624b\u52a8\u5207\u5272"),r.a.createElement("button",{onClick:this.parameterAreaStatus},this.state.hiddenParamArea?"\u5c55\u5f00\u53c2\u6570\u8bbe\u7f6e":"\u6536\u8d77\u53c2\u6570\u8bbe\u7f6e")),r.a.createElement("div",{className:C.a.fileInformation},this.state.autoSplit?r.a.createElement("div",null,this.state.fileInformation instanceof Array?this.state.fileInformation.map(function(e,t){return t>1?r.a.createElement("p",{key:t},e):""}):r.a.createElement("p",null,this.state.fileInformation.descripiton)):r.a.createElement("div",{style:{height:"100%",width:"100%"}},r.a.createElement(O,{audioSrc:this.state.audioSrc}),r.a.createElement("div",{className:C.a.splitParamsArea},this.state.splitArray.map(function(e){return e.element})))))}}]),t}(n.Component),P=a(13),_="isLogin",L="unlogin",M=function(e){return{type:"isLogin",status:!1}},H=Object(P.b)({isLogin:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case _:return t.status=!0,t;case L:return t.state=!1,t;default:return e}}}),I=Object(P.c)(H),D=a(23),R=a(10),T=a.n(R),F=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).isLogin=function(){},a.hidden=function(){I.dispatch({type:L})},a.login=function(){new Date(Date.now()+864e5);if(""!==a.state.account&&""!==a.state.password){b("http://112.74.165.209:5000/signIn",JSON.stringify({password:a.state.password,account:a.state.account})).then(function(e){a.hidden()})}else alert("\u8d26\u53f7\u548c\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a")},a.state={account:"",password:"",root:NaN,user_id:NaN,user_name:""},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props.cookies.getAll())}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:T.a.container},r.a.createElement("div",{className:T.a.formArea},r.a.createElement("header",null,"Sign In"),r.a.createElement("div",{className:T.a.inputArea},r.a.createElement("input",{className:T.a.input,onChange:function(t){console.log(t.target.value),e.setState({account:t.target.value})},placeholder:"account"}),r.a.createElement("input",{className:T.a.input,type:"password",onChange:function(t){e.setState({password:t.target.value})},placeholder:"password"})),r.a.createElement("div",{className:T.a.buttonGroup},r.a.createElement("button",{onClick:this.login},"Login"),r.a.createElement("button",{onClick:this.hidden},"Cancel"))))}}]),t}(n.Component),J=D.b(F),z=a(11),B=a.n(z),W=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).showLoginPage=function(){I.dispatch({type:_})},a.state={loginPageStatus:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:B.a.container},r.a.createElement("div",{className:B.a.userInfo},r.a.createElement("div",{className:B.a.header},r.a.createElement("div",null,r.a.createElement("img",null)),r.a.createElement("div",{className:B.a.loginController},r.a.createElement("button",{onClick:this.showLoginPage},"\u767b\u5f55"))),r.a.createElement("div",{className:B.a.userDesc},"test")),r.a.createElement("div",{className:B.a.listContainer}))}}]),t}(n.Component),X=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={isLogin:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;I.subscribe(function(){var t=I.getState().isLogin;e.setState({isLogin:t.status})})}},{key:"render",value:function(){return r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(W,null),this.state.isLogin?r.a.createElement(J,null):null,r.a.createElement(N,null))}}]),t}(n.Component),Q=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(D.a,null,r.a.createElement("div",null,r.a.createElement(X,null)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(l.a,{store:I},r.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},46:function(e,t,a){e.exports={container:"_3Rn5ZzaT7vtl8s-S7YCVjY"}},49:function(e,t,a){e.exports=a(128)},54:function(e,t,a){},59:function(e,t,a){e.exports={"playlist-time-scale":"_1uiCRAZLLbNiIPnuAjUSIT"}},63:function(e,t){},7:function(e,t,a){e.exports={container:"_2gMcu1GDOEnrQrj57UudCk",parameterArea:"_2xOI6JUwuFfYt-Df5yHsf2",parameterItem:"_2JBQxehD-n--j5OSIVOCHA",menu:"obxUaMUALO_qfzoscZCwc",fileInformation:"_21b1lAiTKpj2vz98ZgpuHX",splitParamsArea:"vQ6OU02pBnQvnWbsu2eXf"}}},[[49,1,2]]]);
//# sourceMappingURL=main.65ed47c0.chunk.js.map