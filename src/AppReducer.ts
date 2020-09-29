import styles from "./App.module.scss";

export const TOGGLE = "TOGGLE";
type Toggle = {
  readonly type: typeof TOGGLE;
};

export const INITIALIZER = "INITIALIZER";
type Initialize = {
  readonly type: typeof INITIALIZER;
  value: number;
};

export const RESIZE = "RESIZE";
type Resize = {
  readonly type: typeof RESIZE;
};

export type AppGridActions = Toggle | Initialize | Resize;

export const gridColumnStyle = (
  leftPanelWidth: number,
  grabWidth: number,
  pseudoWidth: number
): string => {
  return `${leftPanelWidth}px ${grabWidth}px  calc(
    100% - ${leftPanelWidth}px - ${grabWidth}px - ${pseudoWidth}px`;
};

export const gridRowStyle = (
  headerPanelHeight: number,
  pseudoWidth: number
): string => {
  return `${headerPanelHeight}px calc(
    100% - ${headerPanelHeight}px  - ${pseudoWidth}px`;
};

export type AppGridStates = {
  isShown: boolean;
  headerPanelHeight: number;
  defaultLeftPanelWidth: number;
  leftPanelWidth: number;
  grabWidth: number;
  pseudoWidth: number;
  arrowClass: string;
  leftPanelWidthStyle: string | undefined;
  columnStyle: string | undefined;
  rowStyle: string | undefined;
};

// initialize AppGridStates to match values in _global.scss
export const appGridInit = ({
  isShown,
  headerPanelHeight,
  defaultLeftPanelWidth,
  grabWidth,
  pseudoWidth,
}: AppGridStates): AppGridStates => {
  return {
    isShown: true,
    headerPanelHeight: headerPanelHeight,
    defaultLeftPanelWidth: defaultLeftPanelWidth,
    leftPanelWidth: defaultLeftPanelWidth,
    grabWidth: grabWidth,
    pseudoWidth: pseudoWidth,
    arrowClass: styles.ArrowRotate,
    leftPanelWidthStyle: isShown ? `${defaultLeftPanelWidth}px` : "0px",
    columnStyle: gridColumnStyle(defaultLeftPanelWidth, grabWidth, pseudoWidth),
    rowStyle: gridRowStyle(headerPanelHeight, pseudoWidth),
  };
};

// function reducer (state:State, action:Actions): State{
export const appGridReducer = (
  state: AppGridStates,
  action: AppGridActions
): AppGridStates => {
  // console.log(action.type, state);
  switch (action.type) {
    case TOGGLE:
      let updatedLeftPanelWidth = !state.isShown
        ? state.defaultLeftPanelWidth
        : 0;
      // console.log(updatedLeftPanelWidth);
      return {
        ...state,
        isShown: !state.isShown,
        arrowClass: !state.isShown ? styles.ArrowRotate : styles.ArrowNormal,
        leftPanelWidth: updatedLeftPanelWidth,
        leftPanelWidthStyle: `${updatedLeftPanelWidth}px`,
        columnStyle: gridColumnStyle(
          updatedLeftPanelWidth,
          state.grabWidth,
          state.pseudoWidth
        ),
      };
    case INITIALIZER:
      // console.log(action.value);
      return appGridInit({ ...state, defaultLeftPanelWidth: action.value });
    case RESIZE:
      return {
        ...state,
        columnStyle: gridColumnStyle(
          state.leftPanelWidth,
          state.grabWidth,
          state.pseudoWidth
        ),
        rowStyle: gridRowStyle(state.headerPanelHeight, state.pseudoWidth),
      };
    default:
      return state;
  }
};
