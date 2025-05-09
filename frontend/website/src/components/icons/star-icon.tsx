const StarIcon = ({
  color = 'currentColor',
  width = '22',
  height = '22',
  opacity = '0.8',
}) => {
  return (
    <svg
      width={height}
      height={width}
      viewBox='0 0 22 22'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity={opacity}>
        <path d='M11.98 2.1a.455.455 0 00-.414.315L9.426 9.05l-6.97-.014a.455.455 0 00-.268.823l5.648 4.087-2.169 6.628a.455.455 0 00.7.509L12 16.973l5.634 4.11a.455.455 0 00.7-.509l-2.169-6.628 5.648-4.087a.455.455 0 00-.267-.823l-6.97.014-2.144-6.635a.455.455 0 00-.451-.315z'></path>
      </g>
    </svg>
  );
};

export default StarIcon;
