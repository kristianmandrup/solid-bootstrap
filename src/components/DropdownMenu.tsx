import { useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import usePopper from 'solid-popper';
import { Popper } from '../popper/Popper';
import { DropdownContext } from './DropdownContext';
import { getTarget, deprecated, classname } from './utils';

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

  const {
    className,
    cssModule,
    dark,
    end,
    right,
    tag,
    flip,
    modifiers,
    persist,
    strategy,
    container,
    ...attrs
  } = {
    ...defaultProps,
    ...props
  } as any

    const classes = classname([
      className,
      'dropdown-menu',
      {
        'dropdown-menu-dark': dark,
        'dropdown-menu-end': end || right,
        show: state.isOpen,
      }
    ])

    if (persist || (state.isOpen && !state.inNavbar)) {

      const position1 = directionPositionMap[state.direction] || 'bottom';
      const position2 = (end || right) ? 'end' : 'start';
      const poperPlacement = `${position1}-${position2}`;
      const poperModifiers = [
        ...modifiers,
        {
          name: 'flip',
          enabled: !!flip,
        },
       ];

      const popper = (
        <Popper
          placement={poperPlacement}
          modifiers={poperModifiers}
          strategy={strategy}
        >
          {({ ref, style, placement }: any) => {
            let combinedStyle = { ...props.style, ...style };

            const handleRef = (tagRef: any) => {
              // Send the ref to `react-popper`
              ref(tagRef);
              // Send the ref to the parent Dropdown so that clicks outside
              // it will cause it to close
              // const { onMenuRef } = state;
              if (onMenuRef) onMenuRef(tagRef);
            };

            return (
              <Dynamic component={tag}
                tabIndex="-1"
                role={getRole()}
                ref={handleRef}
                {...attrs}
                style={combinedStyle}
                aria-hidden={!state.isOpen}
                class={classes}
                data-popper-placement={placement}
              />
            );
          }}
        </Popper>
      );

      if (container) {
        return <>container</>
      } else {
        return popper;
      }
    }

    return (
      <Dynamic component={tag}
        tabIndex="-1"
        role={getRole()}
        {...attrs}
        aria-hidden={!state.isOpen}
        class={classes}
        data-popper-placement={attrs.placement}
      />
    );
  }
