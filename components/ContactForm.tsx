import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/Button';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (submitError) throw submitError;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500 rounded-lg p-6 text-center animate-fadeUp">
        <h3 className="text-xl font-semibold text-green-500 mb-2">Message Sent!</h3>
        <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-green-500 hover:text-green-400 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm animate-fadeUp">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full px-4 py-2 rounded-lg border border-dark-600 bg-dark-800 text-gray-100 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-shadow disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full px-4 py-2 rounded-lg border border-dark-600 bg-dark-800 text-gray-100 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-shadow disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full px-4 py-2 rounded-lg border border-dark-600 bg-dark-800 text-gray-100 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-shadow resize-none disabled:opacity-50"
        />
      </div>

      <div className="flex justify-start">
        <Button 
          type="submit" 
          disabled={status === 'submitting'}
          className="disabled:opacity-50"
        >
          <Send className="w-5 h-5 mr-2" />
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}