
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does offline AI actually work?",
      answer: "Our AI models are compressed and optimized to run directly on your local hardware without requiring internet connectivity. We use advanced techniques like model quantization and edge computing to ensure full functionality while maintaining high performance and accuracy."
    },
    {
      question: "What languages does Bakame AI support?",
      answer: "We currently support 25+ languages including English, French, Arabic, Swahili, Yoruba, Amharic, and many other African languages. Our language support is continuously expanding based on user demand and data availability."
    },
    {
      question: "How secure is my data with offline processing?",
      answer: "With offline processing, your data never leaves your premises. All conversations, voice recordings, and text processing happen locally on your hardware. This ensures maximum privacy and security, especially important for sensitive government and healthcare communications."
    },
    {
      question: "What are the hardware requirements?",
      answer: "Bakame AI is designed to run on standard hardware. Minimum requirements include 8GB RAM, 4GB storage, and a modern processor. We also offer optimized solutions for lower-spec devices in resource-constrained environments."
    },
    {
      question: "How accurate is the voice recognition?",
      answer: "Our voice recognition achieves 95%+ accuracy across supported languages. Accuracy improves over time as the system learns from local usage patterns and accents, all while maintaining complete privacy."
    },
    {
      question: "Can I customize the AI for my specific use case?",
      answer: "Yes! We offer customization options including industry-specific vocabularies, custom response templates, and integration with existing systems. Our team works with you to tailor the solution to your exact needs."
    },
    {
      question: "How do updates work without internet?",
      answer: "Updates can be delivered through various methods including USB drives, local networks, or periodic internet sync. We design our update process to be flexible and work within your connectivity constraints."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer comprehensive support including 24/7 technical assistance, training for your team, and ongoing maintenance. Our support team understands the unique challenges of offline deployments and connectivity issues."
    },
    {
      question: "How much does Bakame AI cost?",
      answer: "Pricing varies based on deployment size, features, and support requirements. We offer flexible pricing models including one-time licensing, annual subscriptions, and usage-based pricing. Contact us for a customized quote."
    },
    {
      question: "How long does implementation take?",
      answer: "Basic implementation typically takes 2-4 weeks, including hardware setup, software installation, and team training. Complex customizations or large-scale deployments may take 6-12 weeks. We provide a detailed timeline during the planning phase."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-white/80 text-lg">
          Find answers to common questions about Bakame AI's offline technology
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="bg-white/5 border-white/10">
            <CardContent className="p-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 pt-0">
                  <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-white/80 mb-4">
          Don't see your question answered here?
        </p>
        <button 
          onClick={() => window.location.href = '/contact'}
          className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          Contact our support team →
        </button>
      </div>
    </div>
  );
};

export default FAQ;
