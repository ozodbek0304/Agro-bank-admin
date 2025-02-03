let e=[],n=new MessageChannel,t=function(){this.postMessage(void 0)}.bind(n.port2);function o(n){1===e.push(n)&&requestAnimationFrame(t)}n.port1.onmessage=()=>{let n=e;e=[];let t=performance.now();for(let e=0;e<n.length;e++)n[e](t)},n=null;export default o;
//# sourceMappingURL=afterframe.modern.js.map
