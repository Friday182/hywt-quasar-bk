(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{0:function(t,e,n){t.exports=n("2f39")},"2f39":function(t,e,n){"use strict";n.r(e);var a=n("967e"),o=n.n(a),r=(n("a481"),n("96cf"),n("fa84")),s=n.n(r),i=(n("5c7d"),n("35fc"),n("7d6e"),n("e54f"),n("62f2"),n("7e6d"),n("2b0e")),u=n("b05d"),c=n("cb32"),l=n("58a8"),d=n("9c40"),f=n("6a67"),p=n("880c"),m=n("32a7"),v=n("62cd"),b=n("f09f"),g=n("a370"),h=n("4b7e"),Q=n("b047"),S=n("8f8e"),w=n("8169"),T=n("24e8"),k=n("9404"),I=n("d66b"),M=n("7ff0"),x=n("0378"),y=n("e359"),L=n("0016"),D=n("66e5"),A=n("4074"),C=n("0170"),q=n("27f9"),P=n("068f"),O=n("1c1c"),E=n("4d5a"),U=n("6b1d"),N=n("4e73"),R=n("9f0a"),j=n("09e3"),V=n("42a1"),J=n("9989"),B=n("de5e"),F=n("3786"),H=n("7867"),_=n("4983"),$=n("eb85"),G=n("ddd8"),z=n("2c91"),K=n("8562"),W=n("9149"),X=n("f531"),Y=n("87fe"),Z=n("b19c"),tt=n("9564"),et=n("7f41"),nt=n("65c6"),at=n("6ac5"),ot=n("429b"),rt=n("7460"),st=n("adad"),it=n("823b"),ut=n("eaac"),ct=n("357e"),lt=n("bd08"),dt=n("db86"),ft=n("05c0"),pt=n("714f"),mt=n("7f67"),vt=n("b12a"),bt=n("436b"),gt=n("18d6"),ht=n("2a19"),Qt=n("a639");i["default"].use(u["a"],{config:{},components:{QAvatar:c["a"],QBadge:l["a"],QBtn:d["a"],QBtnToggle:f["a"],QCarousel:p["a"],QCarouselControl:m["a"],QCarouselSlide:v["a"],QCard:b["a"],QCardSection:g["a"],QCardActions:h["a"],QChip:Q["a"],QCheckbox:S["a"],QChatMessage:w["a"],QDialog:T["a"],QDrawer:k["a"],QEditor:I["a"],QFooter:M["a"],QForm:x["a"],QHeader:y["a"],QIcon:L["a"],QItem:D["a"],QItemSection:A["a"],QItemLabel:C["a"],QInput:q["a"],QImg:P["a"],QList:O["a"],QLayout:E["a"],QLinearProgress:U["a"],QMenu:N["a"],QOptionGroup:R["a"],QPageContainer:j["a"],QPopupEdit:V["a"],QPage:J["a"],QPageSticky:B["a"],QRadio:F["a"],QRouteTab:H["a"],QScrollArea:_["a"],QSeparator:$["a"],QSelect:G["a"],QSpace:z["a"],QSplitter:K["a"],QSpinnerHourglass:W["a"],QStepper:X["a"],QStep:Y["a"],QStepperNavigation:Z["a"],QToggle:tt["a"],QTree:et["a"],QToolbar:nt["a"],QToolbarTitle:at["a"],QTabs:ot["a"],QTab:rt["a"],QTabPanels:st["a"],QTabPanel:it["a"],QTable:ut["a"],QTh:ct["a"],QTr:lt["a"],QTd:dt["a"],QTooltip:ft["a"]},directives:{Ripple:pt["a"],ClosePopup:mt["a"]},plugins:{AppFullscreen:vt["a"],Dialog:bt["a"],LocalStorage:gt["a"],Notify:ht["a"],SessionStorage:Qt["a"]}});var St=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},wt=[],Tt={name:"App",created:function(){}},kt=Tt,It=n("2877"),Mt=Object(It["a"])(kt,St,wt,!1,null,null,null),xt=Mt.exports,yt=n("2f62");function Lt(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{key:"store"};return function(e){var n=JSON.parse(sessionStorage.getItem(t.key));n&&e.replaceState(n),n=null,e.subscribe((function(e,n){sessionStorage.setItem(t.key,JSON.stringify(n))}))}}n("f751");var Dt={student:{id:0,mentorId:0,name:"",age:0,city:"",country:"",school:"",stickers:0,stars:0,membershipActive:!1,membershipDate:"",expireDate:"",lastLoginDate:"",levels:"",assignment:[],stickerLog:[],contacts:[],aiEnabled:!1}},At={setStudent:function(t,e){Object.assign(t.student,e)},setAssignmentDone:function(t,e){for(var n=0;n<t.student.assignment.length;n++)t.student.assignment[n]["k_task"]===e&&(t.student.assignment[n]["k_done"]=!0)}},Ct={updateStudent:function(t,e){var n=t.commit;n("setStudent",e)},updateAssignmentDone:function(t,e){var n=t.commit;n("setAssignmentDone",e)}},qt={currentStudent:function(t){return t.student}},Pt={namespaced:!0,state:Dt,mutations:At,actions:Ct,getters:qt},Ot={mentor:{id:"",name:"",mentorEmail:"",contacts:[],students:[]}},Et={setMentor:function(t,e){Object.assign(t.mentor,e)},mentorAddStudent:function(t,e){t.mentor.students.push(e)},mentorDelStudent:function(t,e){for(var n=0;n<t.mentor.students.length;n++)t.mentor.students[n].id===e&&t.mentor.students.splice(n,1)}},Ut={},Nt={currentMentor:function(t){return t.mentor}},Rt={namespaced:!0,state:Ot,mutations:Et,actions:Ut,getters:Nt},jt={currentUser:{id:0,name:"",contacts:[],mentorEmail:"",sessionLogin:""}},Vt={updateUser:function(t,e){Object.assign(t.currentUser,e)}},Jt={updateUser:function(t,e){var n=t.commit;n("updateUser",e)}},Bt={currentUser:function(t){return t.currentUser}},Ft={namespaced:!0,state:jt,mutations:Vt,actions:Jt,getters:Bt},Ht={localMentors:[]},_t={updateMentors:function(t,e){t.localMentors=e},removeMentor:function(t,e){t.localMentors[e]&&t.localMentors.splice(e,1)},addMentor:function(t,e){t.localMentors.push(e)},updateMentorDate:function(t,e){t.localMentors[e]&&(t.localMentors[e].lastSigninDate=Date())}},$t={updateLocalMentors:function(t,e){var n=t.commit;n("updateMentors",e)},removeLocalMentor:function(t,e){var n=t.commit;n("removeMentor",e)},addLocalMentor:function(t,e){var n=t.commit;n("addMentor",e)},updateLocalMentorDate:function(t,e){var n=t.commit;n("updateMentorDate",e)}},Gt={localMentors:function(t){return t.localMentors},Mentor:function(t){return function(e){return t.localMentors[e]?t.localMentors[e]:""}}},zt={namespaced:!0,state:Ht,mutations:_t,actions:$t,getters:Gt},Kt={localStudents:[]},Wt={updateStudents:function(t,e){t.localStudents=e},removeStudent:function(t,e){t.localStudents[e]&&t.localStudents.splice(e,1)},addStudent:function(t,e){t.localStudents.push(e)},updateStudentDate:function(t,e,n){t.localStudents[e]&&(t.localStudents[e].lastSigninDate=Date())}},Xt={updateLocalStudents:function(t,e){var n=t.commit;n("updateStudents",e)},removeLocalStudent:function(t,e){var n=t.commit;n("removeStudent",e)},addLocalStudent:function(t,e){var n=t.commit;n("addStudent",e)},updateLocalStudentDate:function(t,e){var n=t.commit;n("updateStudentDate",e)}},Yt={localStudents:function(t){return t.localStudents}},Zt={namespaced:!0,state:Kt,mutations:Wt,actions:Xt,getters:Yt},te=function(){return{questions:[{task:"",standardSec:0,answerType:"",questionType:"",questionText:"",chartType:"",option1:"",option2:"",option3:"",option4:"",answer1:"",answer2:"",answer3:"",answer4:"",answerText:"",helper:"",img1:"",img2:"",tag1:"",tag2:"",tip:""}]}},ee=te(),ne={setAllQuestions:function(t,e){t.questions=Object.assign([],e)},resetState:function(t){({questions:[{task:"",standardSec:0,answerType:"",questionType:"",questionText:"",chartType:"",option1:"",option2:"",option3:"",option4:"",answer1:"",answer2:"",answer3:"",answer4:"",answerText:"",helper:"",img1:"",img2:"",tag1:"",tag2:"",tip:""}]})}},ae={setQuestions:function(t,e){var n=t.commit;n("setAllQuestions",e)},clearQuestions:function(t){var e=t.commit;e("resetState")}},oe={getQuestions:function(t){return t.questions}},re={namespaced:!0,state:ee,mutations:ne,actions:ae,getters:oe},se=(n("7f7f"),{currentInfo:{userName:"",userRole:"",tabs:[{name:"1-1",title:"访客信息"}],activeTab:"1-1"}}),ie={updateInfo:function(t,e){Object.assign(t.currentInfo,e)},addTab:function(t,e){var n=!1;t.currentInfo.tabs.forEach((function(t,a){t.name===e.name&&(n=!0)})),!1===n&&t.currentInfo.tabs.push(e),t.currentInfo.activeTab=e.name},doRemoveTab:function(t,e){console.log("removetab - ",e.name);for(var n=0;n<t.currentInfo.tabs.length;n++)t.currentInfo.tabs[n].name===e.name&&(t.currentInfo.tabs.splice(n,1),console.log("new tabs",JSON.stringify(t.currentInfo.tabs)),n>0?t.currentInfo.activeTab=t.currentInfo.tabs[n-1].name:t.currentInfo.tabs.length>0&&(t.currentInfo.activeTab=t.currentInfo.tabs[0].name))},setUserRole:function(t,e){t.currentInfo.userRole=e},setActiveTab:function(t,e){t.currentInfo.activeTab=e}},ue={updateInfo:function(t,e){var n=t.commit;n("updateInfo",e)},removeTab:function(t,e){var n=t.commit;n("doRemoveTab",e)}},ce={currentInfo:function(t){return t.currentInfo}},le={namespaced:!0,state:se,mutations:ie,actions:ue,getters:ce},de={visitor:{visitorLog:[{name:"马大帅",gender:"男",ethnic:"汉",id:"12345678912345",dob:"20010101",block:"高大上小区",enter:"进入",deviceid:"device-123",datetime:"2020-01-15 16:21:50"}]}},fe={addVisitor:function(t,e){var n=!0;!0===n&&t.visitor.visitorLog.push(e)},removeVisitor:function(t,e){for(var n=0;n<t.visitor.visitorLog.length;n++)t.visitor.visitorLog[n].datetime===e.datetime&&t.visitor.visitorLog[n].deviceid===e.deviceid&&(t.visitor.visitorLog.splice(n,1),console.log("Number of visitors - ",t.visitor.visitorLog.length))},setFilter:function(t,e){}},pe={},me={visitor:function(t){return t.visitor}},ve={namespaced:!0,state:de,mutations:fe,actions:pe,getters:me};i["default"].use(yt["a"]);var be=Lt(),ge=function(){var t=new yt["a"].Store({modules:{student:Pt,mentor:Rt,currentUser:Ft,localMentors:zt,localStudents:Zt,questions:re,currentInfo:le,visitor:ve},plugins:[be],strict:!1});return t},he=n("8c4f"),Qe=[{path:"/",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"f241"))},children:[{path:"",component:function(){return n.e(6).then(n.bind(null,"8b24"))}},{path:"/Hywt",component:function(){return n.e(4).then(n.bind(null,"33e8"))}},{path:"*",component:function(){return n.e(1).then(n.bind(null,"e51e"))}}]}];Qe.push({path:"*",component:function(){return n.e(1).then(n.bind(null,"e51e"))}});var Se=Qe;i["default"].use(he["a"]);var we=function(){var t=new he["a"]({scrollBehavior:function(){return{x:0,y:0}},routes:Se,mode:"hash",base:""});return t},Te=function(){return ke.apply(this,arguments)};function ke(){return ke=s()(o.a.mark((function t(){var e,n,a;return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("function"!==typeof ge){t.next=6;break}return t.next=3,ge({Vue:i["default"]});case 3:t.t0=t.sent,t.next=7;break;case 6:t.t0=ge;case 7:if(e=t.t0,"function"!==typeof we){t.next=14;break}return t.next=11,we({Vue:i["default"],store:e});case 11:t.t1=t.sent,t.next=15;break;case 14:t.t1=we;case 15:return n=t.t1,e.$router=n,a={el:"#q-app",router:n,store:e,render:function(t){return t(xt)}},t.abrupt("return",{app:a,store:e,router:n});case 19:case"end":return t.stop()}}),t)}))),ke.apply(this,arguments)}var Ie=n("a925"),Me={failed:"Action failed",success:"Action was successful"},xe={"en-us":Me};i["default"].use(Ie["a"]);var ye=new Ie["a"]({locale:"en-us",fallbackLocale:"en-us",messages:xe}),Le=function(t){var e=t.app;e.i18n=ye},De=n("bc3a"),Ae=n.n(De),Ce=function(){var t=s()(o.a.mark((function t(e){var n;return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.Vue,n.prototype.$axios=Ae.a;case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),qe=n("522d"),Pe=n("74ca"),Oe=n("478e"),Ee=n("2bf2"),Ue=Object(Oe["a"])({uri:"http://localhost:8000/graphql"}),Ne=new Ee["a"],Re=new Pe["a"]({link:Ue,cache:Ne,connectToDevTools:!0,request:function(t){t.setContext({headers:{authorization:sessionStorage.getItem("token")||null}})}}),je=new qe["a"]({defaultClient:Re,errorHandler:function(t){var e=t.graphQLErrors,n=t.networkError;e&&e.map((function(t){var e=t.message,n=t.locations,a=t.path;return console.log("[GraphQL error]: Message: ".concat(e,", Location: ").concat(n,", Path: ").concat(a))})),n&&console.log("[Network error]: ".concat(n))}}),Ve=function(t){var e=t.app,n=t.Vue;n.use(qe["a"]),e.apolloProvider=je},Je=n("9e2f"),Be=n.n(Je);n("0fae");function Fe(){return He.apply(this,arguments)}function He(){return He=s()(o.a.mark((function t(){var e,n,a,r,s,u,c,l,d;return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Te();case 2:e=t.sent,n=e.app,a=e.store,r=e.router,s=!0,u=function(t){s=!1,window.location.href=t},c=window.location.href.replace(window.location.origin,""),l=[Le,Ce,Ve,void 0],d=0;case 11:if(!(!0===s&&d<l.length)){t.next=29;break}if("function"===typeof l[d]){t.next=14;break}return t.abrupt("continue",26);case 14:return t.prev=14,t.next=17,l[d]({app:n,router:r,store:a,Vue:i["default"],ssrContext:null,redirect:u,urlPath:c});case 17:t.next=26;break;case 19:if(t.prev=19,t.t0=t["catch"](14),!t.t0||!t.t0.url){t.next=24;break}return window.location.href=t.t0.url,t.abrupt("return");case 24:return console.error("[Quasar] boot error:",t.t0),t.abrupt("return");case 26:d++,t.next=11;break;case 29:if(!1!==s){t.next=31;break}return t.abrupt("return");case 31:new i["default"](n);case 32:case"end":return t.stop()}}),t,null,[[14,19]])}))),He.apply(this,arguments)}i["default"].use(Be.a),Fe()},"7e6d":function(t,e,n){}},[[0,3,0]]]);