/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Ejercicio20/Ejercicio20/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
