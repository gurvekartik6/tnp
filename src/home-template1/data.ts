export type Drive={id:number;company:string;role:string;department:string;package:string;deadline:string;status:'Open'|'Closing soon';type:'Core'|'IT'|'Analytics'|'Consulting'};
export const drives:Drive[]=[
{id:1,company:'Tata Motors',role:'Graduate Engineer Trainee',department:'Production / Mechanical',package:'₹8.2 LPA',deadline:'18 Aug 2026',status:'Open',type:'Core'},
{id:2,company:'Deloitte',role:'Analyst',department:'All Engineering',package:'₹7.5 LPA',deadline:'21 Aug 2026',status:'Open',type:'Consulting'},
{id:3,company:'L&T Technology Services',role:'Design Engineer',department:'Mechanical / Production',package:'₹6.8 LPA',deadline:'23 Aug 2026',status:'Open',type:'Core'},
{id:4,company:'TCS',role:'Graduate Engineer',department:'All Engineering',package:'₹7.0 LPA',deadline:'25 Aug 2026',status:'Closing soon',type:'IT'},
{id:5,company:'Siemens',role:'Digital Manufacturing Engineer',department:'Production / Mechatronics',package:'₹9.1 LPA',deadline:'29 Aug 2026',status:'Open',type:'Core'},
{id:6,company:'Bosch',role:'Data & Process Analyst',department:'Production / CSE',package:'₹7.8 LPA',deadline:'02 Sep 2026',status:'Open',type:'Analytics'}
];
export const stats={students:8420,enrolled:8420,placed:7420,offers:1290,recruiters:146,drives:24,placementRate:88,highestPackage:'₹24.6 LPA',averagePackage:'₹7.8 LPA',lowestPackage:'₹4.2 LPA'};
export const trend=[{year:'2021',rate:71,offers:540},{year:'2022',rate:74,offers:610},{year:'2023',rate:79,offers:720},{year:'2024',rate:82,offers:890},{year:'2025',rate:85,offers:1080},{year:'2026',rate:88,offers:1290}];
export const departments=[{name:'CSE',enrolled:1220,placed:1147,rate:94,highest:'₹24.6 LPA'},{name:'ECE',enrolled:980,placed:892,rate:91,highest:'₹18.4 LPA'},{name:'Production',enrolled:760,placed:669,rate:88,highest:'₹16.2 LPA'},{name:'Mechanical',enrolled:940,placed:790,rate:84,highest:'₹15.8 LPA'},{name:'Electrical',enrolled:1080,placed:940,rate:87,highest:'₹17.1 LPA'},{name:'Civil',enrolled:640,placed:499,rate:78,highest:'₹11.8 LPA'}];
export const funnel=[{stage:'Registered',value:8420},{stage:'Eligible',value:7310},{stage:'Applied',value:5980},{stage:'Shortlisted',value:3610},{stage:'Interview',value:2180},{stage:'Selected',value:1248}];
export const events=[['18 Aug','Tata Motors Drive','Assessment Hall'],['21 Aug','Deloitte hiring window closes','T&P Portal'],['23 Aug','L&T Tech Services','Main Auditorium'],['26 Aug','Resume Clinic','Placement Cell'],['29 Aug','Siemens Assessment','Lab Complex']];
export const announcements=[['11 Aug 2026','Placement season 2026–27 placement season information is live.','Placement'],['09 Aug 2026','Resume review clinic opens for final-year students.','Training'],['07 Aug 2026','Recruiter orientation kit updated.','Recruiters'],['05 Aug 2026','Placement policy and student handbook published.','Policy']];
export const companies=['Tata Motors','Siemens','Bosch','Deloitte','TCS','L&T Technology Services','Accenture','Mahindra','Cognizant','Capgemini','Microsoft','Persistent','Wipro','Tech Mahindra','L&T Technologies','Tata Elxsi','Reliance','Honeywell','IBM','KPIT Technologies'];
export const resources=[
 {title:'Placement Policy',type:'PDF',href:'/documents/placement-policy.pdf',desc:'Eligibility, application rules, recruitment workflow and offer policy.'},
 {title:'College Placement Brochure',type:'PDF',href:'/documents/college-placement-brochure.pdf',desc:'Institution profile, programs, infrastructure and recruiter information.'},
 {title:'Department-wise Brochures',type:'PDF',href:'/documents/department-brochures.pdf',desc:'Department profiles, facilities, skills and contact points.'},
 {title:'Recruiter Workflow',type:'PDF',href:'/documents/recruiter-workflow.pdf',desc:'Step-by-step recruiter engagement and campus hiring workflow.'},
 {title:'Job Announcement Form (JAF)',type:'PDF',href:'/documents/job-announcement-form-jaf-2026-27.pdf',desc:'Recruiter-ready JAF template for placement season 2026–27.'},
 {title:'Student NOC',type:'PDF',href:'/documents/student-noc-template.pdf',desc:'Controlled student NOC template for placement, internship or project engagement.'},
 {title:'Student No Dues',type:'PDF',href:'/documents/student-no-dues-template.pdf',desc:'Student clearance template for T&P and concerned institute offices.'}
];
export const leadership=[
 {role:'Director',name:'Dr. Manesh B. Kokare',desc:'Director, SGGSIE&T · Institute leadership and industry engagement.',contact:'Director, SGGSIE&T, Nanded',image:'/tnp-assets/leadership/director-kokare.jpeg'},
 {role:'Dean IL & TPO',name:'Dr. Sandeep B. Mundhe',desc:'Dean (Industry Liaison) & I/C Training and Placement Officer.',contact:'T&P leadership and industry liaison',image:'/tnp-assets/leadership/dean-mundhe.jpg'}
];
export const departmentContacts=departments.map((d)=>({department:d.name,hod:'HOD — '+d.name,dc:'Department Coordinator — '+d.name,faculty:'Faculty Placement Coordinator — '+d.name,contact:'Contact details to be configured by department.'}));

export const recruiterBenefits = [
  {title:'Engineering talent pool', value:'11+ disciplines', desc:'Access talent across computing, electronics, electrical, mechanical, production, civil and allied programs.'},
  {title:'Structured hiring support', value:'End-to-end', desc:'A clear path from JAF submission to drive coordination, selection and offer closure.'},
  {title:'Campus infrastructure', value:'Institute supported', desc:'Assessment, presentation, interview and recruiter coordination support through the T&P Cell.'},
  {title:'Industry engagement', value:'Beyond hiring', desc:'Connect through talks, internships, projects, visits, alumni and long-term industry partnerships.'},
];

export const hiringSectors = [
  {name:'Technology & Software', value:34, tone:'blue'},
  {name:'Core Engineering', value:27, tone:'teal'},
  {name:'Consulting & Analytics', value:18, tone:'violet'},
  {name:'Manufacturing', value:13, tone:'gold'},
  {name:'Infrastructure & Other', value:8, tone:'red'},
];

export const academicPrograms = [
  {name:'Computer Science & Engineering', short:'CSE', students:'1,220', focus:'Software · AI/ML · Data · Cloud'},
  {name:'Electronics & Communication', short:'ECE', students:'980', focus:'Embedded · VLSI · Communication'},
  {name:'Mechanical Engineering', short:'ME', students:'940', focus:'Design · Manufacturing · Automation'},
  {name:'Electrical Engineering', short:'EE', students:'1,080', focus:'Power · Control · EV · Energy'},
  {name:'Production Engineering', short:'Prod.', students:'760', focus:'Manufacturing · Quality · Operations'},
  {name:'Civil Engineering', short:'Civil', students:'640', focus:'Infrastructure · Construction · Design'},
];

export const placementJourney = [
  {step:'01', title:'Training', desc:'Foundation skills, communication and professional readiness.'},
  {step:'02', title:'Internship', desc:'Industry exposure through internships and applied learning.'},
  {step:'03', title:'Pre-placement', desc:'Resume, aptitude, technical and interview preparation.'},
  {step:'04', title:'Recruitment', desc:'JAFs, assessments, interviews and campus drives.'},
  {step:'05', title:'Selection', desc:'Shortlisting, offers and transparent drive closure.'},
  {step:'06', title:'Career start', desc:'Offer acceptance, joining and alumni connection.'},
];

export const industryConnect = [
  {title:'Campus Recruitment', icon:'recruitment', desc:'Structured campus hiring with recruiter coordination and drive support.'},
  {title:'Pre-placement Talks', icon:'talks', desc:'Direct interaction with industry professionals and hiring teams.'},
  {title:'Internships', icon:'internship', desc:'Industry exposure that supports practical learning and employability.'},
  {title:'Industry Visits', icon:'visit', desc:'Exposure to engineering workplaces, processes and professional culture.'},
  {title:'Alumni Engagement', icon:'alumni', desc:'Career conversations, mentorship and industry connections through alumni.'},
  {title:'Projects & MoUs', icon:'projects', desc:'Longer-term academic and industry collaboration opportunities.'},
];

export const studentPlacementHighlights = [
  { title:'TCS · Ninja Role', batch:'2026–27', type:'Placement', students:'Sumit Chopkar · Rohan Nimkar · Aayush Wankhede · Mohit Khandale · Shardul Hingane · Nikhil Narwade', image:'/tnp-assets/placement-highlights/tcs-ninja-2026-27.jpeg' },
  { title:'TCS · Digital Role', batch:'2026–27', type:'Placement', students:'Janhavi Itankar · Sneha Khenwal · Tushar Pandhare · Prasad Jadhav · Parth Patil · Govindrajj Wattamwar · Saket Mungse', image:'/tnp-assets/placement-highlights/tcs-digital-2026-27.jpeg' },
  { title:'Linux Foundation · LFX', batch:'2026–27', type:'Internship', students:'Rahul Atram · Tushar Patle', image:'/tnp-assets/placement-highlights/linux-foundation-lfx-intern-2026-27.jpeg' },
  { title:'Credibl · Intern + PPO', batch:'2025–26', type:'Internship + PPO', students:'Dhiren Mhatre · Abhijit Raut · Karan Thengane', image:'/tnp-assets/placement-highlights/credibl-intern-ppo-group-2025-26.jpeg' },
  { title:'Credibl · Intern + PPO', batch:'2025–26', type:'Internship + PPO', students:'Mayank Chougale · Abhishek Borkar · Samyak Borkar', image:'/tnp-assets/placement-highlights/credibl-intern-ppo-group-2-2025-26.jpeg' },
  { title:'Algoquant Fintech · PPO', batch:'2025–26', type:'PPO', students:'Anuj Agrawal · Shivam Kachawar · Shivam Gupta', image:'/tnp-assets/placement-highlights/algoquant-ppo-2025-26.jpeg' },
  { title:'Scheepswerf Slob · Placement', batch:'2025–26', type:'Placement', students:'Sakshi Thakre', image:'/tnp-assets/placement-highlights/scheepswerfslob-placement-2025-26.jpeg' },
  { title:'Google · Placement', batch:'2025–26', type:'Placement', students:'Anuj Agrawal', image:'/tnp-assets/placement-highlights/google-placement-2025-26.jpeg' },
  { title:'Honeywell · Intern + PPO', batch:'2026–27', type:'Internship + PPO', students:'Shravani Khaparkhuntikar · Sakshi Musale', image:'/tnp-assets/placement-highlights/honeywell-intern-ppo-group-2026-27.jpeg' },
  { title:'Honeywell · Intern + PPO', batch:'2026–27', type:'Internship + PPO', students:'Amogh Joshi · Abhijeet Rajmane', image:'/tnp-assets/placement-highlights/honeywell-intern-ppo-group-2-2026-27.jpeg' },
];

export const recruitmentProcess = [
  {step:'01', title:'Hiring request', desc:'Share company profile and hiring intent with the T&P Cell.'},
  {step:'02', title:'JAF submission', desc:'Provide role, eligibility, compensation, location and selection details.'},
  {step:'03', title:'Eligibility review', desc:'T&P validates the hiring requirements and communicates the drive.'},
  {step:'04', title:'Drive scheduling', desc:'Assessment, presentation, interview and venue coordination.'},
  {step:'05', title:'Selection', desc:'Shortlisting and selection results are coordinated with the recruiter.'},
  {step:'06', title:'Offer & closure', desc:'Offer communication, joining coordination and drive closure.'},
];
