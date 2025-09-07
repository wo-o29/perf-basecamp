import { PropsWithChildren } from 'react';

type Device = 'pc' | 'tablet' | 'mobile';

type PictureSource = {
  src: string;
  extension: string;
  device: Device;
};

type ResponsivePictureProps = {
  sources: PictureSource[];
};

const MEDIA_QUERIES = {
  pc: '(min-width: 1025px)',
  tablet: '(min-width: 768px) and (max-width: 1024px)',
  mobile: '(max-width: 767px)'
};

function ResponsivePicture({ sources, children }: PropsWithChildren<ResponsivePictureProps>) {
  return (
    <picture>
      {sources.map(({ src, extension, device }) => (
        <source key={src} srcSet={src} type={`image/${extension}`} media={MEDIA_QUERIES[device]} />
      ))}
      {children}
    </picture>
  );
}

export default ResponsivePicture;
