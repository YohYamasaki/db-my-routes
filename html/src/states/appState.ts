export interface appState {
  isLoading: boolean;
}

export interface appActions {
  showLoading: () => void;
  hideLoading: () => void;
}

export const AppState = (): appState => ({ isLoading: false });

export const AppActions = (state: appState) => ({
  showLoading: () => {
    state.isLoading = true;
  },
  hideLoading: () => {
    state.isLoading = false;
  }
});
