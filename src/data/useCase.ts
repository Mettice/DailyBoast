interface UseCase {
    industry: string;
    problem: string;
    solution: string;
    impact: string;
    roi: string;
  }
  
  export const businessCases: UseCase[] = [
    {
      industry: "Tech Startup",
      problem: "High employee turnover and low team morale",
      solution: "Implemented daily team recognition program using the app",
      impact: "30% improvement in employee satisfaction scores",
      roi: "Reduced turnover costs by $150,000 annually"
    },
    {
      industry: "Retail Chain",
      problem: "Inconsistent customer service quality",
      solution: "Used app for staff motivation and feedback",
      impact: "25% increase in customer satisfaction",
      roi: "15% increase in repeat customers"
    },
    {
      industry: "Education",
      problem: "Student engagement and motivation",
      solution: "Integrated app into daily classroom activities",
      impact: "40% increase in student participation",
      roi: "Improved academic performance metrics"
    },
    {
      industry: "Healthcare",
      problem: "Staff burnout and stress",
      solution: "Implemented wellness program using app",
      impact: "45% reduction in reported stress levels",
      roi: "20% decrease in sick days taken"
    }
  ];