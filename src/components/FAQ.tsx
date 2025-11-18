
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "What makes your offline AI different from cloud-based solutions?",
      answer: "Our system runs entirely on local hardware without requiring internet connectivity. This means your voice services remain operational during network outages, natural disasters, or cyber attacks. All processing happens on-premises, ensuring complete data privacy and security."
    },
    {
      question: "How can I get started with Bakame AI?",
      answer: "We work closely with schools and educational institutions to implement our AI tutoring platform. Contact our team for a consultation to discuss your specific needs and how we can help improve English learning outcomes at your institution."
    },
    {
      question: "What hardware requirements are needed?",
      answer: "Our solution is designed to run on standard server hardware that most organizations already have. We'll work with you to assess your specific requirements and recommend the optimal setup for your use case during the consultation process."
    },
    {
      question: "How long does implementation take?",
      answer: "Implementation timelines vary based on your specific requirements and existing infrastructure. We work closely with each partner to ensure a smooth deployment tailored to your needs."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide comprehensive support to all our partners. This includes technical guidance, implementation assistance, and ongoing support. Our team is committed to ensuring your success with our platform."
    },
    {
      question: "Is this technology proven?",
      answer: "Our technology is built on proven AI principles with a focus on offline capability and reliability. We work closely with educational institutions to ensure our solution meets their specific needs for secure and dependable English learning tools."
    },
    {
      question: "How does NGO pricing work?",
      answer: "We offer custom pricing packages for NGOs that include compliance requirements, security assessments, and dedicated support. Each solution is tailored to your specific needs and scale. Contact our NGO sales team at sales@bakame.org to discuss your requirements and receive a detailed proposal."
    },
    {
      question: "Can you integrate with our existing phone systems?",
      answer: "Yes, our solution is designed to integrate with standard telephony infrastructure. We support various protocols and can work with your existing PBX systems, SIP trunks, and other telephony equipment."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div 
            key={index}
            className="bg-card border-border backdrop-blur-sm rounded-lg border overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-all duration-200"
            >
              <span className="text-foreground font-semibold pr-4">
                {item.question}
              </span>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
