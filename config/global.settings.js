export class GlobalSettings {
    static portalID = window.bEngineGlobalSettings.portalID;
    static portalAliasID = window.bEngineGlobalSettings.portalAliasID;
    static userID = window.bEngineGlobalSettings.userID;
    static tabID = window.bEngineGlobalSettings.tabID;
    static moduleID = window.bEngineGlobalSettings.moduleID;
    static moduleType = window.bEngineGlobalSettings.moduleType;
    static applicationPath = window.bEngineGlobalSettings.applicationPath;
    static baseUrl = window.bEngineGlobalSettings.baseUrl;
    static siteRoot = window.bEngineGlobalSettings.siteRoot;
    static modulePath = window.bEngineGlobalSettings.modulePath;
    static apiBaseUrl = window.bEngineGlobalSettings.serviceUrl;
    static version = window.bEngineGlobalSettings.version;
    static debugMode = window.bEngineGlobalSettings.debugMode;

    static apiHeaders = {
        TabId: this.tabID,
        ModuleId: this.moduleID,
        ModuleGuid: null
    }

}