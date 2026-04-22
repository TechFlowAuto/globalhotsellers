import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock } from 'lucide-react';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: 'contact@globalhotsellers.net',
      description: 'For general inquiries and support',
      link: 'mailto:contact@globalhotsellers.net'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Business Inquiries',
      details: 'partnerships@globalhotsellers.net',
      description: 'For partnership and collaboration opportunities',
      link: 'mailto:partnerships@globalhotsellers.net'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Press & Media',
      details: 'press@globalhotsellers.net',
      description: 'For media inquiries and press releases',
      link: 'mailto:press@globalhotsellers.net'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      details: 'Global Team',
      description: 'Remote team working across multiple time zones',
      link: null
    }
  ];

  const faqs = [
    {
      question: 'How do you select the products featured on your site?',
      answer: 'We use advanced algorithms to track millions of products across major marketplaces. Our selection is based on sales velocity, customer reviews, price trends, and social signals to identify truly hot products.'
    },
    {
      question: 'Is GlobalHotSellers free to use?',
      answer: 'Yes, our service is completely free for users. We earn commissions through affiliate programs when users make purchases through our links, at no extra cost to you.'
    },
    {
      question: 'How often is your product data updated?',
      answer: 'We update our product data in real-time for prices and availability. Product rankings and trends are updated hourly to ensure you get the most current information.'
    },
    {
      question: 'Can I suggest a product or category?',
      answer: 'Absolutely! We welcome suggestions from our community. Please use the contact form below to send us your recommendations.'
    },
    {
      question: 'Do you ship products directly?',
      answer: 'No, we are a discovery platform, not a retailer. When you click on a product, you will be redirected to the official retailer\'s website (Amazon, eBay, etc.) to complete your purchase.'
    },
    {
      question: 'How can I report an issue with a product link?',
      answer: 'If you encounter any issues with product links, prices, or availability, please contact us immediately through the form below. We appreciate your help in maintaining accurate information.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <MessageSquare className="w-6 h-6 text-primary" />
              <span className="font-semibold text-gray-800">Get In Touch</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're here to help! Whether you have questions, suggestions, or partnership inquiries, 
              our team is ready to assist you.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full translate-y-48 -translate-x-48"></div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Reach Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                {method.link ? (
                  <a 
                    href={method.link} 
                    className="text-primary hover:text-primary-dark font-medium block mb-2"
                  >
                    {method.details}
                  </a>
                ) : (
                  <p className="text-gray-700 font-medium mb-2">{method.details}</p>
                )}
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="press">Press & Media</option>
                    <option value="suggestion">Product Suggestion</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Please provide as much detail as possible..."
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                    Subscribe to our newsletter for product updates and deals
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 text-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>

                <p className="text-gray-500 text-sm text-center">
                  We typically respond within 24 hours on business days.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Response Time</h3>
                    <p className="text-gray-600">We're committed to getting back to you quickly</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-4xl font-bold text-primary mb-2">24 Hours</div>
                  <p className="text-gray-600">Average response time</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">Mon - Fri</div>
                    <p className="text-gray-600">9:00 AM - 6:00 PM EST</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">Weekends</div>
                    <p className="text-gray-600">Limited support available</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">Holidays</div>
                    <p className="text-gray-600">Response may be delayed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Connect?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're a shopper, partner, or just curious, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:contact@globalhotsellers.net" 
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition inline-flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Email Us Now</span>
            </a>
            <a 
              href="/" 
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition inline-flex items-center justify-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}