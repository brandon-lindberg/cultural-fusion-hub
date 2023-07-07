import Link from 'next/link';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';

const ContactPage = () => (
  <Layout title="Contact">
    <div className="container p-5 pb-0">
      <h1 className="text-center">Contact Form</h1>
      <div className="flex items-center justify-center min-h-screen p-3">
        <ContactForm />
      </div>
    </div>
  </Layout>
);

export default ContactPage;
