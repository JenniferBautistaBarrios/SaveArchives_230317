/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/eliminarArchivo.js":
/*!***********************************!*\
  !*** ./src/js/eliminarArchivo.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\ndocument.querySelectorAll('#deleteForm').forEach(form => {\r\n    form.addEventListener('submit', async function (event) {\r\n        event.preventDefault(); // Prevenir el envío tradicional del formulario\r\n\r\n        const confirmacion = confirm('¿Estás seguro de que deseas eliminar este archivo?');\r\n        if (!confirmacion) return;\r\n\r\n        const formData = new FormData(this);\r\n        const nombre = formData.get('nombre');\r\n\r\n        try {\r\n            const response = await fetch('/archives/delete', {\r\n                method: 'POST',\r\n                headers: { 'Content-Type': 'application/json' },\r\n                body: JSON.stringify({ nombre }),\r\n            });\r\n\r\n            const result = await response.json();\r\n\r\n            if (result.success) {\r\n                alert(result.message); // Muestra un mensaje de éxito\r\n                this.closest('.flex.items-center').remove(); // Elimina el nodo de la vista\r\n                // Opcional: Recargar la página después de unos segundos\r\n                setTimeout(() => {\r\n                    window.location.reload();\r\n                }, 1000);\r\n            } else {\r\n                alert('Error al eliminar el archivo: ' + result.message);\r\n            }\r\n        } catch (error) {\r\n            console.error('Error al eliminar:', error);\r\n            alert('Ocurrió un error al intentar eliminar el archivo.');\r\n        }\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://nimbusfiles/./src/js/eliminarArchivo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/eliminarArchivo.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;