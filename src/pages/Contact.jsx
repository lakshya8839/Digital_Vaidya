import React from 'react';
import ContactForm from '../sections/ContactForm.jsx';

export default function Contact() {
  return (
    <div className="container-max py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact Us</h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
        Have a question or want to collaborate? We'd love to hear from you.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}


