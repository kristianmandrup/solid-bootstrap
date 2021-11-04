import { mergeProps, splitProps, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Portal as WebPortal } from 'solid-js/web';
import { Popper } from '../popper/Popper';
import { DropdownContext } from './DropdownContext';
import { classname, getTarget } from './utils';

type PropTypes = {
  tag?: any,
  children: any,
  dark?: boolean,
  end?: boolean,
  flip?: boolean,
  modifiers?: any[],
  className?: string,
  persist?: boolean,
  strategy?: string,
  container?: any
  placement?: string
  style?: any
  right?: boolean
};

const defaultProps = {
  tag: 'div',
  flip: true,
  modifiers: [],
};

const directionPositionMap: any = {
  up: 'top',
  left: 'left',
  right: 'right',
  start: 'left',
  end: 'right',
  down: 'bottom',
};

export const DropdownMenu = (props: PropTypes) => {
  const [state, { onMenuRef }] = useContext(DropdownContext) as any;

  const getRole = () => {
    if(state.menuRole === 'listbox') {
      return 'listbox'
    }
    return 'menu'
  }

  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "style", "dark", "end", "right", "flip", "modifiers", "persist", "strategy", "container",
  ])

  const classObj = () => ({
    'dropdown-menu-dark': local.dark,
    'dropdown-menu-end': local.end || local.right,
    show: state.isOpen,
  })


  const classes = () => classname(
    local.className,
    'dropdown-menu',
    classObj()
  )

  if (local.persist || (state.isOpen && !state.inNavbar)) {

    const position1 = directionPositionMap[state.direction] || 'bottom';
    const position2 = (local.end || local.right) ? 'end' : 'start';
    const poperPlacement = `${position1}-${position2}`;
    const poperModifiers = [
      ...local.modifiers,
      {
        name: 'flip',
        enabled: !!local.flip,
      },
      ];

    const popper = () => (
      <Popper
        placement={poperPlacement}
        modifiers={poperModifiers}
        strategy={local.strategy}
      >
        {({ ref, style, placement }: any) => {
          let combinedStyle = { ...local.style, ...style };

          const handleRef = (tagRef: any) => {
            // Send the ref to `react-popper`
            ref(tagRef);
            // Send the ref to the parent Dropdown so that clicks outside
            // it will cause it to close
            // const { onMenuRef } = state;
            if (onMenuRef) onMenuRef(tagRef);
          };

          return (
            <Dynamic component={local.tag}
              tabIndex="-1"
              role={getRole()}
              ref={handleRef}
              {...attributes}
              style={combinedStyle}
              aria-hidden={!state.isOpen}
              class={classes()}
              data-popper-placement={placement}
            />
          );
        }}
      </Popper>
    );

    const getContainerNode = () => getTarget(local.container)

    if (local.container) {
      return <WebPortal mount={getContainerNode()}>{popper()}</WebPortal>
    } else {
      return popper();
    }
  }

  return (
    <Dynamic component={local.tag}
      tabIndex="-1"
      role={getRole()}
      {...attributes}
      aria-hidden={!state.isOpen}
      class={classes()}
      data-popper-placement={attributes.placement}
    />
  );
}
