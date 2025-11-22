import { Tiny5 } from 'next/font/google';
import localFont from 'next/font/local';

export const DungGeunMo = localFont({
  src: './DungGeunMo.woff2',
  display: 'swap',
  weight: '45 920',
});

export const SuperPixel = localFont({
  src: './SuperPixel.woff',
  display: 'swap',
  weight: '45 920',
});

export const QuinqueFive = localFont({
  src: './QuinqueFive.woff2',
  display: 'swap',
  weight: '45 920',
});

export const Tiny = Tiny5({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});
