export const campusDepartments = [
  {
    code: 'CHEM',
    short: 'Chemical',
    name: 'Chemical Engineering',
    image: 'Departments/Chemical_img.jpg',
    established: '2009',
    hod: 'Dr. P. G. Jadhav',
    summary:
      'A research-led department connecting chemical sciences, process engineering and industrial applications.',
    highlights: [
      'Process engineering',
      'Research & innovation',
      'Industrial applications'
    ]
  },
  {
    code: 'CIVIL',
    short: 'Civil',
    name: 'Civil Engineering',
    image: 'Departments/civil_img.jpg',
    established: '1984',
    hod: 'Dr. C. B. Bhagat',
    summary:
      'A strong civil engineering ecosystem spanning infrastructure, water management and professional practice.',
    highlights: ['Infrastructure', 'Water management', 'Project practice']
  },
  {
    code: 'CSE',
    short: 'CSE',
    name: 'Computer Science & Engineering',
    image: 'Departments/CSE_img.jpg',
    established: '1986',
    hod: 'Prof. A. M. Bainwad',
    summary:
      'Technology-focused education across AI, distributed systems, computing, software and modern digital engineering.',
    highlights: ['AI & computing', 'Software engineering', 'Networks & systems']
  },
  {
    code: 'EXTC',
    short: 'EXTC',
    name: 'Electronics & Telecommunication Engineering',
    image: 'Departments/EXTC_img.jpg',
    established: '1981',
    hod: 'Dr. S. M. Jatti',
    summary:
      'Advanced electronics research and teaching in VLSI, embedded systems, signal processing and computer vision.',
    highlights: ['VLSI', 'Embedded systems', 'Signal & image processing']
  },
  {
    code: 'ELECT',
    short: 'Electrical',
    name: 'Electrical Engineering',
    image: 'Departments/electrical.jpg',
    established: '2011–12',
    hod: 'Dr. S. S. Gudhe',
    summary:
      'Engineering education and research in power systems, power electronics, drives and electrical machines.',
    highlights: ['Power systems', 'Power electronics', 'Electrical machines']
  },
  {
    code: 'IT',
    short: 'IT',
    name: 'Information Technology',
    image: 'Departments/it.jpg',
    established: '2000',
    hod: 'Dr. C. P. Navdeti',
    summary:
      'An applied technology department covering information systems, networking, cybersecurity and software.',
    highlights: ['Cybersecurity', 'Networking', 'Information systems']
  },
  {
    code: 'INST',
    short: 'Instrumentation',
    name: 'Instrumentation Engineering',
    image: 'Departments/Instru_img.jpg',
    established: '1981',
    hod: 'Dr. Mrs. R. V. Sarwadnya',
    summary:
      'Instrumentation and control education with applications in process control, PLC, biomedical systems and drives.',
    highlights: ['Process control', 'PLC', 'Biomedical instrumentation']
  },
  {
    code: 'MECH',
    short: 'Mechanical',
    name: 'Mechanical Engineering',
    image: 'Departments/Mechanical_Img.jpg',
    established: '2012–13',
    hod: 'Dr. Alok Mishra',
    summary:
      'Design, manufacturing and engineering fundamentals supported by strong industry interaction.',
    highlights: ['Design', 'Manufacturing', 'Engineering analysis']
  },
  {
    code: 'PROD',
    short: 'Production',
    name: 'Production Engineering',
    image: 'Departments/Production_Img.jpg',
    established: '1984',
    hod: 'Dr. P. R. Kubade',
    summary:
      'Pro-industry engineering focused on production systems, efficiency, quality and continuous improvement.',
    highlights: ['Production systems', 'Quality', 'Process optimisation']
  },
  {
    code: 'TEXT',
    short: 'Textile',
    name: 'Textile Technology',
    image: 'Departments/Textile_img.jpg',
    established: '1987',
    hod: 'Dr. P. A. Khude',
    summary:
      'Textile and apparel engineering with testing, weaving, knitting, dyeing and CAD/CAM capabilities.',
    highlights: ['Textile testing', 'Weaving & knitting', 'CAD/CAM']
  }
] as const

export const campusLabs = [
  {
    name: 'Data Analytics Laboratory',
    dept: 'CSE',
    image: 'Gallary/specialFacilities/centralComputing.webp',
    description:
      'UG computing environment supporting analytics, programming and data-oriented coursework.',
    facts: '30 i7 PCs · Python · Java · SQL'
  },
  {
    name: 'Computer Network & Security Laboratory',
    dept: 'CSE',
    image: 'Gallary/specialFacilities/centerOfExcellence.webp',
    description:
      'A postgraduate environment for networking, security, simulation and applied computing.',
    facts: '37 i7 PCs · Wireshark · Python · MATLAB'
  },
  {
    name: 'Database Systems Laboratory',
    dept: 'CSE',
    image: 'Gallary/ieadlab.jpg',
    description:
      'Database programming and information-system practical work for UG students.',
    facts: '34 i7 PCs · SQL · Oracle · MySQL'
  },
  {
    name: 'Programming Language Laboratory',
    dept: 'CSE',
    image: 'Gallary/specialFacilities/centralComputing.webp',
    description:
      'Programming practice across core languages, compilers and development environments.',
    facts: '56 i7 PCs · C/C++ · Java · Python'
  },
  {
    name: 'VLSI & Embedded Systems Laboratories',
    dept: 'EXTC',
    image: 'Gallary/specialFacilities/emerson.webp',
    description:
      'EXTC facilities supporting VLSI design, embedded systems and advanced electronics work.',
    facts: 'VLSI · Embedded systems · Research'
  },
  {
    name: 'Signal & Image Processing Facilities',
    dept: 'EXTC',
    image: 'Gallary/specialFacilities/endress.webp',
    description:
      'Research-oriented infrastructure for digital signal, image and computer vision work.',
    facts: 'DSP · Image processing · Vision'
  },
  {
    name: 'Technology Incubation & Entrepreneurship Center',
    dept: 'Institute',
    image: 'Gallary/specialFacilities/tiec.webp',
    description:
      'Innovation and entrepreneurship infrastructure connecting student ideas with industry and incubation.',
    facts: 'Innovation · Entrepreneurship · Industry'
  },
  {
    name: 'AICTE-IDEA Lab',
    dept: 'Institute',
    image: 'Gallary/specialFacilities/idea.webp',
    description:
      'Hands-on innovation space for multidisciplinary prototyping and project development.',
    facts: 'Prototyping · Fabrication · Projects'
  },
  {
    name: 'Center of Excellence Facilities',
    dept: 'Institute',
    image: 'Gallary/specialFacilities/centerOfExcellence.webp',
    description:
      'Advanced institute-level facilities supporting collaborative research and industry engagement.',
    facts: 'Research · Industry · Advanced facilities'
  }
] as const

export const leadership = [
  {
    name: 'Dr. M. B. Kokare',
    role: 'Director, SGGSIE&T',
    email: 'director@sggs.ac.in',
    image: 'Director.jpeg',
    note: 'Institutional leadership and strategic direction.'
  },
  {
    name: 'Dr. S. B. Mundhe',
    role: 'Dean (Industry Liaison) & I/C TPO',
    email: 'tpo@sggs.ac.in',
    image: 'MundheSir.jpg',
    note: 'Dean (Industry Liaison) and I/C Training & Placement Officer, supporting industry engagement and placement leadership.'
  }
] as const

export const tnpTeam2026_27 = [
  [
    'Srushti Kolhekar',
    'ELECT',
    '2024bel022@sggs.ac.in',
    '9096803319',
    'Secretary (Outreach & Relations)'
  ],
  [
    'Aditya Kandale',
    'CSE',
    '2025bcs515@sggs.ac.in',
    '8669057627',
    'Secretary (Outreach & Relations)'
  ],
  [
    'Samarth Sarvadnya',
    'CSE',
    '2025bcs506@sggs.ac.in',
    '8793803889',
    'HR Executive'
  ],
  [
    'Ashvini Patil',
    'TEXT',
    '2024btt017@sggs.ac.in',
    '7276845340',
    'HR Executive'
  ],
  [
    'Prachi Purohit',
    'EXTC',
    '2024bec115@sggs.ac.in',
    '9327662633',
    'HR Executive'
  ],
  [
    'Rutika Ujade',
    'INSTRU',
    '2024bin001@sggs.ac.in',
    '9307060488',
    'HR Executive'
  ],
  [
    'Mansi Shende',
    'CSE',
    '2024bsc050@sggs.ac.in',
    '7249501276',
    'PD Executive'
  ],
  [
    'Arjun Gatlawar',
    'INSTRU',
    '2024bin019@sggs.ac.in',
    '8855846949',
    'PD Executive'
  ],
  [
    'Atharva Deotare',
    'CSE',
    '2025bcs504@sggs.ac.in',
    '7219082771',
    'PD Executive'
  ],
  [
    'Tanishka Dhakore',
    'CSE',
    '2024bcs064@sggs.ac.in',
    '9420214663',
    'DBMS Executive'
  ],
  [
    'Shreyas Chavhan',
    'PROD',
    '2025BPR506@sggs.ac.in',
    '9923835995',
    'DBMS Executive'
  ],
  [
    'Aachal Narwade',
    'CSE',
    '2024bcs120@sggs.ac.in',
    '7558742488',
    'DBMS Executive'
  ],
  [
    'Sayali Ghawade',
    'CSE',
    '2025bcs518@sggs.ac.in',
    '9309819464',
    'W&I Executive'
  ],
  [
    'Aditya Dhawale',
    'TEXT',
    '2024btt005@sggs.ac.in',
    '7387585352',
    'W&I Executive'
  ],
  [
    'Shubham Panchal',
    'TEXT',
    '2024btt014@sggs.ac.in',
    '9860751039',
    'W&I Executive'
  ],
  [
    'Shivba Aghav',
    'EXTC',
    '2024bec016@sggs.ac.in',
    '8806835380',
    'W&M Executive'
  ],
  [
    'Shruti Bhatgare',
    'EXTC',
    '2024bec028@sggs.ac.in',
    '8788989591',
    'W&M Executive'
  ],
  [
    'Kunal Yelgate',
    'CSE',
    '2025BCS510@sggs.ac.in',
    '9423967783',
    'W&M Executive'
  ],
  [
    'Rohini Thigle',
    'EXTC',
    '2024BEC049@sggs.ac.in',
    '9307759464',
    'R&C Executive'
  ],
  [
    'Khushi Masram',
    'IT',
    '2024BIT007@sggs.ac.in',
    '7030877525',
    'R&C Executive'
  ],
  [
    'Suyash Pawade',
    'EXTC',
    '2025BEC505@sggs.ac.in',
    '9403625692',
    'Dept. Coordinator (EXTC)'
  ],
  [
    'Nikhil Dhande',
    'EXTC',
    '2024BEC086@sggs.ac.in',
    '7757954456',
    'Dept. Coordinator (EXTC)'
  ],
  [
    'Aryan Kale',
    'IT',
    '2024BIT020@sggs.ac.in',
    '9579813943',
    'Dept. Coordinator (IT)'
  ],
  [
    'Avishka Tajane',
    'TEXT',
    '2024btt012@sggs.ac.in',
    '8263930721',
    'Dept. Coordinator (TEXTILE)'
  ],
  [
    'Shruti Malwade',
    'INSTRU',
    '2024BIN022@sggs.ac.in',
    '9545137925',
    'Dept. Coordinator (INSTRUMENTATION)'
  ],
  [
    'Nabil Khan',
    'PROD',
    '2024BPR023@sggs.ac.in',
    '7767999260',
    'Dept. Coordinator (PRODUCTION)'
  ],
  [
    'Anushka Jagtap',
    'CSE',
    '2024bcs023@sggs.ac.in',
    '7972968977',
    'Dept. Coordinator (CSE)'
  ],
  [
    'Neeraj Lilhare',
    'CSE',
    '2024bcs084@sggs.ac.in',
    '9404216527',
    'Dept. Coordinator (CSE)'
  ],
  [
    'Unnat Deshmukh',
    'MECH',
    '2024bme018@sggs.ac.in',
    '9172127109',
    'Dept. Coordinator (MECHANICAL)'
  ],
  [
    'Bhargavi Mali',
    'CHEM',
    '2024BCH018@sggs.ac.in',
    '8600416654',
    'Dept. Coordinator (CHEMICAL)'
  ],
  [
    'Janhavi Wankhade',
    'ELECT',
    '2024bel021@sggs.ac.in',
    '7666527797',
    'Dept. Coordinator (ELECTRICAL)'
  ]
] as const
