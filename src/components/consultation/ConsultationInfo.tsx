
import { Clock, User, Mail, Phone, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ConsultationInfo = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] animate-fade-in delay-300">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-400" />
            What to Expect
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white/70">
          <div className="flex items-start space-x-3 group hover:text-white/90 transition-colors">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
            <p>30-60 minute video call with our technical experts</p>
          </div>
          <div className="flex items-start space-x-3 group hover:text-white/90 transition-colors">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
            <p>Assessment of your current infrastructure and needs</p>
          </div>
          <div className="flex items-start space-x-3 group hover:text-white/90 transition-colors">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
            <p>Custom solution recommendations and implementation roadmap</p>
          </div>
          <div className="flex items-start space-x-3 group hover:text-white/90 transition-colors">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
            <p>Q&A session and next steps discussion</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] animate-fade-in delay-400">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <User className="mr-2 h-5 w-5 text-green-400" />
            Our Experts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-white/70">
          <p className="hover:text-white/90 transition-colors">• 10+ years of IVR deployment experience</p>
          <p className="hover:text-white/90 transition-colors">• Specialists in offline and hybrid solutions</p>
          <p className="hover:text-white/90 transition-colors">• Government and enterprise certified</p>
          <p className="hover:text-white/90 transition-colors">• Multi-language support expertise</p>
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] animate-fade-in delay-500">
        <CardHeader>
          <CardTitle className="text-xl text-white">Alternative Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-white/70">
          <div className="flex items-center space-x-3 hover:text-white/90 transition-colors group">
            <Mail className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
            <span>consultations@bakame.ai</span>
          </div>
          <div className="flex items-center space-x-3 hover:text-white/90 transition-colors group">
            <Phone className="h-4 w-4 group-hover:text-green-400 transition-colors" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3 hover:text-white/90 transition-colors group">
            <Building2 className="h-4 w-4 group-hover:text-purple-400 transition-colors" />
            <span>Available Mon-Fri, 9 AM - 5 PM EST</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
