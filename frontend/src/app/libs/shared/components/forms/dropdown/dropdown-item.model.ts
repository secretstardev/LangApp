export interface DropdownItem {
  label: string;
  value: string | number | unknown;
  disabled?: boolean;
  items?: DropdownItem[];
}
