<!--

@license Apache-2.0

Copyright (c) 2026 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# sinti

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Initialize a workspace array for performing a sine transform.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->

<section class="installation">

## Installation

```bash
npm install @stdlib/fft-base-fftpack-sinti
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var sinti = require( '@stdlib/fft-base-fftpack-sinti' );
```

#### sinti( N, workspace, strideW, offsetW )

Initializes a workspace array for performing a sine transform.

```javascript
var Float64Array = require( '@stdlib/array-float64' );
var floor = require( '@stdlib/math-base-special-floor' );

var N = 7;
var workspace = new Float64Array( floor( 2.5*N ) + 34 );

var out = sinti( N, workspace, 1, 0 );
// returns <Float64Array>

var bool = ( out === workspace );
// returns true

var sineTable = workspace.slice( 0, floor( N/2 ) );
// returns <Float64Array>[ ~0.765, ~1.414, ~1.848 ]

var twiddleFactors = workspace.slice( floor( 3*N/2 ) + 1, floor( 5*N/2 ) + 2 );
// returns <Float64Array>[ ~0.707, ~0.707, 0, 0, 0, 0, 0, 0 ]

var factors = workspace.slice( floor( 5*N/2 ) + 2, floor(5*N/2) + 2 + 4 );
// returns <Float64Array>[ 8, 2, 2, 4 ]
```

The function accepts the following arguments:

-   **N**: length of the sequence to transform.
-   **workspace**: workspace array.
-   **strideW**: stride length for `workspace`.
-   **offsetW**: starting index for `workspace`.

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   The workspace array is divided into four sections:

    ```text
          size = N/2          N+1                N+1         2+ceil(log2(N+1)/2)
               ↓               ↓                  ↓                  ↓
        | sine table | scratch/workspace | twiddle factors | radix factor table |
               ↑               ↑                  ↑                  ↑
    i = 0     ...    N/2      ...     (3N/2)+1   ...     (5N/2)+2   ...
    ```

    -   **sine table**: a table of precomputed sine coefficients used by sine transforms.
    -   **scratch/workspace**: used as a scratch space when performing transforms. This section is not updated during initialization.
    -   **twiddle factors**: a table of reusable complex-exponential constants stored as cosine/sine pairs.
    -   **radix factor table**: a table containing the sequence length `N+1`, the number of factors into which `N+1` was decomposed, and the individual integer radix factors.

-   In general, a workspace array should have `2.5N + 34` indexed elements (as `log2(N+1)/2 ≤ 32` for all `2^64`). During initialization, only the sections for storing the sine coefficients, twiddle factors, and the factorization of `N+1` are updated.

-   The radix factor table is comprised as follows:

    ```text
    | sequence_length | number_of_factors | integer_factors |
    ```

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var Float64Array = require( '@stdlib/array-float64' );
var zeroTo = require( '@stdlib/array-zero-to' );
var logEach = require( '@stdlib/console-log-each' );
var floor = require( '@stdlib/math-base-special-floor' );
var sinti = require( '@stdlib/fft-base-fftpack-sinti' );

var N = 7;
var workspace = new Float64Array( floor( 2.5*N ) + 34 );

sinti( N, workspace, 1, 0 );
console.log( 'Sequence length: %d', N );

console.log( 'Sine table:' );
var idx = zeroTo( floor( N/2 ), 'generic' );
logEach( '  workspace[ %d ] = %0.4f', idx, workspace.slice( 0, floor( N/2 ) ) );

console.log( 'Twiddle factors:' );
idx = zeroTo( N+1, 'generic' );
logEach( '  workspace[ %d ] = %0.4f', idx, workspace.slice( floor( 3*N/2 ) + 1, floor( 5*N/2 ) + 2 ) );

console.log( 'Factorization:' );
var nf = workspace[ floor( 5*N/2 ) + 3 ];

console.log( '  number of factors: %d', nf );
idx = zeroTo( nf, 'generic' );
logEach( '  factor[ %d ]: %d', idx, workspace.slice( floor( 5*N/2 ) + 4, floor( 5*N/2 ) + 4 + nf ) );
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2026. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/fft-base-fftpack-sinti.svg
[npm-url]: https://npmjs.org/package/@stdlib/fft-base-fftpack-sinti

[test-image]: https://github.com/stdlib-js/fft-base-fftpack-sinti/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/fft-base-fftpack-sinti/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/fft-base-fftpack-sinti/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/fft-base-fftpack-sinti?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/fft-base-fftpack-sinti.svg
[dependencies-url]: https://david-dm.org/stdlib-js/fft-base-fftpack-sinti/main

-->

[chat-image]: https://img.shields.io/badge/zulip-join_chat-brightgreen.svg
[chat-url]: https://stdlib.zulipchat.com

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/fft-base-fftpack-sinti/tree/deno
[deno-readme]: https://github.com/stdlib-js/fft-base-fftpack-sinti/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/fft-base-fftpack-sinti/tree/umd
[umd-readme]: https://github.com/stdlib-js/fft-base-fftpack-sinti/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/fft-base-fftpack-sinti/tree/esm
[esm-readme]: https://github.com/stdlib-js/fft-base-fftpack-sinti/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/fft-base-fftpack-sinti/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/fft-base-fftpack-sinti/main/LICENSE

</section>

<!-- /.links -->
