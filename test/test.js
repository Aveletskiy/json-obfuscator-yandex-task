"use strict";

var expect = require('chai').expect;
var abfuscator = require('../index');

describe('#Obfuscator', function() {
    ///frequencyMassive, reversalSortedMassive, reservedLengthForAlias, resultObject
    it('should return frequency massive ', function() {
        var data = ['asqq','qwww','asqq','vvf','vvf','vvf','gg'],
        expectJson={
            'asqq':2,
            'qwww':1,
            'vvf':3,
            'gg':1
        };

        var result = abfuscator(data)[0];
        expect(result).to.deep.equal(expectJson);
    });

    it('should return sorted&reversed frequency massive without number values', function() {
        var data = ['asqq','qwww','asqq','vvf','vvf','vvf','gg'],
            expectJson=['vvf','asqq','gg','qwww'];
        var result = abfuscator(data)[1];
        expect(result).to.deep.equal(expectJson);
    });

    it('should return alias map with amount reserved length of new alie', function() {
        var data = ['asqq','qwww','asqq','vvf','vvf','vvf','gg'],
            expectJson={ vvf: 1, asqq: 1, gg: 1, qwww: 1 };
            var result = abfuscator(data)[2];
        expect(result).to.deep.equal(expectJson);
    });

    it('should return result of obfuscate', function() {
        var data = ['asqq','qwww','asqq','vvf','vvf','vvf','gg'],
          expectJson={ vvf: 'a', asqq: 'b', gg: 'c', qwww: 'd' };
        var result = abfuscator(data)[3];
        expect(result).to.deep.equal(expectJson);
    });
});