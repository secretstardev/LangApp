import * as browser from 'webextension-polyfill';
import * as config from '../config.js';

browser.action.onClicked.addListener(function (activeTab) {
    browser.tabs.create({ url: config.URIFront + '/app/settings/plugin' });
});

browser.runtime.onInstalled.addListener(async () => {
    await init();
});

browser.runtime.onStartup.addListener(async () => {
    await init();
});

browser.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === "updateUserInfo") {
        await updateUserInfo();
    }
});

let token = null;
let user = null;

async function init() {
    await loadUserFromStorage();
    await updateUserInfo();
    setupPeriodicTasks();
}

function setupPeriodicTasks() {
    browser.alarms.get("updateUserInfo").then((alarm) => {
        if (!alarm) {
            browser.alarms.create("updateUserInfo", { periodInMinutes: 60 });
        }
    });
}

async function apiCall(httpMethod: string, apiMethod: string, body: any = null) {
    try {
        let url = config.URIApi + 'api/' + apiMethod;
        let requestParams: RequestInit = {
            method: httpMethod,
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        };
        if (body) {
            requestParams.body = JSON.stringify(body);
        }
        let response = await fetch(url, requestParams);
        let responseBody = await response.json();
        if (response.status == 200) {
            return responseBody;
        } else {
            return { error: 'Error: ' + response.statusText }; // TODO: format to standart API error format
        }
    } catch (e) {
        return { error: 'Unknown error' }; // TODO: format to standart API error format
    }
}

browser.runtime.onMessage.addListener(async (message: any) => {
    let objData = message.data;
    let result: any = '';

    if (message.type == 'apiCall') {
        let response = await apiCall(message.httpMethod, message.apiMethod, message.body);
        return { type: 'apiResponse', response: response };
    }
    else if (message.type === 'siteAuth') {
        user = objData.user;
        token = objData.token;

        await browser.storage.local.set({ token: token, user: user });
    } else if (message.type === 'updateUserInfo') {
        const updatedUser = await updateUserInfo();
        return { type: 'updateUserInfo', response: updatedUser };
    } else if (message.type === 'saveSetting') {
        await browser.storage.local.set({
            settingExtensionAction: objData.settingExtension,
            settingExtensionSubtitle: objData.settingExtensionSubtitle
        });
    } else if (message.type === 'siteLogout') {
        token = '';
        await browser.storage.local.clear();
    } else if (message.type === 'sendLogServer') {
        await log({ objData });
    }
});

async function loadUserFromStorage() {
    let result = await browser.storage.local.get(['token', 'user']);
    if (result.token) {
        token = result.token;
    }
    if (result.user) {
        user = result.user;
    }
}

async function updateUserInfo() {
    if (user && token) {
        const responseTmp = await apiCall('GET', 'users/me');
        if (responseTmp && responseTmp.id) {
            user = responseTmp;
            browser.storage.local.set({ user: responseTmp })
            return user;
        }
    }
    return null;
}

async function log(data: any) {
    let response = await apiCall('POST', 'logs/create', data);
    if (response.error) {
        console.log('Unable to send log. Error: ', response.error);
    }
}
