(this.webpackJsonpdtec=this.webpackJsonpdtec||[]).push([[8],{266:function(e,t,a){},267:function(e,t,a){},268:function(e,t,a){"use strict";var n=a(269),c={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var a,r,i,l,o,s,u=!1;t||(t={}),a=t.debug||!1;try{if(i=n(),l=document.createRange(),o=document.getSelection(),(s=document.createElement("span")).textContent=e,s.style.all="unset",s.style.position="fixed",s.style.top=0,s.style.clip="rect(0, 0, 0, 0)",s.style.whiteSpace="pre",s.style.webkitUserSelect="text",s.style.MozUserSelect="text",s.style.msUserSelect="text",s.style.userSelect="text",s.addEventListener("copy",(function(n){if(n.stopPropagation(),t.format)if(n.preventDefault(),"undefined"===typeof n.clipboardData){a&&console.warn("unable to use e.clipboardData"),a&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var r=c[t.format]||c.default;window.clipboardData.setData(r,e)}else n.clipboardData.clearData(),n.clipboardData.setData(t.format,e);t.onCopy&&(n.preventDefault(),t.onCopy(n.clipboardData))})),document.body.appendChild(s),l.selectNodeContents(s),o.addRange(l),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");u=!0}catch(m){a&&console.error("unable to copy using execCommand: ",m),a&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),u=!0}catch(m){a&&console.error("unable to copy using clipboardData: ",m),a&&console.error("falling back to prompt"),r=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(r,e)}}finally{o&&("function"==typeof o.removeRange?o.removeRange(l):o.removeAllRanges()),s&&document.body.removeChild(s),i()}return u}},269:function(e,t){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,a=[],n=0;n<e.rangeCount;n++)a.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||a.forEach((function(t){e.addRange(t)})),t&&t.focus()}}},270:function(e,t,a){},394:function(e,t,a){"use strict";a.r(t);var n=a(12),c=a(13),r=a(15),i=a(14),l=a(16),o=a(0),s=a.n(o),u=(a(266),a(50)),m=a(69),d=a(96),p=(a(267),a(268)),f=a.n(p),E=a(396),h=function(e){function t(){var e,a;Object(n.a)(this,t);for(var c=arguments.length,l=new Array(c),o=0;o<c;o++)l[o]=arguments[o];return(a=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(l)))).onLikeArticle=function(){a.props.onLike()},a.onCollectArticle=function(){},a.onCopyLink=function(){var e=window.location.href;f()(e)?E.a.success("\u590d\u5236\u6210\u529f,\u5feb\u53bb\u5206\u4eab\u5427\uff01"):E.a.error("\u590d\u5236\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01")},a}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"suspended-panel"},s.a.createElement("div",{className:"suspended-item",onClick:this.onLikeArticle},s.a.createElement("i",{className:"iconfont icon-like"})),s.a.createElement("div",{className:"suspended-item",onClick:this.onCollectArticle},s.a.createElement("i",{className:"iconfont icon-collection"})),s.a.createElement("div",{className:"suspended-item",onClick:this.onCopyLink},s.a.createElement("i",{className:"iconfont icon-share"})))}}]),t}(s.a.Component),b=(a(270),a(18)),v=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.userData;return s.a.createElement("section",{className:"author-info"},s.a.createElement("div",{className:"title"},"\u5173\u4e8e\u4f5c\u8005"),s.a.createElement("div",{className:"info-content"},s.a.createElement("div",{className:"base-info"},s.a.createElement("div",{className:"avatar"},s.a.createElement("p",{className:"avatar-img"})),s.a.createElement("div",{className:"info"},s.a.createElement(b.b,{to:"/user/".concat(e.ids)},e.username),s.a.createElement("p",{className:"motto alone-ellipsis"},e.motto||"\u4f5c\u8005\u6682\u65f6\u6ca1\u6709\u4e2a\u6027\u7b7e\u540d...")))),s.a.createElement("div",{className:"about-author"},s.a.createElement("p",null,s.a.createElement("i",{className:"iconfont icon-like"})," \u6587\u7ae0\u83b7\u8d5e 365"),s.a.createElement("p",null,s.a.createElement("i",{className:"iconfont icon-view"})," \u6587\u7ae0\u88ab\u9605\u8bfb 15505")))}}]),t}(s.a.Component),y=a(41);function k(e){return y.a.post("/article/like",e)}var w=a(78);a.n(w).a.mock("".concat("http://127.0.0.1:3000","/article/details?ids=article_1fxfidxtcj"),"get",{msg:"\u6587\u7ae0\u8be6\u60c5",state:0,articleData:{ids:"article_1fxfidxtcj",views:2,likes:0,_id:"5e6a616e7aa1942d94edc531",title:"\u7b2c\u4e09\u7bc7\u6d4b\u8bd5\u6587\u7ae0",des:"\u6d4b\u8bd5",content:"<h2>\u5566\u5566\u5566\u5566\u963f\u8054</h2><p><br></p><p>\u6d4b\u8bd5</p>",typeId:1003,typeName:"\u7f51\u7edc\u5b89\u5168",tag:"\u6d4b\u8bd53",userIds:"user_lheyk2ocqxe",date:"2020-03-12T16:21:02.478Z",__v:0},userData:{ids:"user_lheyk2ocqxe",username:"dtec_9h4mjf4wb87",sex:"\u4fdd\u5bc6",motto:"",profession:"",company:"",_id:"5e675a60ea0bf43770597926",tel:"13628032230",createdDate:"2020-03-10T09:14:08.114Z",__v:0}});var g=[{id:"sakk21lks",title:"\u6587\u7ae01"},{id:"asfcadqwv",title:"\u6587\u7ae02"},{id:"laskdoi2k",title:"\u6587\u7ae03"},{id:"c9djqk3j3",title:"\u6587\u7ae04"},{id:"as39kjjid",title:"\u6587\u7ae05"},{id:"sakalo1ks",title:"\u6587\u7ae06"},{id:"aalao21la",title:"\u6587\u7ae07"}],N=function(e){function t(){var e,a;Object(n.a)(this,t);for(var c=arguments.length,l=new Array(c),o=0;o<c;o++)l[o]=arguments[o];return(a=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(l)))).state={articleData:{title:"",des:"",content:"",date:"",views:0},userData:{username:"",ids:"",motto:""}},a.onLikesArticle=function(){k(a.props.match.params).then((function(e){e.state?E.a.error(e.msg,1.5):E.a.success(e.msg,1.5)}))},a}return Object(l.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.scrollTo(0,0),function(e){return y.a.get("/article/details",e)}(this.props.match.params).then((function(t){404===t.state?e.props.history.push("/exception/404"):e.setState({articleData:t.articleData,userData:t.userData})}))}},{key:"render",value:function(){var e=this.state,t=e.articleData,a=e.userData;return s.a.createElement(s.a.Fragment,null,s.a.createElement(u.a,null),s.a.createElement("main",{className:"container article-details"},s.a.createElement("article",null,s.a.createElement("h1",null,t.title),s.a.createElement("div",{className:"article-info"},s.a.createElement("span",null,"\u53d1\u5e03\u4e8e ",t.date),s.a.createElement("span",null,"\u9605\u8bfb ",t.views)),s.a.createElement("div",{className:"article",dangerouslySetInnerHTML:{__html:t.content}}),s.a.createElement(h,{onLike:this.onLikesArticle})),s.a.createElement("aside",null,s.a.createElement(v,{userData:a}),s.a.createElement(d.a,{title:"\u672c\u5468\u6392\u884c",list:g}),s.a.createElement(d.a,{title:"\u731c\u4f60\u559c\u6b22",list:g}))),s.a.createElement(m.a,null))}}]),t}(s.a.Component);t.default=N},41:function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var n=a(8),c=a.n(n),r=a(12),i=a(13),l=a(72),o=a.n(l),s=a(73),u=a.n(s),m=o.a.create({baseURL:"http://127.0.0.1:8000",timeout:5e3,withCredentials:!0});m.interceptors.request.use((function(e){return e.headers["Content-Type"]="application/x-www-form-urlencoded",e}),(function(e){return console.warn(e),Promise.reject(e)})),m.interceptors.response.use((function(e){return e.data}),(function(e){return Promise.reject(e)}));var d=function(){function e(){Object(r.a)(this,e)}return Object(i.a)(e,null,[{key:"get",value:function(e,t){return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.awrap(m.get(e,{params:t}));case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}}))}},{key:"post",value:function(e,t){return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.awrap(m.post(e,u.a.stringify(t)));case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}}))}},{key:"filePost",value:function(e,t){return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.awrap(m.post(e,t));case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}}))}}]),e}()},50:function(e,t,a){"use strict";var n=a(12),c=a(13),r=a(15),i=a(14),l=a(16),o=a(0),s=a.n(o),u=a(18),m=(a(51),a(52)),d=[{title:"\u9996\u9875",link:"/"},{title:"\u4e13\u9898",link:"/a"},{title:"\u9762\u8bd5",link:"/b"},{title:"\u5c0f\u518c",link:"/c"},{title:"APP",link:"/d"},{title:"GitHub",link:"/e"}],p=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("header",{className:"header"},s.a.createElement("div",{className:"container"},s.a.createElement("img",{src:m,alt:"",className:"logo"}),s.a.createElement("ul",{className:"nav-list"},d.map((function(e){return s.a.createElement("li",{key:e.title},s.a.createElement(u.b,{to:e.link},e.title))})))))}}]),t}(s.a.Component);t.a=p},51:function(e,t,a){},52:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAAAVCAYAAAA0Nm5bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjBBRTE0MTM0RUM1MTFFMkFGOTM4RDRGNDg3QkVGOEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjBBRTE0MTQ0RUM1MTFFMkFGOTM4RDRGNDg3QkVGOEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MEFFMTQxMTRFQzUxMUUyQUY5MzhENEY0ODdCRUY4RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MEFFMTQxMjRFQzUxMUUyQUY5MzhENEY0ODdCRUY4RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpT2C0UAAASVSURBVHja7BqLVeMwLPBuAa/gFXIj5EYII/hGCCOEEXIjpCOkI7gjuCOYEUJ6T7kTQvKvBVqI3tOjxJKjn2VZzt08z9UG7woK/j5vprgM3C9YL3iKXBeg64DGA/0tg4voemnwgJ8Fq+9iOC3Y3krQrqAFmpMiPfx+WPBw40GrA7p+Z2gWHJGvbyJoOahBkRP8XnC/+fbLQ3ftu+l9JCNN8PtxwT+bP78E3DH4yGTdmwtaBQGrIFifEurDdXtxiTXSaVEMiN7B/5qhm9ECojDAeCPsFCFeSffTFmmB18L/KmFHclC/TomO5/hMQu1dImMInjLKhxm9c5V1QhjyMZZVC3p1SK+Vvnul2zzP9fwfKsAJ/h/RMw5XGOCvW9DOr6Fl+JoFPaLBPB7GMb2DMc3M5ZEMdKyHsY6RmdOnRu+yoL9FctWCLlh2i+YYAu9rA3wT0utcGTviD05vSkPtbGYZBmH+mviYg1bQiwO36sYF7YgMUiUGrWUCrUcOwM8VUqYTjOeBjs5lhIDxgFS+1Zl1QtAqZLRWCDCXoUtDFiMe0xE+J/CVyNjNeWAYWSlYsrC4oB3Rswnk6NBz7GNFdLaI3pLnb4K2F4ImFLReGFOC4ftAZqzQyu2Z4JwE2tUxDWNsJyw0Kdv0kWxkmGdDwAa+wAYS3zkypkDP+H3gsh2SU8q0GBSzECQZh0BM/NWNBu0cYa4SAyA0HtrqQ8HmGQN4CGTFyGwEB0syW8HAdBFOTBmlM21gz+TLkTE301oyv42UepUQtI4Eew8+0QHbS7rhBDj9IIXwAXqx64HgmTlZnns7pGHeo0BzhHEN9OtN0g5kauB3A+M7oDmQw0+L+KrEQ9Ha8on1eTFPSJfQu0r5cmXkugfSIUvBOww6nOH21y5D1kfULtVE5iOM75h3+KgNSKbVTBFtLphpVaSkCGXVhhwOB0LTofo19B6pVkwFl1gehd5XwlcqY8pBDJcsnI6pfp6Z+nwMHMgMwx8FqXtAT8XNFZQHFanzPNkGNSoH2kCJI8nsI1tvFdjWPqo8KJGxJGilbb7NDFra9TCopMI+toHOxRsMXS7s4RasgjR/qVuSXWSL6wJb0R7RKEJzhBKhLSgNMK3J4NlHdMHlDcdnAnyXkjH1CtcQW1JZK+iv1oK/KBjSOz5Az/8XU8ZgP42C/ibWp+VWoGdWQUmmLWl50baOlHE60vtMKT0U04biMoph+ta4HfQRLa8SGXMPYnSHqgtaXriF5WG+tYU1kVYYjQnK06O5OqlPy+EonCxLgrbkcoGr66ywBc2RixHcJ3TEQVguB7TYOWPmJUHp5cKQaLsUGXOD1jHJIPdyQTOXTBToRUjKZcSbPq2L1BLcLZmL8IXGNVlFa1skVtOMkQOijdThGunimHkUyGFJYDSRem0E2rXWbhNswPE1CQkhR8YuI1iHQL3ckAsDKxykuMxPE5TkZ8VcKHiY45+f7raPwK/280kHdeDPzRx5nyZu8H4wCh/VKPjIJPcg+X0+U9sy7aeAgq+XNJzU8YVKjQL2YTPVFrTXBh1k2xoC+YhaQ9sH9wK8CDAAxVF6p95oy2sAAAAASUVORK5CYII="},69:function(e,t,a){"use strict";var n=a(12),c=a(13),r=a(15),i=a(14),l=a(16),o=a(0),s=a.n(o),u=(a(70),function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("footer",{className:"footer"},s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"row"},s.a.createElement("ul",{className:"nav-link"},s.a.createElement("li",null,s.a.createElement("a",{href:"/"},"\u5173\u4e8e")),s.a.createElement("li",null,s.a.createElement("a",{href:"/"},"\u4f7f\u7528\u6307\u5357")),s.a.createElement("li",null,s.a.createElement("a",{href:"/"},"\u5efa\u8bae\u53cd\u9988")),s.a.createElement("li",null,s.a.createElement("a",{href:"/"},"\u52a0\u5165\u6211\u4eec")),s.a.createElement("li",null,s.a.createElement("a",{href:"/"},"\u5546\u52a1\u5408\u4f5c")),s.a.createElement("li",null,s.a.createElement("a",{href:"/"},"\u53cb\u60c5\u94fe\u63a5"))),s.a.createElement("ul",{className:"admin-info"},s.a.createElement("li",null,s.a.createElement("i",{className:"iconfont icon-wb"}),s.a.createElement("a",{href:"/"},"\u8fd9\u4f4d\u540c\u5b66\u53eb\u963f\u5b87")),s.a.createElement("li",null,s.a.createElement("i",{className:"iconfont icon-email"}),s.a.createElement("a",{href:"/"},"dy_3364@yeah.net")))),s.a.createElement("div",{className:"row secend"},s.a.createElement("span",null,"\xa9 All Right Reserved"),s.a.createElement("a",{href:"/"},s.a.createElement("i",{className:"iconfont icon-twitter"})),s.a.createElement("a",{href:"/"},s.a.createElement("i",{className:"iconfont icon-ins"})),s.a.createElement("a",{href:"/"},s.a.createElement("i",{className:"iconfont icon-github"})),s.a.createElement("span",{className:"motto"},"\u4eba\u751f\u6ca1\u6709\u767d\u8d70\u7684\u8def\uff0c\u6bcf\u4e00\u6b65\u90fd\u7b97\u6570\u3002"))))}}]),t}(s.a.Component));t.a=u},70:function(e,t,a){},96:function(e,t,a){"use strict";var n=a(12),c=a(13),r=a(15),i=a(14),l=a(16),o=a(0),s=a.n(o),u=(a(97),a(18)),m=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.list,a=e.title;return s.a.createElement("div",{className:"hot-item"},s.a.createElement("div",{className:"title"},a),s.a.createElement("ul",{className:"list"},t.map((function(e){return s.a.createElement("li",{key:e.id},s.a.createElement("i",{className:"iconfont icon-right"}),s.a.createElement(u.b,{to:"/article/".concat(e.id)},e.title))}))))}}]),t}(s.a.Component);t.a=m},97:function(e,t,a){}}]);
//# sourceMappingURL=8.1f16a067.chunk.js.map