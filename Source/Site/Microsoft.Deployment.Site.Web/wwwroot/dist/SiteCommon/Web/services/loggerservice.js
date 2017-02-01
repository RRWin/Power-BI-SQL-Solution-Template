"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoggerService = function () {
    function LoggerService(MainService) {
        (0, _classCallCheck3.default)(this, LoggerService);

        this.MS = MainService;
        var snippet = {
            config: {
                instrumentationKey: '74bc59f2-6526-41b1-ab84-370532ec5d42'
            }
        };
        var init = new Microsoft.ApplicationInsights.Initialization(snippet);
        var applicationInsights = init.loadAppInsights();
        this.appInsights = applicationInsights;
        this.UserGenId = this.MS.UtilityService.GetItem('UserGeneratedId');
        this.SessionId = applicationInsights.context.session.id;
        this.UserId = applicationInsights.context.user.id;
        this.OperationId = applicationInsights.context.operation.id;
    }

    (0, _createClass3.default)(LoggerService, [{
        key: 'TrackStartRequest',
        value: function TrackStartRequest(request, uniqueId) {
            var properties = this.GetPropertiesForTelemtry();
            properties.UserGenId = this.UserGenId;
            properties.SessionId = this.SessionId;
            properties.UserId = this.UserId;
            properties.OperationId = this.OperationId;
            properties.Request = request;
            properties.UniqueId = uniqueId;
            properties.TemplateName = this.MS.NavigationService.appName;
            this.appInsights.trackEvent('UI-StartRequest-' + request, properties);
            this.appInsights.flush();
        }
    }, {
        key: 'TrackEndRequest',
        value: function TrackEndRequest(request, uniqueId, isSucess) {
            var properties = this.GetPropertiesForTelemtry();
            properties.UserGenId = this.UserGenId;
            properties.SessionId = this.SessionId;
            properties.UserId = this.UserId;
            properties.OperationId = this.OperationId;
            properties.Request = request;
            properties.UniqueId = uniqueId;
            properties.Sucess = isSucess;
            properties.TemplateName = this.MS.NavigationService.appName;
            this.appInsights.trackEvent('UI-EndRequest-' + request, properties);
            this.appInsights.flush();
        }
    }, {
        key: 'TrackEvent',
        value: function TrackEvent(requestName) {
            var properties = this.GetPropertiesForTelemtry();
            properties.UserGenId = this.UserGenId;
            properties.SessionId = this.SessionId;
            properties.UserId = this.UserId;
            properties.OperationId = this.OperationId;
            properties.TemplateName = this.MS.NavigationService.appName;
            this.appInsights.trackEvent('UI-' + requestName, properties);
            this.appInsights.flush();
        }
    }, {
        key: 'TrackDeploymentStepStartEvent',
        value: function TrackDeploymentStepStartEvent(deploymentIndex, deploymentName) {
            var properties = this.GetPropertiesForTelemtry();
            properties.UserGenId = this.UserGenId;
            properties.SessionId = this.SessionId;
            properties.UserId = this.UserId;
            properties.OperationId = this.OperationId;
            properties.DeploymentIndex = deploymentIndex;
            properties.DeploymentName = deploymentName;
            properties.TemplateName = this.MS.NavigationService.appName;
            this.appInsights.trackEvent('UI-' + deploymentName + '-Start-' + deploymentIndex, properties);
            this.appInsights.flush();
        }
    }, {
        key: 'TrackDeploymentStepStoptEvent',
        value: function TrackDeploymentStepStoptEvent(deploymentIndex, deploymentName, isSucess) {
            var properties = this.GetPropertiesForTelemtry();
            properties.UserGenId = this.UserGenId;
            properties.SessionId = this.SessionId;
            properties.UserId = this.UserId;
            properties.OperationId = this.OperationId;
            properties.DeploymentIndex = deploymentIndex;
            properties.DeploymentName = deploymentName;
            properties.TemplateName = this.MS.NavigationService.appName;
            properties.Sucess = isSucess;
            this.appInsights.trackEvent('UI-' + deploymentName + '-End-' + deploymentIndex, properties);
            this.appInsights.flush();
        }
    }, {
        key: 'TrackDeploymentStart',
        value: function TrackDeploymentStart() {
            var properties = this.GetPropertiesForTelemtry();
            properties.UserGenId = this.UserGenId;
            properties.SessionId = this.SessionId;
            properties.UserId = this.UserId;
            properties.OperationId = this.OperationId;
            properties.TemplateName = this.MS.NavigationService.appName;
            this.appInsights.trackEvent('UI-DeploymentStart', properties);
            this.appInsights.flush();
        }
    }, {
        key: 'TrackUninstallStart',
        value: function TrackUninstallStart() {
            var properties = this.GetPropertiesForTelemtry();
            properties.UserGenId = this.UserGenId;
            properties.SessionId = this.SessionId;
            properties.UserId = this.UserId;
            properties.OperationId = this.OperationId;
            properties.TemplateName = this.MS.NavigationService.appName;
            this.appInsights.trackEvent('UI-UninstallStart', properties);
            this.appInsights.flush();
        }
    }, {
        key: 'TrackUninstallEnd',
        value: function TrackUninstallEnd(isSuccess) {
            var properties = this.GetPropertiesForTelemtry();
            properties.UserGenId = this.UserGenId;
            properties.SessionId = this.SessionId;
            properties.UserId = this.UserId;
            properties.OperationId = this.OperationId;
            properties.TemplateName = this.MS.NavigationService.appName;
            properties.Sucess = isSuccess;
            this.appInsights.trackEvent('UI-UninstallEnd', properties);
            this.appInsights.flush();
        }
    }, {
        key: 'TrackDeploymentEnd',
        value: function TrackDeploymentEnd(isSucess) {
            var properties = this.GetPropertiesForTelemtry();
            properties.UserGenId = this.UserGenId;
            properties.SessionId = this.SessionId;
            properties.UserId = this.UserId;
            properties.OperationId = this.OperationId;
            properties.TemplateName = this.MS.NavigationService.appName;
            properties.Sucess = isSucess;
            this.appInsights.trackEvent('UI-DeploymentEnd', properties);
            this.appInsights.flush();
        }
    }, {
        key: 'GetPropertiesForTelemtry',
        value: function GetPropertiesForTelemtry() {
            var obj = {};
            obj.AppName = this.MS.NavigationService.appName;
            obj.FullUrl = window.location.href;
            obj.Origin = window.location.origin;
            obj.Host = window.location.host;
            obj.HostName = window.location.hostname;
            obj.PageNumber = this.MS.NavigationService.index;
            if (this.MS.NavigationService.getCurrentSelectedPage()) {
                obj.Route = this.MS.NavigationService.getCurrentSelectedPage().RoutePageName;
                obj.PageName = this.MS.NavigationService.getCurrentSelectedPage().PageName;
                obj.PageModuleId = this.MS.NavigationService.getCurrentSelectedPage().Path.replace(/\\/g, "/");
                obj.PageDisplayName = this.MS.NavigationService.getCurrentSelectedPage().DisplayName;
            }
            obj.RootSource = -this.MS.HttpService.isOnPremise ? 'MSI' : 'WEB';
            return obj;
        }
    }, {
        key: 'TrackPageView',
        value: function TrackPageView(page, url) {
            var properties = this.GetPropertiesForTelemtry();
            this.appInsights.trackPageView(page, url, properties);
            this.appInsights.flush();
        }
    }, {
        key: 'TrackTrace',
        value: function TrackTrace(trace) {
            this.appInsights.trackTrace('UI-' + trace);
            this.appInsights.flush();
        }
    }]);
    return LoggerService;
}();

exports.LoggerService = LoggerService;
//# sourceMappingURL=loggerservice.js.map
