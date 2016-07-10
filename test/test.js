"use strict";

var expect = require('chai').expect;
var permutation = require('../lib/PermutationsWithRepetition');
var abfuscator = require('../index');


describe('#Obfuscator', function () {
  //next each rewind
  it('checking permutation module step by step', function () {
    var dictinary = ['a', 'b', 'c', 'd', 'e'];  //n
    var positions = 3;                                    //m

    var perms = permutation(dictinary,positions);
    var result = perms.next();
    expect(result).to.deep.equal(['a','a','a']);
    result = perms.next();
    expect(result).to.deep.equal(['a','a','b']);
    perms.rewind();
    result = perms.next();
    expect(result).to.deep.equal(['a','a','a']);
    perms.each(function(v){});
    result = perms.next();
    expect(result).to.deep.equal(false);
  });


  ///freqArray revSortArray obfuscatedObject
  it('should return frequency Array ', function () {
    var data = ['asqq', 'qwww', 'asqq', 'vvf', 'vvf', 'vvf', 'gg'],
      expectJson = {
        'asqq': 2,
        'qwww': 1,
        'vvf': 3,
        'gg': 1
      };

    var result = abfuscator(data).freqArray;
    expect(result).to.deep.equal(expectJson);
  });

  it('should return sorted&reversed frequency Array without number values', function () {
    var data = ['asqq', 'qwww', 'asqq', 'vvf', 'vvf', 'vvf', 'gg'],
      expectJson = ['vvf', 'asqq', 'gg', 'qwww'];
    var result = abfuscator(data).revSortArray;
    expect(result).to.deep.equal(expectJson);
  });

  it('should return result of obfuscate', function () {
    var data = ['asqq', 'qwww', 'asqq', 'vvf', 'vvf', 'vvf', 'gg'],
      expectJson = {vvf: 'a', asqq: 'b', gg: 'c', qwww: 'd'};
    var result = abfuscator(data).obfuscatedObject;
    expect(result).to.deep.equal(expectJson);
  });

  it('check the efficiency of module', function () {
    var data = require('./data.json');
    var expectJson = require('./resultOfObfuscation.json');
    var result = abfuscator(data).obfuscatedObject;
    expect(result).to.deep.equal(expectJson);
  });


});