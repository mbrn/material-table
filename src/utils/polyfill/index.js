"use strict";
if (!Array.prototype.find) {
  require("./array.find");
}

if (typeof Symbol !== "function") {
  require("./symbol");
}
