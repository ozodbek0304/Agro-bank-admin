var n=[],e=new MessageChannel,o=function(){this.postMessage(void 0)}.bind(e.port2);function t(e){1===n.push(e)&&requestAnimationFrame(o)}e.port1.onmessage=function(){var e=n;n=[];for(var o=performance.now(),t=0;t<e.length;t++)e[t](o)},e=null;export default t;
//# sourceMappingURL=afterframe.module.js.map
