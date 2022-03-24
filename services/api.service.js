import angular from "angular";
import { GlobalSettings } from "../config/global.settings";

export class ApiService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  post(controller, methodName, data) {
    var defer = this.$q.defer();

    const url = GlobalSettings.apiBaseUrl + controller + "/" + methodName;
    const headers = GlobalSettings.apiHeaders;

    this.$http({
      method: "POST",
      url: url,
      headers: headers,
      data: data,
    }).then(
      function (data) {
        defer.resolve(data.data);
      },
      function (error) {
        if (error.status == 401) location.reload(); // if user is logoff then refresh page for redirect to login page
        defer.reject(error);
      }
    );

    return defer.promise;
  }

  get(controller, methodName, params) {
    const defer = this.$q.defer();

    const url = GlobalSettings.apiBaseUrl + controller + "/" + methodName;
    const headers = GlobalSettings.apiHeaders;

    this.$http({
      method: "GET",
      url: url,
      headers: headers,
      params: params,
    }).then(
      function (data) {
        defer.resolve(data.data);
      },
      function (error) {
        defer.reject(error);
      }
    );

    return defer.promise;
  }

  // async get(controller, methodName, data) {
  //     const url = GlobalSettings.apiBaseUrl + controller + '/' + methodName;
  //     const headers = GlobalSettings.apiHeaders;

  //     const ajaxPromise = await new Promise((resolve, reject) => {
  //          this._$http({
  //             method: 'GET',
  //             url: url,
  //             headers: headers,
  //             params: data
  //         }).then(function(data) {
  //             resolve(data.data);
  //         }, function(error) {
  //             reject(error);
  //         });
  //     });

  //     return ajaxPromise;
  // }
}
