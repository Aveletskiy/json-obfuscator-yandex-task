"use strict";

/**
 * Obfuscator module.
 * @module obfuscator
 * @see module:obfuscator
 * @param {Array} data
 * @return {Array} frequencyArray
 * @return {Array} reversedSortedArray
 * @return {object} resultObject
 */
module.exports = function (data) {

  var PermutationsWithRepetition = require('./lib/PermutationsWithRepetition');
  var frequencyArray = {};     // 'origin key':frequency

  //makes frequency hash
  data.forEach(function (item) {
    ( typeof frequencyArray[item] === 'undefined' )
      ? frequencyArray[item] = 1
      : frequencyArray[item]++;
  });

  //sorting and reversing frequencyArray by frequency
  var reversedSortedArray =         // index:'origin key'
    Object
      .keys(frequencyArray)
      .sort(function (a, b) {
        return frequencyArray[a] - frequencyArray[b]
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


  var resultObject = {}; // 'original key':'alias key'

  //fill all object with first character from short dictionary
  reversedSortedArray.forEach(
    function (item, iter) {
      resultObject[item] = dictionaryShort[iter % dictionaryShort.length];
    }
  );

  var availablePosWindow = 1;

  //fill others positions with character from full dictionary
  var permutations = PermutationsWithRepetition(dictionaryFull, availablePosWindow);
  reversedSortedArray.forEach(
    function (item, iter) {
      if (iter >= dictionaryShort.length) {
        var curGeneratedCombination = permutations.next();
        if (!curGeneratedCombination) {
          availablePosWindow++;
          permutations = PermutationsWithRepetition(dictionaryFull, availablePosWindow);
          curGeneratedCombination = permutations.next();
        }

        resultObject[item] += curGeneratedCombination.join('');
      }
    }
  );

  return {
    freqArray: frequencyArray,
    revSortArray: reversedSortedArray,
    obfuscatedObject: resultObject
  }
};