import 'i18next';

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface i18n {
    changeLanguageAndSave(lng: string): void;
  }
}
