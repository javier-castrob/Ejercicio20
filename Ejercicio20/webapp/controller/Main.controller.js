sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "Ejercicio20/Ejercicio20/util/Services",
        "sap/ui/model/json/JSONModel",
        "Ejercicio20/Ejercicio20/util/Constants"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, Services, JSONModel, Constants) {
		"use strict";

		return Controller.extend("Ejercicio20.Ejercicio20.controller.Main", {
			onInit: function () {
                this.getOrderDetails();
            },
            cambiarIdioma: function (oEvent) {
                if (oEvent.getSource().getProperty("state")){
                    sap.ui.getCore().getConfiguration().setLanguage("ES");
                } else {
                    sap.ui.getCore().getConfiguration().setLanguage("EN");
                }                
            },
            getOrderDetails: async function(){
                const oComponent = this.getView();
                try {
                    const oOrderDetails = await Services.getOrderDetails();
                    const oOrderDetailsModel = new JSONModel(oOrderDetails[0]);
                    oComponent.setModel(oOrderDetailsModel, Constants.model.OrderDetails);                                   
                } catch (oError) {
                    console.log(oError);
                }
            },
            getOrder: async function(nId){
                const oComponent = this.getOwnerComponent();
                try {
                    const oOrder = await Services.getOrder(nId);
                    const oOrderModel = new JSONModel(oOrder[0]);
                    oComponent.setModel(oOrderModel, Constants.model.Order);
                } catch (oError) {
                    console.log(oError);
                }
            },
            onPress: function (oEvent) {
                let oModel = this.getView().getModel(Constants.model.OrderDetails);
                let oOrderDetail = oModel.getProperty(oEvent.getSource().getBindingContext(Constants.model.OrderDetails).getPath());
                let nId = oOrderDetail.OrderID;
                let that = this;
                this.getOrder(nId).then(function () {
                    that.onNavigate();                                      
                });         
            },
            onNavigate: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteOrder");
            }
		});
	});
