var y=Object.defineProperty;var w=(i,e,t)=>e in i?y(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var u=(i,e,t)=>(w(i,typeof e!="symbol"?e+"":e,t),t);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();const h={path:{basename(i){const e=i.split("/");return i[i.length-1].length==0&&e.pop(),e.pop(),e.join("/")},join(...i){return i.join("/").split("/").filter(e=>e.length>0).join("/")},resolve(i){let t=i.split("/").filter(n=>n.length>0);for(let n=0;n<t.length;n++)t[n]==".."&&n-1>=0&&(t.splice(n-1,2),n-=2);return t.join("/")}},text:{color(i,...e){let t=i;for(let n=0;n<e.length;n++)t=t.replace(`$${n}`,`<span class="text-${e[n]}">`),t=t.replace(`#${n}`,"</span>");return t}}};class g{constructor(){u(this,"data",[{parent:-1,name:"root",type:"dir",content:[]}])}fscall(e){const t=h.path.basename(e),n=this.resolve(t),r=this.resolve(e);if(n==null||n<0)throw`path ${e} not found`;let s=!0;(r==null||r<0)&&(s=!1);const l=this.data[n],a=s?this.data[r]:void 0;return{entryIndex:r,entry:a,parentIndex:n,parent:l}}mkdir(e){const{parent:t,parentIndex:n}=this.fscall(e),r=e.split("/").pop(),s=this.data.push({parent:n,name:r,type:"dir",content:[]})-1;t.type=="dir"&&t.content.push(s)}readdir(e){const t=this.resolve(e);if(t==null)throw"directory not found";const n=this.data[t];if(n.type!="dir")throw"path not directory";let r=[];for(const s of n.content)r.push(this.data[s]);return{index:t,content:r}}touch(e){const{parent:t,parentIndex:n}=this.fscall(e),r=e.split("/").pop(),s=this.data.push({parent:n,name:r,type:"file",content:""})-1;t.type=="dir"&&t.content.push(s)}writefile(e,t){const{entry:n}=this.fscall(e);if(!n)throw"file not found";if(n.type=="dir")throw"file is not readable (propably directory?)";n.content=t}getentry(e){const{entry:t}=this.fscall(e);return t}readfile(e){const{entry:t}=this.fscall(e);if(!t)throw"file not found";if(t.type=="dir")throw"file is not readable (propably directory?)";return t.content}debug(){console.log(this.data)}resolve(e){const t=e.split("/");let n=0,r=this.data[n];if(t.length==1&&t[0].length==0)return n;for(t[0].length==0&&t.shift(),t[t.length-1].length==0&&t.pop();t.length>0;){const s=t.shift();let l;if(s!="."){if(s==".."){const a=r.parent;if(a>=0)r=this.data[a],n=a;else return}else if(r.type=="dir"){for(const a of r.content)this.data[a].name==s&&(l=!0,r=this.data[a],n=a);if(!l)return}}}return n}}const c=new g,p={registry:new Map,register(i,e){if(this.registry.has(i))throw"Command Already exists";this.registry.set(i,e)}};class v{constructor(){u(this,"element");u(this,"input");u(this,"inputWrapper");u(this,"inputText");u(this,"workingDirectory","");this.element=document.createElement("div"),this.element.id="terminal",this.input=document.createElement("input"),this.input.id="input",this.input.spellcheck=!1,this.input.autocomplete="off",this.inputWrapper=document.createElement("div"),this.inputWrapper.id="input-wrapper",this.inputText=document.createElement("span"),this.inputText.id="input-text",this.element.onclick=()=>this.input.focus(),this.input.onkeydown=e=>this.inputHandler(e)}inputHandler(e){e.key=="Enter"&&(this.execute(this.input.value),this.input.value="",this.input.focus())}clear(){this.element.innerHTML=""}async execute(e){this.inputWrapper.remove();const t=e.split(" ");if(t.length==0)return;const n=t.shift(),r=p.registry.get(n);r?await r.run(...t):this.error(`command ${n} not found`),this.redrawInput()}redrawInput(){this.input.value="",this.inputText.innerHTML=`<span class='text-orange'>guest</span> in <span class='text-purple'>/${this.cwd}</span> - `,this.inputWrapper.append(this.inputText,this.input),this.element.append(this.inputWrapper),this.input.focus()}set cwd(e){this.workingDirectory=h.path.resolve(e)}get cwd(){return this.workingDirectory}start(){this.writeLn(h.text.color("welcome to $0kos v0.1#0, type 'help' to learn more","blue")),this.redrawInput()}write(e){this.element.innerHTML+=e}writeLn(e){this.element.innerHTML+=`${e} <br/>`}error(e){this.writeLn(`<span class="text-red">${e}</span>`)}get view(){return this.element}}const o=new v;class x{run(...e){const t=e[0];if(!t||t.length==0)return 1;const n=h.path.join(o.cwd,t);try{const r=c.readfile(n);o.writeLn(r)}catch(r){return o.error(r),1}return 0}help(){return"[path] Writes file contents to the terminal"}}const b=new x;class L{constructor(){u(this,"history",[]);u(this,"current",0)}run(...e){const t=e[0];if(!t||t.length==0)return 1;const n=h.path.join(o.cwd,t);try{const r=c.readdir(n);this.history.push(this.current),this.current=r.index,o.cwd=n}catch(r){return o.error(`${r}`),2}return 0}help(){return"[path] Goes to specified directory"}}const C=new L;class M{run(){return o.clear(),0}help(){}}const m=new M;class T{run(...e){var r;const t=e[0];if(!t||t.length==0)return 1;const n=h.path.join(o.cwd,t);try{const l=c.readfile(n).split(`
`),a=l[0],d=l[1];if(a=="link")(r=window.open(d,"_blank"))==null||r.focus();else throw"File is not a link"}catch(s){return o.error(s),3}return 0}help(){return"[url] Opens a link file in the new tab"}}const $=new T;class k{run(){return Array.from(p.registry.entries()).forEach(t=>{const n=t[0],r=t[1].help();r&&o.writeLn(`${n} - ${r}`)}),0}help(){return"Gives help informations for other commands"}}const O=new k;class j{run(...e){let t=e[0]=="-v",n=t?e[1]:e[0];const r=new Map;r.set("dir","green"),r.set("file","yellow"),r.set("link","purple");try{const s=c.readdir(h.path.join(o.cwd,n));s.content.sort((l,a)=>l.type<a.type?-1:l.type>a.type?1:0),s.content.length==0&&o.writeLn(h.text.color("$0 directory is empty #0","dark-gray")),s.content.forEach(l=>{const a=r.get(l.type),d=h.text.color(`$0${l.name}#0`,a);t?o.writeLn(`${d} - ${l.type}`):o.writeLn(d)}),o.writeLn("--------------")}catch(s){return o.error(s),1}return 0}help(){return"[path] Writes content of directory"}}const I=new j;class N{async run(){return new Promise((e,t)=>{const n=setInterval(()=>{o.writeLn("Testing")},1e3);setTimeout(()=>{clearInterval(n),e(0)},5e3)})}help(){}}const E=new N,f=document.querySelector("#app");p.register("ls",I);p.register("cd",C);p.register("help",O);p.register("clear",m);p.register("cls",m);p.register("cat",b);p.register("goto",$);p.register("test",E);window.onload=()=>{f==null||f.append(o.view),o.start(),A(),c.debug()};const A=()=>{c.mkdir("projects"),c.touch("about"),c.mkdir("blog"),c.mkdir("socials"),c.touch("socials/youtube"),c.writefile("socials/youtube",`link
https://www.youtube.com/channel/UClhU6cFHgaKLenRYxJ9yiPw`),c.mkdir("projects/game"),c.touch("projects/game/game"),c.touch("projects/game/about"),c.writefile("projects/game/game",`link
https://github.com/Kevand/kevand.github.io/tree/master/Gra`),c.writefile("projects/game/about","Small game made in Construct2"),c.writefile("about",`
    Hello, I'm Kevand, and this is my portfolio/fun website :) Feel free to wonder around, and in case of bugs please report them instanlty.
  `)};