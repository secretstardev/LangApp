export class LangUtils {
  public static isJapanese(text): boolean {
    return /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uFF66-\uFF9F]/.test(text);
  }
}
