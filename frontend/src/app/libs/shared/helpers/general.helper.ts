import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { decode as urlSafeBase64Decode, encode as urlSafeBase64Encode } from 'url-safe-base64';

export interface Dictionary<T> {
  [key: string]: T;
}

export class GeneralHelper {
  public static randomFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max * 1000 - min * 1000 + 1) + min * 1000);
  }

  public static objectKeys(obj) {
    return Object.keys(obj);
  }

  public static allParams(route: ActivatedRoute): Observable<any> {
    return combineLatest([route.params, route.queryParams]).pipe(
      map(([routeParams, queryParams]) => {
        return { ...routeParams, ...queryParams };
      })
    );
  }

  public static toQueryString(obj: any, prefix: string = '') {
    const str = [];
    for (let [key, value] of obj.entries()) {
      if (prefix) {
        key = prefix + '[' + key + ']';
      }
      str.push(value !== null && typeof value === 'object' ?
        GeneralHelper.toQueryString(value, key) :
        encodeURIComponent(key) + '=' + encodeURIComponent(value)
      );
    }
    return str.join('&');
  }

  public static toQueryParams(obj: any, prefix: string = '', result: Dictionary<string> = {}) {
    for (let [key, value] of Object.entries(obj)) {
      if (value || value === 0) {
        if (prefix) {
          key = prefix + '[' + key + ']';
        }
        if (typeof value === 'object') {
          GeneralHelper.toQueryParams(value, key, result);
        } else {
          result[key] = String(value);
        }
      }
    }
    return result;
  }

  public static textToBase64(str: string) {
    // UTF-8 fix, see https://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
    return urlSafeBase64Encode(window.btoa(unescape(encodeURIComponent(str))));
  }

  public static base64ToText(str: string) {
    // UTF-8 fix, see https://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
    return decodeURIComponent(escape(window.atob(urlSafeBase64Decode(str))));
  }

  public static objectToBase64(obj: any) {
    return GeneralHelper.textToBase64(JSON.stringify(obj));
  }

  public static base64ToObject<T>(base64: string) {
    const decodedText = GeneralHelper.base64ToText(base64);
    const decodedJson = decodeURIComponent(decodedText);
    return JSON.parse(decodedJson) as T;
  }

  public static filterEmptyFromObject<T>(obj: T) {
    return Object.fromEntries(
      Object.entries(obj).filter(([k, v]) => {
        return v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0);
      })
    );
  }

  public static deepEqual = (x, y) => {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
      ok(x).every(key => GeneralHelper.deepEqual(x[key], y[key]))
    ) : (x === y);
  }

  public static capitalize(word: string): string {
    return word.charAt(0).toUpperCase()
      + word.slice(1);
  }
}
