/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Ejercicio20/Ejercicio20/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
