import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ImageGallery({ images, open, setOpen, activeIndex }) {
  const [index, setIndex] = useState(activeIndex || 0);

  // URL array-ı {src: ""} array-ına çeviririk
  const slides = images.map((url) => ({ src: url }));

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        on={{ view: ({ index }) => setIndex(index) }}
      />
    </>
  );
}
