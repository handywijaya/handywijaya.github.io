import React, { useCallback } from 'react';
import '../../_theme.scss';
import cn from 'classnames';

import { Collection, CollectionImageType } from '../../interfaces/Collections';
import ToolTip from '../ToolTip';

interface Props {
  collection: Collection;
  onOpenCollection: (collectionPath: string) => void;
}

const PreviewAlbum: React.FC<Props> = ({ collection, onOpenCollection }) => {
  const [popup, setPopup] = React.useState({
    show: false,
    caption: '',
    x: 0,
    y: 0,
    bgColor: 'white',
  });

  const onFrameHover = useCallback(
    (e: React.MouseEvent<HTMLImageElement>, caption: string, bgColor: string, collectionId: string) => {
      const x = e.clientX;
      const y = e.clientY;

      setPopup({
        show: true,
        caption,
        x,
        y,
        bgColor,
      });
    },
    [] // No external dependencies here.
  );

  const onFrameOut = useCallback(() => {
    setPopup((prev) => ({ ...prev, show: false }));
  }, []); // No external dependencies here.

  const openCollection = useCallback(
    (collectionId: string) => {
      onOpenCollection(`/collections/${collectionId}`);
    },
    [onOpenCollection]
  );

  const openImage = useCallback((imageUrl: string) => {
    window.open(imageUrl, '_blank');
  }, []);

  const renderPreviewImages = useCallback(() => {
    return collection.previewImageIdx.map((value, idx) => {
      const collectionImage = collection.images[value];
      return (
        <img
          key={idx}
          src={collectionImage.previewUrl}
          onMouseMove={(e) => onFrameHover(e, collectionImage.caption, collection.popupColor, collection.id)}
          onMouseOut={onFrameOut}
          className={cn(
            'cursor-pointer transition-all duration-125 hover:opacity-90 hover:scale-105',
            collectionImage.type === CollectionImageType.LANDSCAPE
              ? 'w-full h-[200px]'
              : 'h-full w-auto m-auto'
          )}
          alt={collectionImage.title}
          onClick={() => openImage(collectionImage.url)}
        />
      );
    });
  }, [collection, onFrameHover, onFrameOut, openImage]);

  const theme = `Theme-${collection.id}`;
  const className = cn('border border-gray-300 rounded-lg shadow-lg overflow-hidden max-w-[300px] text-center mb-[20px]', `${theme}-preview`)
  const titleClassName = cn('font-bold text-[20px] py-[8px]', `${theme}-title`)
  const captionClassName = cn('italic text-[16px] min-h-[75px] content-center', `${theme}-caption`)
  const btnClassName = cn('button my-[16px]', `${theme}-button`)
  return (
    <div className={className}>
      {renderPreviewImages()}
      <div className="px-[18px]">
        <h2 className={titleClassName}>{collection.title}</h2>
        <p className={captionClassName}>{collection.caption}</p>
        <div className={btnClassName} onClick={() => openCollection(collection.id)}>
          View Full Album
        </div>
      </div>
      <ToolTip
        show={popup.show}
        message={popup.caption}
        mouseX={popup.x}
        mouseY={popup.y}
        bgColor={popup.bgColor}
      />
    </div>
  );
};

export default PreviewAlbum;