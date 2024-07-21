import * as React from 'react';
import PropTypes from 'prop-types';
import { Select as BaseSelect } from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';




const Select = React.forwardRef(function Select(props, ref) {
  const slots = {
    root: CustomButton,
    listbox: AnimatedListbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});

export default function ModalChoicer({values, className, names, setValue, defaultValue , ...props}) {

  return (

    <Select {...props} className = {className} onChange = {(...newValue) => {
        setValue(newValue[1])
    }}  defaultValue={defaultValue} >
        {values.map((e , i) => {
            return (
                <Option  key={i} value={e}>{names[i]}</Option>
            )
        })}
    </Select>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}

      <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.36086 0.000976562C5.14813 0.000976562 4.96199 0.100693 4.74262 0.273536L0.255358 3.90323C0.0958106 4.03619 -0.00390625 4.23562 -0.00390625 4.48159C-0.00390625 4.93364 0.361722 5.26603 0.780533 5.26603C0.973319 5.26603 1.16611 5.1929 1.35889 5.04L5.36751 1.80918L9.36948 5.04C9.55562 5.1929 9.75505 5.26603 9.94784 5.26603C10.3666 5.26603 10.7323 4.93364 10.7323 4.48159C10.7323 4.23562 10.6326 4.03619 10.473 3.90323L5.97911 0.273536C5.76638 0.100693 5.58024 0.000976562 5.36086 0.000976562ZM5.36086 12.3193C5.58024 12.3193 5.76638 12.2263 5.97911 12.0534L10.473 8.42373C10.6326 8.28413 10.7323 8.08469 10.7323 7.84537C10.7323 7.38667 10.3666 7.05428 9.94784 7.05428C9.75505 7.05428 9.55562 7.13406 9.36948 7.28696L5.36751 10.5178L1.35889 7.28696C1.16611 7.13406 0.973319 7.05428 0.780533 7.05428C0.361722 7.05428 -0.00390625 7.38667 -0.00390625 7.84537C-0.00390625 8.08469 0.0958106 8.28413 0.255358 8.42373L4.74262 12.0468C4.96199 12.2263 5.14813 12.3193 5.36086 12.3193Z" fill="#2EA5FF" />
</svg>

    </StyledButton>
  );
});

CustomButton.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};

const StyledButton = styled('button', { shouldForwardProp: () => true })(
  ({ theme }) => `
    align-items : center;
    display : flex;
    gap : 7px;
    padding : 0px;
    font-family: "SF Pro Display 400";
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.02em;
    text-align: right;
    color: #2ea5ff;
    background-color : transparent;
    border : none
  `,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${grey[900]};
  border: 1px solid ${grey[700]};
  color: ${grey[300]};
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.5);
  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `,
);


const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
    const { ownerState, ...other } = props;
    const popupContext = React.useContext(PopupContext);
  
    if (popupContext == null) {
      throw new Error(
        'The `AnimatedListbox` component cannot be rendered outside a `Popup` component',
      );
    }
  
    const verticalPlacement = popupContext.placement.split('-')[0];
  
    return (
      <CssTransition
        className={`placement-${verticalPlacement}`}
        enterClassName="open"
        exitClassName="closed"
      >
        <Listbox {...other} ref={ref} />
      </CssTransition>
    );
  });
  
  AnimatedListbox.propTypes = {
    ownerState: PropTypes.object.isRequired,
  };



const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${blue[900]};
    color: ${ blue[100] };
  }

  &.${optionClasses.highlighted} {
    background-color: ${grey[800]};
    color: ${grey[300]};
  }

  &:focus-visible {
    outline: 3px solid ${blue[600]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${blue[900]};
    color: ${blue[100] };
  }

  &.${optionClasses.disabled} {
    color: ${grey[700] };
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${ grey[800] };
    color: ${grey[300]};
  }
  `,
);

const Popup = styled('div')`
  z-index: 1;
`;