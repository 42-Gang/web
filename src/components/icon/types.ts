import type { SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
}
