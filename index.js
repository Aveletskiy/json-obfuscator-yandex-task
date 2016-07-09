"use strict";

/**
 * comments
 * @param {Array} data
 * @return {object} resultObject
 */
module.exports = function (data) {

  var frequencyMassive = {};     // 'origin key':frequency
  var resultObject = {};


  //makes frequency hash
  data.forEach(function (item) {
    ( typeof frequencyMassive[item] === 'undefined' )
      ? frequencyMassive[item] = 1
      : frequencyMassive[item]++;
  });

  //sorting and reversing frequencyMassive by frequency
  var reversedSortedMassive =         // index:'origin key'
    Object
      .keys(frequencyMassive)
      .sort(function (a, b) {
        return frequencyMassive[a] - frequencyMassive[b]
      })
      .reverse();

  //region building dictionaries
  var dictionaryFull = ['-', '_'];
  var dictionaryShort = [];

  for (var i = 48; i < 58; i++) {
    dictionaryFull.push(String.fromCharCode(i));
  }

  for (var i = 97; i < 123; i++) {
    dictionaryShort.push(String.fromCharCode(i));
    dictionaryFull.push(String.fromCharCode(i));
  }
  //endregion

  //region PermutationsWithRepetition
  function PermutationsWithRepetition(src, len){

    var K = len - 1, k = 0,
      N = src.length, n = 0,
      out = [],
      stack = [];

    function next(){
      while (true) {
        while (n < src.length) {
          out[k] = src[n++];
          if (k == K) return out.slice(0);
          else {
            if (n < src.length) {
              stack.push(k);
              stack.push(n);
            }
            k++;
            n = 0;
          }
        }
        if (stack.length == 0) break;

        n = stack.pop();
        k = stack.pop();
      }
      return false;
    }

    function rewind(){ k = 0; n = 0; out = []; stack = []; }

    function each(cb) {
      rewind();
      var v;
      while (v = next()) if (cb(v) === false) return;
    }

    return {
      next: next,
      each: each,
      rewind: rewind
    };
  }
  //endregion

  var resultObject = {}; // 'original key':reserved length

  reversedSortedMassive.forEach(
    function(item,iter){
      resultObject[item]=dictionaryShort[iter % dictionaryShort.length];
    }
  );

  var avablePosions=1;
  var perms = PermutationsWithRepetition(dictionaryFull, avablePosions);
  reversedSortedMassive.forEach(
    function(item,iter){
      var curGeneratedCombination = perms.next();
      if(!curGeneratedCombination){
        avablePosions++;
        perms = PermutationsWithRepetition(dictionaryFull, avablePosions);
        curGeneratedCombination = perms.next();
      }

      if(iter>dictionaryShort.length){
        resultObject[item]+=curGeneratedCombination.join('');
      }

    }

  );

  return {
    freqMassive:frequencyMassive,
    revSortMassive:reversedSortedMassive,
    obfuscatedObject:resultObject
  }
};