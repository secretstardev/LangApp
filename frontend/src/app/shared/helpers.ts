import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { encode as urlSafeBase64Encode, decode as urlSafeBase64Decode } from 'url-safe-base64';

export function randomFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max * 1000 - min * 1000 + 1) + min * 1000);
}

export type Dictionary<T> = { [key: string]: T };

export function allParams(route: ActivatedRoute): Observable<any> {
  return combineLatest([route.params, route.queryParams]).pipe(
    map(([routeParams, queryParams]) => {
      return { ...routeParams, ...queryParams };
    })
  );
}

export function toQueryParams(obj: any, prefix: string = '', result: Dictionary<string> = {}) {
  for (let [key, value] of Object.entries(obj)) {
    if (value || value === 0) {
      if (prefix) {
        key = prefix + '[' + key + ']';
      }
      if (typeof value === 'object') {
        toQueryParams(value, key, result);
      } else {
        result[key] = String(value);
      }
    }
  }
  return result;
}

export function textToBase64(str: string) {
  // UTF-8 fix, see https://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
  return urlSafeBase64Encode(window.btoa(unescape(encodeURIComponent(str))));
}

export function base64ToText(str: string) {
  // UTF-8 fix, see https://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
  return decodeURIComponent(escape(window.atob(urlSafeBase64Decode(str))));
}
