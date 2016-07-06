"use strict";

var expect = require('chai').expect;
var abfuscator = require('../index');

describe('#Obfuscator', function() {
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

    it('should return sorted frequency massive without number values', function() {
        var data = ['asqq','qwww','asqq','vvf','vvf','vvf','gg'],
            expectJson=[
                'qwww','gg','asqq','vvf'
            ];
        var result = abfuscator(data)[1];
        expect(result).to.deep.equal(expectJson);
    });

    it('should return result object', function() {
        var data = ['asqq','qwww','asqq','vvf','vvf','vvf','gg'],
            expectJson={ qwww: 'a', gg: 'b', asqq: 'c', vvf: 'd' };
            var result = abfuscator(data)[2];
        expect(result).to.deep.equal(expectJson);
    });
});