type PropTypes = {
  tag: any,
  className: string,
};

const defaultProps = {
  tag: 'div',
};

export const CardDeck = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  const classes = [
    className,
    'card-deck'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};