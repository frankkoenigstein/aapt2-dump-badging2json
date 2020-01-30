# aapt2-dump-badging2json

Parses `stdout` from [AAPT2 Dump] `badging` to `JSON`.

![Node.js CI](https://github.com/frankkoenigstein/aapt2-dump-badging2json/workflows/Node.js%20CI/badge.svg)
![NPM Publish](https://github.com/frankkoenigstein/aapt2-dump-badging2json/workflows/NPM%20Publish/badge.svg)

[![NPM](https://nodei.co/npm/aapt2-dump-badging2json.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/aapt2-dump-badging2json/)

<details>
  <summary>Table of contents</summary>
<!-- TOC depthFrom:2 -->

- [Usage](#usage)
  - [Declaration](#declaration)
  - [Example](#example)
- [License](#license)

<!-- /TOC -->
</details>

## Usage

### Declaration

```ts
export declare function badging2Json(dump: string): string;
```

### Example

`aapt2` has to be in `$PATH`.

```ts
import { badging2Json } from 'aapt2-dump-badging2json';

const dump: string = '...';
const json = JSON.parse(badging2Json(dump));
```

## License

[MIT License]

[aapt2 dump]: https://developer.android.com/studio/command-line/aapt2#dump
[mit license]: http://en.wikipedia.org/wiki/MIT_License
