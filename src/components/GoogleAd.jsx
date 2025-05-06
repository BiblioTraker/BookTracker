import { useEffect, useRef } from 'react';

export default function GoogleAd({
  adSlot,         // numéro de slot fourni par AdSense
  className = '', // pour vos utilitaires Tailwind
  style = {},     // styles inline (display:block, height auto…)
  format = 'auto',// ou 'rectangle', 'horizontal', etc.
}) {
  const insRef = useRef(null);

  useEffect(() => {
    // Dès que le composant monte, on "push" la nouvelle annonce
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn('Adsense error', e);
    }
  }, []);

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-1080217218146297"
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-full-width-responsive="true"
    ></ins>
  );
}