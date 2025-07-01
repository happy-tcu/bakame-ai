
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ConsultationForm } from '@/components/consultation/ConsultationForm';
import { ConsultationInfo } from '@/components/consultation/ConsultationInfo';

const ScheduleConsultation = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
          <Link to="/resources" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Resources
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-6 animate-fade-in">
                Schedule Consultation
              </h1>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
                Book a personalized consultation with our experts to discuss your IVR deployment needs and explore custom solutions.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <ConsultationForm />
              <ConsultationInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleConsultation;
