"use strict";var x=function(i,r){return function(){try{return r||i((r={exports:{}}).exports,r),r.exports}catch(e){throw (r=0, e)}};};var o=x(function(g,s){
var l=require('@stdlib/math-base-special-sin/dist'),m=require('@stdlib/constants-float64-pi/dist'),I=require('@stdlib/math-base-special-floor/dist'),P=require('@stdlib/fft-base-fftpack-rffti/dist');function R(i,r,e,a){var n,t,f,u,q,v;if(i<=1)return r;for(t=I(i/2),f=m/(i+1),u=0,q=a,v=0;v<t;v++)u+=1,r[q+v*e]=l(u*f)*2;return n=a+t*e,P(i+1,r,e,n),r}s.exports=R
});var b=o();module.exports=b;
/** @license Apache-2.0 */
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
