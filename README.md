# csdutils

> **csdutils** is a library to provide some frequent `javascript` methods.

<!-- [![Build Status](https://travis-ci.org/hustcc/filesize.js.svg?branch=master)](https://travis-ci.org/hustcc/filesize.js) [![npm](https://img.shields.io/npm/v/filesize.js.svg?style=flat-square)](https://www.npmjs.com/package/filesize.js) [![npm](https://img.shields.io/npm/dt/filesize.js.svg?style=flat-square)](https://www.npmjs.com/package/filesize.js) [![npm](https://img.shields.io/npm/l/filesize.js.svg?style=flat-square)](https://www.npmjs.com/package/filesize.js) -->


# 1. Install

> npm install csdutils

Then import it.

```js
var csdutils = require('csdutils');

//or

import csdutils from 'csdutils';
```

Or import it with `<script>` tag.

```html
<script type="text/javascript" src="csdutils.min.js"></script>
```

Then use `csdutils` API.

```js
csdutils.isNumber(10); // true
```


# 2. Detail Usage

The unique API is: **filesize(bytes, fixed=1, spec='jedec');**.

 - bytes: Number of filesize.
 - fixed: Number of decimal, default is `1`.
 - spec: String of filesize spec, default is `jedec`.

```js
// bytes.
filesize(123456); 				// '120.6 Kb'

// fixed, `1` is default.
filesize(123456, 0); 			// '121 Kb'
filesize(123456, 4); 			// '1120.5625 Kb'

// specs, `jedec` / `iec / si`.
// `jedec` is default.
filesize(123456, 2, 'iec'); 	// '120.56 Kib'
filesize(123456, 0, 'si'); 		// '123 Kb'
```


# 3. Test

> npm install

> npm test


# 5. LICENSE

MIT
