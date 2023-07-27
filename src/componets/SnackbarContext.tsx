import { createContext } from 'react';

interface ISnackbarContext {
  openSnackbar: (message: string, type?: string) => void;
  snackbarType: string;
}

export const SnackbarContext = createContext<ISnackbarContext>({
  openSnackbar: () => { },
  snackbarType: 'info',
});
