sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "Ejercicio20/Ejercicio20/util/Formatter"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, Formatter) {
		"use strict";

		return Controller.extend("Ejercicio20.Ejercicio20.controller.Order", {
            Formatter:Formatter,
			onInit: function () {
                
            },
            onBack: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteMain");
            },
		});
	});
