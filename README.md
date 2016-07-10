#JSON Obfuscator 

[![Build Status](https://travis-ci.org/Aveletsky/css-obfuscator.svg?branch=master)](https://travis-ci.org/Aveletsky/css-obfuscator)
[![Coverage Status](https://coveralls.io/repos/github/Aveletsky/json-obfuscator-yandex-task/badge.svg?branch=master)](https://coveralls.io/github/Aveletsky/json-obfuscator-yandex-task?branch=master)

Made for Yandex School task
======


A small library that obfuscate JSON file
made for the second task by Alexander Malinovsky for Yandex School 

## Installation

  `npm i aveletsky/json-obfuscator-yandex-task -D`
  
## Usage

    var obfuscator = require('json-obfuscator-yandex-task');
    var data = ['asqq', 'qwww', 'asqq', 'vvf', 'vvf', 'vvf', 'gg'];

    var obfuscatedObject = obfuscator(data);
  
  
  Output should be `{vvf: 'a', asqq: 'b', gg: 'c', qwww: 'd'}`


## Tests

  `npm test`
