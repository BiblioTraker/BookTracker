import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function ContactForm() {
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm();

  const onSubmit = async data => {
    await axios.post('/api/contact', data);
    alert('Merci, votre message a bien été envoyé.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-parchment rounded">
      <h2 className="text-2xl font-heading text-rust mb-4">Nous contacter</h2>

      <label className="block mb-3">
        Nom*
        <input {...register('name', { required: 'Champ requis' })} className="w-full border p-2" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </label>

      <label className="block mb-3">
        Email*
        <input 
          type="email"
          {...register('email', {
            required: 'Champ requis',
            pattern: { value: /^\S+@\S+$/, message: 'Email invalide' }
          })}
          className="w-full border p-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>

      <label className="block mb-3">
        Message*
        <textarea {...register('message', { required: 'Champ requis' })} rows={5} className="w-full border p-2" />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
      </label>

      <label className="block mb-6">
        <input 
          type="checkbox"
          {...register('gdprConsent', { required: 'Consentement requis' })}
          className="mr-2"
        />
        J’accepte que mes données soient utilisées pour me répondre (RGPD)*
        {errors.gdprConsent && <p className="text-red-500">{errors.gdprConsent.message}</p>}
      </label>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="bg-rust text-white py-2 px-4 rounded"
      >
        {isSubmitting ? 'Envoi…' : 'Envoyer'}
      </button>
    </form>
  );
}