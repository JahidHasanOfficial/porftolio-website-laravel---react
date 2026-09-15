import{h as e,l as t}from"./jsx-runtime-BOi_bBi4.js";var n=e(t(),1),r=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),i=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),a=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),o=e=>{let t=a(e);return t.charAt(0).toUpperCase()+t.slice(1)},s={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},c=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},l=(0,n.createContext)({}),u=()=>(0,n.useContext)(l),d=(0,n.forwardRef)(({color:e,size:t,strokeWidth:i,absoluteStrokeWidth:a,className:o=``,children:l,iconNode:d,...f},p)=>{let{size:m=24,strokeWidth:h=2,absoluteStrokeWidth:g=!1,color:_=`currentColor`,className:v=``}=u()??{},y=a??g?Number(i??h)*24/Number(t??m):i??h;return(0,n.createElement)(`svg`,{ref:p,...s,width:t??m??s.width,height:t??m??s.height,stroke:e??_,strokeWidth:y,className:r(`lucide`,v,o),...!l&&!c(f)&&{"aria-hidden":`true`},...f},[...d.map(([e,t])=>(0,n.createElement)(e,t)),...Array.isArray(l)?l:[l]])}),f=(e,t)=>{let a=(0,n.forwardRef)(({className:a,...s},c)=>(0,n.createElement)(d,{ref:c,iconNode:t,className:r(`lucide-${i(o(e))}`,`lucide-${e}`,a),...s}));return a.displayName=o(e),a},p=f(`mail`,[[`path`,{d:`m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7`,key:`132q7q`}],[`rect`,{x:`2`,y:`4`,width:`20`,height:`16`,rx:`2`,key:`izxlao`}]]),m=f(`menu`,[[`path`,{d:`M4 5h16`,key:`1tepv9`}],[`path`,{d:`M4 12h16`,key:`1lakjw`}],[`path`,{d:`M4 19h16`,key:`1djgab`}]]),h=f(`moon`,[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,key:`kfwtm`}]]),g=f(`sun`,[[`circle`,{cx:`12`,cy:`12`,r:`4`,key:`4exip2`}],[`path`,{d:`M12 2v2`,key:`tus03m`}],[`path`,{d:`M12 20v2`,key:`1lh1kg`}],[`path`,{d:`m4.93 4.93 1.41 1.41`,key:`149t6j`}],[`path`,{d:`m17.66 17.66 1.41 1.41`,key:`ptbguv`}],[`path`,{d:`M2 12h2`,key:`1t8f8n`}],[`path`,{d:`M20 12h2`,key:`1q8mjw`}],[`path`,{d:`m6.34 17.66-1.41 1.41`,key:`1m8zz5`}],[`path`,{d:`m19.07 4.93-1.41 1.41`,key:`1shlcs`}]]),_=f(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),v={data:``},y=e=>{if(typeof window==`object`){let t=(e?e.querySelector(`#_goober`):window._goober)||Object.assign(document.createElement(`style`),{innerHTML:` `,id:`_goober`});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||v},b=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ee=/\/\*[^]*?\*\/|  +/g,x=/\n+/g,S=(e,t)=>{let n=``,r=``,i=``;for(let a in e){let o=e[a];a[0]==`@`?a[1]==`i`?n=a+` `+o+`;`:r+=a[1]==`f`?S(o,a):a+`{`+S(o,a[1]==`k`?``:t)+`}`:typeof o==`object`?r+=S(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):a):o!=null&&(a=a[1]==`-`?a:a.replace(/[A-Z]/g,`-$&`).toLowerCase(),i+=S.p?S.p(a,o):a+`:`+o+`;`)}return n+(t&&i?t+`{`+i+`}`:i)+r},C={},w=e=>{if(typeof e==`object`){let t=``;for(let n in e)t+=n+w(e[n]);return t}return e},T=(e,t,n,r,i)=>{let a=w(e),o=C[a]||(C[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return`go`+n})(a));if(!C[o]){let t=a===e?(e=>{let t,n,r=[{}];for(;t=b.exec(e.replace(ee,``));)t[4]?r.shift():t[3]?(n=t[3].replace(x,` `).trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(x,` `).trim();return r[0]})(e):e;C[o]=S(i?{[`@keyframes `+o]:t}:t,n?``:`.`+o)}let s=n&&C.g;return n&&(C.g=C[o]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):t.data.indexOf(e)===-1&&(t.data=n?e+t.data:t.data+e)})(C[o],t,r,s),o},te=(e,t,n)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?`.`+t:e&&typeof e==`object`?e.props?``:S(e,``):!1===e?``:e}return e+r+(a??``)},``);function E(e){let t=this||{},n=e.call?e(t.p):e;return T(n.unshift?n.raw?te(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,y(t.target),t.g,t.o,t.k)}var D,O,k;E.bind({g:1});var A=E.bind({k:1});function j(e,t,n,r){S.p=t,D=e,O=n,k=r}function M(e,t){let n=this||{};return function(){let r=arguments;function i(a,o){let s=Object.assign({},a),c=s.className||i.className;n.p=Object.assign({theme:O&&O()},s),n.o=/go\d/.test(c),s.className=E.apply(n,r)+(c?` `+c:``),t&&(s.ref=o);let l=e;return e[0]&&(l=s.as||e,delete s.as),k&&l[0]&&k(s),D(l,s)}return t?t(i):i}}var N=e=>typeof e==`function`,P=(e,t)=>N(e)?e(t):e,F=(()=>{let e=0;return()=>(++e).toString()})(),I=(()=>{let e;return()=>{if(e===void 0&&typeof window<`u`){let t=matchMedia(`(prefers-reduced-motion: reduce)`);e=!t||t.matches}return e}})(),L=20,R=`default`,z=(e,t)=>{let{toastLimit:n}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return z(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||i===void 0?{...e,dismissed:!0,visible:!1}:e)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},B=[],V={toasts:[],pausedAt:void 0,settings:{toastLimit:L}},H={},U=(e,t=R)=>{H[t]=z(H[t]||V,e),B.forEach(([e,n])=>{e===t&&n(H[t])})},W=e=>Object.keys(H).forEach(t=>U(e,t)),G=e=>Object.keys(H).find(t=>H[t].toasts.some(t=>t.id===e)),K=(e=R)=>t=>{U(t,e)},q={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},J=(e={},t=R)=>{let[r,i]=(0,n.useState)(H[t]||V),a=(0,n.useRef)(H[t]);(0,n.useEffect)(()=>(a.current!==H[t]&&i(H[t]),B.push([t,i]),()=>{let e=B.findIndex(([e])=>e===t);e>-1&&B.splice(e,1)}),[t]);let o=r.toasts.map(t=>({...e,...e[t.type],...t,removeDelay:t.removeDelay||e[t.type]?.removeDelay||e?.removeDelay,duration:t.duration||e[t.type]?.duration||e?.duration||q[t.type],style:{...e.style,...e[t.type]?.style,...t.style}}));return{...r,toasts:o}},Y=(e,t=`blank`,n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:`status`,"aria-live":`polite`},message:e,pauseDuration:0,...n,id:n?.id||F()}),X=e=>(t,n)=>{let r=Y(t,e,n);return K(r.toasterId||G(r.id))({type:2,toast:r}),r.id},Z=(e,t)=>X(`blank`)(e,t);Z.error=X(`error`),Z.success=X(`success`),Z.loading=X(`loading`),Z.custom=X(`custom`),Z.dismiss=(e,t)=>{let n={type:3,toastId:e};t?K(t)(n):W(n)},Z.dismissAll=e=>Z.dismiss(void 0,e),Z.remove=(e,t)=>{let n={type:4,toastId:e};t?K(t)(n):W(n)},Z.removeAll=e=>Z.remove(void 0,e),Z.promise=(e,t,n)=>{let r=Z.loading(t.loading,{...n,...n?.loading});return typeof e==`function`&&(e=e()),e.then(e=>{let i=t.success?P(t.success,e):void 0;return i?Z.success(i,{id:r,...n,...n?.success}):Z.dismiss(r),e}).catch(e=>{let i=t.error?P(t.error,e):void 0;i?Z.error(i,{id:r,...n,...n?.error}):Z.dismiss(r)}),e};var Q=1e3,ne=(e,t=`default`)=>{let{toasts:r,pausedAt:i}=J(e,t),a=(0,n.useRef)(new Map).current,o=(0,n.useCallback)((e,t=Q)=>{if(a.has(e))return;let n=setTimeout(()=>{a.delete(e),s({type:4,toastId:e})},t);a.set(e,n)},[]);(0,n.useEffect)(()=>{if(i)return;let e=Date.now(),n=r.map(n=>{if(n.duration===1/0)return;let r=(n.duration||0)+n.pauseDuration-(e-n.createdAt);if(r<0){n.visible&&Z.dismiss(n.id);return}return setTimeout(()=>Z.dismiss(n.id,t),r)});return()=>{n.forEach(e=>e&&clearTimeout(e))}},[r,i,t]);let s=(0,n.useCallback)(K(t),[t]),c=(0,n.useCallback)(()=>{s({type:5,time:Date.now()})},[s]),l=(0,n.useCallback)((e,t)=>{s({type:1,toast:{id:e,height:t}})},[s]),u=(0,n.useCallback)(()=>{i&&s({type:6,time:Date.now()})},[i,s]),d=(0,n.useCallback)((e,t)=>{let{reverseOrder:n=!1,gutter:i=8,defaultPosition:a}=t||{},o=r.filter(t=>(t.position||a)===(e.position||a)&&t.height),s=o.findIndex(t=>t.id===e.id),c=o.filter((e,t)=>t<s&&e.visible).length;return o.filter(e=>e.visible).slice(...n?[c+1]:[0,c]).reduce((e,t)=>e+(t.height||0)+i,0)},[r]);return(0,n.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:l,startPause:c,endPause:u,calculateOffset:d}}},re=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ie=A`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ae=A`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,oe=M(`div`)`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||`#ff4b4b`};
  position: relative;
  transform: rotate(45deg);

  animation: ${re} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ie} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||`#fff`};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ae} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,se=A`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ce=M(`div`)`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||`#e0e0e0`};
  border-right-color: ${e=>e.primary||`#616161`};
  animation: ${se} 1s linear infinite;
`,le=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ue=A`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,de=M(`div`)`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||`#61d345`};
  position: relative;
  transform: rotate(45deg);

  animation: ${le} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ue} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||`#fff`};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,fe=M(`div`)`
  position: absolute;
`,pe=M(`div`)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,me=A`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,he=M(`div`)`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${me} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ge=({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return t===void 0?r===`blank`?null:n.createElement(pe,null,n.createElement(ce,{...i}),r!==`loading`&&n.createElement(fe,null,r===`error`?n.createElement(oe,{...i}):n.createElement(de,{...i}))):typeof t==`string`?n.createElement(he,null,t):t},_e=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ve=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ye=`0%{opacity:0;} 100%{opacity:1;}`,be=`0%{opacity:1;} 100%{opacity:0;}`,xe=M(`div`)`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Se=M(`div`)`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ce=(e,t)=>{let n=e.includes(`top`)?1:-1,[r,i]=I()?[ye,be]:[_e(n),ve(n)];return{animation:t?`${A(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${A(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},we=n.memo(({toast:e,position:t,style:r,children:i})=>{let a=e.height?Ce(e.position||t||`top-center`,e.visible):{opacity:0},o=n.createElement(ge,{toast:e}),s=n.createElement(Se,{...e.ariaProps},P(e.message,e));return n.createElement(xe,{className:e.className,style:{...a,...r,...e.style}},typeof i==`function`?i({icon:o,message:s}):n.createElement(n.Fragment,null,o,s))});j(n.createElement);var Te=({id:e,className:t,style:r,onHeightUpdate:i,children:a})=>{let o=n.useCallback(t=>{if(t){let n=()=>{let n=t.getBoundingClientRect().height;i(e,n)};n(),new MutationObserver(n).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return n.createElement(`div`,{ref:o,className:t,style:r},a)},Ee=(e,t)=>{let n=e.includes(`top`),r=n?{top:0}:{bottom:0},i=e.includes(`center`)?{justifyContent:`center`}:e.includes(`right`)?{justifyContent:`flex-end`}:{};return{left:0,right:0,display:`flex`,position:`absolute`,transition:I()?void 0:`all 230ms cubic-bezier(.21,1.02,.73,1)`,transform:`translateY(${t*(n?1:-1)}px)`,...r,...i}},De=E`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,Oe=({reverseOrder:e,position:t=`top-center`,toastOptions:r,gutter:i,children:a,toasterId:o,containerStyle:s,containerClassName:c})=>{let{toasts:l,handlers:u}=ne(r,o);return n.createElement(`div`,{"data-rht-toaster":o||``,style:{position:`fixed`,zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:`none`,...s},className:c,onMouseEnter:u.startPause,onMouseLeave:u.endPause},l.map(r=>{let o=r.position||t,s=Ee(o,u.calculateOffset(r,{reverseOrder:e,gutter:i,defaultPosition:t}));return n.createElement(Te,{id:r.id,key:r.id,onHeightUpdate:u.updateHeight,className:r.visible?De:``,style:s},r.type===`custom`?P(r.message,r):a?a(r):n.createElement(we,{toast:r,position:o}))}))},ke=Z;export{h as a,f as c,g as i,ke as n,m as o,_ as r,p as s,Oe as t};