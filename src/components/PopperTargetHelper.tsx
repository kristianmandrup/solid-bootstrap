import { getTarget } from './utils';

export const PopperTargetHelper = (props: any, context: any) => {
  context.popperManager.setTargetNode(getTarget(props.target));
  return null;
};

export type ContextTypes = {
  popperManager: any,
};

export type PropTypes = {
  target: any,
};