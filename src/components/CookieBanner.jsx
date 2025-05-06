// src/components/CookieBanner.jsx
import CookieConsent from 'react-cookie-consent';

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="J’accepte"
      declineButtonText="Je refuse"
      cookieName="biblio_tracker_cookies"
      overlay
      enableDeclineButton
      onAccept={() => {
        // TODO : activer les scripts tiers, ex. window.ga(…)
      }}
      onDecline={() => {
        // TODO : désactiver Google Analytics, pixels, etc.
      }}
      style={{ background: '#2B373B', color: '#fff', textAlign: 'left' }}
      buttonStyle={{
        background: '#B7410E',
        color: '#fff',
        fontSize: '13px',
        borderRadius: '4px',
        padding: '8px 16px',
      }}
      declineButtonStyle={{
        background: '#888',
        color: '#fff',
        fontSize: '13px',
        borderRadius: '4px',
        padding: '8px 16px',
        marginRight: '8px',
      }}
      expires={150}
    >
      Nous utilisons des cookies pour améliorer votre expérience et mesurer notre audience.{' '}
      <a href="/privacy" style={{ color: '#FFC107', textDecoration: 'underline' }}>
        En savoir plus
      </a>
    </CookieConsent>
  );
}