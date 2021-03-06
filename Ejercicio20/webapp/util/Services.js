sap.ui.define([
    "Ejercicio20/Ejercicio20/util/Constants"
], function (Constants) {
		"use strict";

		return {
            /**
            * Converts a jQuery AJAX promise into a mainline promise
            * @param {object} oPromise jQuery Deferred object
            */
            toPromise: function (oPromise) {
            return new Promise(function (resolve, reject) {
            oPromise.then(() => {
            const sHeaders = oPromise.done().getAllResponseHeaders();
            const aHeaders = sHeaders.trim().split(/[\r\n]+/);
            const oHeaderMap = {};
            aHeaders.forEach(function (sLine) {
            const aParts = sLine.split(': ');
            const sHeader = aParts.shift();
            const sValue = aParts.join(': ');
            oHeaderMap[sHeader] = sValue;
            });
            resolve([oPromise.done().responseJSON, oHeaderMap]);
            }, reject);
            });
            },

            /**
            * Wrapper function, creates an jQuery deferred object for AJAX
            * @param {object} oOptions Request options
            */
            promisizer: function (oOptions) {
            return this.toPromise(jQuery.ajax(oOptions));
            },
            /**
            * Requests a JSON file in localService folder
            * @param {string} sJsonName JSON filename
            */
            getLocalJSON: function (sJsonName) {
            return this.promisizer(jQuery.sap.getModulePath("Ejercicio20.Ejercicio20") + "/localService/" + sJsonName);
            },

            /**
            * Gets an object with jQuery.ajax compatible properties
            * @param {Object} oOptions Mapped hash of URL info properties
            * @param {string} oOptions.endPoint Connection endpoint (SCP)
            * @param {string} oOptions.method Request method, e.g GET
            * @param {Boolean} oOptions.fetch Request flag for fetching a CSRF token
            * @param {string} oOptions.params URL Like string parameters
            * @param {string} oOptions.data Request data
            */
            getRequest: function (oOptions = {}) {
                const oHeaders = {
                'Content-Type': "application/json;charset=UTF-8;IEEE754Compatible=true",
                'accept': "application/json",
                'Access-Control-Allow-Origin': "*"
                };
                if (oOptions.username && oOptions.password) {
                oHeaders.Authorization = "Basic " + btoa(oOptions.username + ":" + oOptions.password);
                }
                if (oOptions.fetch) {
                oHeaders['X-CSRF-TOKEN'] = 'Fetch';
                }
                if (oOptions.method === 'POST') {
                oHeaders['X-CSRF-TOKEN'] = localStorage.getItem('csrf');
                }
                const sParams = oOptions.params ? "?" + oOptions.params : "";
                return {
                headers: oHeaders,
                url: this.getBaseURL(oOptions.endPoint) + this.getEndpoint(oOptions) + "/" + (oOptions.entity || '') + sParams,
                method: oOptions.method,
                data: oOptions.data || ''
                };
            },
            getEndpoint: function (oOptions) {
                return oOptions.endPoint;
            },
            getBaseURL: function (sEndPoint) {
                return jQuery.sap.getModulePath("Ejercicio20.Ejercicio20") + "/";
            },
            getOrderDetails: async function() {
                const oRequest = this.getRequest({
                    endPoint: Constants.northwind.order_details.endPoint,
                    method: Constants.northwind.order_details.method,
                    entity: Constants.northwind.order_details.entity
                });
                return this.promisizer(oRequest);
            },
            getOrder: async function(nOrderId) {
                const oRequest = this.getRequest({
                    endPoint: Constants.northwind.orders.endPoint,
                    method: Constants.northwind.orders.method,
                    entity: Constants.northwind.orders.entity+`(${nOrderId})`
                });
                return this.promisizer(oRequest);
            },          
        }
	});