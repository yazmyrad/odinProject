"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
var TheNode = /** @class */ (function () {
    function TheNode(value) {
        if (value === void 0) { value = ''; }
        this.value = value;
    }
    return TheNode;
}());
;
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.headNode = new TheNode();
    }
    LinkedList.prototype.append = function (value) {
        this.headNode.nextNode = new TheNode(value);
    };
    ;
    LinkedList.prototype.prepend = function (value) {
        var tempNode = new TheNode(value);
        tempNode.nextNode = this.headNode;
        this.headNode = tempNode;
    };
    ;
    LinkedList.prototype.size = function () {
        var number = 0;
        while (this.headNode.nextNode) {
            number += 1;
        }
        ;
        return number;
    };
    ;
    return LinkedList;
}());
exports.LinkedList = LinkedList;
;
