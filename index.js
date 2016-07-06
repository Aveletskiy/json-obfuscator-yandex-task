"use strict";

/**
 * comments
 * @param {Array} data
 * @return {object} obj
 */
module.exports = function (data) {

    var freqMassive = {},
        sortMassive = [];

    //makes freq hash
    for (var i = 0; i < data.length; i++) {
        ( typeof freqMassive[data[i]] === 'undefined' ) ? freqMassive[data[i]] = 1 : freqMassive[data[i]]++;
    }

    sortMassive = Object.keys(freqMassive)
        .sort(function(a,b){
            return freqMassive[a]-freqMassive[b]
        });

    var resultObject={};

    sortMassive.forEach(function(item,i){
       resultObject[item]=String.fromCharCode(97 + i);
    });


    return [freqMassive, sortMassive,resultObject];
};