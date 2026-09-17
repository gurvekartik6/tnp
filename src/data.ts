export const img=(name:string)=>`/assets/${name}`;

export const departments=[
['CSE','Computer Science & Engineering','Departments/CSE_img.jpg'],['IT','Information Technology','Departments/it.jpg'],['EXTC','Electronics & Telecommunication','Departments/EXTC_img.jpg'],['ME','Mechanical Engineering','Departments/Mechanical_Img.jpg'],['EE','Electrical Engineering','Departments/electrical.jpg'],['CE','Civil Engineering','Departments/civil_img.jpg'],['PE','Production Engineering','Departments/Production_Img.jpg'],['CHE','Chemical Engineering','Departments/Chemical_img.jpg']
];

export const drives=[
{id:1,company:'Industry Partner — Demo',role:'Software / Engineering Roles',status:'OPEN',date:'Demo date',branches:'CSE · IT · EXTC',deadline:'Demo deadline',tag:'DEMO DATA'},
{id:2,company:'Verified Recruiter Record',role:'Core Engineering Role',status:'UPCOMING',date:'Published by T&P',branches:'ME · EE · PE',deadline:'Published by T&P',tag:'ADMIN EDITABLE'},
{id:3,company:'Published opportunity awaiting Dean review',role:'Opportunity awaiting approval',status:'PENDING',date:'T&P review',branches:'Eligible branches',deadline:'After verification',tag:'DEMO DATA'}
];

export const activity=[['08:42','Drive workflow','A new demo drive was created in the T&P workspace.'],['09:16','Eligibility','Eligibility rules recalculated for the current demo drive.'],['10:05','Interview desk','12 mock interview slots are awaiting confirmation.'],['11:20','CMS','Homepage placement statistics are marked pending official publication.']];

export const placementTrend=[{year:'2021–22',placed:0,offers:0},{year:'2022–23',placed:0,offers:0},{year:'2023–24',placed:0,offers:0},{year:'2024–25',placed:0,offers:0},{year:'2025–26',placed:0,offers:0}];

export const students=Array.from({length:10},(_,i)=>({id:i+1,name:['Aarav Patil','Isha Kulkarni','Rohan Deshmukh','Sana Shaikh','Vedant More','Ananya Jadhav','Om Pawar','Pranav Kale','Mihir Joshi','Riya Shinde'][i],roll:`DEMO-${String(i+1).padStart(3,'0')}`,branch:departments[0],readiness:68+i*2,status:i%3===0?'Profile Review':'Ready'}));

export const announcements=[['Placement','Placement statistics','Official figures will be published by the Training & Placement Cell.','Pending official data'],['Training','Skill development','New training content can be scheduled from the CMS.','Demo content'],['Recruiter','Recruiter information','Public recruiter information is maintained by the Dean.','Demo workflow']];

export const modules={dean:['Dashboard','Content Management','Media Library','Announcements','Newsletter','Calendar','Statistics','Departments','Recruiters','Drives','Reports','Approvals','Settings']};

// Re-export campus/public content from the centralized campus data module.
// Keeping these exports here preserves the existing import paths used by public pages.
export {
  campusDepartments,
  campusLabs,
  leadership,
  tnpTeam2026_27,
} from './data/campus';
