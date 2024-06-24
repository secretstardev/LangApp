import * as config from '../config';
import { t, i18n } from '../i18n';
import { state, showForRange } from './common';
import { showSnackbar } from './Snackbar';
import * as browser from 'webextension-polyfill';
import { apiCall } from './commonExtension';

state.apiCall = apiCall;

function log(message: string) {
  browser.runtime.sendMessage({ type: 'sendLogServer', data: message });
}

async function init() {
  let result = await browser.storage.local.get(['token', 'user']);

  if (result.hasOwnProperty('token') && result.hasOwnProperty('user')) {
    state.user = result.user;
    i18n.changeLanguage(state.user.language);
  }
}

async function initOnAppPage() {
  const token = localStorage.getItem('token');
  state.user = JSON.parse(localStorage.getItem('user'));

  if (token !== null && state.user !== null) {
    browser.runtime.sendMessage({ type: 'siteAuth', data: { token: token, user: state.user } });
  }
}

window.onload = (async (ev) => {
  if (ev.target.baseURI === config.URIFront + '/app/') {
    await initOnAppPage();
  }
  await init();

  try {
    createButtonListener();
  } catch (e) {
    log(e.stack);
  }
});

window.addEventListener('message', async (event) => {
  if (event.source !== window) {
    return;
  }

  if (event.data.type && (event.data.type === 'LoginSuccess') && (event.origin === config.URIFront)) {
    const token = localStorage.getItem('token');
    state.user = JSON.parse(localStorage.getItem('user'));
    await browser.runtime.sendMessage({ type: 'siteAuth', data: { token: token, user: state.user } });
  }

  if (event.data.type && (event.data.type === 'saveSettingExtension') && (event.origin === config.URIFront)) {
    const result = await browser.runtime.sendMessage({ type: 'updateUserInfo' });
    state.user = result.response || state.user;
  }

  if (event.data.type && (event.data.type === 'Logout') && (event.origin === config.URIFront)) {
    await browser.runtime.sendMessage({ type: 'siteLogout' });
    state.user = null;
  }
});

function shouldReactToDblClick(e: MouseEvent) {
  switch (state.user.extensionSettings.clickModifier) {
    case 'DoubleClick':
      return (e.metaKey === false || e.ctrlKey === false) && e.shiftKey === false && e.altKey === false;
    case 'DoubleClickCtrl':
      return (e.metaKey === true || e.ctrlKey === true) && e.shiftKey === false && e.altKey === false;
    case 'DoubleClickShift':
      return (e.metaKey === false || e.ctrlKey === false) && e.shiftKey === true && e.altKey === false;
    case 'DoubleClickAlt':
      return (e.metaKey === false || e.ctrlKey === false) && e.shiftKey === false && e.altKey === true;
  }

  return false;
}

function shouldReactToClick(e: MouseEvent) {
  return (e.metaKey === true || e.ctrlKey === true) && e.shiftKey === false && e.altKey === false;
}

function createButtonListener() {
  document.addEventListener('dblclick', (e) => {
    if (!state.user) {
      showForRange(document.caretRangeFromPoint(e.x, e.y));
      return;
    }
    if (shouldReactToDblClick(e)) {
      showForRange(document.caretRangeFromPoint(e.x, e.y));
    }
  });

  document.addEventListener('click', (e) => {
    if (shouldReactToClick(e)) {
      let selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let selectedRange = selection.getRangeAt(0);
        if (selectedRange.toString().length > 0) {
          showForRange(selectedRange, true);
        }
      }
    }
  });
}