import PageTransition from '../components/PageTransition';
import CookieSettings from '../components/CookieSettings';

export default function CookieSettingsPage() {
  return (
    <PageTransition>
      <div className="prose max-w-4xl mx-auto p-8">
        <CookieSettings />
      </div>
    </PageTransition>
  );
}