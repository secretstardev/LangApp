export interface TimelineMarker {
  value: string;
  description?: {
    value: string;
    color: string;
  };
  type?: 'success';
}

export interface TimelineLegendItem {
  title: string;
  description: string;
  color: string;
}
