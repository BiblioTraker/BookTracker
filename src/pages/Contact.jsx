import PageTransition from '../components/PageTransition';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <PageTransition>
      <div className="prose max-w-4xl mx-auto p-8">
        <ContactForm />
      </div>
    </PageTransition>
  );
}