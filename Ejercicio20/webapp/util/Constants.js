sap.ui.define([
	], function () {
		"use strict";

		return {
            model: {
                I18N: "i18n",
                OrderDetails: "OrderDetails",
                Order: "Order"
            },
            properties: {
                TOOLS_MODEL: {
                    name: "/name"
                }
            },
            ids: {
                FRAGMENTS: {
                    dialog: "dialog"
                }
            },
            northwind: {
               order_details: {
                    endPoint: "Northwind",
                    method: "GET",
                    entity: "/V3/Northwind/Northwind.svc/Order_Details"
               },
               orders: {
                    endPoint: "Northwind",
                    method: "GET",
                    entity: "/V3/Northwind/Northwind.svc/Orders"
               },
            },
            routes: {
                main: "Main",
                FRAGMENTS: {
                    dialog: "EjercicioDialog.EjercicioDialog.fragments.Dialog"
                }
            }
		};
	}, true);
