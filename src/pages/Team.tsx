
import { useState } from "react";
import CareersLayout from "@/components/careers/CareersLayout";
import CareersHero from "@/components/careers/CareersHero";
import CompanyValues from "@/components/careers/CompanyValues";
import CompanyBenefits from "@/components/careers/CompanyBenefits";
import JobListings from "@/components/careers/JobListings";
import ApplicationForm from "@/components/careers/ApplicationForm";

const Careers = () => {
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleApply = (jobTitle: string) => {
    setSelectedPosition(jobTitle);
    document.getElementById('application-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <CareersLayout>
      <CareersHero />
      <CompanyValues />
      <CompanyBenefits />
      <JobListings onApply={handleApply} />
      <ApplicationForm initialPosition={selectedPosition} />
    </CareersLayout>
  );
};

export default Careers;
