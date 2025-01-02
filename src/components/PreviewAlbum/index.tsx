import React, { useCallback } from 'react';
import './_styles.scss';
import '../../_theme.scss';
import cn from 'classnames';

import { Collection, CollectionImageType } from '../../interfaces/Collections';
import ToolTip from '../ToolTip';

interface Props {
  collection: Collection;
  onOpenCollection: (collectionPath: string) => void;
}

// TODO: ganti semua jadi _scss

const PreviewAlbum: React.FC<Props> = ({ collection, onOpenCollection }) => {
  const [popup, setPopup] = React.useState({
    show: false,
    caption: '',
    x: 0,
    y: 0,
    bgColor: 'white',
  });
  // const result = extract.renderSync({
  //   file: '../../theme.scss'
  // })

  const onFrameHover = useCallback(
    (e: React.MouseEvent<HTMLImageElement>, caption: string, bgColor: string, collectionId: string) => {
      const x = e.clientX;
      const y = e.clientY;

      // console.log(styles.colors[collectionId])
      // console.log('test', `${collectionId}`)
      // console.log('test2', theme[collectionId])

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
    const maxImagePerRow = 2;

    return collection.images.slice(0, maxImagePerRow).map((collectionImage, i) => (
      <img
        key={i}
        src={collectionImage.previewUrl}
        onMouseMove={(e) => onFrameHover(e, collectionImage.caption, collection.popupColor, collection.id)}
        onMouseOut={onFrameOut}
        className={cn(
          'PreviewImage',
          collectionImage.type === CollectionImageType.LANDSCAPE
            ? 'PreviewImage-landscape'
            : 'PreviewImage-portrait'
        )}
        alt={collectionImage.title}
        onClick={() => openImage(collectionImage.url)}
      />
    ));
  }, [collection, onFrameHover, onFrameOut, openImage]);

  const theme = `Theme-${collection.id}`;
  return (
    <div className={cn('PreviewAlbum', theme)}>
      {renderPreviewImages()}
      <h2 className="PreviewAlbum-title">{collection.title}</h2>
      <p className="PreviewAlbum-caption">{collection.caption}</p>
      <div
        className={cn('PreviewAlbum-pages-button', `${theme}-button`)}
        onClick={() => openCollection(collection.id)}
      >
        View Full Album
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