"use strict";
exports.__esModule = true;
var index_1 = require("./index");
describe(index_1.testFunction.name, function () {
    test('should return value', function () {
        var value = 'value';
        expect((0, index_1.testFunction)(value)).toBe(value);
    });
});
