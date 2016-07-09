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
  var reversalSortedMassive =         // index:'origin key'
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


  var reservedLengthForAlias = {}; // 'original key':reserved length
  var maxAliasStringLength = 0;

  //form maxAliasStringLength
  reversalSortedMassive
    .forEach(function (item, iterator) {
      (iterator < dictionaryShort.length)
        ? reservedLengthForAlias[item] = Math.round(iterator / dictionaryShort.length + 1)
        : reservedLengthForAlias[item] = Math.round(iterator / dictionaryFull.length + 1);

      if (reservedLengthForAlias[item] > maxAliasStringLength)
        maxAliasStringLength = reservedLengthForAlias[item];
    });

  //region construct alias map
  for (var position = 0; position < maxAliasStringLength; position++) {
    var chosenDictionary = [];

    //This makes the first character of an alias in Latin letters
    (position == 0)
      ? chosenDictionary = dictionaryShort
      : chosenDictionary = dictionaryFull;

    var dictionaryPosSelector = position % chosenDictionary.length;


    reversalSortedMassive
      .forEach(function (item) {
        //push a begin of string into alias value
        if (!resultObject[item])
          resultObject[item] = '';
        //
        if (reservedLengthForAlias[item] > position) {
          resultObject[item] += chosenDictionary[dictionaryPosSelector];
          dictionaryPosSelector++;
          if (dictionaryPosSelector > chosenDictionary.length)
            dictionaryPosSelector = 0;
        }
      })

  }
  //endregion

  return [frequencyMassive, reversalSortedMassive, reservedLengthForAlias, resultObject];
};