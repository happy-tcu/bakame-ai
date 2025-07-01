
import { Clock, User, Mail, Phone, Building2, CheckCircle, Star, Zap } from 'lucide-react';
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
          <div className="flex items-start space-x-4 group hover:text-white/90 transition-all duration-300 transform hover:translate-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
            <p className="leading-relaxed">30-60 minute video call with our technical experts</p>
          </div>
          <div className="flex items-start space-x-4 group hover:text-white/90 transition-all duration-300 transform hover:translate-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Star className="h-4 w-4 text-white" />
            </div>
            <p className="leading-relaxed">Assessment of your current infrastructure and needs</p>
          </div>
          <div className="flex items-start space-x-4 group hover:text-white/90 transition-all duration-300 transform hover:translate-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <p className="leading-relaxed">Custom solution recommendations and implementation roadmap</p>
          </div>
          <div className="flex items-start space-x-4 group hover:text-white/90 transition-all duration-300 transform hover:translate-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <User className="h-4 w-4 text-white" />
            </div>
            <p className="leading-relaxed">Q&A session and next steps discussion</p>
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
        <CardContent className="space-y-4 text-white/70">
          <div className="flex items-center space-x-3 hover:text-white/90 transition-all duration-300 transform hover:translate-x-2 group">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full group-hover:animate-pulse"></div>
            <span className="leading-relaxed">10+ years of IVR deployment experience</span>
          </div>
          <div className="flex items-center space-x-3 hover:text-white/90 transition-all duration-300 transform hover:translate-x-2 group">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full group-hover:animate-pulse"></div>
            <span className="leading-relaxed">Specialists in offline and hybrid solutions</span>
          </div>
          <div className="flex items-center space-x-3 hover:text-white/90 transition-all duration-300 transform hover:translate-x-2 group">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:animate-pulse"></div>
            <span className="leading-relaxed">Government and enterprise certified</span>
          </div>
          <div className="flex items-center space-x-3 hover:text-white/90 transition-all duration-300 transform hover:translate-x-2 group">
            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full group-hover:animate-pulse"></div>
            <span className="leading-relaxed">Multi-language support expertise</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] animate-fade-in delay-500">
        <CardHeader>
          <CardTitle className="text-xl text-white">Alternative Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white/70">
          <div className="flex items-center space-x-4 hover:text-white/90 transition-all duration-300 group transform hover:translate-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-500/30 group-hover:to-purple-500/30">
              <Mail className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
            </div>
            <span className="leading-relaxed">consultations@bakame.ai</span>
          </div>
          <div className="flex items-center space-x-4 hover:text-white/90 transition-all duration-300 group transform hover:translate-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-gradient-to-r group-hover:from-green-500/30 group-hover:to-blue-500/30">
              <Phone className="h-5 w-5 text-green-400 group-hover:text-green-300" />
            </div>
            <span className="leading-relaxed">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-4 hover:text-white/90 transition-all duration-300 group transform hover:translate-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-500/30 group-hover:to-pink-500/30">
              <Building2 className="h-5 w-5 text-purple-400 group-hover:text-purple-300" />
            </div>
            <span className="leading-relaxed">Available Mon-Fri, 9 AM - 5 PM EST</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
