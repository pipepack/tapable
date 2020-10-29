# pipepack-tapable

![Build Status](https://img.shields.io/travis/pipepack/pipepack-tapable/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/pipepack/pipepack-tapable/badge.svg?branch=master)](https://coveralls.io/github/pipepack/?branch=master)
![Package Dependency](https://david-dm.org/pipepack/pipepack-tapable.svg?style=flat)
![Package DevDependency](https://david-dm.org/pipepack/pipepack-tapable/dev-status.svg?style=flat)

yet, reimplement tapable with idea &#x27;simple is the best&#x27;.


## Usage

```shell
# compile in watch mode
npm run compile:watch;

# unit test with coverage
npm run test;
```

## Attention

- tsc compiler compile without `polyfill`, mainly provide declare files
- babel compiler compile `commonjs` style code
- remember to change meta field in the `package.json`
- compile script automatically run before publish, no need for manual compile

# Licence

MIT
