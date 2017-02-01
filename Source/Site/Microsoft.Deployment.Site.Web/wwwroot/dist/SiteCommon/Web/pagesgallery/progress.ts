import { DataStoreType } from '../services/datastore';
import { ViewModelBase } from '../services/viewmodelbase';

export class ProgressViewModel extends ViewModelBase {
    emailAddress: string = '';
    finishedActionName: string = '';
    isDataPullDone: boolean = false;
    isPbixReady: boolean = false;
    nameFirst: string = '';
    nameLast: string = '';
    pbixDownloadLink: string = '';
    recordCounts: any[] = [];
    showCounts: boolean = false;
    showEmailSubmission: boolean = true;
    sliceStatus: any[] = [];
    sqlServerIndex: number = 0;
    successMessage: string = this.MS.Translate.PROGRESS_ALL_DONE;
    targetSchema: string = '';
    filename: string = 'report.pbix';
    isUninstall: boolean = false;

    constructor() {
        super();
        this.showNext = false;
    }

    async OnLoaded() {
        if (!this.MS.DeploymentService.isFinished) {
            // Run all actions
            let success: boolean = await this.MS.DeploymentService.ExecuteActions();

            if (!success) {
                return;
            }

            if (!this.isUninstall) {
                let body: any = {};
                body.FileName = this.filename;
                body.SqlServerIndex = this.sqlServerIndex;
                let response = await this.MS.HttpService.executeAsync('Microsoft-WranglePBI', body);
                if (response.IsSuccess) {
                    this.pbixDownloadLink = response.Body.value;
                    this.isPbixReady = true;
                }
                this.QueryRecordCounts();
            }
        }
    }

    async QueryRecordCounts() {
        if (this.showCounts && !this.isDataPullDone && !this.MS.DeploymentService.hasError) {
            let body: any = {};
            body.FinishedActionName = this.finishedActionName;
            body.IsWaiting = false;
            body.SqlServerIndex = this.sqlServerIndex;
            body.TargetSchema = this.targetSchema;

            let response = await this.MS.HttpService.executeAsync('Microsoft-GetDataPullStatus', body);
            if (response.IsSuccess) {
                this.recordCounts = response.Body.status;
                this.sliceStatus = response.Body.slices;

                this.isDataPullDone = response.Body.isFinished;
                this.QueryRecordCounts();

            } else {
                this.MS.DeploymentService.hasError = true;
            }
        }
    }

    SubmitEmailAddress() {
        if (this.emailAddress && this.emailAddress.length > 0 && this.emailAddress.indexOf('@') !== -1) {
            this.showEmailSubmission = false;
            try {
                this.MS.DataStore.addToDataStore('EmailAddress', this.emailAddress, DataStoreType.Public);
                this.MS.DataStore.addToDataStore('NameFirst', this.nameFirst, DataStoreType.Public);
                this.MS.DataStore.addToDataStore('NameLast', this.nameLast, DataStoreType.Public);
                this.MS.HttpService.executeAsync('Microsoft-EmailSubscription', {
                    isInvisible: true
                });
            } catch (emailSubscriptionException) {
                // Email subscription failed
            }
        }
    }

    SubmitEmailLink() {
        window.open('https://www.microsoft.com/en-us/privacystatement/OnlineServices/Default.aspx', '_blank');
    }
}