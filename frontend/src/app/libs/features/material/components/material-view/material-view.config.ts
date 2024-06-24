import { MaterialViewConfigModel } from '@app/libs/core/models/features/materials/material-view.model';

const subtitleStyle: Record<string, string> = {
  // height: '76px',
  display: 'flex',
  'flex-direction': 'column',
  'justify-content': 'center',
};

export const MaterialViewConfig: MaterialViewConfigModel = {
  defaults: {
    styleIndex: 4,
    speedValue: '1.0'
  },
  subtitleStyles: [
    {
      label: '200%',
      style: { 'font-size': '40px', ...subtitleStyle },
      mobileStyle: { 'font-size': '28px', ...subtitleStyle },
    },
    {
      label: '175%',
      style: { 'font-size': '35px', ...subtitleStyle },
      mobileStyle: { 'font-size': '25px', ...subtitleStyle },
    },
    {
      label: '150%',
      style: { 'font-size': '30px', ...subtitleStyle },
      mobileStyle: { 'font-size': '21px', ...subtitleStyle },
    },
    {
      label: '125%',
      style: { 'font-size': '25px', ...subtitleStyle },
      mobileStyle: { 'font-size': '17px', ...subtitleStyle },
    },
    {
      label: '100%',
      style: { 'font-size': '20px', ...subtitleStyle },
      mobileStyle: { 'font-size': '14px', ...subtitleStyle },
    },
    {
      label: '90%',
      style: { 'font-size': '18px', ...subtitleStyle },
      mobileStyle: { 'font-size': '13px', ...subtitleStyle },
    },
  ],
  shortcuts: [
    {
      id: 1,
      shortcut: 'KEY_SPACE',
      action: 'PAUSE_VIDEO',
    },
    {
      id: 2,
      shortcut: 'KEY_RARROW',
      action: 'NEXT_SUB',
    },
    {
      id: 3,
      shortcut: 'KEY_LARROW',
      action: 'PREV_SUB',
    },
    {
      id: 4,
      shortcut: 'KEY_R',
      action: 'RepeatSentence',
    },
  ],
  speedList: {
    'x0.5': '0.5',
    'x0.75': '0.75',
    'x0.8': '0.8',
    'x0.9': '0.9',
    'Normal': '1.0',
    'x1.25': '1.25',
    'x1.5': '1.5'
  },
  tracker: {
    started: {
      minWatchTimeSeconds: 10
    },
    finished: {
      minVideoProgress: 85,
      minWatchTime: 20
    }
  }
};

