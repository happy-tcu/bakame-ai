"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
axios_1.default.get('http://localhost:5000')
    .then(function (response) {
    console.log('Response:', response.data);
})
    .catch(function (error) {
    console.error('Error:', error.message);
});
