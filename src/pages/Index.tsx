import { useState } from 'react';
import { 
  MapPin, Mail, Phone, ChevronLeft, ChevronRight, Send
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

import educationImg from '@assets/stock_images/african_students_lea_543b03ad.jpg';
import civicImg from '@assets/stock_images/government_officials_e70d3c84.jpg';
import healthImg from '@assets/stock_images/healthcare_worker_nu_7e034d57.jpg';
import publicInfoImg from '@assets/stock_images/rural_community_peop_d89ebc63.jpg';

import chamberLogo from '../../attached_assets/1_1763424292144.png';
import tcu360Logo from '../../attached_assets/2_1763424292144.png';
import tcuResearchLogo from '../../attached_assets/3_1763424292140.png';
import fwrLogo from '../../attached_assets/4_1763424292143.png';
import dallasInnovatesLogo from '../../attached_assets/5_1763424292143.png';
import neeleyLogo from '../../attached_assets/6_1763424292142.png';

const Index = () => {
  const { toast } = useToast();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const services = [
    {
      image: educationImg,
      title: 'Education Programs',
      description: 'AI-powered lessons, quizzes, and speaking practice for students in offline areas through simple phone calls.',
      link: '#education'
    },
    {
      image: civicImg,
      title: 'Civic Programs',
      description: 'Engagement tools for voter education, local governance, and public information delivered via voice.',
      link: '#civic'
    },
    {
      image: healthImg,
      title: 'Health Programs',
      description: 'Voice-based health guidance, wellness check-ins, and awareness campaigns for remote communities.',
      link: '#health'
    },
    {
      image: publicInfoImg,
      title: 'Public Information',
      description: 'Weather alerts, safety updates, agriculture tips, and remote community messaging systems.',
      link: '#public-info'
    }
  ];

  const testimonials = [
    {
      quote: "When we first explored Bakame's voice-AI platform for our rural schools, we were impressed by how seamlessly it worked without internet connectivity. Since implementation, student engagement has increased dramatically. The platform delivers exactly what was promised — accessible education for communities that traditional digital services cannot reach.",
      name: "Dr. Emmanuel Habimana",
      title: "Director of Education, Kigali District"
    },
    {
      quote: "Bakame has transformed how we deliver health information to remote communities. The voice-based system works on any basic phone, making it accessible to everyone. We've seen a significant improvement in health awareness and early intervention in areas where we previously had no reach.",
      name: "Marie Claire Uwimana",
      title: "Program Director, Rwanda Health Initiative"
    }
  ];

  const affiliates = [
    { src: chamberLogo, alt: "US India Chamber of Commerce" },
    { src: tcu360Logo, alt: "TCU 360" },
    { src: tcuResearchLogo, alt: "TCU Research" },
    { src: fwrLogo, alt: "Fort Worth Report" },
    { src: dallasInnovatesLogo, alt: "Dallas Innovates" },
    { src: neeleyLogo, alt: "TCU Neeley School of Business" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center" data-testid="link-home">
              <img 
                src="/logo.svg" 
                alt="Bakame AI" 
                className="h-10 w-auto"
              />
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors" data-testid="link-services">Services</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors" data-testid="link-about">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors" data-testid="link-contact">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            The First Voice-AI Platform for Offline Programs
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            AI that delivers learning, health, and civic content through simple phone calls — no internet required.
          </p>
          
          <p className="text-md text-gray-400 max-w-2xl mx-auto mb-10">
            We build offline-native voice infrastructure for schools, governments, and NGOs to reach communities that traditional digital services cannot.
          </p>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-10"></div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-learn-more"
            >
              Learn more
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-6 text-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-contact"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-blue-600 font-medium text-center mb-2">Our Services</p>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Things We Can Do For You
          </h2>
          <div className="h-px w-24 bg-blue-600 mx-auto mb-16"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                data-testid={`service-card-${index}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <a 
                    href={service.link} 
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center"
                  >
                    Learn More →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-blue-600 font-medium text-center mb-2">Testimonials</p>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            What Our Partners Say
          </h2>
          <div className="h-px w-24 bg-blue-600 mx-auto mb-16"></div>

          <div className="relative">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-600">{testimonials[currentTestimonial].title}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-white border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                    data-testid="button-prev-testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-white border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                    data-testid="button-next-testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-blue-600 font-medium text-center mb-2">About Us</p>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Our Story
          </h2>
          <div className="h-px w-24 bg-blue-600 mx-auto mb-12"></div>

          <div className="prose prose-lg max-w-none text-center">
            <p className="text-gray-700 leading-relaxed mb-6">
              Bakame AI is the leading voice-AI infrastructure company building offline-native solutions for underserved communities. We are actively developing and deploying voice-based programs for education, health, and civic engagement across Africa and beyond.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Together with our partners in schools, governments, and NGOs, Bakame AI is pioneering the delivery of AI-powered services to the 2.7 billion people worldwide who lack internet access — reaching them through the phones they already own.
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-about-learn-more"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-blue-600 font-medium mb-2">Contact Us</p>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Get In Touch
              </h2>
              <div className="h-px w-24 bg-blue-600 mb-8"></div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-50 border-gray-200 focus:border-blue-600"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-gray-50 border-gray-200 focus:border-blue-600"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-gray-50 border-gray-200 focus:border-blue-600"
                    data-testid="input-subject"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-gray-50 border-gray-200 focus:border-blue-600 min-h-[150px]"
                    data-testid="input-message"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  data-testid="button-submit"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-8">Coverage Map</h3>
                <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-8">
                  <div className="text-center">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-xs text-gray-400">Rwanda</p>
                      </div>
                      <div className="text-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-xs text-gray-400">Kenya</p>
                      </div>
                      <div className="text-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-xs text-gray-400">Uganda</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">Active deployment regions</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span>Dallas, Texas, USA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <a href="mailto:sales@bakame.org" className="hover:text-blue-400 transition-colors">sales@bakame.org</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <span>Contact for inquiries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliates Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">
            Our Affiliates
          </h3>
          <div className="h-px w-24 bg-blue-600 mx-auto mb-12"></div>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {affiliates.map((affiliate, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={affiliate.src} 
                  alt={affiliate.alt}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  data-testid={`affiliate-logo-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-blue-400 font-medium mb-2">LET'S WORK TOGETHER</p>
          <div className="h-px w-24 bg-blue-600 mx-auto mb-8"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Bring Offline Voice-AI to Your Organization
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Custom pricing for national, regional, and NGO partners. Let's discuss how Bakame can help you reach offline communities.
          </p>
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="button-cta-contact"
          >
            Contact Us
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <img 
                src="/logo-white.svg" 
                alt="Bakame AI" 
                className="h-10 w-auto mb-4"
              />
              <p className="text-gray-400">
                AI-powered outreach for the offline world.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Bakame AI</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Dallas, Texas, USA
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:sales@bakame.org" className="hover:text-white transition-colors">
                    sales@bakame.org
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors" data-testid="link-privacy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors" data-testid="link-terms">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-500">
              © 2025 Bakame AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
