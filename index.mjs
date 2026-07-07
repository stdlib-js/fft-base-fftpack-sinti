// Copyright (c) 2026 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import s from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-sin@v0.3.1-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/constants-float64-pi@v0.2.3-esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-floor@v0.2.4-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/fft-base-fftpack-rffti@esm/index.mjs";function r(r,n,m,d){var f,o,a,l,p;if(r<=1)return n;for(f=e(r/2),o=t/(r+1),a=0,l=d,p=0;p<f;p++)a+=1,n[l+p*m]=2*s(a*o);return i(r+1,n,m,d+f*m),n}export{r as default};
//# sourceMappingURL=index.mjs.map
