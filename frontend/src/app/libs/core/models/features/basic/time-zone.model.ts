export interface TimeZoneGroup {
  group: string;
  zones: TimeZone[];
}

export interface TimeZone {
  name: string;
  value: string;
}
