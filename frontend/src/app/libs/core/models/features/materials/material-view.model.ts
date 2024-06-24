export interface MaterialViewConfigModel {
  subtitleStyles?: SubtitleStyle[];
  shortcuts?: Shortcut[];
  speedList?: Record<string, string>;
  defaults?: MaterialDefaults;
  tracker?: TrackerConfiguration;
}

export interface TrackerConfiguration {
  started: TimeTrackingSetting;
  finished: TimeTrackingSetting;
}

interface TimeTrackingSetting {
  minWatchTime?: number;
  minVideoProgress?: number;
  minWatchTimeSeconds?: number;
}

export interface MaterialDefaults {
  speedValue?: string;
  styleIndex?: number;
}

export interface SubtitleStyle {
  label?: string;
  style?: Record<string, string>;
  mobileStyle?: Record<string, string>;
}

export interface Subtitle {
  startTime?: number;
  endTime?: number;
  text?: any;
}


export interface Shortcut {
  id: number;
  shortcut: string;
  action: string;
}

export interface SelectedSubtitle {
  index: number;
  subtitle: Subtitle;
}
