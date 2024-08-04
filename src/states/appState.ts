export interface appState {
  isLoading: boolean;
}

export interface appActions {
  showLoading: () => void;
  hideLoading: () => void;
}

export const appState = { isLoading: false };

export const appActions = {
  showLoading: () => {
    appState.isLoading = true;
  },
  hideLoading: () => {
    appState.isLoading = false;
  }
};
