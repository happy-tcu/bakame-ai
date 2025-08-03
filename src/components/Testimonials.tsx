import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Mukamana",
    role: "University Student",
    location: "Kigali, Rwanda",
    avatar: "/placeholder.svg",
    rating: 5,
    quote: "Bakame AI helped me improve my English pronunciation in just 2 weeks! The AI tutor is patient and gives me instant feedback on my speaking.",
    improvement: "Improved pronunciation by 40%"
  },
  {
    name: "Jean Baptiste",
    role: "Business Professional",
    location: "Butare, Rwanda",
    avatar: "/placeholder.svg",
    rating: 5,
    quote: "I can now confidently speak English in business meetings. The conversation practice feature made all the difference for my career.",
    improvement: "Confident in meetings within 3 weeks"
  },
  {
    name: "Grace Uwimana",
    role: "Teacher",
    location: "Musanze, Rwanda",
    avatar: "/placeholder.svg",
    rating: 5,
    quote: "As a teacher, I needed to improve my English to better help my students. Bakame AI's cultural integration made learning relatable and effective.",
    improvement: "Teaching confidence increased 60%"
  }
];

const Testimonials = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Real Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how Bakame AI has helped students across Rwanda improve their English skills and achieve their goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <blockquote className="text-foreground/80 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm font-medium text-primary">
                    ✨ {testimonial.improvement}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <Star className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">4.9/5 average rating from 200+ students</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;