"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
exports.doorSuggestion = [
    {
        name: 'Byko sliding glass door',
        price: 400000
    },
    {
        name: 'Byko external main door',
        price: 150000
    },
    {
        name: 'Byko external back door',
        price: 100000
    },
    {
        name: 'Byko internal door',
        price: 50000
    },
    {
        name: 'Byko garage door',
        price: 500000
    }
];
var choose = function (choice) {
    var door = exports.doorSuggestion.find(function (suggestion) {
        return suggestion.name === choice;
    });
    assert(door, 'choice of door not found amond door suggestions. Choice: ' + choice);
    return door ? door.price : 99999999999;
};
exports.doorChoice = [
    {
        type: '2000 x 2100mm',
        price: choose('Byko sliding glass door')
    },
    {
        type: '1200 x 2100mm',
        price: choose('Byko sliding glass door')
    },
    {
        type: 'Útihurð 950 x 2134mm',
        price: choose('Byko external back door')
    },
    {
        type: 'Innihurð 850 x 2134mm',
        price: choose('Byko internal door')
    },
    {
        type: 'Útihurð 1000 x 2134mm',
        price: choose('Byko external main door')
    },
    {
        type: 'Innihurð 950 x 2134mm',
        price: choose('Byko internal door')
    },
    {
        type: '4750 x 2600mm',
        price: choose('Byko garage door')
    }
];
//# sourceMappingURL=door.js.map