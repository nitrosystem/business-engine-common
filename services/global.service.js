import angular from "angular";
import { GlobalSettings } from "../config/global.settings";
import pluralize from "pluralize";

export class GlobalService {
  constructor($window, $timeout) {
    this.$window = $window;
    this.$timeout = $timeout;
  }

  getParameterByName(name, url) {
    url = url ? url.toLowerCase() : document.URL.toLowerCase();

    const _url = decodeURIComponent(url);
    const _name = name.toLowerCase().replace(/[\[\]]/g, "\\$&");

    const regex = new RegExp("[?&]" + _name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(_url);

    if (!results) {
      //parse friendly params
      const friendlyParams = location.pathname
        .toLowerCase()
        .replace(/=/g, "/")
        .split("/");
      if (
        friendlyParams.indexOf(_name) >= 0 &&
        friendlyParams.length >= friendlyParams.indexOf(_name) + 2
      )
        return friendlyParams[friendlyParams.indexOf(_name) + 1];
      else return null;
    } else if (!results[2]) {
      return "";
    } else {
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  }

  replaceUrlParam(paramName, paramValue, url) {
    let _url = url ? url : document.URL;

    if (paramValue == null) paramValue = "";

    var pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)");
    if (_url.search(pattern) >= 0) {
      return _url.replace(pattern, "$1" + paramValue + "$2");
    }

    _url = _url.replace(/[?#]$/, "");
    return (
      _url + (_url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue
    );
  }

  pushState(url, title, data) {
    const _title = title ? title : document.title;
    const _data = data ? data : "";
    ("");

    this.$window.history.pushState({ pageTitle: _title }, _data, url);
  }

  parseJsonItems(items) {
    if (!items) return items;

    if (typeof items == "object" && items instanceof Array == false) {
      for (key in items) {
        var value = items[key];
        if (value && value instanceof Array) service.parseJsonItems();
        else if (
          typeof key == "string" &&
          typeof value == "string" &&
          value &&
          /^[\],:{}\s]*$/.test(
            value
              .toLowerCase()
              .replace(/\\["\\\/bfnrtu]/g, "@")
              .replace(
                /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]"
              )
              .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
          )
        ) {
          try {
            items[key] = JSON.parse(value);
            if (
              typeof items[key] == "object" &&
              items[key] instanceof Array == false
            )
              service.parseJsonItems(items[key]);
            else if (
              typeof items[key] == "object" &&
              items[key] instanceof Array == true
            )
              service.parseJsonItems(items[key]);
          } catch (e) {
            items[key] = value;
            console.log(e);
          }
        }
      }
    } else if (items instanceof Array) {
      angular.forEach(items, function (item) {
        if (typeof item == "object" && item instanceof Array == false)
          service.parseJsonItems(item);
        if (typeof item == "object" && item instanceof Array == true)
          service.parseJsonItems(item);
      });
    }
  }

  isJsonString(str) {
    if (!str) return false;
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  getJsonString(str) {
    try {
      var result = JSON.parse(str);
      return result;
    } catch (e) {
      return str;
    }
  }

  generateGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  getErrorHtmlFormat(error) {
    const html = `
        <table class="table table-bordered text-light error-table">
            <tbody>
                <tr>
                    <td class="w-50">Status Code</td>
                    <td>${error.status}</td>
                </tr>
                <tr>
                    <td>Status Text</td>
                    <td>${error.statusText}</td>
                </tr>
                <tr>
                    <td>Error Message</td>
                    <td>${error.data.Message}</td>
                </tr>
                <tr>
                    <td>HResult</td>
                    <td>${error.data.HResult}</td>
                </tr>
                <tr>
                    <td>Exception Method</td>
                    <td>${error.data.ExceptionMethod}</td>
                </tr>
                <tr>
                    <td>Source</td>
                    <td>${error.data.Source}</td>
                </tr>
                <tr>
                    <td>Stack Trace String</td>
                    <td>${error.StackTraceString}</td>
                </tr>
                <tr>
                    <td>Class Name</td>
                    <td>${error.data.ClassName}</td>
                </tr>
            </tbody>
        </table>`;
    return html;
  }

  getWordPluralize(word) {
    return pluralize(word);
  }

  checkSqlTypes(type) {
    const _type = type ? type.toString().toLowerCase() : "";
    if (!_type.match(/^([a-z]+)(\((\d+(,\d+)?|max)\))?$/)) return false;

    const match = /^([a-z]+)(\((\d+(,\d+)?|max)\))?$/.exec(_type);
    const sqlType = match[1];
    const length = match[3];
    const length2 = match[4];

    switch (sqlType) {
      case "int":
      case "bigit":
      case "smallint":
      case "tinyint":
      case "bit":
      case "float":
      case "real":
      case "money":
      case "smallmoney":
      case "date":
      case "datetime":
      case "smalldatetime":
      case "timestamp":
      case "geography":
      case "geometry":
      case "hierarchyid":
      case "image":
      case "text":
      case "ntext":
      case "sql_variant":
      case "uniqueidentifier":
      case "xml":
        if (!length) return true;
        break;
      case "binary":
      case "varbinary":
      case "char":
      case "datetime2":
      case "datetimeoffset":
      case "varchar":
      case "nvarchar":
      case "time":
        if (length && !length2) return true;
        break;
      case "decimal":
      case "numeric":
        if (length && length2) return true;
        break;
    }
  }
}
