import Link from 'next/link';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';

const ContactPage = () => (
  <Layout title="Contact">
    <div className="p-5 pb-0">
      <h1 className="text-center">Contact Form</h1>
      <div className="flex items-center justify-center p-5">
        <ContactForm />
      </div>
    </div>
  </Layout>
);

export default ContactPage;
