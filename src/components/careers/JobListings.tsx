import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";

interface JobListingsProps {
  onApply: (jobTitle: string) => void;
}

const JobListings = ({ onApply }: JobListingsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredJob, setHoveredJob] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const jobListings = [
    {
      title: "Check Back Soon",
      team: "All Teams",
      location: "Various Locations",
      type: "Multiple Positions",
      description: "We're currently evaluating our hiring needs. Please check back regularly for new opportunities as we grow our team. If you're passionate about AI-powered education and making learning accessible, we'd love to hear from you when positions become available."
    }
  ];

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedJob("");
  };

  return (
    <>
      <div className={`mb-20 transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl font-bold mb-12 text-white">Open roles</h2>
        <div className="space-y-6">
          {jobListings.map((job, index) => (
            <div 
              key={index} 
              className={`border border-gray-700 bg-gray-800/30 rounded-lg p-8 transition-all duration-300 cursor-pointer ${
                hoveredJob === index 
                  ? 'border-blue-500/50 bg-gray-800/50 shadow-lg shadow-blue-500/10 translate-y-[-2px]' 
                  : 'hover:border-gray-600 hover:bg-gray-800/40'
              }`}
              onMouseEnter={() => setHoveredJob(index)}
              onMouseLeave={() => setHoveredJob(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-200">
                    {job.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <span className="bg-gray-700/70 px-3 py-1 rounded-full transition-colors duration-200 hover:bg-gray-600">
                      {job.team}
                    </span>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className={`group border-gray-600 bg-transparent text-white transition-all duration-200 ${
                    hoveredJob === index 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                      : 'hover:bg-gray-700 hover:border-gray-500'
                  }`}
                  onClick={() => handleApplyClick(job.title)}
                >
                  Apply
                  <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                    hoveredJob === index ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`} />
                </Button>
              </div>
              <p className="text-gray-300 leading-relaxed">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Apply for {selectedJob}</DialogTitle>
          </DialogHeader>
          <ApplicationForm 
            initialPosition={selectedJob} 
            onSubmit={handleDialogClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobListings;
