import { createSignal } from 'solid-js';
import { TabContext } from './TabContext';
import { classname } from './utils';

type PropTypes = {
  tag?: any,
  className?: string,
  tabId?: any,
  children?: any
};

const defaultProps = {
  tag: 'div',
};

export const TabPane = (props: PropTypes) => {
  const [activeTabId, setActiveTabId] = createSignal(props.tabId)
  const {
    className,
    tabId,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any
  const store = [
    activeTabId(),
    {
      setId() {
        setActiveTabId(activeTabId());
      },
    }      
  ]; 

  const getClasses = (activeTabId: any) => classname(['tab-pane', className, { active: tabId === activeTabId }])
  return (
    <TabContext.Provider value={store}>
      {({activeTabId}: any) => <Tag {...attributes} className={getClasses(activeTabId)} />}
    </TabContext.Provider>
  );
}