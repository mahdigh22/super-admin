import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/class-names';

type Dimension = number | string;

type IconProps = HTMLAttributes<HTMLSpanElement> & {
  width?: Dimension;
  height?: Dimension;
  isDecorative?: boolean;
};

type InternalIconProps = IconProps & {
  width: Dimension;
  height: Dimension;
  svgString: string;
};

/**
 * A component that renders an svgString string as an accessible icon
 */
const Icon = forwardRef<HTMLSpanElement, InternalIconProps>((props: InternalIconProps, ref) => {
  const {
    width,
    height,
    svgString,
    style,
    className,
    isDecorative = true,
    'aria-label': ariaLabel = 'icon',
    ...rest
  } = props;

  return (
    <span
      ref={ref}
      aria-hidden={!!isDecorative}
      style={{ width, height, ...style }}
      className={cn('flex text-primary', className)}
      dangerouslySetInnerHTML={{ __html: svgString }}
      {...(!isDecorative && { role: 'img', 'aria-label': ariaLabel })}
      {...rest}
    />
  );
});
Icon.displayName = 'Icon';

function buildIconComponent(name: string, defaults: { width: Dimension; height: Dimension; svgString: string }) {
  const { svgString, width: defaultWidth, height: defaultHeight } = defaults;

  const Component = (props: IconProps) => {
    const { width = defaultWidth, height = defaultHeight, ...rest } = props;
    return <Icon width={width} height={height} svgString={svgString} {...rest} />;
  };
  Component.displayName = name;

  return Component;
}

export { type IconProps as PresetIconProps, buildIconComponent };
