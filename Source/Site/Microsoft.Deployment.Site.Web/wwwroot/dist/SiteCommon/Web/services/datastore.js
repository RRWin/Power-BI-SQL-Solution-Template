"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dictionary_1 = require("../base/Dictionary");

var DataStore = function () {
    function DataStore(MainService) {
        (0, _classCallCheck3.default)(this, DataStore);

        this.CurrentRoutePage = '';
        this.DeploymentIndex = '';
        this.MS = MainService;
        this.PrivateDataStore = new Dictionary_1.Dictionary();
        this.PublicDataStore = new Dictionary_1.Dictionary();
        this.loadDataStores();
    }

    (0, _createClass3.default)(DataStore, [{
        key: "toJSON",
        value: function toJSON() {
            var toConvert = {};
            toConvert.PublicDataStore = this.PublicDataStore;
            toConvert.PrivateDataStore = this.PrivateDataStore;
            toConvert.CurrentRoutePage = this.CurrentRoutePage;
            toConvert.DeploymentIndex = this.DeploymentIndex;
            return toConvert;
        }
    }, {
        key: "loadDataStoreFromJson",
        value: function loadDataStoreFromJson(value) {
            if (!value) {
                return;
            }
            var privateStore = value.PrivateDataStore;
            var publicStore = value.PublicDataStore;
            if (privateStore) {
                this.PrivateDataStore = new Dictionary_1.Dictionary();
                for (var route in privateStore) {
                    var valueToAdd = new Dictionary_1.Dictionary();
                    for (var key in privateStore[route]) {
                        valueToAdd.add(key, privateStore[route][key]);
                    }
                    this.PrivateDataStore.add(route, valueToAdd);
                }
            }
            if (publicStore) {
                this.PublicDataStore = new Dictionary_1.Dictionary();
                for (var _route in publicStore) {
                    var _valueToAdd = new Dictionary_1.Dictionary();
                    for (var _key in publicStore[_route]) {
                        _valueToAdd.add(_key, publicStore[_route][_key]);
                    }
                    this.PublicDataStore.add(_route, _valueToAdd);
                }
            }
        }
    }, {
        key: "currentRoute",
        value: function currentRoute() {
            return this.CurrentRoutePage + "-" + this.DeploymentIndex;
        }
    }, {
        key: "loadDataStores",
        value: function loadDataStores() {
            var datastore = this.MS.UtilityService.GetItem(this.MS.NavigationService.appName + " datastore");
            if (!datastore) {
                this.PublicDataStore = new Dictionary_1.Dictionary();
                this.PrivateDataStore = new Dictionary_1.Dictionary();
            } else {
                this.loadDataStoreFromJson(datastore);
            }
        }
    }, {
        key: "cacheDataStores",
        value: function cacheDataStores() {
            this.MS.UtilityService.SaveItem(this.MS.NavigationService.appName + " datastore", this);
        }
    }, {
        key: "routeExists",
        value: function routeExists(route) {
            var dataStoreType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataStoreType.Any;

            var found = false;
            if (dataStoreType === DataStoreType.Private || dataStoreType === DataStoreType.Any) {
                if (this.PrivateDataStore.containsKey(route)) {
                    found = true;
                }
            }
            if (dataStoreType === DataStoreType.Public || dataStoreType === DataStoreType.Any) {
                if (this.PublicDataStore.containsKey(route)) {
                    found = true;
                }
            }
            return found;
        }
    }, {
        key: "keyExists",
        value: function keyExists(key) {
            var dataStoreType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataStoreType.Any;

            return this.getValueAndRoutesFromDataStore(dataStoreType, key).length > 0;
        }
    }, {
        key: "routeAndKeyExists",
        value: function routeAndKeyExists(route, key) {
            var dataStoreType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DataStoreType.Any;

            var found = false;
            if (dataStoreType === DataStoreType.Private || dataStoreType === DataStoreType.Any) {
                if (this.PrivateDataStore.containsKey(route)) {
                    if (this.PrivateDataStore.get(route).containsKey(key)) {
                        found = true;
                    }
                }
            }
            if (dataStoreType === DataStoreType.Public || dataStoreType === DataStoreType.Any) {
                if (this.PublicDataStore.containsKey(route)) {
                    if (this.PublicDataStore.get(route).containsKey(key)) {
                        found = true;
                    }
                }
            }
            return found;
        }
    }, {
        key: "addToDataStoreWithCustomRoute",
        value: function addToDataStoreWithCustomRoute(route, key, value, dataStoreType) {
            this.updateValue(dataStoreType, route, key, value);
            this.cacheDataStores();
        }
    }, {
        key: "addToDataStore",
        value: function addToDataStore(key, value, dataStoreType) {
            this.updateValue(dataStoreType, this.currentRoute(), key, value);
            this.cacheDataStores();
        }
    }, {
        key: "addObjectToDataStore",
        value: function addObjectToDataStore(value, dataStoreType) {
            for (var propertyName in value) {
                this.updateValue(dataStoreType, this.currentRoute(), propertyName, value[propertyName]);
            }
            this.cacheDataStores();
        }
    }, {
        key: "addObjectToDataStoreWithCustomRoute",
        value: function addObjectToDataStoreWithCustomRoute(route, value, dataStoreType) {
            for (var propertyName in value) {
                this.updateValue(dataStoreType, route, propertyName, value[propertyName]);
            }
            this.cacheDataStores();
        }
    }, {
        key: "getJson",
        value: function getJson(key) {
            var dataStoreType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataStoreType.Any;

            return this.getFirstValueFromDataStore(key, dataStoreType);
        }
    }, {
        key: "getJsonWithRoute",
        value: function getJsonWithRoute(route, key) {
            var dataStoreType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DataStoreType.Any;

            return this.getValueWithRouteAndKey(dataStoreType, route, key);
        }
    }, {
        key: "getValue",
        value: function getValue(key) {
            var dataStoreType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataStoreType.Any;

            return this.getFirstValueFromDataStore(key, dataStoreType).toString();
        }
    }, {
        key: "getValueWithRoute",
        value: function getValueWithRoute(route, key) {
            var dataStoreType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DataStoreType.Any;

            return this.getValueWithRouteAndKey(dataStoreType, route, key).toString();
        }
    }, {
        key: "getAllJson",
        value: function getAllJson(key) {
            var dataStoreType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataStoreType.Any;

            return this.getAllValueFromDataStore(key, dataStoreType);
        }
    }, {
        key: "getAllValues",
        value: function getAllValues(key) {
            var dataStoreType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataStoreType.Any;

            return this.getAllValueFromDataStore(key, dataStoreType).map(function (p) {
                return p.toString();
            });
        }
    }, {
        key: "getAllDataStoreItems",
        value: function getAllDataStoreItems(key) {
            var dataStoreType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataStoreType.Any;

            return this.getValueAndRoutesFromDataStore(dataStoreType, key);
        }
    }, {
        key: "getFirstValueFromDataStore",
        value: function getFirstValueFromDataStore(key) {
            var dataStoreType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataStoreType.Any;

            var values;
            if (dataStoreType === DataStoreType.Private || dataStoreType === DataStoreType.Any) {
                values = DataStore.getValueAndRoutesFromDataStore(this.PrivateDataStore, key, DataStoreType.Private);
                if (values.length > 0) {
                    return values[0].value;
                }
            }
            if (dataStoreType === DataStoreType.Public || dataStoreType === DataStoreType.Any) {
                values = DataStore.getValueAndRoutesFromDataStore(this.PublicDataStore, key, DataStoreType.Private);
                if (values.length > 0) {
                    return values[0].value;
                }
            }
            return null;
        }
    }, {
        key: "getAllValueFromDataStore",
        value: function getAllValueFromDataStore(key) {
            var dataStoreType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataStoreType.Any;

            var items = this.getValueAndRoutesFromDataStore(dataStoreType, key);
            return items.map(function (value, index, array) {
                return value.value;
            });
        }
    }, {
        key: "getValueAndRoutesFromDataStore",
        value: function getValueAndRoutesFromDataStore(dataStoreType, key) {
            var valuesToReturn = new Array();
            if (dataStoreType === DataStoreType.Private || dataStoreType === DataStoreType.Any) {
                valuesToReturn = valuesToReturn.concat(DataStore.getValueAndRoutesFromDataStore(this.PrivateDataStore, key, DataStoreType.Private));
            }
            if (dataStoreType === DataStoreType.Public || dataStoreType === DataStoreType.Any) {
                valuesToReturn = valuesToReturn.concat(DataStore.getValueAndRoutesFromDataStore(this.PublicDataStore, key, DataStoreType.Public));
            }
            return valuesToReturn;
        }
    }, {
        key: "getValueWithRouteAndKey",
        value: function getValueWithRouteAndKey(dataStoreType, route, key) {
            if (dataStoreType === DataStoreType.Private || dataStoreType === DataStoreType.Any) {
                if (this.PrivateDataStore.containsKey(route) && this.PrivateDataStore.get(route).containsKey(key)) {
                    return this.PrivateDataStore.get(route).get(key);
                }
            }
            if (dataStoreType === DataStoreType.Public || dataStoreType === DataStoreType.Any) {
                if (this.PublicDataStore.containsKey(route) && this.PublicDataStore.get(route).containsKey(key)) {
                    return this.PublicDataStore.get(route).get(key);
                }
            }
            return null;
        }
    }, {
        key: "updateValue",
        value: function updateValue(dataStoreType, route, key, value) {
            var foundInPrivate = false;
            var foundInPublic = false;
            if (dataStoreType === DataStoreType.Private || dataStoreType === DataStoreType.Any) {
                foundInPrivate = DataStore.updateItemIntoDataStore(this.PrivateDataStore, route, key, value);
            }
            if (dataStoreType === DataStoreType.Public || dataStoreType === DataStoreType.Any) {
                foundInPublic = DataStore.updateItemIntoDataStore(this.PublicDataStore, route, key, value);
            }
            if (!foundInPublic && !foundInPrivate) {
                if (dataStoreType === DataStoreType.Private || dataStoreType === DataStoreType.Any) {
                    DataStore.addModifyItemToDataStore(this.PrivateDataStore, route, key, value);
                }
                if (dataStoreType === DataStoreType.Public) {
                    DataStore.addModifyItemToDataStore(this.PublicDataStore, route, key, value);
                }
            }
        }
    }], [{
        key: "getValueAndRoutesFromDataStore",
        value: function getValueAndRoutesFromDataStore(store, key, dataStoreType) {
            var itemsMatching = new Array();
            for (var i = 0; i < store.length(); i++) {
                var item = store.getItem(i);
                if (item["1"].containsKey(key)) {
                    var itemToAdd = new DataStoreItem();
                    itemToAdd.route = item["0"];
                    itemToAdd.key = key;
                    itemToAdd.value = item["1"].get(key);
                    itemsMatching.push(itemToAdd);
                }
            }
            return itemsMatching;
        }
    }, {
        key: "updateItemIntoDataStore",
        value: function updateItemIntoDataStore(store, route, key, value) {
            var found = false;
            if (store.containsKey(route) && store.get(route).containsKey(key)) {
                found = true;
                if (value === null) {
                    store.get(route).remove(key);
                } else {
                    store.get(route).modify(key, value);
                }
            }
            return found;
        }
    }, {
        key: "addModifyItemToDataStore",
        value: function addModifyItemToDataStore(store, route, key, value) {
            if (!store.containsKey(route)) {
                store.add(route, new Dictionary_1.Dictionary());
            }
            if (!store.get(route).containsKey(key)) {
                store.get(route).add(key, value);
            }
            store.get(route).modify(key, value);
        }
    }]);
    return DataStore;
}();

exports.DataStore = DataStore;

var DataStoreItem = function DataStoreItem() {
    (0, _classCallCheck3.default)(this, DataStoreItem);
};

exports.DataStoreItem = DataStoreItem;
(function (DataStoreType) {
    DataStoreType[DataStoreType["Public"] = 0] = "Public";
    DataStoreType[DataStoreType["Private"] = 1] = "Private";
    DataStoreType[DataStoreType["Any"] = 2] = "Any";
})(exports.DataStoreType || (exports.DataStoreType = {}));
var DataStoreType = exports.DataStoreType;
//# sourceMappingURL=datastore.js.map
