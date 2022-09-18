"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "capitalize": () => (/* binding */ capitalize),
/* harmony export */   "reverseString": () => (/* binding */ reverseString)
/* harmony export */ });
function capitalize(string) {
    if (typeof string !== 'string') {
        return 'This is not a string';
    } else {
        const firstLetter = string.slice(0, 1);
        const restOfString = string.slice(1);
        return firstLetter.toUpperCase() + restOfString.toLowerCase();
    }
}

function reverseString(string) {
    if (typeof string !== 'string') {
        return 'This is not a string';
    } else {
        return string.split('').reverse().join('');
    }
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiAnVGhpcyBpcyBub3QgYSBzdHJpbmcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpcnN0TGV0dGVyID0gc3RyaW5nLnNsaWNlKDAsIDEpO1xuICAgICAgICBjb25zdCByZXN0T2ZTdHJpbmcgPSBzdHJpbmcuc2xpY2UoMSk7XG4gICAgICAgIHJldHVybiBmaXJzdExldHRlci50b1VwcGVyQ2FzZSgpICsgcmVzdE9mU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZVN0cmluZyhzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuICdUaGlzIGlzIG5vdCBhIHN0cmluZyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xuICAgIH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=