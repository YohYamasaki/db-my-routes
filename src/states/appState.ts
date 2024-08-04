export interface appState {
  isLoading: boolean;
}

export interface appActions {
  showLoading: () => void;
  hideLoading: () => void;
}

export const appState = {
  isLoading: false,
  isToastShowing: false,
  toastText: ""
};

export const appActions = {
  showLoading: () => {
    appState.isLoading = true;
  },
  hideLoading: () => {
    appState.isLoading = false;
  },
  showToast: (text: string) => {
    appState.isToastShowing = true;
    // TODO: create different styles of the toast
    appState.toastText = text;
    // reset toast
    setTimeout(() => {
      appState.isToastShowing = false;
      appState.toastText = "";
    }, 2000);
  }
};
