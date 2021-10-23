import { createEffect, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { TabContext } from './TabContext';
import { classname, omit } from './utils';


type PropTypes = {
  tag?: any,
  activeTab?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'div',
};


export const TabContent  = (props: PropTypes) => {
  const [activeTab, setActiveTab] = createSignal(props.activeTab)

  createEffect((_activeTab: any) => {
    const $activeTab = activeTab()
    if ($activeTab !== _activeTab) {
      setActiveTab(_activeTab)
    }
    return activeTab();
  })
  
  const {
    className,
    tag,
  } = {
    ...defaultProps,
    ...props
  } as any

  const attributes = omit(props, ['tag', 'activeTab', 'className']);

  const classes = classname(['tab-content', className])

  return (
    <TabContext.Provider value={{activeTabId: activeTab()}}>
      <Dynamic component={tag} {...attributes} className={classes} />
    </TabContext.Provider>
  );
}
