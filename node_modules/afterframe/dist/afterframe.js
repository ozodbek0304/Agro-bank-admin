var n=[],e=new MessageChannel,o=function(){this.postMessage(void 0)}.bind(e.port2);e.port1.onmessage=function(){var e=n;n=[];for(var o=performance.now(),r=0;r<e.length;r++)e[r](o)},e=null,module.exports=function(e){1===n.push(e)&&requestAnimationFrame(o)};
//# sourceMappingURL=afterframe.js.map
