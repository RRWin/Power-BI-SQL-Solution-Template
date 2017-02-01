import { Aurelia } from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HttpClient } from 'aurelia-http-client';

import { DataStore } from './datastore';
import { DeploymentService } from './deploymentservice';
import { ErrorService } from './errorservice';
import { HttpService } from './httpservice';
import { LoggerService } from './loggerservice';
import { NavigationService } from './navigationservice';
import { TranslateService } from './translate-service';
import { UtilityService } from './utilityservice';
import { ViewModelBase } from './viewmodelbase';

import { ExperienceType } from '../base/ExperienceType';
import { QueryParameter } from '../base/query-parameter';

@inject(Router, HttpClient)
export default class MainService {
    appName: string;
    experienceType: ExperienceType;
    DataStore: DataStore;
    DeploymentService: DeploymentService;
    ErrorService: ErrorService;
    HttpService: HttpService;
    LoggerService: LoggerService;
    MS: MainService;
    NavigationService: NavigationService;
    Router: Router;
    Translate: any;
    UtilityService: UtilityService;
    templateData: any;

    constructor(router, httpClient) {
        this.Router = router;
        (<any>window).MainService = this;

        this.UtilityService = new UtilityService(this);
        this.appName = this.UtilityService.GetQueryParameter(QueryParameter.NAME); 

        let experienceTypeString: string = this.UtilityService.GetQueryParameter(QueryParameter.TYPE);
        this.experienceType = ExperienceType[<string>experienceTypeString];

        this.ErrorService = new ErrorService(this);
        this.HttpService = new HttpService(this, httpClient);
        this.NavigationService = new NavigationService(this);
        this.NavigationService.appName = this.appName;
        this.DataStore = new DataStore(this);

        let translate: TranslateService = new TranslateService(this, this.UtilityService.GetQueryParameter(QueryParameter.LANG));
        this.Translate = translate.language;

        if (this.UtilityService.GetItem('App Name') !== this.appName) {
            this.UtilityService.ClearSessionStorage();
        }

        this.UtilityService.SaveItem('App Name', this.appName);

        if (!this.UtilityService.GetItem('UserGeneratedId')) {
            this.UtilityService.SaveItem('UserGeneratedId', this.UtilityService.GetUniqueId(15));
        }

        this.LoggerService = new LoggerService(this);
        this.DeploymentService = new DeploymentService(this);
    }

    // Uninstall or any other types go here
    async init() {
        let pages: string = '';
        let actions: string = '';

        if (this.appName && this.appName !== '') {
            switch (this.experienceType) {
                case ExperienceType.install: {
                    pages = 'Pages';
                    actions = 'Actions';
                    break;
                }
                case ExperienceType.uninstall: {
                    pages = 'UninstallPages';
                    actions = 'UninstallActions';
                    this.DeploymentService.experienceType = this.experienceType;
                    break;
                }
                default: {
                    pages = 'Pages';
                    actions = 'Actions';
                    this.DeploymentService.experienceType = ExperienceType.install;
                    break;
                }
            }
            this.templateData = await this.HttpService.getApp(this.appName);
            if (this.templateData && this.templateData[pages]) {
                this.NavigationService.init(this.templateData[pages]);
            }
            if (this.templateData && this.templateData[actions]) {
                this.DeploymentService.actions = this.templateData[actions];
            }
        }
    }
}