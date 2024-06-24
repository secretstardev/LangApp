/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 207:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(452);


/***/ }),

/***/ 27:
/***/ ((module) => {

module.exports = {
  URIApi: 'http://localhost:8080/',
  URIFront: 'http://localhost:8080'
};

/***/ }),

/***/ 445:
/***/ ((module) => {

module.exports = function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ; __append("<div id=\"modalOuter\">\n    <div id=\"modalBody\">\n\n    </div>\n</div>\n")
  return __output;

}

/***/ }),

/***/ 887:
/***/ ((module) => {

module.exports = function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ; __append("<style>\n    @font-face {\n      font-family: \"LangAppJapanese\";\n      src: local(\"ヒラギノ角ゴ Pro W3\"),\n      local(\"Hiragino Kaku Gothic Pro\"),\n      local(Osaka),\n      local(メイリオ),\n      local(Meiryo),\n      local(\"ＭＳ Ｐゴシック\"),\n      local(\"MS PGothic\"),\n      local(\"ＭＳ ゴシック\"),\n      local(\"MS Gothic\"),\n      local(\"Noto Sans CJK JP\"),\n      local(TakaoPGothic);\n      unicode-range: U+3000-30FF, U+FF00-FFEF, U+4E00-9FAF;\n    }\n\n    :host {\n        all: initial;\n        color: black;\n        font-size: 16px;\n        font-family: \"LangAppJapanese\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    }\n\n    #modalOuter {\n        position: absolute;\n\n        /* Dynamically changes in JS */\n        width: 480px;\n        height: auto;\n        max-height: 60vh;\n\n        overflow: visible;\n        display: flex;\n        flex-flow: column;\n        /*background: rgb(255, 255, 255);\n        border-radius: 10px;\n        padding: 10px;\n        border: 1px solid rgb(0, 0, 0);*/\n\n        box-sizing: border-box;\n        z-index: 999999;\n        justify-content: flex-end;\n    }\n\n    #modalBody {\n        -moz-border-radius: 5px;\n        -webkit-border-radius: 5px;\n        background: #FDFEFF;\n        box-shadow: 0px 4px 24px 0px #3C485329;\n        border: 1px solid #D9DFEB;\n        border-radius: 4px;\n        overflow-y: auto;\n    }\n\n    #closeModal {\n        cursor: pointer;\n        border: none;\n        padding: 4px;\n        font-size: 20px;\n        font-weight: 700;\n        position: sticky;\n        height: 24px;\n        width: 24px;\n        background: rgba(255, 255, 255, 0.9);\n        margin-top: -32px;\n        align-items: center;\n        justify-content: center;\n        display: flex;\n        border-radius: 4px;\n        top: 23px;\n        right: 20px;\n        z-index: 2;\n        margin-left: auto;\n    }\n\n    .buttons {\n        margin-left: auto;\n        display: flex;\n        gap: 16px;\n    }\n\n    .buttons.first {\n        padding-right: 48px;\n    }\n\n    .button-add {\n        display: flex;\n        align-items: center;\n        background: #FF8289;\n        border: none;\n        color: white;\n        padding: 8px 12px 8px 8px;\n        border-radius: 8px;\n        gap: 8px;\n        font-size: 14px;\n        line-height: 24px;\n        font-weight: 600;\n        cursor: pointer;\n    }\n\n    .button-add svg {\n        pointer-events: none;\n    }\n\n    #closeModal span {\n        background: url('data:image/svg+xml,<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6 18L18 6\" stroke=\"%239A9CAA\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M18 18L6 6\" stroke=\"%239A9CAA\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>') no-repeat;\n        display: block;\n        width: 24px;\n        height: 24px;\n        transition: all ease-in-out 0.2s;\n    }\n\n    #closeModal:hover span {\n        opacity: 0.8;\n    }\n\n    .word-variant {\n        border-bottom: 1px solid #D9DFEB;\n        padding: 16px;\n    }\n\n    .word-variant.hidden {\n        display: none;\n    }\n\n    .reading-variant {\n        font-weight: 600;\n        font-size: 32px;\n        display: none;\n        align-items: center;\n        gap: 8px;\n    }\n\n    .reading-variant-uncommon {\n        opacity: 0.5;\n    }\n\n    .reading-variant-current-main {\n        display: flex;\n    }\n\n    /*.reading-variant-current {\n        color: green;\n    }*/\n\n    .meanings-wrapper {\n        margin-top: 16px;\n        display: flex;\n        gap: 8px;\n    }\n\n    .meanings-img {\n        width: 200px;\n        height: 160px;\n        background-size: cover;\n        background-position: 50%;\n        min-width: 200px;\n        border-radius: 4px;\n        float: right;\n    }\n\n    .meanings {\n        display: block;\n        width: 100%;\n    }\n\n    .meaning-variant {\n        margin: 0;\n        padding: 0.5rem 1rem;\n        border: 0 none;\n        color: #515C66;\n        transition: box-shadow 0.2s;\n        border-radius: 0;\n        display: flex;\n        gap: 8px;\n        align-items: center;\n    }\n\n    .meaning-variant.hidden {\n        display: none;\n    }\n\n    .see-also-btn {\n        padding: 0 1rem;\n        color: #FF8289;\n        text-decoration: underline;\n        margin-top: 8px;\n        cursor: pointer;\n    }\n\n    .btn-more {\n        display: flex;\n        margin-top: 14px;\n        width: 100%;\n        height: 40px;\n        align-items: center;\n        justify-content: center;\n        background: transparent;\n        border: none;\n        color: #FF8289;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n    }\n\n    .word-audio {\n        background: transparent;\n        border: none;\n        display: flex;\n        cursor: pointer;\n        height: 32px;\n        align-items: center;\n    }\n\n    .word-audio svg {\n        pointer-events: none;\n    }\n\n    @media (max-width: 480px) {\n        #modalOuter {\n            position: fixed;\n            bottom: 0;\n            top: auto !important;\n            height: 300px !important;\n            width: 100%;\n            max-height: none;\n        }\n        #modalBody {\n            border: none;\n        }\n\n        .reading-variant {\n            font-size: 28px;\n        }\n\n        .meaning-variant {\n            padding-left: 0;\n            font-size: 14px;\n        }\n\n        .meanings-img {\n            width: 140px;\n            min-width: 140px;\n            height: 112px;\n        }\n    }\n</style>\n")
  return __output;

}

/***/ }),

/***/ 520:
/***/ ((module) => {

module.exports = function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  if (locals.text) { 
    ; __append("\n<h3>")
    ; __append(escapeFn( locals.text ))
    ; __append("</h3>\n")
    ;  } 
  return __output;

}

/***/ }),

/***/ 558:
/***/ ((module) => {

module.exports = function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  if (locals.response && locals.response.words) { 
    ; __append("\n    <!--<div id=\"modal-translate-header\" style=\"display: flex; flex-flow: row nowrap; width: 100%; justify-content: space-between;\">\n    </div>-->\n    <audio style=\"display: none;\" id=\"audioplayer\" controls></audio>\n    <div id=\"modal-translate-body\" class=\"response\" style=\"box-sizing: border-box; display: flex; flex-flow: column nowrap; width: 100%;\" lang=\"ja-JP\">\n        <a id=\"closeModal\"><span></span></a>\n        ")
    ;  locals.response.words.forEach((word, wordIndex) => { 
    ; __append("\n            <div class=\"word-variant\" data-word=\"")
    ; __append(escapeFn( JSON.stringify(word) ))
    ; __append("\">\n                ")
    ;  for (let [i, reading] of word.readings.entries()) { 
    ; __append("\n                    <div class=\"reading-variant")
    ; __append(escapeFn( reading.current ? ' reading-variant-current' : '' ))
    ; __append(escapeFn( reading.currentMain ? ' reading-variant-current-main' : '' ))
    ; __append("\">\n\n                        <button class=\"word-audio\" data-audiourls=\"")
    ; __append(escapeFn( word.audioUrls ))
    ; __append("\">\n                            <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M1.66602 8.33283V11.6662C1.66602 13.3328 2.49935 14.1662 4.16602 14.1662H5.35768C5.66602 14.1662 5.97435 14.2578 6.24102 14.4162L8.67435 15.9412C10.7743 17.2578 12.4993 16.2995 12.4993 13.8245V6.1745C12.4993 3.69117 10.7743 2.74117 8.67435 4.05783L6.24102 5.58283C5.97435 5.74117 5.66602 5.83283 5.35768 5.83283H4.16602C2.49935 5.83283 1.66602 6.66617 1.66602 8.33283Z\" stroke=\"#050A1F\" stroke-width=\"1.5\"/>\n                                <path d=\"M15 6.66602C16.4833 8.64102 16.4833 11.3577 15 13.3327\" stroke=\"#050A1F\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                <path d=\"M16.5254 4.58398C18.9337 7.79232 18.9337 12.209 16.5254 15.4173\" stroke=\"#050A1F\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                            </svg>\n                        </button>\n\n                        <svg width=\"24\" height=\"24\" viewBox=\"0 0 120 120\" style=\"transform: rotate(-90deg) scale(1, -1)\">\n                            <circle cx=\"60\" cy=\"60\" r=\"50\" fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"18\" />\n                            <circle class=\"percent\" cx=\"60\" cy=\"60\" r=\"50\" fill=\"none\" stroke=\"#00c853\" stroke-width=\"18\" stroke-dasharray=\"100\" pathLength=\"100\" stroke-dashoffset=\"")
    ; __append(escapeFn( (Math.min(100, Math.round((reading.frequencyRank || 0) * 10)) - 100) ))
    ; __append("\" />\n                        </svg>\n\n\n                        <ruby>\n                            ")
    ;  for (let f of reading.furigana) { 
    ; __append("\n                                ")
    ; __append(escapeFn( f.ruby ))
    ; __append("\n                                <rt>")
    ; __append(escapeFn( f.rt || '' ))
    ; __append("</rt>\n                            ")
    ;  } 
    ; __append("\n                        </ruby>\n\n                        <div class=\"buttons ")
    ; __append(escapeFn( wordIndex === 0 ? 'first' : '' ))
    ; __append("\">\n                            <button class=\"button-add\">\n                                <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M5 10H15\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                    <path d=\"M10 15V5\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                </svg>\n                                Add\n                            </button>\n                        </div>\n                    </div>\n                ")
    ;  } 
    ; __append("\n\n                <div class=\"meanings-wrapper\">\n                    <div class=\"meanings\">\n                        <div class=\"meanings-img\" style=\"background-image: url('")
    ; __append(escapeFn( word.imageUrls || word.imageUrls?.[0] || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="160" fill="none"><rect width="200" height="160" fill="%23F1F6FF" rx="4"/><g clip-path="url(%23a)"><path fill="%23D5E0F3" d="M141.6 86.4v33.599a6.399 6.399 0 0 1-6.4 6.4H64.8a6.4 6.4 0 0 1-6.4-6.4v-33.6a3.21 3.21 0 0 1 3.2-3.2h19.2a3.221 3.221 0 0 1 2.56 1.28l2.88 3.84a3.22 3.22 0 0 0 2.56 1.28h22.4a3.223 3.223 0 0 0 2.56-1.28l2.88-3.84a3.221 3.221 0 0 1 2.56-1.28h19.2a3.21 3.21 0 0 1 3.2 3.2Z"/><path fill="%23A3B2D0" d="M138.4 83.2h-4.8a3.21 3.21 0 0 1 3.2 3.2v33.599a6.399 6.399 0 0 1-6.4 6.4h4.8a6.4 6.4 0 0 0 6.4-6.4v-33.6a3.214 3.214 0 0 0-3.2-3.2Z"/><path fill="%23ECEFF6" d="M136.8 52.256V83.2h-17.6a3.22 3.22 0 0 0-2.56 1.28l-2.88 3.84a3.219 3.219 0 0 1-2.56 1.28H88.8a3.221 3.221 0 0 1-2.56-1.28l-2.88-3.84a3.222 3.222 0 0 0-2.56-1.28H63.2V40a6.4 6.4 0 0 1 6.4-6.4h48.544a6.494 6.494 0 0 1 2.656.576V46.4a3.206 3.206 0 0 0 3.2 3.2h12.224c.377.834.573 1.74.576 2.656Z"/><path fill="%23DBE6FF" d="M136.224 49.6h-4.8c.377.834.574 1.74.576 2.656V83.2h4.8V52.256a6.489 6.489 0 0 0-.576-2.656Z"/><path fill="%23E8EDFC" d="M136.224 49.6H124a3.21 3.21 0 0 1-3.2-3.2V34.176c.695.319 1.329.758 1.872 1.296l12.256 12.256a6.538 6.538 0 0 1 1.296 1.872ZM85.6 108.8a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM114.4 108.8a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM116 57.6A17.6 17.6 0 1 1 98.4 40 17.462 17.462 0 0 1 116 57.6Z"/><path fill="%23FFD5D9" d="M98.4 40c-.803.006-1.605.067-2.4.182a17.596 17.596 0 0 1 14.906 14.175 17.591 17.591 0 0 1-8.73 18.625 17.352 17.352 0 0 1-6.133 2.048A17.592 17.592 0 1 0 98.4 40Z"/><path fill="%23E8EDFC" d="M117.792 76.992a4.8 4.8 0 0 1-6.784 0l-4.032-4.016a17.58 17.58 0 0 0 6.8-6.8l4.016 4.032a4.8 4.8 0 0 1 0 6.784Z"/><path fill="%23fff" d="M63.2 120V86.4a3.21 3.21 0 0 1 3.2-3.2H68V40a6.4 6.4 0 0 1 6.4-6.4h-4.8a6.4 6.4 0 0 0-6.4 6.4v43.2h-1.6a3.21 3.21 0 0 0-3.2 3.2V120a6.4 6.4 0 0 0 6.4 6.4h4.8a6.402 6.402 0 0 1-6.4-6.4Z"/><path fill="%23fff" d="M61.6 40h3.2v12.8h-3.2V40Z"/><path fill="%23BAC8E5" d="M63.2 48a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z"/><path fill="%23BAC8E5" d="M138.4 81.6V52.251a7.95 7.95 0 0 0-2.344-5.657l-12.25-12.25A7.94 7.94 0 0 0 118.149 32H69.6a8.01 8.01 0 0 0-8 8 1.6 1.6 0 0 0 3.2 0 4.8 4.8 0 0 1 4.8-4.8h48.549a4.8 4.8 0 0 1 1.051.125V46.4a4.8 4.8 0 0 0 4.8 4.8h11.075c.08.345.122.697.125 1.051V81.6h-16a4.822 4.822 0 0 0-3.84 1.92l-2.88 3.84a1.605 1.605 0 0 1-1.28.64H88.8a1.6 1.6 0 0 1-1.28-.64l-2.88-3.84a4.816 4.816 0 0 0-3.84-1.92h-16V52.8a1.6 1.6 0 1 0-3.2 0v28.8a4.8 4.8 0 0 0-4.8 4.8V120a8.01 8.01 0 0 0 8 8h70.4a8.01 8.01 0 0 0 8-8V86.4a4.8 4.8 0 0 0-4.8-4.8ZM124 48a1.6 1.6 0 0 1-1.6-1.6v-8.938L132.938 48H124Zm16 72a4.8 4.8 0 0 1-4.8 4.8H64.8A4.8 4.8 0 0 1 60 120V86.4a1.6 1.6 0 0 1 1.6-1.6h19.2a1.601 1.601 0 0 1 1.28.64l2.88 3.84a4.815 4.815 0 0 0 3.84 1.92h22.4a4.82 4.82 0 0 0 3.84-1.92l2.88-3.84a1.614 1.614 0 0 1 1.28-.64h19.2a1.6 1.6 0 0 1 1.6 1.6V120Z"/><path fill="%2390A8DD" d="M116 92.8a1.6 1.6 0 0 0 0 3.2 3.254 3.254 0 0 1 3.274 2.08 1.597 1.597 0 0 0 1.985 1.053 1.597 1.597 0 0 0 1.074-1.992 6.48 6.48 0 0 0-6.333-4.34ZM84 96a1.6 1.6 0 1 0 0-3.2 6.48 6.48 0 0 0-6.333 4.341 1.589 1.589 0 0 0 1.055 1.973c.155.05.317.075.48.074a1.616 1.616 0 0 0 1.528-1.108A3.253 3.253 0 0 1 84 96ZM64.8 115.199a1.6 1.6 0 0 0-1.6 1.6v3.2a1.6 1.6 0 1 0 3.2 0v-3.2a1.6 1.6 0 0 0-1.6-1.6ZM64.8 86.4a1.6 1.6 0 0 0-1.6 1.6v22.4a1.6 1.6 0 1 0 3.2 0V88a1.6 1.6 0 0 0-1.6-1.6ZM85.6 100.801a4.796 4.796 0 0 0-4.435 2.963 4.799 4.799 0 1 0 4.435-2.963Zm0 6.4a1.6 1.6 0 1 1 0-3.198 1.6 1.6 0 0 1 0 3.198ZM114.4 100.801a4.799 4.799 0 0 0-.936 9.508 4.796 4.796 0 0 0 5.736-4.708 4.8 4.8 0 0 0-4.8-4.8Zm0 6.4a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2ZM91.63 119.954a1.603 1.603 0 0 0 1.92-1.187c.016-.035.92-3.57 6.45-3.57 5.39 0 6.399 3.403 6.447 3.589a1.6 1.6 0 0 0 3.109-.758c-.057-.248-1.526-6.031-9.557-6.031-8.03 0-9.499 5.783-9.556 6.031a1.596 1.596 0 0 0 .62 1.666c.17.123.362.211.567.26Z"/><path fill="%23FF8289" d="M98.4 38.4a19.2 19.2 0 1 0 8.251 36.51l3.226 3.214a6.4 6.4 0 0 0 9.048-9.045l-3.214-3.227a19.162 19.162 0 0 0-1.063-18.514A19.16 19.16 0 0 0 98.4 38.4Zm0 35.2a16 16 0 1 1 16-16 16.017 16.017 0 0 1-16 16Zm18.261-2.26a3.199 3.199 0 0 1 .094 4.617 3.201 3.201 0 0 1-4.617-.097l-2.634-2.624a19.337 19.337 0 0 0 4.531-4.532l2.626 2.636Z"/><path fill="%23FF8289" d="M104.513 63.89a1.837 1.837 0 0 1-2.613 0l-3.592-3.58-3.583 3.58c-.72.73-1.905.73-2.615 0a1.838 1.838 0 0 1 0-2.614l3.582-3.58-3.582-3.591a1.843 1.843 0 0 1 0-2.622c.702-.722 1.883-.732 2.615 0l3.583 3.58 3.592-3.58c.72-.72 1.893-.72 2.613 0a1.847 1.847 0 0 1 0 2.622l-3.582 3.59 3.582 3.581c.733.72.733 1.892 0 2.614Z"/></g><defs><clipPath id="a"><path fill="%23fff" d="M52 32h96v96H52z"/></clipPath></defs></svg>' 
))
    ; __append("')\"></div>\n                        ")
    ;  for (let i = 0; i < word.meanings.length; i++) { 
    ; __append("\n                            <div class=\"meaning-variant\">\n                                <svg width=\"24\" height=\"24\" viewBox=\"0 0 120 120\" style=\"min-width: 24px; transform: rotate(-90deg) scale(1, -1)\">\n                                    <circle cx=\"60\" cy=\"60\" r=\"50\" fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"18\" />\n                                    <circle class=\"percent\" cx=\"60\" cy=\"60\" r=\"50\" fill=\"none\" stroke=\"#00c853\" stroke-width=\"18\" stroke-dasharray=\"100\" pathLength=\"100\" stroke-dashoffset=\"")
    ; __append(escapeFn( (Math.min(100, Math.round((word.meanings[i].probabilityInList || 0) * 100)) - 100) ))
    ; __append("\" />\n                                </svg>\n                                ")
    ; __append(escapeFn( word.meanings[i].value ))
    ; __append("\n                            </div>\n                        ")
    ;  } 
    ; __append("\n\n\n                        <!--                        <a class=\"see-also-btn\" data-entity-id=\"")
    ; __append(escapeFn( word.id ))
    ; __append("\">See also-->\n                        <!--                            ")
    ;  for (let [i, reading] of word.readings.entries()) { 
    ; __append("-->\n                        <!--                                <ruby>-->\n                        <!--                                    ")
    ;  for (let f of reading.furigana) { 
    ; __append("-->\n                        <!--                                        ")
    ; __append(escapeFn( f.ruby ))
    ; __append("-->\n                        <!--                                        <rt>")
    ; __append(escapeFn( f.rt || '' ))
    ; __append("</rt>-->\n                        <!--                                    ")
    ;  } 
    ; __append("-->\n                        <!--                                </ruby>-->\n                        <!--                            ")
    ;  } 
    ; __append("-->\n                        <!--                        </a>-->\n                    </div>\n                </div>\n\n                <button class=\"btn-more\" style=\"display: none\">More</button>\n            </div>\n        ")
    ;  }) 
    ; __append("\n    </div>\n")
    ;  } 
    ; __append("\n")
  return __output;

}

/***/ }),

/***/ 127:
/***/ ((module) => {

module.exports = function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ; __append("<div class=\"snackbar-container\">\n    ")
    ; __append(escapeFn( locals.text ))
    ; __append("\n</div>")
  return __output;

}

/***/ }),

/***/ 457:
/***/ ((module) => {

module.exports = function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ; __append("<style>\n    :host {\n        all: initial;\n    }\n\n    .snackbar-container {\n        transition: all 500ms ease;\n        transition-property: top, right, bottom, left, opacity;\n        font-family: Roboto, sans-serif;\n        font-size: 14px;\n        min-height: 14px;\n        background-color: #070b0e;\n        position: fixed;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        color: white;\n        line-height: 22px;\n        padding: 18px 24px;\n        bottom: -100px;\n        top: -100px;\n        opacity: 0;\n        z-index: 9999;\n    }\n\n    .snackbar-container .action {\n        background: inherit;\n        display: inline-block;\n        border: none;\n        font-size: inherit;\n        text-transform: uppercase;\n        color: #4caf50;\n        margin: 0 0 0 24px;\n        padding: 0;\n        min-width: min-content;\n        cursor: pointer;\n    }\n\n    @media (min-width: 640px) {\n        .snackbar-container {\n            min-width: 288px;\n            max-width: 568px;\n            display: inline-flex;\n            border-radius: 2px;\n            margin: 24px;\n        }\n    }\n\n    @media (max-width: 640px) {\n        .snackbar-container {\n            left: 0;\n            right: 0;\n            width: 100%;\n        }\n    }\n\n    .snackbar-pos.bottom-center {\n        top: auto !important;\n        bottom: 0;\n        left: 50%;\n        transform: translate(-50%, 0);\n    }\n\n    .snackbar-pos.bottom-left {\n        top: auto !important;\n        bottom: 0;\n        left: 0;\n    }\n\n    .snackbar-pos.bottom-right {\n        top: auto !important;\n        bottom: 0;\n        right: 0;\n    }\n\n    .snackbar-pos.top-left {\n        bottom: auto !important;\n        top: 0;\n        left: 0;\n    }\n\n    .snackbar-pos.top-center {\n        bottom: auto !important;\n        top: 0;\n        left: 50%;\n        transform: translate(-50%, 0);\n    }\n\n    .snackbar-pos.top-right {\n        bottom: auto !important;\n        top: 0;\n        right: 0;\n    }\n\n    @media (max-width: 640px) {\n        .snackbar-pos.bottom-center,\n        .snackbar-pos.top-center {\n            left: 0;\n            transform: none;\n        }\n    }\n</style>")
  return __output;

}

/***/ }),

/***/ 452:
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  caretRangeFromPoint: () => (/* reexport */ caretRangeFromPoint),
  isStringContainsJapanese: () => (/* binding */ isStringContainsJapanese),
  showForRange: () => (/* binding */ showForRange),
  state: () => (/* binding */ state)
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(207);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread.js

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
;// CONCATENATED MODULE: ./node_modules/i18next/dist/esm/i18next.js









var consoleLogger = {
  type: 'logger',
  log: function log(args) {
    this.output('log', args);
  },
  warn: function warn(args) {
    this.output('warn', args);
  },
  error: function error(args) {
    this.output('error', args);
  },
  output: function output(type, args) {
    if (console && console[type]) console[type].apply(console, args);
  }
};

var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Logger);

    this.init(concreteLogger, options);
  }

  _createClass(Logger, [{
    key: "init",
    value: function init(concreteLogger) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.prefix = options.prefix || 'i18next:';
      this.logger = concreteLogger || consoleLogger;
      this.options = options;
      this.debug = options.debug;
    }
  }, {
    key: "setDebug",
    value: function setDebug(bool) {
      this.debug = bool;
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.forward(args, 'log', '', true);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.forward(args, 'warn', '', true);
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.forward(args, 'error', '');
    }
  }, {
    key: "deprecate",
    value: function deprecate() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
    }
  }, {
    key: "forward",
    value: function forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug) return null;
      if (typeof args[0] === 'string') args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
      return this.logger[lvl](args);
    }
  }, {
    key: "create",
    value: function create(moduleName) {
      return new Logger(this.logger, _objectSpread({}, {
        prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
      }, this.options));
    }
  }]);

  return Logger;
}();

var baseLogger = new Logger();

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.observers = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(events, listener) {
      var _this = this;

      events.split(' ').forEach(function (event) {
        _this.observers[event] = _this.observers[event] || [];

        _this.observers[event].push(listener);
      });
      return this;
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      if (!this.observers[event]) return;

      if (!listener) {
        delete this.observers[event];
        return;
      }

      this.observers[event] = this.observers[event].filter(function (l) {
        return l !== listener;
      });
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.observers[event]) {
        var cloned = [].concat(this.observers[event]);
        cloned.forEach(function (observer) {
          observer.apply(void 0, args);
        });
      }

      if (this.observers['*']) {
        var _cloned = [].concat(this.observers['*']);

        _cloned.forEach(function (observer) {
          observer.apply(observer, [event].concat(args));
        });
      }
    }
  }]);

  return EventEmitter;
}();

function defer() {
  var res;
  var rej;
  var promise = new Promise(function (resolve, reject) {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}
function makeString(object) {
  if (object == null) return '';
  return '' + object;
}
function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }

  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }

  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');

  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};
    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();

    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
  }

  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;

  obj[k] = newValue;
}
function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;

  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}
function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;

  if (!obj) return undefined;
  return obj[k];
}
function getPathWithDefaults(data, defaultData, key) {
  var value = getPath(data, key);

  if (value !== undefined) {
    return value;
  }

  return getPath(defaultData, key);
}
function deepExtend(target, source, overwrite) {
  for (var prop in source) {
    if (prop !== '__proto__' && prop !== 'constructor') {
      if (prop in target) {
        if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }

  return target;
}
function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
function i18next_escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  }

  return data;
}
var isIE10 = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('MSIE') > -1;

var ResourceStore = function (_EventEmitter) {
  _inherits(ResourceStore, _EventEmitter);

  function ResourceStore(data) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      ns: ['translation'],
      defaultNS: 'translation'
    };

    _classCallCheck(this, ResourceStore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResourceStore).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    _this.data = data || {};
    _this.options = options;

    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }

    return _this;
  }

  _createClass(ResourceStore, [{
    key: "addNamespaces",
    value: function addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    }
  }, {
    key: "removeNamespaces",
    value: function removeNamespaces(ns) {
      var index = this.options.ns.indexOf(ns);

      if (index > -1) {
        this.options.ns.splice(index, 1);
      }
    }
  }, {
    key: "getResource",
    value: function getResource(lng, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var path = [lng, ns];
      if (key && typeof key !== 'string') path = path.concat(key);
      if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
      }

      return getPath(this.data, path);
    }
  }, {
    key: "addResource",
    value: function addResource(lng, ns, key, value) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        silent: false
      };
      var keySeparator = this.options.keySeparator;
      if (keySeparator === undefined) keySeparator = '.';
      var path = [lng, ns];
      if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        value = ns;
        ns = path[1];
      }

      this.addNamespaces(ns);
      setPath(this.data, path, value);
      if (!options.silent) this.emit('added', lng, ns, key, value);
    }
  }, {
    key: "addResources",
    value: function addResources(lng, ns, resources) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        silent: false
      };

      for (var m in resources) {
        if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
          silent: true
        });
      }

      if (!options.silent) this.emit('added', lng, ns, resources);
    }
  }, {
    key: "addResourceBundle",
    value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
        silent: false
      };
      var path = [lng, ns];

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        deep = resources;
        resources = ns;
        ns = path[1];
      }

      this.addNamespaces(ns);
      var pack = getPath(this.data, path) || {};

      if (deep) {
        deepExtend(pack, resources, overwrite);
      } else {
        pack = _objectSpread({}, pack, resources);
      }

      setPath(this.data, path, pack);
      if (!options.silent) this.emit('added', lng, ns, resources);
    }
  }, {
    key: "removeResourceBundle",
    value: function removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }

      this.removeNamespaces(ns);
      this.emit('removed', lng, ns);
    }
  }, {
    key: "hasResourceBundle",
    value: function hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== undefined;
    }
  }, {
    key: "getResourceBundle",
    value: function getResourceBundle(lng, ns) {
      if (!ns) ns = this.options.defaultNS;
      if (this.options.compatibilityAPI === 'v1') return _objectSpread({}, {}, this.getResource(lng, ns));
      return this.getResource(lng, ns);
    }
  }, {
    key: "getDataByLanguage",
    value: function getDataByLanguage(lng) {
      return this.data[lng];
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.data;
    }
  }]);

  return ResourceStore;
}(EventEmitter);

var postProcessor = {
  processors: {},
  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;

    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });
    return value;
  }
};

var checkedLoadedFor = {};

var Translator = function (_EventEmitter) {
  _inherits(Translator, _EventEmitter);

  function Translator(services) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Translator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Translator).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, _assertThisInitialized(_this));
    _this.options = options;

    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }

    _this.logger = baseLogger.create('translator');
    return _this;
  }

  _createClass(Translator, [{
    key: "changeLanguage",
    value: function changeLanguage(lng) {
      if (lng) this.language = lng;
    }
  }, {
    key: "exists",
    value: function exists(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      var resolved = this.resolve(key, options);
      return resolved && resolved.res !== undefined;
    }
  }, {
    key: "extractFromKey",
    value: function extractFromKey(key, options) {
      var nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
      if (nsSeparator === undefined) nsSeparator = ':';
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var namespaces = options.ns || this.options.defaultNS;

      if (nsSeparator && key.indexOf(nsSeparator) > -1) {
        var m = key.match(this.interpolator.nestingRegexp);

        if (m && m.length > 0) {
          return {
            key: key,
            namespaces: namespaces
          };
        }

        var parts = key.split(nsSeparator);
        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
        key = parts.join(keySeparator);
      }

      if (typeof namespaces === 'string') namespaces = [namespaces];
      return {
        key: key,
        namespaces: namespaces
      };
    }
  }, {
    key: "translate",
    value: function translate(keys, options, lastKey) {
      var _this2 = this;

      if (_typeof(options) !== 'object' && this.options.overloadTranslationOptionHandler) {
        options = this.options.overloadTranslationOptionHandler(arguments);
      }

      if (!options) options = {};
      if (keys === undefined || keys === null) return '';
      if (!Array.isArray(keys)) keys = [String(keys)];
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;

      var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
          key = _this$extractFromKey.key,
          namespaces = _this$extractFromKey.namespaces;

      var namespace = namespaces[namespaces.length - 1];
      var lng = options.lng || this.language;
      var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;

      if (lng && lng.toLowerCase() === 'cimode') {
        if (appendNamespaceToCIMode) {
          var nsSeparator = options.nsSeparator || this.options.nsSeparator;
          return namespace + nsSeparator + key;
        }

        return key;
      }

      var resolved = this.resolve(keys, options);
      var res = resolved && resolved.res;
      var resUsedKey = resolved && resolved.usedKey || key;
      var resExactUsedKey = resolved && resolved.exactUsedKey || key;
      var resType = Object.prototype.toString.apply(res);
      var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
      var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
      var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
      var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';

      if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
        if (!options.returnObjects && !this.options.returnObjects) {
          this.logger.warn('accessing an object - but returnObjects options is not enabled!');
          return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, options) : "key '".concat(key, " (").concat(this.language, ")' returned an object instead of string.");
        }

        if (keySeparator) {
          var resTypeIsArray = resType === '[object Array]';
          var copy = resTypeIsArray ? [] : {};
          var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;

          for (var m in res) {
            if (Object.prototype.hasOwnProperty.call(res, m)) {
              var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
              copy[m] = this.translate(deepKey, _objectSpread({}, options, {
                joinArrays: false,
                ns: namespaces
              }));
              if (copy[m] === deepKey) copy[m] = res[m];
            }
          }

          res = copy;
        }
      } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
        res = res.join(joinArrays);
        if (res) res = this.extendTranslation(res, keys, options, lastKey);
      } else {
        var usedDefault = false;
        var usedKey = false;

        if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
          usedDefault = true;

          if (options.count !== undefined) {
            var suffix = this.pluralResolver.getSuffix(lng, options.count);
            res = options["defaultValue".concat(suffix)];
          }

          if (!res) res = options.defaultValue;
        }

        if (!this.isValidLookup(res)) {
          usedKey = true;
          res = key;
        }

        var updateMissing = options.defaultValue && options.defaultValue !== res && this.options.updateMissing;

        if (usedKey || usedDefault || updateMissing) {
          this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? options.defaultValue : res);

          if (keySeparator) {
            var fk = this.resolve(key, _objectSpread({}, options, {
              keySeparator: false
            }));
            if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
          }

          var lngs = [];
          var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);

          if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
            for (var i = 0; i < fallbackLngs.length; i++) {
              lngs.push(fallbackLngs[i]);
            }
          } else if (this.options.saveMissingTo === 'all') {
            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
          } else {
            lngs.push(options.lng || this.language);
          }

          var send = function send(l, k) {
            if (_this2.options.missingKeyHandler) {
              _this2.options.missingKeyHandler(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
            } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
              _this2.backendConnector.saveMissing(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
            }

            _this2.emit('missingKey', l, namespace, k, res);
          };

          if (this.options.saveMissing) {
            var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';

            if (this.options.saveMissingPlurals && needsPluralHandling) {
              lngs.forEach(function (l) {
                var plurals = _this2.pluralResolver.getPluralFormsOfKey(l, key);

                plurals.forEach(function (p) {
                  return send([l], p);
                });
              });
            } else {
              send(lngs, key);
            }
          }
        }

        res = this.extendTranslation(res, keys, options, resolved, lastKey);
        if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = "".concat(namespace, ":").concat(key);
        if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
      }

      return res;
    }
  }, {
    key: "extendTranslation",
    value: function extendTranslation(res, key, options, resolved, lastKey) {
      var _this3 = this;

      if (this.i18nFormat && this.i18nFormat.parse) {
        res = this.i18nFormat.parse(res, options, resolved.usedLng, resolved.usedNS, resolved.usedKey, {
          resolved: resolved
        });
      } else if (!options.skipInterpolation) {
        if (options.interpolation) this.interpolator.init(_objectSpread({}, options, {
          interpolation: _objectSpread({}, this.options.interpolation, options.interpolation)
        }));
        var skipOnVariables = options.interpolation && options.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
        var nestBef;

        if (skipOnVariables) {
          var nb = res.match(this.interpolator.nestingRegexp);
          nestBef = nb && nb.length;
        }

        var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
        if (this.options.interpolation.defaultVariables) data = _objectSpread({}, this.options.interpolation.defaultVariables, data);
        res = this.interpolator.interpolate(res, data, options.lng || this.language, options);

        if (skipOnVariables) {
          var na = res.match(this.interpolator.nestingRegexp);
          var nestAft = na && na.length;
          if (nestBef < nestAft) options.nest = false;
        }

        if (options.nest !== false) res = this.interpolator.nest(res, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (lastKey && lastKey[0] === args[0] && !options.context) {
            _this3.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key[0]));

            return null;
          }

          return _this3.translate.apply(_this3, args.concat([key]));
        }, options);
        if (options.interpolation) this.interpolator.reset();
      }

      var postProcess = options.postProcess || this.options.postProcess;
      var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

      if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
        res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? _objectSpread({
          i18nResolved: resolved
        }, options) : options, this);
      }

      return res;
    }
  }, {
    key: "resolve",
    value: function resolve(keys) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var found;
      var usedKey;
      var exactUsedKey;
      var usedLng;
      var usedNS;
      if (typeof keys === 'string') keys = [keys];
      keys.forEach(function (k) {
        if (_this4.isValidLookup(found)) return;

        var extracted = _this4.extractFromKey(k, options);

        var key = extracted.key;
        usedKey = key;
        var namespaces = extracted.namespaces;
        if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);
        var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
        var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';
        var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);
        namespaces.forEach(function (ns) {
          if (_this4.isValidLookup(found)) return;
          usedNS = ns;

          if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && _this4.utils && _this4.utils.hasLoadedNamespace && !_this4.utils.hasLoadedNamespace(usedNS)) {
            checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;

            _this4.logger.warn("key \"".concat(usedKey, "\" for languages \"").concat(codes.join(', '), "\" won't get resolved as namespace \"").concat(usedNS, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
          }

          codes.forEach(function (code) {
            if (_this4.isValidLookup(found)) return;
            usedLng = code;
            var finalKey = key;
            var finalKeys = [finalKey];

            if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
              _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
            } else {
              var pluralSuffix;
              if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count);
              if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);
              if (needsContextHandling) finalKeys.push(finalKey += "".concat(_this4.options.contextSeparator).concat(options.context));
              if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);
            }

            var possibleKey;

            while (possibleKey = finalKeys.pop()) {
              if (!_this4.isValidLookup(found)) {
                exactUsedKey = possibleKey;
                found = _this4.getResource(code, ns, possibleKey, options);
              }
            }
          });
        });
      });
      return {
        res: found,
        usedKey: usedKey,
        exactUsedKey: exactUsedKey,
        usedLng: usedLng,
        usedNS: usedNS
      };
    }
  }, {
    key: "isValidLookup",
    value: function isValidLookup(res) {
      return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
    }
  }, {
    key: "getResource",
    value: function getResource(code, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
      return this.resourceStore.getResource(code, ns, key, options);
    }
  }]);

  return Translator;
}(EventEmitter);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var LanguageUtil = function () {
  function LanguageUtil(options) {
    _classCallCheck(this, LanguageUtil);

    this.options = options;
    this.whitelist = this.options.supportedLngs || false;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create('languageUtils');
  }

  _createClass(LanguageUtil, [{
    key: "getScriptPartFromCode",
    value: function getScriptPartFromCode(code) {
      if (!code || code.indexOf('-') < 0) return null;
      var p = code.split('-');
      if (p.length === 2) return null;
      p.pop();
      if (p[p.length - 1].toLowerCase() === 'x') return null;
      return this.formatLanguageCode(p.join('-'));
    }
  }, {
    key: "getLanguagePartFromCode",
    value: function getLanguagePartFromCode(code) {
      if (!code || code.indexOf('-') < 0) return code;
      var p = code.split('-');
      return this.formatLanguageCode(p[0]);
    }
  }, {
    key: "formatLanguageCode",
    value: function formatLanguageCode(code) {
      if (typeof code === 'string' && code.indexOf('-') > -1) {
        var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
        var p = code.split('-');

        if (this.options.lowerCaseLng) {
          p = p.map(function (part) {
            return part.toLowerCase();
          });
        } else if (p.length === 2) {
          p[0] = p[0].toLowerCase();
          p[1] = p[1].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        } else if (p.length === 3) {
          p[0] = p[0].toLowerCase();
          if (p[1].length === 2) p[1] = p[1].toUpperCase();
          if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
          if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
        }

        return p.join('-');
      }

      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  }, {
    key: "isWhitelisted",
    value: function isWhitelisted(code) {
      this.logger.deprecate('languageUtils.isWhitelisted', 'function "isWhitelisted" will be renamed to "isSupportedCode" in the next major - please make sure to rename it\'s usage asap.');
      return this.isSupportedCode(code);
    }
  }, {
    key: "isSupportedCode",
    value: function isSupportedCode(code) {
      if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
        code = this.getLanguagePartFromCode(code);
      }

      return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
    }
  }, {
    key: "getBestMatchFromCodes",
    value: function getBestMatchFromCodes(codes) {
      var _this = this;

      if (!codes) return null;
      var found;
      codes.forEach(function (code) {
        if (found) return;

        var cleanedLng = _this.formatLanguageCode(code);

        if (!_this.options.supportedLngs || _this.isSupportedCode(cleanedLng)) found = cleanedLng;
      });

      if (!found && this.options.supportedLngs) {
        codes.forEach(function (code) {
          if (found) return;

          var lngOnly = _this.getLanguagePartFromCode(code);

          if (_this.isSupportedCode(lngOnly)) return found = lngOnly;
          found = _this.options.supportedLngs.find(function (supportedLng) {
            if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
          });
        });
      }

      if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
      return found;
    }
  }, {
    key: "getFallbackCodes",
    value: function getFallbackCodes(fallbacks, code) {
      if (!fallbacks) return [];
      if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
      if (typeof fallbacks === 'string') fallbacks = [fallbacks];
      if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
      if (!code) return fallbacks["default"] || [];
      var found = fallbacks[code];
      if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
      if (!found) found = fallbacks[this.formatLanguageCode(code)];
      if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
      if (!found) found = fallbacks["default"];
      return found || [];
    }
  }, {
    key: "toResolveHierarchy",
    value: function toResolveHierarchy(code, fallbackCode) {
      var _this2 = this;

      var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
      var codes = [];

      var addCode = function addCode(c) {
        if (!c) return;

        if (_this2.isSupportedCode(c)) {
          codes.push(c);
        } else {
          _this2.logger.warn("rejecting language code not found in supportedLngs: ".concat(c));
        }
      };

      if (typeof code === 'string' && code.indexOf('-') > -1) {
        if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
        if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
        if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
      } else if (typeof code === 'string') {
        addCode(this.formatLanguageCode(code));
      }

      fallbackCodes.forEach(function (fc) {
        if (codes.indexOf(fc) < 0) addCode(_this2.formatLanguageCode(fc));
      });
      return codes;
    }
  }]);

  return LanguageUtil;
}();

var sets = [{
  lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'ti', 'tr', 'uz', 'wa'],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
  nr: [1],
  fc: 3
}, {
  lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ['ar'],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ['cs', 'sk'],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ['csb', 'pl'],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ['cy'],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ['fr'],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ['ga'],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ['gd'],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ['is'],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ['jv'],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ['kw'],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ['lt'],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ['lv'],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ['mk'],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ['mnk'],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ['mt'],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ['or'],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ['ro'],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ['sl'],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ['he', 'iw'],
  nr: [1, 2, 20, 21],
  fc: 22
}];
var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  },
  22: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
  }
};

function createRules() {
  var rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}

var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PluralResolver);

    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create('pluralResolver');
    this.rules = createRules();
  }

  _createClass(PluralResolver, [{
    key: "addRule",
    value: function addRule(lng, obj) {
      this.rules[lng] = obj;
    }
  }, {
    key: "getRule",
    value: function getRule(code) {
      return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
    }
  }, {
    key: "needsPlural",
    value: function needsPlural(code) {
      var rule = this.getRule(code);
      return rule && rule.numbers.length > 1;
    }
  }, {
    key: "getPluralFormsOfKey",
    value: function getPluralFormsOfKey(code, key) {
      var _this = this;

      var ret = [];
      var rule = this.getRule(code);
      if (!rule) return ret;
      rule.numbers.forEach(function (n) {
        var suffix = _this.getSuffix(code, n);

        ret.push("".concat(key).concat(suffix));
      });
      return ret;
    }
  }, {
    key: "getSuffix",
    value: function getSuffix(code, count) {
      var _this2 = this;

      var rule = this.getRule(code);

      if (rule) {
        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
        var suffix = rule.numbers[idx];

        if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
          if (suffix === 2) {
            suffix = 'plural';
          } else if (suffix === 1) {
            suffix = '';
          }
        }

        var returnSuffix = function returnSuffix() {
          return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
        };

        if (this.options.compatibilityJSON === 'v1') {
          if (suffix === 1) return '';
          if (typeof suffix === 'number') return "_plural_".concat(suffix.toString());
          return returnSuffix();
        } else if (this.options.compatibilityJSON === 'v2') {
          return returnSuffix();
        } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
          return returnSuffix();
        }

        return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
      }

      this.logger.warn("no plural rule found for: ".concat(code));
      return '';
    }
  }]);

  return PluralResolver;
}();

var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Interpolator);

    this.logger = baseLogger.create('interpolator');
    this.options = options;

    this.format = options.interpolation && options.interpolation.format || function (value) {
      return value;
    };

    this.init(options);
  }

  _createClass(Interpolator, [{
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!options.interpolation) options.interpolation = {
        escapeValue: true
      };
      var iOpts = options.interpolation;
      this.escape = iOpts.escape !== undefined ? iOpts.escape : i18next_escape;
      this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
      this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
      this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
      this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
      this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
      this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
      this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
      this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
      this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
      this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
      this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
      this.resetRegExp();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.options) this.init(this.options);
    }
  }, {
    key: "resetRegExp",
    value: function resetRegExp() {
      var regexpStr = "".concat(this.prefix, "(.+?)").concat(this.suffix);
      this.regexp = new RegExp(regexpStr, 'g');
      var regexpUnescapeStr = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
      this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
      var nestingRegexpStr = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
      this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
    }
  }, {
    key: "interpolate",
    value: function interpolate(str, data, lng, options) {
      var _this = this;

      var match;
      var value;
      var replaces;
      var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};

      function regexSafe(val) {
        return val.replace(/\$/g, '$$$$');
      }

      var handleFormat = function handleFormat(key) {
        if (key.indexOf(_this.formatSeparator) < 0) {
          var path = getPathWithDefaults(data, defaultData, key);
          return _this.alwaysFormat ? _this.format(path, undefined, lng) : path;
        }

        var p = key.split(_this.formatSeparator);
        var k = p.shift().trim();
        var f = p.join(_this.formatSeparator).trim();
        return _this.format(getPathWithDefaults(data, defaultData, k), f, lng, options);
      };

      this.resetRegExp();
      var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
      var skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
      var todos = [{
        regex: this.regexpUnescape,
        safeValue: function safeValue(val) {
          return regexSafe(val);
        }
      }, {
        regex: this.regexp,
        safeValue: function safeValue(val) {
          return _this.escapeValue ? regexSafe(_this.escape(val)) : regexSafe(val);
        }
      }];
      todos.forEach(function (todo) {
        replaces = 0;

        while (match = todo.regex.exec(str)) {
          value = handleFormat(match[1].trim());

          if (value === undefined) {
            if (typeof missingInterpolationHandler === 'function') {
              var temp = missingInterpolationHandler(str, match, options);
              value = typeof temp === 'string' ? temp : '';
            } else if (skipOnVariables) {
              value = match[0];
              continue;
            } else {
              _this.logger.warn("missed to pass in variable ".concat(match[1], " for interpolating ").concat(str));

              value = '';
            }
          } else if (typeof value !== 'string' && !_this.useRawValueToEscape) {
            value = makeString(value);
          }

          str = str.replace(match[0], todo.safeValue(value));
          todo.regex.lastIndex = 0;
          replaces++;

          if (replaces >= _this.maxReplaces) {
            break;
          }
        }
      });
      return str;
    }
  }, {
    key: "nest",
    value: function nest(str, fc) {
      var _this2 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var match;
      var value;

      var clonedOptions = _objectSpread({}, options);

      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;

      function handleHasOptions(key, inheritedOptions) {
        var sep = this.nestingOptionsSeparator;
        if (key.indexOf(sep) < 0) return key;
        var c = key.split(new RegExp("".concat(sep, "[ ]*{")));
        var optionsString = "{".concat(c[1]);
        key = c[0];
        optionsString = this.interpolate(optionsString, clonedOptions);
        optionsString = optionsString.replace(/'/g, '"');

        try {
          clonedOptions = JSON.parse(optionsString);
          if (inheritedOptions) clonedOptions = _objectSpread({}, inheritedOptions, clonedOptions);
        } catch (e) {
          this.logger.warn("failed parsing options string in nesting for key ".concat(key), e);
          return "".concat(key).concat(sep).concat(optionsString);
        }

        delete clonedOptions.defaultValue;
        return key;
      }

      while (match = this.nestingRegexp.exec(str)) {
        var formatters = [];
        var doReduce = false;

        if (match[0].includes(this.formatSeparator) && !/{.*}/.test(match[1])) {
          var r = match[1].split(this.formatSeparator).map(function (elem) {
            return elem.trim();
          });
          match[1] = r.shift();
          formatters = r;
          doReduce = true;
        }

        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
        if (value && match[0] === str && typeof value !== 'string') return value;
        if (typeof value !== 'string') value = makeString(value);

        if (!value) {
          this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
          value = '';
        }

        if (doReduce) {
          value = formatters.reduce(function (v, f) {
            return _this2.format(v, f, options.lng, options);
          }, value.trim());
        }

        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
      }

      return str;
    }
  }]);

  return Interpolator;
}();

function remove(arr, what) {
  var found = arr.indexOf(what);

  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}

var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(backend, store, services) {
    var _this;

    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Connector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Connector).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    _this.backend = backend;
    _this.store = store;
    _this.services = services;
    _this.languageUtils = services.languageUtils;
    _this.options = options;
    _this.logger = baseLogger.create('backendConnector');
    _this.state = {};
    _this.queue = [];

    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options.backend, options);
    }

    return _this;
  }

  _createClass(Connector, [{
    key: "queueLoad",
    value: function queueLoad(languages, namespaces, options, callback) {
      var _this2 = this;

      var toLoad = [];
      var pending = [];
      var toLoadLanguages = [];
      var toLoadNamespaces = [];
      languages.forEach(function (lng) {
        var hasAllNamespaces = true;
        namespaces.forEach(function (ns) {
          var name = "".concat(lng, "|").concat(ns);

          if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
            _this2.state[name] = 2;
          } else if (_this2.state[name] < 0) ; else if (_this2.state[name] === 1) {
            if (pending.indexOf(name) < 0) pending.push(name);
          } else {
            _this2.state[name] = 1;
            hasAllNamespaces = false;
            if (pending.indexOf(name) < 0) pending.push(name);
            if (toLoad.indexOf(name) < 0) toLoad.push(name);
            if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
          }
        });
        if (!hasAllNamespaces) toLoadLanguages.push(lng);
      });

      if (toLoad.length || pending.length) {
        this.queue.push({
          pending: pending,
          loaded: {},
          errors: [],
          callback: callback
        });
      }

      return {
        toLoad: toLoad,
        pending: pending,
        toLoadLanguages: toLoadLanguages,
        toLoadNamespaces: toLoadNamespaces
      };
    }
  }, {
    key: "loaded",
    value: function loaded(name, err, data) {
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      if (err) this.emit('failedLoading', lng, ns, err);

      if (data) {
        this.store.addResourceBundle(lng, ns, data);
      }

      this.state[name] = err ? -1 : 2;
      var loaded = {};
      this.queue.forEach(function (q) {
        pushPath(q.loaded, [lng], ns);
        remove(q.pending, name);
        if (err) q.errors.push(err);

        if (q.pending.length === 0 && !q.done) {
          Object.keys(q.loaded).forEach(function (l) {
            if (!loaded[l]) loaded[l] = [];

            if (q.loaded[l].length) {
              q.loaded[l].forEach(function (ns) {
                if (loaded[l].indexOf(ns) < 0) loaded[l].push(ns);
              });
            }
          });
          q.done = true;

          if (q.errors.length) {
            q.callback(q.errors);
          } else {
            q.callback();
          }
        }
      });
      this.emit('loaded', loaded);
      this.queue = this.queue.filter(function (q) {
        return !q.done;
      });
    }
  }, {
    key: "read",
    value: function read(lng, ns, fcName) {
      var _this3 = this;

      var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 350;
      var callback = arguments.length > 5 ? arguments[5] : undefined;
      if (!lng.length) return callback(null, {});
      return this.backend[fcName](lng, ns, function (err, data) {
        if (err && data && tried < 5) {
          setTimeout(function () {
            _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
          }, wait);
          return;
        }

        callback(err, data);
      });
    }
  }, {
    key: "prepareLoading",
    value: function prepareLoading(languages, namespaces) {
      var _this4 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = arguments.length > 3 ? arguments[3] : undefined;

      if (!this.backend) {
        this.logger.warn('No backend was added via i18next.use. Will not load resources.');
        return callback && callback();
      }

      if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
      if (typeof namespaces === 'string') namespaces = [namespaces];
      var toLoad = this.queueLoad(languages, namespaces, options, callback);

      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length) callback();
        return null;
      }

      toLoad.toLoad.forEach(function (name) {
        _this4.loadOne(name);
      });
    }
  }, {
    key: "load",
    value: function load(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {}, callback);
    }
  }, {
    key: "reload",
    value: function reload(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {
        reload: true
      }, callback);
    }
  }, {
    key: "loadOne",
    value: function loadOne(name) {
      var _this5 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      this.read(lng, ns, 'read', undefined, undefined, function (err, data) {
        if (err) _this5.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
        if (!err && data) _this5.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);

        _this5.loaded(name, err, data);
      });
    }
  }, {
    key: "saveMissing",
    value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

      if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
        this.logger.warn("did not save key \"".concat(key, "\" as the namespace \"").concat(namespace, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        return;
      }

      if (key === undefined || key === null || key === '') return;

      if (this.backend && this.backend.create) {
        this.backend.create(languages, namespace, key, fallbackValue, null, _objectSpread({}, options, {
          isUpdate: isUpdate
        }));
      }

      if (!languages || !languages[0]) return;
      this.store.addResource(languages[0], namespace, key, fallbackValue);
    }
  }]);

  return Connector;
}(EventEmitter);

function get() {
  return {
    debug: false,
    initImmediate: true,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false,
    whitelist: false,
    nonExplicitWhitelist: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: 'all',
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: 'fallback',
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: true,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      var ret = {};
      if (_typeof(args[1]) === 'object') ret = args[1];
      if (typeof args[1] === 'string') ret.defaultValue = args[1];
      if (typeof args[2] === 'string') ret.tDescription = args[2];

      if (_typeof(args[2]) === 'object' || _typeof(args[3]) === 'object') {
        var options = args[3] || args[2];
        Object.keys(options).forEach(function (key) {
          ret[key] = options[key];
        });
      }

      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng, options) {
        return value;
      },
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1000,
      skipOnVariables: false
    }
  };
}
function transformOptions(options) {
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

  if (options.whitelist) {
    if (options.whitelist && options.whitelist.indexOf('cimode') < 0) {
      options.whitelist = options.whitelist.concat(['cimode']);
    }

    options.supportedLngs = options.whitelist;
  }

  if (options.nonExplicitWhitelist) {
    options.nonExplicitSupportedLngs = options.nonExplicitWhitelist;
  }

  if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
    options.supportedLngs = options.supportedLngs.concat(['cimode']);
  }

  return options;
}

function noop() {}

var I18n = function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  function I18n() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, I18n);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(I18n).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    _this.options = transformOptions(options);
    _this.services = {};
    _this.logger = baseLogger;
    _this.modules = {
      external: []
    };

    if (callback && !_this.isInitialized && !options.isClone) {
      if (!_this.options.initImmediate) {
        _this.init(options, callback);

        return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
      }

      setTimeout(function () {
        _this.init(options, callback);
      }, 0);
    }

    return _this;
  }

  _createClass(I18n, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.whitelist && !options.supportedLngs) {
        this.logger.deprecate('whitelist', 'option "whitelist" will be renamed to "supportedLngs" in the next major - please make sure to rename this option asap.');
      }

      if (options.nonExplicitWhitelist && !options.nonExplicitSupportedLngs) {
        this.logger.deprecate('whitelist', 'options "nonExplicitWhitelist" will be renamed to "nonExplicitSupportedLngs" in the next major - please make sure to rename this option asap.');
      }

      this.options = _objectSpread({}, get(), this.options, transformOptions(options));
      this.format = this.options.interpolation.format;
      if (!callback) callback = noop;

      function createClassOnDemand(ClassOrObject) {
        if (!ClassOrObject) return null;
        if (typeof ClassOrObject === 'function') return new ClassOrObject();
        return ClassOrObject;
      }

      if (!this.options.isClone) {
        if (this.modules.logger) {
          baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          baseLogger.init(null, this.options);
        }

        var lu = new LanguageUtil(this.options);
        this.store = new ResourceStore(this.options.resources, this.options);
        var s = this.services;
        s.logger = baseLogger;
        s.resourceStore = this.store;
        s.languageUtils = lu;
        s.pluralResolver = new PluralResolver(lu, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        });
        s.interpolator = new Interpolator(this.options);
        s.utils = {
          hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
        };
        s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
        s.backendConnector.on('*', function (event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          _this2.emit.apply(_this2, [event].concat(args));
        });

        if (this.modules.languageDetector) {
          s.languageDetector = createClassOnDemand(this.modules.languageDetector);
          s.languageDetector.init(s, this.options.detection, this.options);
        }

        if (this.modules.i18nFormat) {
          s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
          if (s.i18nFormat.init) s.i18nFormat.init(this);
        }

        this.translator = new Translator(this.services, this.options);
        this.translator.on('*', function (event) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          _this2.emit.apply(_this2, [event].concat(args));
        });
        this.modules.external.forEach(function (m) {
          if (m.init) m.init(_this2);
        });
      }

      if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
        var codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
      }

      if (!this.services.languageDetector && !this.options.lng) {
        this.logger.warn('init: no languageDetector is used and no lng is defined');
      }

      var storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
      storeApi.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store;

          return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
        };
      });
      var storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
      storeApiChained.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store2;

          (_this2$store2 = _this2.store)[fcName].apply(_this2$store2, arguments);

          return _this2;
        };
      });
      var deferred = defer();

      var load = function load() {
        _this2.changeLanguage(_this2.options.lng, function (err, t) {
          _this2.isInitialized = true;
          if (!_this2.options.isClone) _this2.logger.log('initialized', _this2.options);

          _this2.emit('initialized', _this2.options);

          deferred.resolve(t);
          callback(err, t);
        });
      };

      if (this.options.resources || !this.options.initImmediate) {
        load();
      } else {
        setTimeout(load, 0);
      }

      return deferred;
    }
  }, {
    key: "loadResources",
    value: function loadResources(language) {
      var _this3 = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var usedCallback = callback;
      var usedLng = typeof language === 'string' ? language : this.language;
      if (typeof language === 'function') usedCallback = language;

      if (!this.options.resources || this.options.partialBundledLanguages) {
        if (usedLng && usedLng.toLowerCase() === 'cimode') return usedCallback();
        var toLoad = [];

        var append = function append(lng) {
          if (!lng) return;

          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);

          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };

        if (!usedLng) {
          var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          fallbacks.forEach(function (l) {
            return append(l);
          });
        } else {
          append(usedLng);
        }

        if (this.options.preload) {
          this.options.preload.forEach(function (l) {
            return append(l);
          });
        }

        this.services.backendConnector.load(toLoad, this.options.ns, usedCallback);
      } else {
        usedCallback(null);
      }
    }
  }, {
    key: "reloadResources",
    value: function reloadResources(lngs, ns, callback) {
      var deferred = defer();
      if (!lngs) lngs = this.languages;
      if (!ns) ns = this.options.ns;
      if (!callback) callback = noop;
      this.services.backendConnector.reload(lngs, ns, function (err) {
        deferred.resolve();
        callback(err);
      });
      return deferred;
    }
  }, {
    key: "use",
    value: function use(module) {
      if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
      if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');

      if (module.type === 'backend') {
        this.modules.backend = module;
      }

      if (module.type === 'logger' || module.log && module.warn && module.error) {
        this.modules.logger = module;
      }

      if (module.type === 'languageDetector') {
        this.modules.languageDetector = module;
      }

      if (module.type === 'i18nFormat') {
        this.modules.i18nFormat = module;
      }

      if (module.type === 'postProcessor') {
        postProcessor.addPostProcessor(module);
      }

      if (module.type === '3rdParty') {
        this.modules.external.push(module);
      }

      return this;
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage(lng, callback) {
      var _this4 = this;

      this.isLanguageChangingTo = lng;
      var deferred = defer();
      this.emit('languageChanging', lng);

      var done = function done(err, l) {
        if (l) {
          _this4.language = l;
          _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);

          _this4.translator.changeLanguage(l);

          _this4.isLanguageChangingTo = undefined;

          _this4.emit('languageChanged', l);

          _this4.logger.log('languageChanged', l);
        } else {
          _this4.isLanguageChangingTo = undefined;
        }

        deferred.resolve(function () {
          return _this4.t.apply(_this4, arguments);
        });
        if (callback) callback(err, function () {
          return _this4.t.apply(_this4, arguments);
        });
      };

      var setLng = function setLng(lngs) {
        var l = typeof lngs === 'string' ? lngs : _this4.services.languageUtils.getBestMatchFromCodes(lngs);

        if (l) {
          if (!_this4.language) {
            _this4.language = l;
            _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
          }

          if (!_this4.translator.language) _this4.translator.changeLanguage(l);
          if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);
        }

        _this4.loadResources(l, function (err) {
          done(err, l);
        });
      };

      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
        setLng(this.services.languageDetector.detect());
      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
        this.services.languageDetector.detect(setLng);
      } else {
        setLng(lng);
      }

      return deferred;
    }
  }, {
    key: "getFixedT",
    value: function getFixedT(lng, ns) {
      var _this5 = this;

      var fixedT = function fixedT(key, opts) {
        var options;

        if (_typeof(opts) !== 'object') {
          for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }

          options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
        } else {
          options = _objectSpread({}, opts);
        }

        options.lng = options.lng || fixedT.lng;
        options.lngs = options.lngs || fixedT.lngs;
        options.ns = options.ns || fixedT.ns;
        return _this5.t(key, options);
      };

      if (typeof lng === 'string') {
        fixedT.lng = lng;
      } else {
        fixedT.lngs = lng;
      }

      fixedT.ns = ns;
      return fixedT;
    }
  }, {
    key: "t",
    value: function t() {
      var _this$translator;

      return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
    }
  }, {
    key: "exists",
    value: function exists() {
      var _this$translator2;

      return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
    }
  }, {
    key: "setDefaultNamespace",
    value: function setDefaultNamespace(ns) {
      this.options.defaultNS = ns;
    }
  }, {
    key: "hasLoadedNamespace",
    value: function hasLoadedNamespace(ns) {
      var _this6 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.isInitialized) {
        this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
        return false;
      }

      if (!this.languages || !this.languages.length) {
        this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
        return false;
      }

      var lng = this.languages[0];
      var fallbackLng = this.options ? this.options.fallbackLng : false;
      var lastLng = this.languages[this.languages.length - 1];
      if (lng.toLowerCase() === 'cimode') return true;

      var loadNotPending = function loadNotPending(l, n) {
        var loadState = _this6.services.backendConnector.state["".concat(l, "|").concat(n)];

        return loadState === -1 || loadState === 2;
      };

      if (options.precheck) {
        var preResult = options.precheck(this, loadNotPending);
        if (preResult !== undefined) return preResult;
      }

      if (this.hasResourceBundle(lng, ns)) return true;
      if (!this.services.backendConnector.backend) return true;
      if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
      return false;
    }
  }, {
    key: "loadNamespaces",
    value: function loadNamespaces(ns, callback) {
      var _this7 = this;

      var deferred = defer();

      if (!this.options.ns) {
        callback && callback();
        return Promise.resolve();
      }

      if (typeof ns === 'string') ns = [ns];
      ns.forEach(function (n) {
        if (_this7.options.ns.indexOf(n) < 0) _this7.options.ns.push(n);
      });
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "loadLanguages",
    value: function loadLanguages(lngs, callback) {
      var deferred = defer();
      if (typeof lngs === 'string') lngs = [lngs];
      var preloaded = this.options.preload || [];
      var newLngs = lngs.filter(function (lng) {
        return preloaded.indexOf(lng) < 0;
      });

      if (!newLngs.length) {
        if (callback) callback();
        return Promise.resolve();
      }

      this.options.preload = preloaded.concat(newLngs);
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "dir",
    value: function dir(lng) {
      if (!lng) lng = this.languages && this.languages.length > 0 ? this.languages[0] : this.language;
      if (!lng) return 'rtl';
      var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];
      return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
    }
  }, {
    key: "createInstance",
    value: function createInstance() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      return new I18n(options, callback);
    }
  }, {
    key: "cloneInstance",
    value: function cloneInstance() {
      var _this8 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      var mergedOptions = _objectSpread({}, this.options, options, {
        isClone: true
      });

      var clone = new I18n(mergedOptions);
      var membersToCopy = ['store', 'services', 'language'];
      membersToCopy.forEach(function (m) {
        clone[m] = _this8[m];
      });
      clone.services = _objectSpread({}, this.services);
      clone.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      clone.translator = new Translator(clone.services, clone.options);
      clone.translator.on('*', function (event) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        clone.emit.apply(clone, [event].concat(args));
      });
      clone.init(mergedOptions, callback);
      clone.translator.options = clone.options;
      clone.translator.backendConnector.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      return clone;
    }
  }]);

  return I18n;
}(EventEmitter);

var i18next_i18next = new I18n();

/* harmony default export */ const esm_i18next = (i18next_i18next);

;// CONCATENATED MODULE: ./src/translations.ts
/* harmony default export */ const translations = ({
  en: {
    translation: {
      please_login: 'To use the extension you need to log into the service.',
      unknown_error: 'An unknown error has occurred on the server, please try again later.',
      auth_error: 'An unknown error occurred while transferring authorization data, please log in to the service again.',
      loading: 'Loading...',
      no_words_found: 'Word was not found in the dictionary.',
      added_to_user_dictionary: 'Added to your dictionary.',
      error_while_adding_to_user_dictionary: 'Unable to add word to your dictionary (server error).'
    }
  },
  ru: {
    translation: {
      please_login: 'Для использования расширения нужно авторизоваться в сервисе.',
      unknown_error: 'На сервере произошла неизвестная ошибка, пожалуйста попробуйте позже.',
      auth_error: 'Произошла неизвестная ошибка при передаче данных авторизации, пожалуйста авторизуйтесь в сервисе заново.',
      loading: 'Загрузка...',
      no_words_found: 'Слово не было найдено в словаре.',
      added_to_user_dictionary: 'Слово добавлено в ваш словарь.',
      error_while_adding_to_user_dictionary: 'Не удалось добавить слово в ваш словарь (ошибка сервера).'
    }
  }
});
;// CONCATENATED MODULE: ./src/i18n.ts


let language = navigator.language;
esm_i18next.init({
  lng: language,
  fallbackLng: 'en',
  resources: translations,
  initImmediate: false
});
const i18n = (/* unused pure expression or super */ null && (i18next));
const t = function t() {
  // @ts-ignore
  return esm_i18next.t(...arguments);
};
;// CONCATENATED MODULE: ./src/templates/index.ts
// @ts-nocheck
const modal = __webpack_require__(445);
const modalText = __webpack_require__(520);
const modalTranslation = __webpack_require__(558);
const modalStyles = __webpack_require__(887);
const snackbar = __webpack_require__(127);
const snackbarStyles = __webpack_require__(457);
;// CONCATENATED MODULE: ./src/fg/Snackbar.ts
function Snackbar_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class SnackbarOptions {
  constructor() {
    Snackbar_defineProperty(this, "duration", 3000);
  }

}

let current = null;
class Snackbar {
  constructor() {
    Snackbar_defineProperty(this, "shadowElement", void 0);

    Snackbar_defineProperty(this, "shadowRoot", void 0);

    Snackbar_defineProperty(this, "snackbarBody", void 0);

    Snackbar_defineProperty(this, "snackbarClickCallback", void 0);
  }

  show(text, options) {
    options = Object.assign(new SnackbarOptions(), options);

    if (this.shadowElement) {
      return;
    }

    if (current) {
      current.hide();
    }

    this.shadowElement = document.createElement('div');
    document.body.appendChild(this.shadowElement);
    this.shadowRoot = this.shadowElement.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = snackbarStyles({}) + snackbar({
      text: text
    });
    this.snackbarBody = this.shadowRoot.querySelector('.snackbar-container');

    this.snackbarClickCallback = e => this.snackbarClick(e);

    this.shadowRoot.addEventListener('click', this.snackbarClickCallback);
    getComputedStyle(this.snackbarBody).bottom;
    this.snackbarBody.style.opacity = "1";
    this.snackbarBody.classList.add('snackbar-pos', 'bottom-left');
    current = this;

    if (options.duration) {
      setTimeout(() => this.hide(), options.duration);
    }
  }

  snackbarClick(e) {
    this.hide();
  }

  hide() {
    if (this.snackbarBody) {
      this.snackbarBody.style.opacity = '0';

      if (current === this) {
        current = null;
      }

      this.snackbarBody.addEventListener('transitionend', event => {
        if (event.propertyName === 'opacity' && this.snackbarBody.style.opacity === '0') {
          this.dispose();
        }
      });
    }
  }

  dispose() {
    if (this.shadowElement) {
      document.body.removeChild(this.shadowElement);
      this.shadowElement = null;
    }

    if (this.snackbarClickCallback) {
      this.shadowRoot.removeEventListener('click', this.snackbarClickCallback);
      this.snackbarClickCallback = null;
    }
  }

}
function showSnackbar(text, options) {
  let snackbar = new Snackbar();
  snackbar.show(text, options);
}
;// CONCATENATED MODULE: ./src/fg/Modal.ts


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Modal_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class Modal {
  constructor() {
    Modal_defineProperty(this, "shadowElement", void 0);

    Modal_defineProperty(this, "shadowRoot", void 0);

    Modal_defineProperty(this, "modalOuter", void 0);

    Modal_defineProperty(this, "modalBody", void 0);

    Modal_defineProperty(this, "bodyClickCallback", void 0);

    Modal_defineProperty(this, "modalClickCallback", void 0);

    Modal_defineProperty(this, "currentProcessTextRequest", void 0);

    Modal_defineProperty(this, "currentProcessTextResponse", void 0);

    Modal_defineProperty(this, "width", 400);

    Modal_defineProperty(this, "height", 300);
  }

  create() {
    if (this.shadowElement) {
      return;
    }

    this.shadowElement = document.createElement("div");
    document.body.appendChild(this.shadowElement);
    this.shadowRoot = this.shadowElement.attachShadow({
      mode: "open"
    });
    this.shadowRoot.innerHTML = modalStyles({}) + modal({});
    this.modalOuter = this.shadowRoot.querySelector("#modalOuter");
    this.modalBody = this.modalOuter.querySelector("#modalBody");

    this.modalClickCallback = e => this.modalClick(e);

    this.shadowRoot.addEventListener("click", this.modalClickCallback); //this.modalOuter.querySelector('#closeModal').addEventListener('click', e => this.hide());

    this.bodyClickCallback = e => this.bodyClick(e);

    document.body.addEventListener("click", this.bodyClickCallback);
  }

  updatePosition(range) {
    let rangePos = range.getBoundingClientRect(); //let rootNode = range.startContainer.ownerDocument.documentElement;

    let rootNode = document.documentElement;
    let modalX = rangePos.x;
    let offsetY = 10;
    let modalY = rangePos.y + rangePos.height + offsetY;
    let windowWidth = rootNode.clientWidth;
    let windowHeight = rootNode.clientHeight;
    let topMode = false;
    this.width = 480;

    if (modalX + this.width > windowWidth) {
      if (windowWidth > this.width) {
        modalX = windowWidth - this.width;
      } else {
        modalX = 0;
        this.width = Math.max(windowWidth - modalX, 200);
      }
    }

    this.modalOuter.style.left = modalX + rootNode.scrollLeft + "px";
    this.height = Math.max(200, Math.floor(windowHeight * 0.6), Math.min(Math.floor(windowHeight * 0.9), 400));

    if (modalY + this.height > windowHeight) {
      // If top part is bigger than bottom's part
      let topMaxHeight = rangePos.y - offsetY;
      let bottomMaxHeight = windowHeight - rangePos.y - rangePos.height - offsetY;

      if (bottomMaxHeight < 200 && topMaxHeight > 200 && topMaxHeight > bottomMaxHeight) {
        topMode = true;
        modalY = rangePos.y - (this.height + offsetY);

        if (modalY < 0) {
          this.height = this.height + modalY; // modalY is negative, so we shrink height

          modalY = 0;
        }
      } else {
        this.height = Math.max(200, windowHeight - modalY);
      }
    }

    this.modalOuter.style.top = modalY + rootNode.scrollTop + "px";
    this.modalOuter.style.width = this.width + "px";
    this.modalOuter.style.maxHeight = this.height + "px";
    this.modalOuter.style.height = topMode ? this.height + "px" : "auto";
    this.modalOuter.style.display = "flex";
    document.dispatchEvent(new CustomEvent("langapp-modal-display"));
  }

  showRawHtml(content) {
    this.create();
    this.modalBody.innerHTML = content;
  }

  showText(text) {
    this.showRawHtml(modalText({
      text: text
    }));
  }

  showTranslations(request, response) {
    this.currentProcessTextRequest = request;
    this.currentProcessTextResponse = response;
    this.showRawHtml(modalTranslation({
      t: t,
      response,
      request
    }));
  }

  modalClick(e) {
    if (e.target instanceof HTMLElement) {
      let el = e.target;

      if (el.closest("#closeModal")) {
        this.hide();
      }

      let add = el.closest(".button-add");

      if (add) {
        this.clickOnMeaning(add);
      }

      let audio = el.closest(".word-audio");

      if (audio) {
        this.clickAudioBtn(audio);
      } // let seeAlsoBtn = <HTMLElement>el.closest(".see-also-btn");
      // if (seeAlsoBtn) {
      //   this.seeAlsoTranslates(seeAlsoBtn);
      // }
      // let moreBtn = <HTMLElement>el.closest(".btn-more");
      // if (moreBtn) {
      //   this.moreVariants();
      // }

    }
  }

  clickOnMeaning(el) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
      var wordEl, responseEl, word, request, response;
      return regenerator_default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            wordEl = el.closest(".word-variant");
            responseEl = el.closest(".response");

            if (!(!wordEl || !responseEl)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            word = JSON.parse(wordEl.dataset.word);
            request = {
              wordId: word.id,
              wordValue: word.value,
              wordType: word.type,
              meaningValue: "",
              contextText: _this.currentProcessTextRequest.text,
              contextOffset: _this.currentProcessTextRequest.offset,
              contextUrl: _this.currentProcessTextRequest.url
            };
            _context.next = 8;
            return state.apiCall("POST", "dictionaries", request);

          case 8:
            response = _context.sent;
            showSnackbar(response.success ? t("added_to_user_dictionary") : t("error_while_adding_to_user_dictionary"));

            _this.hide();

          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }

  bodyClick(e) {
    if (e.target instanceof HTMLElement) {
      if (!(e.target.shadowRoot && e.target.shadowRoot == this.shadowRoot)) {
        this.hide();
      }
    }
  }

  hide() {
    if (this.modalBody) {
      this.modalBody.innerHTML = "";
      this.modalOuter.style.display = "none";
      document.dispatchEvent(new CustomEvent("langapp-modal-hide"));
    }
  }

  dispose() {
    document.body.removeChild(this.shadowElement);
    this.shadowElement = null;
    this.shadowRoot.removeEventListener("click", this.modalClickCallback);
    this.modalClickCallback = null;
    document.removeEventListener("click", this.bodyClickCallback);
    this.bodyClickCallback = null;
  }

  seeAlsoTranslates(button) {
    const entityId = button.getAttribute("data-entity-id");
    this.showTranslations(this.currentProcessTextRequest, this.currentProcessTextResponse);
  }

  moreVariants() {
    this.showTranslations(this.currentProcessTextRequest, this.currentProcessTextResponse);
  }

  clickAudioBtn(el) {
    const audiourls = el.dataset.audiourls;
    let audioUrl = Array.isArray(audiourls) ? audiourls[0] : audiourls;
    if (!audioUrl) return;
    const audioPlayer = this.shadowElement.shadowRoot.querySelector("#audioplayer");

    if (audioPlayer) {
      audioPlayer.src = audioUrl;
      audioPlayer.play();
    } // fetch(audioUrl)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const audioUrl = URL.createObjectURL(blob);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching and playing audio:", error);
    //   });

  }

}
;// CONCATENATED MODULE: ./src/fg/TextSeeker.ts
const P = _G;

function _G(I, A) {
  const Z = V();
  return _G = function G(x, l) {
    x = x - 0x1c8;
    let C = Z[x];

    if (_G['SKEzEV'] === undefined) {
      var t = function t(q) {
        const b = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
        let T = '',
            D = '';

        for (let m = 0x0, w, j, i = 0x0; j = q['charAt'](i++); ~j && (w = m % 0x4 ? w * 0x40 + j : j, m++ % 0x4) ? T += String['fromCharCode'](0xff & w >> (-0x2 * m & 0x6)) : 0x0) {
          j = b['indexOf'](j);
        }

        for (let v = 0x0, W = T['length']; v < W; v++) {
          D += '%' + ('00' + T['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);
        }

        return decodeURIComponent(D);
      };

      _G['vgxsGN'] = t, I = arguments, _G['SKEzEV'] = !![];
    }

    const O = Z[0x0],
          e = x + O,
          S = I[e];
    return !S ? (C = _G['vgxsGN'](C), I[e] = C) : C = S, C;
  }, _G(I, A);
}

(function (A, Z) {
  const i = _G,
        x = A();

  while (!![]) {
    try {
      const l = -parseInt(i(0x1da)) / 0x1 + parseInt(i(0x1d1)) / 0x2 * (-parseInt(i(0x1e9)) / 0x3) + parseInt(i(0x1ec)) / 0x4 + -parseInt(i(0x1c9)) / 0x5 + parseInt(i(0x227)) / 0x6 + parseInt(i(0x1fd)) / 0x7 * (parseInt(i(0x20a)) / 0x8) + parseInt(i(0x210)) / 0x9;
      if (l === Z) break;else x['push'](x['shift']());
    } catch (C) {
      x['push'](x['shift']());
    }
  }
})(V, 0x6d5b3);

function V() {
  const z = ['BwLU', 'x2XPBMviyxnxAgL0zxnWywnL', 'tw96vxnLCLnLBgvJDa', 'x2nVBNrLBNq', 'vevyvf9ot0rf', 'x2DLDfDOAxrLC3bHy2vtzxr0Aw5NCW', 'x25LD2XPBMvZ', 'BM9Kzq', 'x2DLBMvYyxrLtgf5B3v0q29UDgvUDa', 'BM9Kzvr5Cgu', 'CgfYzw50tM9Kzq', 'ChvZAa', 'BMv3BgLUzxm', 'mJi3nJK4oe1tDNf2uW', 'ChjLlwXPBMu', 'qLvuve9o', 'uLvcwq', 'mJi1mtK3nw5tr3fiEq', 'C2vLAW', 'CMDIysG', 'C3rHCNrZv2L0Aa', 'z3jPza', 'x3jLC2v0t2zMC2v0', 'z2v0ugfYzw50rwXLBwvUDa', 'z2v0rwXLBwvUDfnLzwTjBMzV', 'odu1otG2CxroD1nT', 'Aw5KzxHpzG', 'BxnvC2vYu2vSzwn0', 'x29MzNnLDa', 'BMv4DfnPyMXPBMC', 'C3vIC3rYAw5N', 'B2zMC2v0', 'x3jLBwfPBMrLCG', 'D2vIA2L0vxnLCLnLBgvJDa', 'nZe3mtG1BufIqwvY', 'ChjLC2vYDMvozxDSAw5LCW', 'AxntDhLSzvzPC2LIBgu', 'AxntDhLSzvnLBgvJDgfIBgu', 'AgLKzgvU', 'yNjLywSTC3bHy2vZ', 'C3rPy2T5', 'zM9UDfnPEMu', 'DMLZAwjPBgL0Eq', 'z2v0q29TChv0zwrtDhLSzq', 'z2v0ugfYzw50uNvIEuvSzw1LBNq', 'Axndu1ndB2XVCLrYyw5ZCgfYzw50', 'x25Vzgu', 'BgfZDenOAwXK', 'x3nLzwTuzxH0tM9KzujHy2T3yxjK', 'nKDlDgPxuW', 'BM9Uzq', 'su5qvvq', 'mJe5otyWogP0vKniBa', 'ruXftuvovf9ot0rf', 'DgfIBgu', 'zw50zxjHyMXL', 'vevyvefsrue', 'BgLZDa', 'ChjL', 'ChjLC2vYDMvxAgL0zxnWywnL', 'ChjLlxDYyxa', 'u0nssvbu', 'D2vIA2L0vgv4DezPBgXdB2XVCG', 'x2zVCMnLuhjLC2vYDMvxAgL0zxnWywnL', 'BM9Kzu5HBwu', 'C3rYAw5N', 'DgvZDa', 'y2HHCKnVzgvbDa', 'zMXLEa', 'nJnLBxHPruS', 'zgvMAw5LuhjVCgvYDhK', 'z2v0tMv4De5Vzgu', 'CMvTywLUzgvY', 'BgvUz3rO', 'x3nLzwTuzxH0tM9KzuzVCNDHCMq', 'Cg9ZAxrPB24', 'D2HPDgvtCgfJzq', 'B3bHy2L0Eq', 'CMvWzwf0', 'sevbra', 'BM9KzvzHBhvL', 'zg9LC0ntu0rPC3bSyxLdAgfUz2vmyxLVDxq', 'ntu1mteYvwTPCffS', 'CNvIEq', 'Dg9vChbLCKnHC2u', 'x2XPBMviyxndB250zw50', 'ChjLDMLVDxntAwjSAw5N', 'zMLYC3rdAgLSza', 'odi1odi5mLLfwKzUEG', 'zML4zwq', 'ywjZB2X1Dgu', 'z2v0q2HHCMfJDgvYqxr0CMLIDxrLCW', 'DxnLCLnLBgvJDa', 'y29UDgvUDa', 'u1rzteu', 'yMXVy2S', 'zgLZCgXHEq', 'y29SB3i'];

  V = function V() {
    return z;
  };

  return V();
}

function I(A, Z, x) {
  const v = _G;
  return Z in A ? Object[v(0x1fe)](A, Z, {
    'value': x,
    'enumerable': !![],
    'configurable': !![],
    'writable': !![]
  }) : A[Z] = x, A;
}

class TextSeeker {
  constructor(A, Z) {
    const W = _G;
    let x = arguments[W(0x201)] > 0x2 && arguments[0x2] !== undefined ? arguments[0x2] : ![],
        l = arguments[W(0x201)] > 0x3 && arguments[0x3] !== undefined ? arguments[0x3] : !![];
    I(this, W(0x1e6), void 0x0), I(this, W(0x1d4), void 0x0), I(this, W(0x21d), void 0x0), I(this, W(0x1d8), void 0x0), I(this, W(0x1ce), void 0x0), I(this, W(0x220), void 0x0), I(this, W(0x21b), void 0x0), I(this, W(0x20d), void 0x0), I(this, W(0x1f7), void 0x0), I(this, W(0x222), void 0x0);
    const C = TextSeeker[W(0x1e4)](A),
          t = C !== null;
    t && (A = C), this[W(0x1e6)] = A, this[W(0x1d4)] = Z, this[W(0x21d)] = '', this[W(0x1d8)] = 0x0, this[W(0x1ce)] = t, this[W(0x220)] = 0x0, this[W(0x21b)] = ![], this[W(0x20d)] = ![], this[W(0x1f7)] = x, this[W(0x222)] = l;
  }

  get [P(0x221)]() {
    const B = P;
    return this[B(0x1e6)];
  }

  get [P(0x1d7)]() {
    const h = P;
    return this[h(0x1d4)];
  }

  get [P(0x200)]() {
    const R = P;
    return this[R(0x1d8)];
  }

  get [P(0x215)]() {
    const r = P;
    return this[r(0x21d)];
  }

  [P(0x1ca)](A) {
    const M = P,
          Z = A >= 0x0;
    this[M(0x1d8)] = Z ? A : -A;
    if (A === 0x0) return this;
    const x = Node[M(0x21e)],
          l = Node[M(0x1ed)],
          C = this[M(0x222)];
    let t = this[M(0x1e6)],
        O = t,
        e = this[M(0x1ce)],
        S = 0x0;

    while (t !== null) {
      let m = ![];
      const w = t[M(0x223)];

      if (w === x) {
        O = t;
        if (!(Z ? this[M(0x202)](t, e) : this[M(0x1e8)](t, e))) break;
      } else {
        if (w === l) {
          O = t, this[M(0x1d4)] = 0x0;
          var q = TextSeeker[M(0x1d0)](t);
          m = q[M(0x1ef)], S = q[M(0x226)], S > this[M(0x220)] && C && (this[M(0x220)] = S);
        }
      }

      const k = [];
      t = TextSeeker[M(0x1ff)](t, Z, m, k);

      for (var b = 0x0, T = k; b < T[M(0x201)]; b++) {
        const j = T[b];
        if (j[M(0x223)] !== l) continue;
        var D = TextSeeker[M(0x1d0)](j);
        S = D[M(0x226)], S > this[M(0x220)] && C && (this[M(0x220)] = S);
      }

      e = !![];
    }

    return this[M(0x1e6)] = O, this[M(0x1ce)] = e, this;
  }

  [P(0x202)](A, Z) {
    const s = P,
          x = A[s(0x208)],
          l = x[s(0x201)],
          C = this[s(0x21f)](A),
          t = C[s(0x1db)],
          O = C[s(0x1f3)];
    let e = this[s(0x21b)],
        S = this[s(0x20d)],
        q = this[s(0x21d)],
        b = Z ? 0x0 : this[s(0x1d4)],
        T = this[s(0x1d8)],
        D = this[s(0x220)];

    while (b < l) {
      const m = x[b],
            w = TextSeeker[s(0x213)](m, t, O);
      ++b;
      if (w === 0x0) continue;else {
        if (w === 0x1) e = !![];else {
          if (D > 0x0) {
            if (q[s(0x201)] > 0x0) {
              const k = Math[s(0x21a)](T, D);
              q += '\x0a'[s(0x206)](k), T -= k, D -= k;
            } else D = 0x0;

            S = ![], e = ![];

            if (T <= 0x0) {
              --b;
              break;
            }
          }

          S = w === 0x2;

          if (e) {
            if (S) {
              q += '\x20', e = ![];

              if (--T <= 0x0) {
                --b;
                break;
              }
            } else e = ![];
          }

          q += m;
          if (--T <= 0x0) break;
        }
      }
    }

    return this[s(0x21b)] = e, this[s(0x20d)] = S, this[s(0x21d)] = q, this[s(0x1d4)] = b, this[s(0x1d8)] = T, this[s(0x220)] = D, T > 0x0;
  }

  [P(0x1e8)](A, Z) {
    const E = P,
          x = A[E(0x208)],
          l = x[E(0x201)],
          C = this[E(0x21f)](A),
          t = C[E(0x1db)],
          O = C[E(0x1f3)];
    let e = this[E(0x21b)],
        S = this[E(0x20d)],
        q = this[E(0x21d)],
        b = Z ? l : this[E(0x1d4)],
        T = this[E(0x1d8)],
        D = this[E(0x220)];

    while (b > 0x0) {
      --b;
      const m = x[b],
            w = TextSeeker[E(0x213)](m, t, O);
      if (w === 0x0) continue;else {
        if (w === 0x1) e = !![];else {
          if (D > 0x0) {
            if (q[E(0x201)] > 0x0) {
              const k = Math[E(0x21a)](T, D);
              q = '\x0a'[E(0x206)](k) + q, T -= k, D -= k;
            } else D = 0x0;

            S = ![], e = ![];

            if (T <= 0x0) {
              ++b;
              break;
            }
          }

          S = w === 0x2;

          if (e) {
            if (S) {
              q = '\x20' + q, e = ![];

              if (--T <= 0x0) {
                ++b;
                break;
              }
            } else e = ![];
          }

          q = m + q;
          if (--T <= 0x0) break;
        }
      }
    }

    return this[E(0x21b)] = e, this[E(0x20d)] = S, this[E(0x21d)] = q, this[E(0x1d4)] = b, this[E(0x1d8)] = T, this[E(0x220)] = D, T > 0x0;
  }

  [P(0x21f)](A) {
    const a = P;
    if (this[a(0x1f7)]) return {
      'preserveNewlines': !![],
      'preserveWhitespace': !![]
    };
    const Z = TextSeeker[a(0x1cf)](A);

    if (Z !== null) {
      const x = window[a(0x1e3)](Z);

      switch (x[a(0x204)]) {
        case a(0x1f2):
        case a(0x1f4):
        case a(0x1df):
          return {
            'preserveNewlines': !![],
            'preserveWhitespace': !![]
          };

        case a(0x228):
          return {
            'preserveNewlines': !![],
            'preserveWhitespace': ![]
          };
      }
    }

    return {
      'preserveNewlines': ![],
      'preserveWhitespace': ![]
    };
  }

  static [P(0x1ff)](A, Z, x, l) {
    const o = P;
    let C = x ? Z ? A[o(0x20f)] : A[o(0x1e7)] : null;
    if (C === null) while (!![]) {
      l[o(0x225)](A), C = Z ? A[o(0x1d5)] : A[o(0x20e)];
      if (C !== null) break;
      C = A[o(0x224)];
      if (C === null) break;
      A = C;
    }
    return C;
  }

  static [P(0x1cf)](A) {
    const c = P;

    while (A !== null && A[c(0x223)] !== Node[c(0x1ed)]) {
      A = A[c(0x224)];
    }

    return A;
  }

  static [P(0x1e4)](A) {
    const L = P;
    A = TextSeeker[L(0x1cf)](A);

    if (A !== null && A[L(0x1f8)][L(0x20c)]() === 'RT') {
      A = A[L(0x224)];
      if (A !== null && A[L(0x1f8)][L(0x20c)]() === L(0x1c8)) return A;
    }

    return null;
  }

  static [P(0x1d0)](A) {
    const g = P;
    let Z = !![];

    switch (A[g(0x1f8)][g(0x20c)]()) {
      case g(0x207):
      case 'RT':
      case g(0x1f5):
      case g(0x216):
        return {
          'enterable': ![],
          'newlines': 0x0
        };

      case 'BR':
        return {
          'enterable': ![],
          'newlines': 0x1
        };

      case g(0x1f0):
      case g(0x1eb):
      case g(0x229):
        Z = ![];
        break;
    }

    const x = window[g(0x1e3)](A),
          l = x[g(0x218)],
          C = l !== g(0x1ea) && TextSeeker[g(0x1dc)](x);
    let t = 0x0;
    if (!C) Z = ![];else {
      switch (x[g(0x203)]) {
        case g(0x212):
        case g(0x211):
        case g(0x1e0):
          t = 0x2;
          break;
      }

      t === 0x0 && TextSeeker[g(0x209)](l) && (t = 0x1);
    }
    return {
      'enterable': Z,
      'newlines': t
    };
  }

  static [P(0x213)](A, Z, x) {
    const u = P;

    switch (A[u(0x1fb)](0x0)) {
      case 0x9:
      case 0xc:
      case 0xd:
      case 0x20:
        return x ? 0x2 : 0x1;

      case 0xa:
        return Z ? 0x3 : 0x1;

      case 0x200b:
      case 0x200c:
        return 0x0;

      default:
        return 0x2;
    }
  }

  static [P(0x1dc)](A) {
    const U = P;
    return !(A[U(0x1e2)] === U(0x1de) || parseFloat(A[U(0x205)]) <= 0x0 || parseFloat(A[U(0x1e1)]) <= 0x0 || !TextSeeker[U(0x1dd)](A) && (TextSeeker[U(0x1e5)](A[U(0x219)]) || TextSeeker[U(0x1e5)](A[U(0x1f6)])));
  }

  static [P(0x1dd)](A) {
    const f = P;
    return !(A[f(0x214)] === f(0x1ea) || A[f(0x1d9)] === f(0x1ea) || A[f(0x21c)] === f(0x1ea) || A[f(0x1d3)] === f(0x1ea));
  }

  static [P(0x1e5)](A) {
    const p = P;
    return typeof A === p(0x1f9) && A[p(0x1cc)](p(0x1cb)) && /,\s*0.?0*\)$/[p(0x1fa)](A);
  }

  static [P(0x209)](A) {
    const d = P;
    let Z = A[d(0x1d2)]('\x20');
    Z >= 0x0 && (A = A[d(0x1d6)](0x0, Z));
    Z = A[d(0x1d2)]('-');
    Z >= 0x0 && (A = A[d(0x1d6)](0x0, Z));

    switch (A) {
      case d(0x217):
      case d(0x1fc):
      case d(0x1cd):
      case d(0x1f1):
      case d(0x1ee):
        return !![];

      case d(0x20b):
        return Z >= 0x0;

      default:
        return ![];
    }
  }

}
// EXTERNAL MODULE: ./src/config.js
var config = __webpack_require__(27);
;// CONCATENATED MODULE: ./src/fg/caretUtils.ts
(function (Q, Y) {
  const VG = caretUtils_G,
        N = Q();

  while (!![]) {
    try {
      const X = -parseInt(VG(0x188)) / 0x1 + -parseInt(VG(0x1ed)) / 0x2 + -parseInt(VG(0x1d6)) / 0x3 * (-parseInt(VG(0x172)) / 0x4) + parseInt(VG(0x190)) / 0x5 + parseInt(VG(0x210)) / 0x6 * (-parseInt(VG(0x1da)) / 0x7) + parseInt(VG(0x1c9)) / 0x8 * (-parseInt(VG(0x18e)) / 0x9) + -parseInt(VG(0x1d0)) / 0xa * (-parseInt(VG(0x1b2)) / 0xb);
      if (X === Y) break;else N['push'](N['shift']());
    } catch (y) {
      N['push'](N['shift']());
    }
  }
})(caretUtils_V, 0xbf8b0);

function caretUtils_I(Q, Y) {
  const VI = caretUtils_G;
  var N;

  if (typeof Symbol === VI(0x1e5) || Q[Symbol[VI(0x179)]] == null) {
    if (Array[VI(0x1c4)](Q) || (N = x(Q)) || Y && Q && typeof Q[VI(0x1ef)] === VI(0x182)) {
      if (N) Q = N;

      var X = 0x0,
          y = function V0() {};

      return {
        's': y,
        'n': function V1() {
          const VA = VI;
          if (X >= Q[VA(0x1ef)]) return {
            'done': !![]
          };
          return {
            'done': ![],
            'value': Q[X++]
          };
        },
        'e': function V2(V3) {
          throw V3;
        },
        'f': y
      };
    }

    throw new TypeError(VI(0x20f));
  }

  var H = !![],
      K = ![],
      J;
  return {
    's': function V3() {
      const VZ = VI;
      N = Q[Symbol[VZ(0x179)]]();
    },
    'n': function V4() {
      const Vx = VI;
      var V5 = N[Vx(0x1c8)]();
      return H = V5[Vx(0x181)], V5;
    },
    'e': function V5(V6) {
      K = !![], J = V6;
    },
    'f': function V6() {
      const Vl = VI;

      try {
        if (!H && N[Vl(0x1d8)] != null) N[Vl(0x1d8)]();
      } finally {
        if (K) throw J;
      }
    }
  };
}

function A(Q, Y) {
  return caretUtils_t(Q) || C(Q, Y) || x(Q, Y) || Z();
}

function Z() {
  const VC = caretUtils_G;
  throw new TypeError(VC(0x1eb));
}

function x(Q, Y) {
  const Vt = caretUtils_G;
  if (!Q) return;
  if (typeof Q === Vt(0x196)) return l(Q, Y);
  var N = Object[Vt(0x1d3)][Vt(0x197)][Vt(0x1ff)](Q)[Vt(0x198)](0x8, -0x1);
  if (N === Vt(0x1cb) && Q[Vt(0x1f5)]) N = Q[Vt(0x1f5)][Vt(0x18c)];
  if (N === Vt(0x187) || N === Vt(0x204)) return Array[Vt(0x1c7)](Q);
  if (N === Vt(0x1c2) || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/[Vt(0x202)](N)) return l(Q, Y);
}

function l(Q, Y) {
  const VO = caretUtils_G;
  if (Y == null || Y > Q[VO(0x1ef)]) Y = Q[VO(0x1ef)];

  for (var N = 0x0, X = new Array(Y); N < Y; N++) X[N] = Q[N];

  return X;
}

function C(Q, Y) {
  const Ve = caretUtils_G;
  if (typeof Symbol === Ve(0x1e5) || !(Symbol[Ve(0x179)] in Object(Q))) return;
  var N = [],
      X = !![],
      y = ![],
      H = undefined;

  try {
    for (var K = Q[Symbol[Ve(0x179)]](), F; !(X = (F = K[Ve(0x1c8)]())[Ve(0x181)]); X = !![]) {
      N[Ve(0x1e6)](F[Ve(0x1b7)]);
      if (Y && N[Ve(0x1ef)] === Y) break;
    }
  } catch (n) {
    y = !![], H = n;
  } finally {
    try {
      if (!X && K[Ve(0x1d8)] != null) K[Ve(0x1d8)]();
    } finally {
      if (y) throw H;
    }
  }

  return N;
}

function caretUtils_t(Q) {
  const VS = caretUtils_G;
  if (Array[VS(0x1c4)](Q)) return Q;
}


const O = /rgba\s*\([^)]*,\s*0(?:\.0+)?\s*\)/;
function caretRangeFromPoint(Q, Y, N) {
  const Vq = caretUtils_G,
        X = s(Q, Y, N);
  let H = null,
      K = null,
      F = null;

  if (X[Vq(0x1ef)] > 0x0) {
    const V3 = X[0x0];

    switch (V3[Vq(0x20e)][Vq(0x17e)]()) {
      case Vq(0x1e9):
      case Vq(0x18b):
      case Vq(0x1b0):
        return null;

      case Vq(0x1cc):
        if (V3[Vq(0x1ad)] === Vq(0x191)) {
          F = V3;
          var n = M(V3, ![]),
              J = A(n, 0x2);
          H = J[0x0], K = J[0x1];
        }

        break;

      case Vq(0x209):
        F = V3;
        var V0 = M(V3, !![]),
            V1 = A(V0, 0x2);
        H = V1[0x0], K = V1[0x1];
        break;
    }
  }

  const V2 = g(Q, Y, N ? X : []);
  return V2 !== null ? (H !== null && (r(K[Vq(0x207)], Vq(0x1a8), Vq(0x1c1)), r(H[Vq(0x207)], Vq(0x20b), Vq(0x1ce))), V2) : (K !== null && K[Vq(0x1be)][Vq(0x1de)](K), null);
}

function e(Q, Y, N, X, y, H, K) {
  const Vb = caretUtils_G;
  Q = Q[Vb(0x211)]();
  const F = Q[Vb(0x19c)](N, Y),
        n = Q[Vb(0x1f2)](N * 0x2 - F, Y, !![]),
        J = Q[Vb(0x191)](),
        V0 = J[Vb(0x1ef)],
        V1 = V0 - n;
  let V2 = F,
      V3 = V1,
      V4 = [];

  for (; V2 > 0x0; --V2) {
    const V5 = J[V2 - 0x1];
    if (V5 === '\x0a' && X) break;

    if (V4[Vb(0x1ef)] === 0x0) {
      const V7 = y[Vb(0x1a2)](V5);

      if (typeof V7 !== Vb(0x1e5)) {
        V7[0x0] && --V2;
        break;
      }
    }

    let V6 = H[Vb(0x1a2)](V5);

    if (typeof V6 !== Vb(0x1e5)) {
      if (V4[Vb(0x1ef)] === 0x0) {
        V6[0x1] && --V2;
        break;
      } else {
        if (V4[0x0] === V5) {
          V4[Vb(0x177)]();
          continue;
        }
      }
    }

    V6 = K[Vb(0x1a2)](V5), typeof V6 !== Vb(0x1e5) && V4[Vb(0x17d)](V6[0x0]);
  }

  V4 = [];

  for (; V3 < V0; ++V3) {
    const V8 = J[V3];
    if (V8 === '\x0a' && X) break;

    if (V4[Vb(0x1ef)] === 0x0) {
      const VV = y[Vb(0x1a2)](V8);

      if (typeof VV !== Vb(0x1e5)) {
        VV[0x1] && ++V3;
        break;
      }
    }

    let V9 = K[Vb(0x1a2)](V8);

    if (typeof V9 !== Vb(0x1e5)) {
      if (V4[Vb(0x1ef)] === 0x0) {
        V9[0x1] && ++V3;
        break;
      } else {
        if (V4[0x0] === V8) {
          V4[Vb(0x177)]();
          continue;
        }
      }
    }

    V9 = H[Vb(0x1a2)](V8), typeof V9 !== Vb(0x1e5) && V4[Vb(0x17d)](V9[0x0]);
  }

  for (; V2 < F && a(J[V2]); ++V2) {}

  for (; V3 > V1 && a(J[V3 - 0x1]); --V3) {}

  return {
    'text': J[Vb(0x1d5)](V2, V3),
    'offset': F - V2
  };
}

function S(Q, Y, N) {
  const VT = caretUtils_G;
  return Q >= N[VT(0x17c)] && Q < N[VT(0x1a1)] && Y >= N[VT(0x170)] && Y < N[VT(0x1f9)];
}

function q(Q, Y, N) {
  const VD = caretUtils_G;
  var X = caretUtils_I(N),
      H;

  try {
    for (X['s'](); !(H = X['n']())[VD(0x181)];) {
      const K = H[VD(0x1b7)];
      if (S(Q, Y, K)) return !![];
    }
  } catch (F) {
    X['e'](F);
  } finally {
    X['f']();
  }

  return ![];
}

function b(Q, Y, N) {
  const Vm = caretUtils_G;

  for (let X = 0x0; X < N[Vm(0x206)]; ++X) {
    const H = N[Vm(0x1df)](X);
    if (q(Q, Y, H[Vm(0x1e8)]())) return !![];
  }

  return ![];
}

function T(Q, Y) {
  const Vw = caretUtils_G,
        N = Q[Vw(0x1bb)];

  switch (Y) {
    case Vw(0x1fa):
      return N === 0x0;

    case Vw(0x1d4):
      return N === 0x2;

    case Vw(0x173):
      return N === 0x1;

    default:
      return ![];
  }
}

function caretUtils_G(I, A) {
  const Z = caretUtils_V();
  return caretUtils_G = function G(x, l) {
    x = x - 0x170;
    let C = Z[x];

    if (caretUtils_G['ViumNe'] === undefined) {
      var t = function t(q) {
        const b = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
        let T = '',
            D = '';

        for (let m = 0x0, w, j, i = 0x0; j = q['charAt'](i++); ~j && (w = m % 0x4 ? w * 0x40 + j : j, m++ % 0x4) ? T += String['fromCharCode'](0xff & w >> (-0x2 * m & 0x6)) : 0x0) {
          j = b['indexOf'](j);
        }

        for (let v = 0x0, W = T['length']; v < W; v++) {
          D += '%' + ('00' + T['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);
        }

        return decodeURIComponent(D);
      };

      caretUtils_G['RlbOCS'] = t, I = arguments, caretUtils_G['ViumNe'] = !![];
    }

    const O = Z[0x0],
          e = x + O,
          S = I[e];
    return !S ? (C = caretUtils_G['RlbOCS'](C), I[e] = C) : C = S, C;
  }, caretUtils_G(I, A);
}

function D(Q) {
  const Vk = caretUtils_G,
        Y = [];
  return Q[Vk(0x1e1)] && Y[Vk(0x1e6)](Vk(0x1ba)), Q[Vk(0x176)] && Y[Vk(0x1e6)](Vk(0x1bc)), Q[Vk(0x1d7)] && Y[Vk(0x1e6)](Vk(0x1d9)), Q[Vk(0x1b1)] && Y[Vk(0x1e6)](Vk(0x185)), Y;
}

function m(Q) {
  const Y = D(Q);
  return R(Q, Y), Y;
}

function w(Q) {
  const Y = [];
  return R(Q, Y), Y;
}

function k(Q) {
  const Vj = caretUtils_G;
  let Y = arguments[Vj(0x1ef)] > 0x1 && arguments[0x1] !== undefined ? arguments[0x1] : null;
  const N = document,
        X = ![],
        y = [Vj(0x1af), Vj(0x1cf), Vj(0x175), Vj(0x1e7)];

  for (var H = 0x0, K = y; H < K[Vj(0x1ef)]; H++) {
    const F = K[H];
    Y === null ? N[Vj(0x1a7)](F, Q, X) : Y[Vj(0x1a7)](N, F, Q, X);
  }
}

function j() {
  const Vi = caretUtils_G;
  return document[Vi(0x1f8)] || document[Vi(0x193)] || document[Vi(0x1ab)] || document[Vi(0x195)] || null;
}

function i(Q) {
  const Vv = caretUtils_G,
        Y = Q[Vv(0x1fc)],
        N = [];

  for (let X = Q[Vv(0x174)]; X !== null; X = v(X)) {
    N[Vv(0x1e6)](X);
    if (X === Y) break;
  }

  return N;
}

function v(Q) {
  const VW = caretUtils_G;
  let Y = Q[VW(0x192)];
  if (Y === null) while (!![]) {
    Y = Q[VW(0x19b)];
    if (Y !== null) break;
    Y = Q[VW(0x1be)];
    if (Y === null) break;
    Q = Y;
  }
  return Y;
}

function W(Q, Y) {
  const VP = caretUtils_G,
        N = Node[VP(0x1c6)];
  var X = caretUtils_I(Q),
      y;

  try {
    for (X['s'](); !(y = X['n']())[VP(0x181)];) {
      let H = y[VP(0x1b7)];

      for (; H !== null; H = H[VP(0x1be)]) {
        if (H[VP(0x18d)] !== N) continue;
        if (H[VP(0x1a4)](Y)) return !![];
        break;
      }
    }
  } catch (K) {
    X['e'](K);
  } finally {
    X['f']();
  }

  return ![];
}

function caretUtils_P(Q, Y) {
  const VB = caretUtils_G,
        N = Node[VB(0x1c6)];
  var X = caretUtils_I(Q),
      y;

  try {
    for (X['s'](); !(y = X['n']())[VB(0x181)];) {
      let H = y[VB(0x1b7)];

      while (!![]) {
        if (H === null) return ![];
        if (H[VB(0x18d)] === N && H[VB(0x1a4)](Y)) break;
        H = H[VB(0x1be)];
      }
    }
  } catch (K) {
    X['e'](K);
  } finally {
    X['f']();
  }

  return !![];
}

function B(Q, Y) {
  const Vh = caretUtils_G;
  return !(Y === Vh(0x17b) || Y === Vh(0x18a)) || Q === Vh(0x1b3);
}

function h() {
  const VR = caretUtils_G,
        Q = document[VR(0x200)];
  if (Q === null) return ![];
  const Y = Q[VR(0x20e)][VR(0x17e)]();

  switch (Y) {
    case VR(0x1cc):
    case VR(0x209):
    case VR(0x1b0):
      return !![];

    default:
      return Q[VR(0x1ca)];
  }
}

function R(Q, Y) {
  const Vr = caretUtils_G;
  let N = Q[Vr(0x1f3)];
  if (typeof N === Vr(0x182) && N > 0x0) for (let X = 0x0; X < 0x6; ++X) {
    const y = 0x1 << X;

    if ((N & y) !== 0x0) {
      Y[Vr(0x1e6)](Vr(0x1e3) + X), N &= ~y;
      if (N === 0x0) break;
    }
  }
}

function r(Q, Y, N) {
  const VM = caretUtils_G;
  Q[VM(0x183)](Y, N, VM(0x1a6));
}

function M(Q, Y) {
  const Vs = caretUtils_G,
        N = document[Vs(0x189)];
  if (N === null) return [null, null];
  const X = window[Vs(0x1ac)](Q),
        y = Q[Vs(0x1f0)](),
        H = document[Vs(0x1cd)][Vs(0x1f0)]();
  let K = y[Vs(0x17c)] - H[Vs(0x17c)],
      F = y[Vs(0x170)] - H[Vs(0x170)];
  const n = document[Vs(0x19a)](Vs(0x1d2)),
        J = n[Vs(0x207)];
  r(J, Vs(0x1e2), Vs(0x199)), r(J, Vs(0x1fb), Vs(0x1c3)), r(J, Vs(0x17c), '0'), r(J, Vs(0x170), '0'), r(J, Vs(0x1dc), H[Vs(0x1dc)] + 'px'), r(J, Vs(0x1a9), H[Vs(0x1a9)] + 'px'), r(J, Vs(0x1b4), Vs(0x1db)), r(J, Vs(0x205), '0'), r(J, Vs(0x20b), Vs(0x1ce)), r(J, Vs(0x1a8), Vs(0x1b8));
  const V0 = document[Vs(0x19a)](Vs(0x1d2)),
        V1 = V0[Vs(0x207)];
  let V2 = Q[Vs(0x1b7)];
  V2[Vs(0x19d)]('\x0a') && (V2 += '\x0a');
  V0[Vs(0x1dd)] = V2;

  for (let V4 = 0x0, V5 = X[Vs(0x1ef)]; V4 < V5; ++V4) {
    const V6 = X[V4];
    r(V1, V6, X[Vs(0x20d)](V6));
  }

  r(V1, Vs(0x1fb), Vs(0x1c3)), r(V1, Vs(0x170), F + 'px'), r(V1, Vs(0x17c), K + 'px'), r(V1, Vs(0x208), '0'), r(V1, Vs(0x20b), Vs(0x178));
  Y ? X[Vs(0x1b4)] === Vs(0x17a) && r(V1, Vs(0x1b4), Vs(0x178)) : (r(V1, Vs(0x1b4), Vs(0x1db)), r(V1, Vs(0x1b5), Vs(0x1a0)), r(V1, Vs(0x1fe), X[Vs(0x1a9)]));
  n[Vs(0x1f4)](V0), N[Vs(0x1f4)](n);
  const V3 = V0[Vs(0x1f0)]();

  if (V3[Vs(0x1dc)] !== y[Vs(0x1dc)] || V3[Vs(0x1a9)] !== y[Vs(0x1a9)]) {
    const V7 = parseFloat(X[Vs(0x1dc)]) + (y[Vs(0x1dc)] - V3[Vs(0x1dc)]),
          V8 = parseFloat(X[Vs(0x1a9)]) + (y[Vs(0x1a9)] - V3[Vs(0x1a9)]);
    r(V1, Vs(0x1dc), V7 + 'px'), r(V1, Vs(0x1a9), V8 + 'px');
  }

  return (V3[Vs(0x17c)] !== y[Vs(0x17c)] || V3[Vs(0x170)] !== y[Vs(0x170)]) && (K += y[Vs(0x17c)] - V3[Vs(0x17c)], F += y[Vs(0x170)] - V3[Vs(0x170)], r(V1, Vs(0x17c), K + 'px'), r(V1, Vs(0x170), F + 'px')), V0[Vs(0x18f)] = Q[Vs(0x18f)], V0[Vs(0x1f1)] = Q[Vs(0x1f1)], [V0, n];
}

function caretUtils_V() {
  const VY = ['z2v0uhjVCgvYDhLwywX1zq', 'BM9Kzu5HBwu', 'sw52ywXPzcbHDhrLBxb0ihrVigL0zxjHDguGBM9UlwL0zxjHyMXLigLUC3rHBMnLlGPjBIbVCMrLCIb0BYbIzsbPDgvYywjSzsWGBM9UlwfYCMf5ig9IAMvJDhmGBxvZDcbOyxzLigeGw1n5BwjVBc5PDgvYyxrVCL0OksbTzxrOB2qU', 'mJi0otG4rMHqEhLu', 'y2XVBMu', 'zNvUy3rPB24', 'Dg9W', 'zwXLBwvUDezYB21qB2LUDa', 'mtiZotKXnNPtEg1rra', 'yxv4AwXPyxj5', 'C3rHCNrdB250ywLUzxi', 'Bw96zNvSBhnJCMvLBMnOyw5Nzq', 'y3rYBeTLEq', 'Cg9W', 'yxv0BW', 'AxrLCMf0B3i', 'DMLZAwjSzq', 'zMLYzwzVEa', 'BgvMDa', 'Dw5ZAgLMDa', 'Dg9vChbLCKnHC2u', 'zw50CMLLCW', 'Aw5KzxHpzG', 'zg9Uzq', 'BNvTyMvY', 'C2v0uhjVCgvYDhK', 'C2v0u3rHCNq', 'C2HPzNq', 'z2v0qxr0CMLIDxrL', 'twfW', 'mtm0ntiZnMrhrM5MBW', 'yM9KEq', 'zMLYzwzVEc1TB2jPBgu', 'qLvuve9o', 'BMfTzq', 'BM9Kzvr5Cgu', 'ndGXnZq1n25NtxbMta', 'C2nYB2XSvg9W', 'ndmZnZiYnxfsq1Lnuq', 'Dgv4Da', 'zMLYC3rdAgLSza', 'BxngDwXSC2nYzwvUrwXLBwvUDa', 'vevyvf9ot0rf', 'D2vIA2L0rNvSBhnJCMvLBKvSzw1LBNq', 'C3rYAw5N', 'Dg9tDhjPBMC', 'C2XPy2u', 'Aw5PDgLHBa', 'y3jLyxrLrwXLBwvUDa', 'BMv4DfnPyMXPBMC', 'C2v0u3rHCNrpzMzZzxq', 'zw5KC1DPDgG', 'AgfZ', 'B2zMC2v0', 'BM93CMfW', 'CMLNAhq', 'z2v0', 'C2v0rw5K', 'Bwf0y2HLCW', 'DxnLCLnLBgvJDa', 'Aw1WB3j0yw50', 'ywrKrxzLBNrmAxn0zw5LCG', 'EI1PBMrLEa', 'AgvPz2H0', 'C2L6zq', 'Bw96rNvSBfnJCMvLBKvSzw1LBNq', 'z2v0q29TChv0zwrtDhLSzq', 'DhLWzq', 'C2vLAW', 'zNvSBhnJCMvLBMnOyw5Nzq', 'u0vmrunu', 'C2HPzNrlzxK', 'mJuZs25KDvry', 'BwfJ', 'B3zLCMzSB3C', 'D2HPDguTC3bHy2u', 'DxnLCI1ZzwXLy3q', 'DMfSDwu', 'mJe0nZq4mZy0nG', 'y29UDgvUDa', 'ywX0', 'yNv0Dg9U', 'y3rYBa', 'zMLSDgvY', 'CgfYzw50tM9Kzq', 'AgfZqxr0CMLIDxrL', 'BM9Kzq', 'ltiXndC0odm2ndy', 'qxjNDw1LBNrZ', 'ywjZB2X1Dgu', 'AxnbCNjHEq', 'DMLZAwjPBgL0Eq', 'ruXftuvovf9ot0rf', 'zNjVBq', 'BMv4Da', 'ogLxA2DqCa', 'AxndB250zw50rwrPDgfIBgu', 't2jQzwn0', 'su5qvvq', 'zg9JDw1LBNrfBgvTzw50', 'BM9Uzq', 'tvngDwXSC2nYzwvUq2HHBMDL', 'mta0mJqXmefMBKf5Eq', 'C2v0', 'zgL2', 'ChjVDg90ExbL', 'C2vJB25Kyxj5', 'C3vIC3rYAw5N', 'm2nXq3vdzW', 'Bwv0yuTLEq', 'CMv0DxjU', 'Bwv0yq', 'odrQzxrju1m', 'AgLKzgvU', 'D2LKDgG', 'Dgv4DenVBNrLBNq', 'CMvTB3zLq2HPBgq', 'z2v0uMfUz2vbDa', 'y2fYzxrqB3nPDgLVBKzYB21qB2LUDa', 'ywX0s2v5', 'ywXS', 'Bw91C2u', 'yMfJA2DYB3vUzenVBg9Y', 'Dw5KzwzPBMvK', 'ChvZAa', 'D2vIA2L0zNvSBhnJCMvLBMnOyw5Nzq', 'z2v0q2XPzw50uMvJDhm', 'su1h', 'y2fYzxrsyw5NzuzYB21qB2LUDa', 'sw52ywXPzcbHDhrLBxb0ihrVigrLC3rYDwn0DxjLig5VBI1PDgvYywjSzsbPBNn0yw5Jzs4ksw4GB3jKzxiGDg8GyMuGAxrLCMfIBguSig5VBI1HCNjHEsbVyMPLy3rZig11C3qGAgf2zsbHifTtEw1IB2WUAxrLCMf0B3jDkcKGBwv0Ag9KlG', 'CMvTB3zLqxr0CMLIDxrL', 'ote5odq0zuzjvNLb', 'DhjPBq', 'BgvUz3rO', 'z2v0qM91BMrPBMDdBgLLBNrszwn0', 'C2nYB2XStgvMDa', 'C2v0rw5Kt2zMC2v0', 'yNv0Dg9UCW', 'yxbWzw5Kq2HPBgq', 'y29UC3rYDwn0B3i', 'C2v0qxr0CMLIDxrL', 'y3jLyxrLuMfUz2u', 'zNvSBhnJCMvLBKvSzw1LBNq', 'yM90Dg9T', 'ChjPBwfYEq', 'Cg9ZAxrPB24', 'zw5Kq29UDgfPBMvY', 'B2zMC2v0tM9Kzq', 'BgLUzs1OzwLNAhq', 'y2fSBa', 'ywn0AxzLrwXLBwvUDa', 'zw5Kt2zMC2v0', 'DgvZDa', 'yMfJA2DYB3vUzeLTywDL', 'u2v0', 'B3bHy2L0Eq', 'CMfUz2vdB3vUDa', 'C3r5Bgu', 'BwfYz2LU', 'vevyvefsrue', 'zwXLBwvUDhngCM9Tug9PBNq', 'Cg9PBNrLCI1LDMvUDhm', 'C3rHCNrpzMzZzxq'];

  caretUtils_V = function V() {
    return VY;
  };

  return caretUtils_V();
}

function s(Q, Y, N) {
  const VE = caretUtils_G;

  if (N) {
    const H = document[VE(0x20a)](Q, Y);
    return H[VE(0x1bd)]((K, F) => H[VE(0x180)](K) === F);
  }

  const X = document[VE(0x171)](Q, Y);
  return X !== null ? [X] : [];
}

function E(Q, Y, N) {
  const Va = caretUtils_G;
  if (N[Va(0x174)][Va(0x18d)] !== Node[Va(0x194)]) return ![];
  const X = N[Va(0x1fc)],
        H = N[Va(0x201)];

  try {
    const V0 = new TextSeeker(N[Va(0x1fc)], N[Va(0x201)], !![], ![])[Va(0x1ae)](0x1),
          V1 = V0[Va(0x1c0)],
          V2 = V0[Va(0x19f)],
          V3 = V0[Va(0x1b9)];
    N[Va(0x1a3)](V1, V2);
    if (!a(V3) && q(Q, Y, N[Va(0x1e8)]())) return !![];
  } finally {
    N[Va(0x1a3)](X, H);
  }

  const K = new TextSeeker(N[Va(0x174)], N[Va(0x20c)], !![], ![])[Va(0x1ae)](-0x1),
        F = K[Va(0x1c0)],
        n = K[Va(0x19f)],
        J = K[Va(0x1b9)];
  N[Va(0x184)](F, n);
  if (!a(J) && q(Q, Y, N[Va(0x1e8)]())) return N[Va(0x1a3)](F, n), !![];
  return ![];
}

function a(Q) {
  const Vo = caretUtils_G;
  return Q[Vo(0x1ee)]()[Vo(0x1ef)] === 0x0;
}

function o(Q, Y) {
  const Vc = caretUtils_G;
  if (typeof document[Vc(0x1ea)] === Vc(0x212)) return document[Vc(0x1ea)](Q, Y);
  if (typeof document[Vc(0x1e0)] === Vc(0x212)) return c(Q, Y);
  return null;
}

function c(Q, Y) {
  const VL = caretUtils_G,
        N = document[VL(0x1e0)](Q, Y);
  if (N === null) return null;
  const X = N[VL(0x1fd)];
  if (X === null) return null;
  let H = 0x0;
  const K = X[VL(0x18d)];

  switch (K) {
    case Node[VL(0x194)]:
      H = N[VL(0x19f)];
      break;

    case Node[VL(0x1c6)]:
      if (z(X)) return L(Q, Y, X);
      break;
  }

  try {
    const F = document[VL(0x1f7)]();
    return F[VL(0x184)](X, H), F[VL(0x1a3)](X, H), F;
  } catch (n) {
    return null;
  }
}

function L(Q, Y, N) {
  const Vg = caretUtils_G,
        X = new Map();

  try {
    while (!![]) {
      U(X, N), N[Vg(0x207)][Vg(0x183)](Vg(0x1b6), Vg(0x191), Vg(0x1a6));
      const H = document[Vg(0x1e0)](Q, Y);
      if (H === null) return null;
      const K = H[Vg(0x1fd)];
      if (K === null) return null;
      let F = 0x0;
      const n = K[Vg(0x18d)];

      switch (n) {
        case Node[Vg(0x194)]:
          F = H[Vg(0x19f)];
          break;

        case Node[Vg(0x1c6)]:
          if (z(K)) {
            if (X[Vg(0x19e)](K)) return null;
            N = K;
            continue;
          }

          break;
      }

      try {
        const J = document[Vg(0x1f7)]();
        return J[Vg(0x184)](K, F), J[Vg(0x1a3)](K, F), J;
      } catch (V0) {
        return null;
      }
    }
  } finally {
    f(X);
  }
}

function g(Q, Y, N) {
  const Vu = caretUtils_G;
  let X = null;

  try {
    let H = 0x0,
        K = null;

    while (!![]) {
      const F = o(Q, Y);
      if (F === null) return null;
      const n = F[Vu(0x174)];

      if (K !== n) {
        if (E(Q, Y, F)) return F;
        K = n;
      }

      X === null && (X = new Map());
      H = u(N, H, X);
      if (H < 0x0) return null;
    }
  } finally {
    X !== null && X[Vu(0x1aa)] > 0x0 && f(X);
  }
}

function u(Q, Y, N) {
  const VU = caretUtils_G;

  while (!![]) {
    if (Y >= Q[VU(0x1ef)]) return -0x1;
    const X = Q[Y++];
    if (p(X)) return U(N, X), X[VU(0x207)][VU(0x183)](VU(0x20b), VU(0x1ce), VU(0x1a6)), Y;
  }
}

function U(Q, Y) {
  const Vf = caretUtils_G;
  if (Q[Vf(0x19e)](Y)) return;
  const N = Y[Vf(0x1bf)](Vf(0x207)) ? Y[Vf(0x186)](Vf(0x207)) : null;
  Q[Vf(0x1d1)](Y, N);
}

function f(Q) {
  const Vp = caretUtils_G;
  var Y = caretUtils_I(Q[Vp(0x17f)]()),
      N;

  try {
    for (Y['s'](); !(N = Y['n']())[Vp(0x181)];) {
      const y = N[Vp(0x1b7)];
      var X = A(y, 0x2);
      const H = X[0x0],
            K = X[0x1];
      K === null ? H[Vp(0x1ec)](Vp(0x207)) : H[Vp(0x1f6)](Vp(0x207), K);
    }
  } catch (F) {
    Y['e'](F);
  } finally {
    Y['f']();
  }
}

function p(Q) {
  const Vd = caretUtils_G;
  if (Q === document[Vd(0x189)] || Q === document[Vd(0x1cd)]) return ![];
  const Y = window[Vd(0x1ac)](Q);
  return parseFloat(Y[Vd(0x205)]) <= 0x0 || Y[Vd(0x1c5)] === Vd(0x1db) || Y[Vd(0x203)] === Vd(0x1ce) && d(Y[Vd(0x1e4)]);
}

function d(Q) {
  const Vz = caretUtils_G;
  return O[Vz(0x202)](Q);
}

function z(Q) {
  const VQ = caretUtils_G;
  return getComputedStyle(Q)[VQ(0x1a5)] === VQ(0x1e2);
}
;// CONCATENATED MODULE: ./src/fg/common.ts


function common_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function common_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { common_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { common_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function common_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const japaneseRegex = /[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]/;
const DEFAULT_SNACKBAR_TIMEOUT = 10000;

class State {
  constructor() {
    common_defineProperty(this, "user", null);

    common_defineProperty(this, "modal", new Modal());

    common_defineProperty(this, "apiCall", void 0);
  }

}

const state = new State();
function isStringContainsJapanese(string) {
  return japaneseRegex.test(string);
}

function isForSite() {
  const targetBrowser = "for-site";
  return targetBrowser === "for-site";
}

function showForRange(_x) {
  return _showForRange.apply(this, arguments);
}

function _showForRange() {
  _showForRange = common_asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(range) {
    var _state$user$languages;

    var exactMatch,
        prevLength,
        context,
        seekPrev,
        seekNext,
        langauges,
        request,
        firstSymbolRange,
        response,
        newSelectionRange,
        newSelectionStart,
        start,
        newSelectionEnd,
        end,
        sel,
        _args = arguments;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          exactMatch = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

          if (range) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          prevLength = 0;

          if (exactMatch) {
            context = range.toString();
          } else {
            seekPrev = new TextSeeker(range.startContainer, range.startOffset).seek(-100);
            seekNext = new TextSeeker(range.startContainer, range.startOffset).seek(100);
            prevLength = seekPrev.content.length;
            context = seekPrev.content + seekNext.content;
          }

          if (isStringContainsJapanese(context)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return");

        case 7:
          if (!(!isForSite() && window.location.origin === config.URIFront)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return");

        case 9:
          if (state.user) {
            _context.next = 12;
            break;
          }

          showSnackbar(t('please_login'), {
            duration: DEFAULT_SNACKBAR_TIMEOUT
          });
          return _context.abrupt("return");

        case 12:
          langauges = (_state$user$languages = state.user.languages) !== null && _state$user$languages !== void 0 ? _state$user$languages : ["en"];
          request = {
            text: context,
            url: range.startContainer.ownerDocument.location.href,
            offset: prevLength,
            languages: langauges,
            exactMatch: exactMatch
          };
          firstSymbolRange = new Range();
          firstSymbolRange.setStart(range.startContainer, range.startOffset);
          state.modal.showText(t("loading"));
          state.modal.updatePosition(firstSymbolRange);
          _context.next = 20;
          return state.apiCall("POST", "processText", request);

        case 20:
          response = _context.sent;

          if (!response.success) {
            showSnackbar(t("no_words_found"));
            state.modal.hide();
          } else {
            state.modal.showTranslations(request, response);
          }

          newSelectionRange = new Range();
          newSelectionStart = response.offsetStart - prevLength;
          start = new TextSeeker(range.startContainer, range.startOffset, true, false).seek(newSelectionStart);
          newSelectionRange.setStart(start.node, start.offset);
          newSelectionEnd = response.offsetEnd - prevLength;
          end = new TextSeeker(range.startContainer, range.startOffset, true, false).seek(newSelectionEnd);
          newSelectionRange.setEnd(end.node, end.offset);

          if (newSelectionRange.toString().length > 0) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(newSelectionRange);
            state.modal.updatePosition(newSelectionRange);
          }

        case 30:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _showForRange.apply(this, arguments);
}
})();

module.exports = __webpack_exports__;
/******/ })()
;