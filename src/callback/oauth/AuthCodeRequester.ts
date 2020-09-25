export class Util{
    public static getQueryParams = ( param: string, url: string ) => {
        let href = url;
        //this expression is to get the query strings
        let reg = new RegExp( '[?&#&]' + param + '=([^&#]*)', 'i' );
        let queryString = reg.exec(href);
        return queryString ? queryString[1] : null;
      };    
}

const windowParams = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

export class AuthCodeRequester {

    private windowObjectReference: Window = null;
    private prevUrl: string = null;
    private authCode: string = null;

    private queryStringKey: string;

    constructor(queryStringKey: string){
        this.queryStringKey = queryStringKey;
    }

    public getAuthCode = async (url: string, name?: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {

            if (!name)
            name = "Authentication"

            this.openSignInWindow(url, name);
            this.waitTillWindowCloses(() => {
                return resolve(this.authCode);
            });
        });
    }

    private openSignInWindow = (url: string, name: string) => {

        window.removeEventListener('message', this.receiveMessage);

        if (this.windowObjectReference === null || this.windowObjectReference.closed) {
             this.windowObjectReference = window.open(url, name, windowParams);
        }
        else if (this.prevUrl !== url) {
             this.windowObjectReference = window.open(url, name, windowParams);
             this.windowObjectReference.focus();
        }
        else {
             this.windowObjectReference.focus();
        }
       
          // add the listener for receiving a message from the popup
          window.addEventListener('message', event => this.receiveMessage(event), false);
          
          // assign the previous URL
          this.prevUrl = url;
    }

    private receiveMessage = (event: MessageEvent) => {
        // Reject CORS Event
        const { origin, data } = event;

        if (origin !== window.location.origin || data === 'unchanged') {
        return;
        }

        // if we trust the sender and the source is our popup
        let authCode = Util.getQueryParams(this.queryStringKey, data);
        
        if(authCode)
        this.authCode = authCode;
        
        //Respond back to callback window to confirm its been received
        this.windowObjectReference.postMessage('HOVVA_AUTHCODE_CONFIRMED', window.origin);
    }

    private waitTillWindowCloses = (callback: Function) => {
        let windowClosed = (this.windowObjectReference === null || this.windowObjectReference.closed);

        if(!windowClosed){
            console.log('Waiting for response (1000 ms)...');
            setTimeout(() => this.waitTillWindowCloses(callback), 1000);
        }
        else{
            callback();
        }
    }
}