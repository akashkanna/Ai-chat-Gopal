// Chat App with CRUD Operations and AI Assistant
class ChatApp {
    constructor() {
        this.messages = this.loadMessages();
        this.editingMessageId = null;
        this.aiName = 'Gopal';
        this.userName = this.loadUserName();
        this.currentTheme = this.loadTheme();
        this.init();
        this.applyTheme(this.currentTheme);
        this.showWelcomeMessage();
    }

    init() {
        // DOM Elements
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.chatMessages = document.getElementById('chatMessages');
        this.editModal = document.getElementById('editModal');
        this.editInput = document.getElementById('editInput');
        this.saveEditBtn = document.getElementById('saveEditBtn');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
        this.closeModal = document.getElementById('closeModal');
        this.themeToggle = document.getElementById('themeToggle');

        // Event Listeners
        this.sendBtn.addEventListener('click', () => this.createMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.createMessage();
            }
        });

        this.saveEditBtn.addEventListener('click', () => this.updateMessage());
        this.cancelEditBtn.addEventListener('click', () => this.closeEditModal());
        this.closeModal.addEventListener('click', () => this.closeEditModal());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Close modal when clicking outside
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.closeEditModal();
            }
        });

        // Display existing messages
        this.displayMessages();
    }

    // CREATE - Add new message
    createMessage() {
        const text = this.messageInput.value.trim();
        
        if (text === '') {
            return;
        }

        // Check if we need to capture user name (before adding message)
        const isFirstMessage = this.messages.length === 1;
        const wasAskingForName = isFirstMessage && 
                                 this.messages[0].sender === 'ai' && 
                                 this.messages[0].text.includes('tell me your name') &&
                                 !this.userName;
        
        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date().toISOString()
        };

        this.messages.push(userMessage);
        this.saveMessages();
        this.displayMessages();
        this.messageInput.value = '';
        this.messageInput.focus();

        // Scroll to bottom
        this.scrollToBottom();

        // Get AI response after a short delay
        setTimeout(() => {
            if (wasAskingForName) {
                // Extract name from message (take first word)
                const name = text.split(/\s+/)[0].trim();
                if (name && name.length > 0 && name.length < 50 && !name.match(/^\d+$/)) {
                    this.userName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                    this.saveUserName();
                    
                    const welcomeResponse = {
                        id: (Date.now() + 1).toString(),
                        text: `Nice to meet you, ${this.userName}! I'm ${this.aiName}, your AI assistant. I'm here to help you with anything you need! 🎓\n\nI can help you with:\n• Information about Takshashila University\n• Bus route details and timings\n• Club information\n• General questions and conversations\n• Math calculations\n• Various topics like technology, education, sports, and more\n\nFeel free to ask me anything! What would you like to know?`,
                        sender: 'ai',
                        timestamp: new Date().toISOString()
                    };
                    this.messages.push(welcomeResponse);
                    this.saveMessages();
                    this.displayMessages();
                    this.scrollToBottom();
                    return;
                }
            }
            this.getAIResponse(text);
        }, 500);
    }

    // AI Response Generator
    getAIResponse(userMessage) {
        const response = this.generateAIResponse(userMessage);
        
        const aiMessage = {
            id: (Date.now() + 1).toString(),
            text: response,
            sender: 'ai',
            timestamp: new Date().toISOString()
        };

        this.messages.push(aiMessage);
        this.saveMessages();
        this.displayMessages();
        this.scrollToBottom();
    }

    // Takshashila University Knowledge Base
    getUniversityInfo() {
        return {
            name: "Takshashila University",
            established: "2023",
            location: "Near Tindivanam, Villupuram District, Tamil Nadu, India",
            address: "Chennai–Trichy National Highway (NH-45), Near Tindivanam, Villupuram District, Tamil Nadu – 604 305",
            website: "https://www.takshashilauniv.edu.in",
            type: "Private University",
            recognizedBy: "UGC (University Grants Commission), Government of Tamil Nadu",
            promotingBody: "Sri Manakula Vinayagar Group of Educational Institutions",
            motto: "Transforming Education for Tomorrow",
            vision: "To become a globally recognized university known for innovation, multidisciplinary education, and research-driven learning that contributes to national development",
            mission: [
                "Provide world-class education integrating technology, ethics, and research",
                "Empower students through skill-based and industry-oriented programs",
                "Encourage innovation, entrepreneurship, and social responsibility"
            ],
            schools: [
                "School of Engineering and Technology (B.Tech in CSE, AI & DS, ECE, Mechanical, Civil, etc.)",
                "School of Computing Sciences (BCA, MCA, B.Sc., M.Sc. in Data Science, Cybersecurity, etc.)",
                "School of Commerce and Management (BBA, MBA, B.Com, M.Com, etc.)",
                "School of Arts and Humanities",
                "School of Agricultural Sciences",
                "School of Physiotherapy",
                "School of Paramedical Sciences",
                "School of Pharmacy",
                "School of Defence",
                "School of Social Work",
                "School of Architecture",
                "School of Allied Health Sciences"
            ],
            facilities: [
                "Smart classrooms",
                "AI and IoT laboratories",
                "Central library and digital learning center",
                "Hostel accommodation (separate for boys and girls)",
                "Transportation facilities",
                "Indoor/outdoor sports complexes",
                "Wi-Fi campus and innovation hubs"
            ],
            focus: "Industry collaboration, AI-based learning, and research incubation centers",
            research: [
                "Innovation & Incubation Centers for start-ups",
                "Industry-Academia Partnerships (especially in AI, Data Science, Biotechnology, and Management)",
                "Skill development programs in collaboration with corporate sectors",
                "Hackathons and research conclaves for students"
            ],
            accreditation: "Established under Tamil Nadu Act No. 19 of 2023. Recognized by UGC. Programs follow AICTE, PCI, BCI, and INC guidelines where applicable",
            symbolism: "The name 'Takshashila' pays homage to the ancient world's first learning hub — the original Takshashila in Gandhara. It represents the institution's commitment to revive India's ancient educational excellence using modern technology and research",
            clubs: {
                commonTime: "Saturday 7-8 PM",
                list: [
                    { name: "Arts Club", rooms: ["202", "203"] },
                    { name: "Media Club", rooms: ["207", "208"] },
                    { name: "Innopreneur Club", rooms: ["209", "210"] },
                    { name: "IQ Club", rooms: ["220", "221"] },
                    { name: "Nature Club", rooms: ["226", "227"] },
                    { name: "Innovation Club", rooms: ["222", "228"] },
                    { name: "Coding Club", rooms: ["Phase 1 lab", "Phase 2 lab"] },
                    { name: "Manasso Club", rooms: ["121", "122"] },
                    { name: "Robotics Club", rooms: ["120", "126"] },
                    { name: "Photography Club", rooms: ["124", "125"] },
                    { name: "Health Club", rooms: ["118", "119"] }
                ]
            },
            busRoutes: [
                {
                    routeNumber: 1,
                    routeName: "THIRUVENNAINALLUR",
                    driver: "SIVA",
                    driverMobile: "811102571",
                    incharge: "MR.M.VINOTH",
                    inchargeMobile: "9894701416",
                    stops: [
                        { stage: "SMVCH HOSPITAL", time: "7.10" },
                        { stage: "TV NALLUR BUS STOP", time: "7.14" },
                        { stage: "FRIENDS BAKKERY", time: "7.18" },
                        { stage: "GANDHI KUPPAM", time: "7.20" },
                        { stage: "INDANE GAS", time: "7.21" },
                        { stage: "KANARAMPATTU", time: "7.22" },
                        { stage: "PUTHUKOIL", time: "7.25" },
                        { stage: "KURANOOR", time: "7.26" },
                        { stage: "ALANKUPPAM", time: "7.28" },
                        { stage: "ALANKUPPAM PILLAIYAR KOIL", time: "7.29" },
                        { stage: "ARASUR", time: "7.30" },
                        { stage: "PERANGIYUR", time: "7.33" },
                        { stage: "PAITHAMPADI", time: "7.34" },
                        { stage: "KUCHIPALAYAM", time: "7.36" },
                        { stage: "PIDAGAM", time: "7.37" },
                        { stage: "JANAKIPURAM", time: "7.40" },
                        { stage: "PERIYAR QUARTERS", time: "7.42" },
                        { stage: "TATA MOTORS", time: "7.43" },
                        { stage: "ESSAR BUNK", time: "7.44" },
                        { stage: "TACW COLLAGE", time: "7.56" },
                        { stage: "NATRAJ ITI", time: "7.58" },
                        { stage: "COURT VPM", time: "8.00" },
                        { stage: "SIGNAL", time: "8.03" },
                        { stage: "PILLAIYAR KOIL", time: "8.05" },
                        { stage: "MARIYAMMAN KOIL", time: "8.07" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 2,
                    routeName: "VILLIYANUR",
                    driver: "TAMILARASAN",
                    driverMobile: "9342093442",
                    incharge: "MR.G.RAJA",
                    inchargeMobile: "9600572422",
                    stops: [
                        { stage: "VILLIYANUR BYEBASS", time: "7.15" },
                        { stage: "PATHUKANNU ROAD", time: "7.18" },
                        { stage: "PERAMBAI ROAD", time: "7.20" },
                        { stage: "SULTHANPETTAI", time: "7.23" },
                        { stage: "AGB HOSPITAL", time: "7.28" },
                        { stage: "ARUMPARTHAPURAM", time: "7.33" },
                        { stage: "MOOLAKULAM", time: "7.38" },
                        { stage: "RETTIYARPALAYAM", time: "7.42" },
                        { stage: "UZAVERKARAI", time: "7.46" },
                        { stage: "INDIRAGANTHI STATUE", time: "7.50" },
                        { stage: "MURUGA THETARE", time: "7.55" },
                        { stage: "SUBBAIYA MADAPAM", time: "8.00" },
                        { stage: "JIPMER", time: "8.05" },
                        { stage: "THIRUCITTAMPALAM KOOT ROAD", time: "8.10" },
                        { stage: "PAPPANCHAVADI", time: "8.12" },
                        { stage: "B D O OFFICE", time: "8.15" },
                        { stage: "CHINNA KATRAMPAKKAM", time: "8.25" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 3,
                    routeName: "KOOVATHUR",
                    driver: "VENKATESAN",
                    driverMobile: "9600001278",
                    incharge: "MR.S.SHARMILA",
                    inchargeMobile: "9626899103",
                    stops: [
                        { stage: "KOOVATHUR", time: "7.00" },
                        { stage: "NELVOY PALAYAM", time: "7.35" },
                        { stage: "VIZHUTHAMANGALAM X ROAD", time: "7.45" },
                        { stage: "NETHAPAKKAM", time: "7.50" },
                        { stage: "POLAMPAKKAM", time: "7.55" },
                        { stage: "CHITAMOOR", time: "8.00" },
                        { stage: "POLAMPAKKAM/TVS", time: "8.10" },
                        { stage: "SOTHUPAKKAM", time: "8.15" },
                        { stage: "RAILWAY GATE", time: "8.20" },
                        { stage: "MARKET", time: "8.30" },
                        { stage: "MARUVATHUR BUS STOP", time: "8.35" },
                        { stage: "MARUVOOR AVENUE", time: "8.40" },
                        { stage: "ACHIRAPAKKAM ARCH", time: "8.45" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 4,
                    routeName: "CODALLORE",
                    driver: "KUMAR.P",
                    driverMobile: "6369779546",
                    incharge: "DR.S.MADHU",
                    inchargeMobile: "7305634746",
                    stops: [
                        { stage: "POST OFFICE", time: "7.05" },
                        { stage: "MANJANKUPPAM", time: "7.10" },
                        { stage: "CHECKPOST", time: "7.12" },
                        { stage: "KANNIKOIL", time: "7.15" },
                        { stage: "MG MEDICAL COLLAGE", time: "7.20" },
                        { stage: "THAVALAKUPPAM", time: "7.25" },
                        { stage: "ARIYANKUPPAM", time: "7.30" },
                        { stage: "ARIYANKUPPAM MARKET", time: "7.35" },
                        { stage: "MARAPALAM", time: "7.40" },
                        { stage: "MURUGA THETHARE", time: "7.45" },
                        { stage: "GORIMETU", time: "7.55" },
                        { stage: "TOLLGATE", time: "8.00" },
                        { stage: "TOLLGATE NEXT STOP", time: "8.05" },
                        { stage: "PULICHAPALLAM BRIDGE", time: "8.10" },
                        { stage: "RTO CHECKPOST ANDIPALAYAM", time: "8.15" },
                        { stage: "KENIPATTU ROAD", time: "8.17" },
                        { stage: "THERKUNAM BYEPASS", time: "8.20" },
                        { stage: "OMANDUR", time: "8.25" },
                        { stage: "MOLASUR ERIKARAI", time: "8.30" },
                        { stage: "ARYAS HOTEL", time: "8.45" },
                        { stage: "UNIVERSITY", time: "9.05" }
                    ]
                },
                {
                    routeNumber: 5,
                    routeName: "PANRUTI",
                    driver: "RAJALINGAM",
                    driverMobile: "8072377182",
                    incharge: "DR.P.MURUGAMANI",
                    inchargeMobile: "9976228498",
                    stops: [
                        { stage: "PANRUTI BUS STOP", time: "7.15" },
                        { stage: "PANRUTI FOUR ROAD", time: "7.20" },
                        { stage: "POONKUNAM", time: "7.25" },
                        { stage: "RASAPALAYAM", time: "7.30" },
                        { stage: "KALLIPATTU", time: "7.40" },
                        { stage: "A K KUCHIPALAYAM", time: "7.45" },
                        { stage: "KOLIYANUR", time: "8.00" },
                        { stage: "MELPATHI", time: "8.10" },
                        { stage: "VIKRAVANDI TOLL PLAZA", time: "8.20" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 6,
                    routeName: "KADAPAKKAM",
                    driver: "SUMAN",
                    driverMobile: "9442773673",
                    incharge: "MS.A.TAMILSELVI",
                    inchargeMobile: "7708613693",
                    stops: [
                        { stage: "KADAPAKKAM", time: "8.00" },
                        { stage: "KAPPIVAKAM", time: "8.10" },
                        { stage: "KOTTAIKADU", time: "8.15" },
                        { stage: "PALLAMPAKKAM", time: "8.20" },
                        { stage: "SOONAMBEDU", time: "8.25" },
                        { stage: "MANAPAKKAM", time: "8.30" },
                        { stage: "VANNIYANALLUR", time: "8.35" },
                        { stage: "ESUR", time: "8.40" },
                        { stage: "SIRUMAILORE", time: "8.45" },
                        { stage: "THUTHUVILAMPATU", time: "8.50" },
                        { stage: "ATHUR", time: "8.55" },
                        { stage: "THOZHUPEDU", time: "9.00" },
                        { stage: "BOLLAMMA KULAM", time: "9.05" },
                        { stage: "UNIVERSITY", time: "9.10" }
                    ]
                },
                {
                    routeNumber: 7,
                    routeName: "VANDAVASI",
                    driver: "RAHAMATHULLA",
                    driverMobile: "8883483941",
                    incharge: "MRS. K. KOWSALYA",
                    inchargeMobile: "9585619289",
                    stops: [
                        { stage: "MUMMUNI KULAN VANDAVASI", time: "7.30" },
                        { stage: "MUMMUNI", time: "7.35" },
                        { stage: "AMMAIPATTU SCHOOL", time: "7.37" },
                        { stage: "AMMAIPATTU EB OFFICE", time: "7.38" },
                        { stage: "VANDAVASI OLD BUS STOP", time: "7.40" },
                        { stage: "VANDAVASI OLD BUS STAND", time: "7.45" },
                        { stage: "THERADI (VANDAVASI)", time: "7.46" },
                        { stage: "NEW BUS STAND", time: "7.48" },
                        { stage: "NEW BUS STAND VANDAVASI", time: "7.48" },
                        { stage: "BIRUDUR", time: "7.50" },
                        { stage: "KADAISIKULAM", time: "7.52" },
                        { stage: "MARATHADU", time: "7.55" },
                        { stage: "KALLANKUTHU", time: "8.00" },
                        { stage: "KILKODUNKALURE", time: "8.05" },
                        { stage: "KODUNKALURE", time: "8.06" },
                        { stage: "REDDIPALAYAM BUS STOP", time: "8.08" },
                        { stage: "RAMAPURAM BUS STOP", time: "8.12" },
                        { stage: "RAMAPURAM", time: "8.15" },
                        { stage: "SALAMEDU", time: "8.16" },
                        { stage: "SENDIVAKKAM", time: "8.16" },
                        { stage: "AGILI", time: "8.18" },
                        { stage: "SOTHUPAKKAM (ARCH)", time: "8.20" },
                        { stage: "SOTHUPAKKAM", time: "8.25" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 8,
                    routeName: "MELMAIYANOOR",
                    driver: "PRABAKARAN",
                    driverMobile: "9066930535",
                    incharge: "MR.T.RAJASEKAR",
                    inchargeMobile: "9486220669",
                    stops: [
                        { stage: "MELMALAIYANOOR", time: "6.55" },
                        { stage: "EZHIL", time: "7.10" },
                        { stage: "SERAPATTU", time: "7.25" },
                        { stage: "NEELAMPOONDI", time: "7.40" },
                        { stage: "MAHADEVIMANGALAM", time: "7.45" },
                        { stage: "KALAVAI X ROAD", time: "7.50" },
                        { stage: "GINGEE GATE", time: "7.55" },
                        { stage: "URANITHANGAL", time: "7.58" },
                        { stage: "GINGEE TOLL GATE", time: "8.00" },
                        { stage: "NATTARMANGALAM", time: "8.05" },
                        { stage: "VALLAM", time: "8.08" },
                        { stage: "KOLLAR", time: "8.18" },
                        { stage: "TINDIVANAM GANTHI STATUE", time: "8.25" },
                        { stage: "MIN NAGAR", time: "8.30" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 9,
                    routeName: "SETHARAPATTU",
                    driver: "RAJA.K",
                    driverMobile: "7010560767",
                    incharge: "MR.E.SUBASH",
                    inchargeMobile: "7639910316",
                    stops: [
                        { stage: "SETHARAPATTU", time: "7.20" },
                        { stage: "VANUR", time: "7.30" },
                        { stage: "RANGANATHAPURAM", time: "7.40" },
                        { stage: "V.PARANGANI", time: "7.45" },
                        { stage: "KARASANUR", time: "7.50" },
                        { stage: "PERUMBAKKAM", time: "7.55" },
                        { stage: "THAZHUTHALI", time: "8.00" },
                        { stage: "MAILAM", time: "8.10" },
                        { stage: "KOLLIYAKUNAM", time: "8.13" },
                        { stage: "KOOTERIPATTU", time: "8.20" },
                        { stage: "OLAKKUR", time: "8.45" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 10,
                    routeName: "ANANTHAMANGALAM",
                    driver: "VELU",
                    driverMobile: "8148859247",
                    incharge: "DR.S.NAZIYA BEGAM",
                    inchargeMobile: "7502228620",
                    stops: [
                        { stage: "VAIRAPURAM", time: "7.45" },
                        { stage: "ANANTHAMANGALAM", time: "7.50" },
                        { stage: "THINNALUR", time: "8.10" },
                        { stage: "METTUPALAYAM", time: "8.15" },
                        { stage: "VINNAMPOONDI", time: "8.20" },
                        { stage: "MAVALAVADI", time: "8.25" },
                        { stage: "SEMBEDU", time: "8.30" },
                        { stage: "ORATHY BUS STAND", time: "8.35" },
                        { stage: "ORATHY", time: "8.36" },
                        { stage: "KIL ORATHY", time: "8.40" },
                        { stage: "ATHIVAKKAM X ROAD", time: "8.45" },
                        { stage: "MINNAL CHITHAMUR", time: "8.50" },
                        { stage: "MINNAL", time: "8.50" },
                        { stage: "KADAMALAIPUTHUR 1", time: "8.52" },
                        { stage: "KADAMALAIPUTHUR 2", time: "8.55" },
                        { stage: "KADAMALAIPUTHUR 3", time: "8.55" },
                        { stage: "KADAMALAIPUTHUR 4", time: "9.00" },
                        { stage: "UNIVERSITY", time: "9.05" }
                    ]
                },
                {
                    routeNumber: 11,
                    routeName: "KOTTAKUPPAM",
                    driver: "SAKTHI",
                    driverMobile: "9751521857",
                    incharge: "S.KAYALVIZHI",
                    inchargeMobile: "7418501062",
                    stops: [
                        { stage: "CHINNA MUTHALIYAR CHAVATY", time: "7.00" },
                        { stage: "PERIYA MUTHALIYAR CHAVATY", time: "7.05" },
                        { stage: "KEEZPUTHUPATTU", time: "7.15" },
                        { stage: "ANUMANTHAI", time: "7.20" },
                        { stage: "KEEZPETTAI (MURUGAN KOIL)", time: "7.25" },
                        { stage: "MADAVAI KUPPAM", time: "7.30" },
                        { stage: "MARAKKANAM (ECR)", time: "7.35" },
                        { stage: "MARAKKANAM (BHOOMEESWARAN KOIL)", time: "7.40" },
                        { stage: "MARAKKANAM (BAKERY)", time: "7.42" },
                        { stage: "KANTHADU", time: "7.45" },
                        { stage: "KANTHADU (PALAM)", time: "7.50" },
                        { stage: "MURUKERI", time: "8.00" },
                        { stage: "SINGANANTHAL", time: "8.02" },
                        { stage: "ALANKUPPAM", time: "8.05" },
                        { stage: "ALANKUPPAM", time: "8.07" },
                        { stage: "VADANERKUNAM KOIL", time: "8.10" },
                        { stage: "VADANERKUNAM", time: "8.15" },
                        { stage: "AVANIPUR", time: "8.25" },
                        { stage: "AAPAKKAM ROAD", time: "8.30" },
                        { stage: "KONARIKUPPAM", time: "8.35" },
                        { stage: "KONARIKUPPAM XROAD", time: "8.40" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 12,
                    routeName: "UTHIRAMERUR",
                    driver: "",
                    driverMobile: "",
                    incharge: "",
                    inchargeMobile: "",
                    stops: [
                        { stage: "UTHIRAMERUR", time: "7.40" },
                        { stage: "UTHIRAMERUR BUS STAND", time: "7.42" },
                        { stage: "ENDATHUR", time: "8.20" },
                        { stage: "ELAPAKKAM BUS STOP", time: "8.25" },
                        { stage: "MADHUR", time: "8.30" },
                        { stage: "THIRUMUKKUADU", time: "8.35" },
                        { stage: "ACHARAPAKKAM MATHA KOIL", time: "8.45" },
                        { stage: "ACHARAPAKKAM BRIDGE", time: "8.50" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 13,
                    routeName: "UPPUVELLORE",
                    driver: "MANJINI",
                    driverMobile: "9629158389",
                    incharge: "MS.S.LAVANYA",
                    inchargeMobile: "7604976013",
                    stops: [
                        { stage: "KARATTAI", time: "7.30" },
                        { stage: "UPPUVELLORE", time: "7.35" },
                        { stage: "PUDUKUPPAM", time: "7.40" },
                        { stage: "PARANGINI", time: "7.45" },
                        { stage: "PUDHUR", time: "7.50" },
                        { stage: "ULAGAPURAM", time: "7.55" },
                        { stage: "NALLALAM", time: "8.00" },
                        { stage: "KATTALAI", time: "8.05" },
                        { stage: "MAANUR", time: "8.07" },
                        { stage: "APPASAMY NAGAR", time: "8.13" },
                        { stage: "ENDIYUR", time: "8.20" },
                        { stage: "MARAKKANAM ROAD", time: "8.25" },
                        { stage: "MELPATTAI", time: "8.30" },
                        { stage: "PATHIRI", time: "8.45" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 14,
                    routeName: "MADAGADIPATTU",
                    driver: "PURUSHOTHAMAN",
                    driverMobile: "9894778181",
                    incharge: "V.ARTHY",
                    inchargeMobile: "7339176956",
                    stops: [
                        { stage: "MADAGADIPATTU HOSPITAL", time: "7.00" },
                        { stage: "KALITHEERTHALKUPPAM", time: "7.30" },
                        { stage: "PS PALAYAM", time: "7.32" },
                        { stage: "THIRUMANGALAM X ROAD", time: "7.35" },
                        { stage: "THIRUKANUR (ARUN BAKERY)", time: "7.40" },
                        { stage: "THIRUKANUR (PETROL BUNK)", time: "7.42" },
                        { stage: "THIRUKANUR (CHECK POST)", time: "7.45" },
                        { stage: "MATHURAPAKKAM", time: "7.58" },
                        { stage: "M KUCHIPALAYAM", time: "8.02" },
                        { stage: "RADHAPURAM", time: "8.05" },
                        { stage: "VETTUKADU", time: "8.07" },
                        { stage: "VETUKADI SALAI", time: "8.09" },
                        { stage: "SIRUVALLIKUPPAM", time: "8.11" },
                        { stage: "THORAVI", time: "8.13" },
                        { stage: "THORAVI CHECK POST", time: "8.15" },
                        { stage: "PANAYAPURAM", time: "8.17" },
                        { stage: "PANAYAPURAM X ROAD", time: "8.19" },
                        { stage: "VIKRAVANDI TOLLGATE", time: "8.21" },
                        { stage: "PALAPATTU", time: "8.35" },
                        { stage: "VILANGAMPADI", time: "8.37" },
                        { stage: "CHINNA NERKUNAM", time: "8.40" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 15,
                    routeName: "THIRUKOILUR",
                    driver: "SRINIVASAN",
                    driverMobile: "9710656646",
                    incharge: "S.DHANALAKSHMI",
                    inchargeMobile: "8754004806",
                    stops: [
                        { stage: "THIRUKOVILORE", time: "7.00" },
                        { stage: "ARAGANDANALLURE", time: "7.10" },
                        { stage: "MUGAIYOOR", time: "7.30" },
                        { stage: "AYANDUR", time: "7.40" },
                        { stage: "MAMBAZHAPATTU", time: "7.45" },
                        { stage: "PERUMPAKKAM", time: "7.55" },
                        { stage: "THOKAIPADI", time: "8.00" },
                        { stage: "PALAYAM", time: "8.00" },
                        { stage: "GINGEE ROAD", time: "8.10" },
                        { stage: "MUNDIYAMPAKKAM", time: "8.15" },
                        { stage: "MUNDIYAMPAKKAM A2B", time: "8.18" },
                        { stage: "AMMA TEA TIME", time: "8.45" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 16,
                    routeName: "KILIYANOOR",
                    driver: "SUNDAR",
                    driverMobile: "8122965340",
                    incharge: "MRS.UMA",
                    inchargeMobile: "9600320173",
                    stops: [
                        { stage: "KODUR", time: "7.30" },
                        { stage: "THAILAPURAM", time: "7.45" },
                        { stage: "KILIYANOOR", time: "7.55" },
                        { stage: "KONTHAMOOR", time: "8.05" },
                        { stage: "THENKODIPAKKAM", time: "8.15" },
                        { stage: "MOLASUR", time: "8.20" },
                        { stage: "ENDIYUR", time: "8.25" },
                        { stage: "ERAIYANOOR", time: "8.30" },
                        { stage: "ST JOSHEP BRIDGE", time: "8.35" },
                        { stage: "EB OFFICE", time: "8.40" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 17,
                    routeName: "NADUKUPPAM",
                    driver: "JAYARAJ",
                    driverMobile: "9600259200",
                    incharge: "R.SRIVIDYA",
                    inchargeMobile: "9566549956",
                    stops: [
                        { stage: "NADUKUPPAM", time: "7.40" },
                        { stage: "ADASAL", time: "7.45" },
                        { stage: "KOLATHUR", time: "7.50" },
                        { stage: "SENTHAMANGALAM X ROAD", time: "7.55" },
                        { stage: "PUTHUPAKKAM", time: "8.00" },
                        { stage: "RAJAMPALAYAM", time: "8.05" },
                        { stage: "BRAMMATHESAM", time: "8.10" },
                        { stage: "HOUSING BOARD", time: "8.15" },
                        { stage: "INDHRA NAGAR", time: "8.20" },
                        { stage: "END HOSPITAL", time: "8.25" },
                        { stage: "JAYAPURAM", time: "8.30" },
                        { stage: "PERIYAR DEPO", time: "8.35" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 18,
                    routeName: "KILPENNATHUR",
                    driver: "THIYAGARAJAN",
                    driverMobile: "8939606427",
                    incharge: "R.S.SUBIKSHA",
                    inchargeMobile: "7397169360",
                    stops: [
                        { stage: "GINGEE", time: "8.00" },
                        { stage: "KALIYUR", time: "8.10" },
                        { stage: "DEEVANUR", time: "8.20" },
                        { stage: "MELPERADIKUPPAM", time: "8.22" },
                        { stage: "SALAI", time: "8.24" },
                        { stage: "PV POLYTECHNIC", time: "8.25" },
                        { stage: "SIPCOT", time: "8.30" },
                        { stage: "SANTHAIMEDU", time: "8.35" },
                        { stage: "GNM PETROL BUNK", time: "8.40" },
                        { stage: "COMMITTEE", time: "8.45" },
                        { stage: "SALAVATHY", time: "8.50" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 19,
                    routeName: "RETTANAI",
                    driver: "G.ARUN KUMAR",
                    driverMobile: "9360630831",
                    incharge: "MR.T.ANGAMUTHU",
                    inchargeMobile: "9597153170",
                    stops: [
                        { stage: "RETTANI", time: "7.45" },
                        { stage: "KODIMA", time: "8.15" },
                        { stage: "ALAGRAMAM 1", time: "8.25" },
                        { stage: "ALAGRAMAM 2", time: "8.28" },
                        { stage: "ALAGRAMAM 3", time: "8.31" },
                        { stage: "SOSHAKULAM", time: "8.34" },
                        { stage: "KOOTTARIPATTU", time: "8.40" },
                        { stage: "KANNIGAPURAM", time: "8.42" },
                        { stage: "KENIPATTU", time: "8.43" },
                        { stage: "THENPASIYAR", time: "8.44" },
                        { stage: "JAKKAMPETTAI", time: "8.45" },
                        { stage: "TINDIVANAM 1", time: "8.48" },
                        { stage: "KAVERIPAKKAM 2", time: "8.50" },
                        { stage: "MRS MAHAL 3", time: "8.51" },
                        { stage: "AMMA MAHAL 4", time: "8.52" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 20,
                    routeName: "THELLAR",
                    driver: "K. ARUL",
                    driverMobile: "9600114170",
                    incharge: "K,KANCHANA",
                    inchargeMobile: "9585010746",
                    stops: [
                        { stage: "THELLAR COLLAGE", time: "7.40" },
                        { stage: "THELLAR POLICE STATION", time: "8.00" },
                        { stage: "THELLAR KODIMARAM", time: "8.02" },
                        { stage: "SU KADDARI", time: "8.18" },
                        { stage: "VELLIMEDUPETTAI", time: "8.20" },
                        { stage: "DHATHAPURAM X ROAD", time: "8.23" },
                        { stage: "KODIYAM X ROAD", time: "8.24" },
                        { stage: "GOVINTHAPURAM", time: "8.25" },
                        { stage: "URAL", time: "8.27" },
                        { stage: "URAL BUS STOP", time: "8.29" },
                        { stage: "PADNAM", time: "8.30" },
                        { stage: "SANTHAIMEDU", time: "8.31" },
                        { stage: "TINDIVANAM BYEBASS", time: "8.33" },
                        { stage: "AYYANTHOPPU", time: "8.35" },
                        { stage: "AYYANTHOPPU BUS STOP", time: "8.38" },
                        { stage: "AYYANTHOPPU COLLAGE", time: "8.40" },
                        { stage: "PANCHALAM", time: "8.45" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 21,
                    routeName: "CHEYYUR (ECR)",
                    driver: "THANIGAVEL",
                    driverMobile: "9655825259",
                    incharge: "PRASANNA KUMAR",
                    inchargeMobile: "7094298005",
                    stops: [
                        { stage: "CHEYYUR", time: "7.15" },
                        { stage: "PUTHUR X ROAD", time: "7.20" },
                        { stage: "NALLUR X ROAD", time: "7.25" },
                        { stage: "ONAMBAKAM", time: "7.30" },
                        { stage: "KANIMANGALAM", time: "7.35" },
                        { stage: "POORIMBAKAM", time: "7.40" },
                        { stage: "MONGABAL", time: "7.45" },
                        { stage: "PERIYAKALAKADI 1", time: "7.50" },
                        { stage: "PERIYAKALAKADI 2", time: "7.55" },
                        { stage: "PUDNUR", time: "8.00" },
                        { stage: "PERUKARANAI", time: "8.05" },
                        { stage: "THANDALAM", time: "8.10" },
                        { stage: "VENKATESWARAN ANJANEYAR KOIL", time: "8.15" },
                        { stage: "VENKATESWARAM IYYANAR KOIL", time: "8.20" },
                        { stage: "ACHARAPAKKAM ARCH", time: "8.25" },
                        { stage: "ACHARAPAKKAM BUS STAND", time: "8.30" },
                        { stage: "ACHARAPAKKAM SCHOOL", time: "8.35" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 22,
                    routeName: "CHENGALPATTU",
                    driver: "AJITH",
                    driverMobile: "8870164623",
                    incharge: "DR.K. GURU",
                    inchargeMobile: "9994260833",
                    stops: [
                        { stage: "IYYAPAN KOIL", time: "7.45" },
                        { stage: "CHENGALPATTU BUS STAND", time: "7.50" },
                        { stage: "CHENGALPATTU HOSPITAL", time: "7.55" },
                        { stage: "PUGATHORAI", time: "8.05" },
                        { stage: "KALLAPRAMPURAM", time: "8.15" },
                        { stage: "MELVALANPETTAI", time: "8.20" },
                        { stage: "KAKILAPETTAI", time: "8.25" },
                        { stage: "MADURANTHAGAM BUS STOP", time: "8.30" },
                        { stage: "DEPOT", time: "8.32" },
                        { stage: "ONAMALAI", time: "8.37" },
                        { stage: "SIRUNGALUR", time: "8.42" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 23,
                    routeName: "TINDIVANAM (GINGEE BUS STAND)",
                    driver: "CONTRACT VEHICLE",
                    driverMobile: "",
                    incharge: "R.SARANYA",
                    inchargeMobile: "8056476979",
                    stops: [
                        { stage: "GINGEE BUS STAND", time: "8.30" },
                        { stage: "GANDHI STATUE", time: "8.35" },
                        { stage: "KOOCHIKOLATHUR", time: "8.50" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 24,
                    routeName: "TINDIVANAM (WOMENS POLICE STATION)",
                    driver: "CONTRACT VEHICLE",
                    driverMobile: "",
                    incharge: "DR.A. SURIYANARAYANAN",
                    inchargeMobile: "9442225137",
                    stops: [
                        { stage: "WOMENS POLICE STATION", time: "8.35" },
                        { stage: "VEERAPPA BUNK", time: "8.40" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                },
                {
                    routeNumber: 25,
                    routeName: "VILLUPURAM",
                    driver: "AYYANAR",
                    driverMobile: "9047108520",
                    incharge: "MRS.BHOOSHINI",
                    inchargeMobile: "9994116328",
                    stops: [
                        { stage: "OLD BUS STAND", time: "7.30" },
                        { stage: "GANDHI STATUE", time: "7.33" },
                        { stage: "RAILWAY JUNCTION", time: "7.36" },
                        { stage: "MADHA KOIL", time: "7.40" },
                        { stage: "SAVITHA THEATER", time: "7.43" },
                        { stage: "REDDIYAR MILL", time: "7.46" },
                        { stage: "MAHARAJAPURAM", time: "7.50" },
                        { stage: "HOUSING BOURD", time: "7.53" },
                        { stage: "RAGAVAN PETTAI", time: "7.56" },
                        { stage: "MARIYAMMAN KOIL", time: "7.59" },
                        { stage: "VIKKARAVANDI BUS STAND", time: "8.02" },
                        { stage: "PERANI", time: "8.05" },
                        { stage: "VIKKARAVANDI TALUK OFFICE", time: "8.12" },
                        { stage: "CHENDUR", time: "8.20" },
                        { stage: "SARAM 1", time: "8.40" },
                        { stage: "SARAM 2", time: "8.42" },
                        { stage: "UNIVERSITY", time: "9.00" }
                    ]
                }
            ]
        };
    }

    // Generate intelligent AI response
    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase().trim();
        const uniInfo = this.getUniversityInfo();
        
        // BUS ROUTE QUESTIONS - High priority check
        if (message.match(/(bus|route|pickup|pick up|bus stop|transport|driver|incharge|timing|schedule|thiruvennainallur|villiyanur|koovathur|codallore|panruti|kadapakkam|vandavasi|melmaiyanoor|setharapattu|ananthamangalam|kottakuppam|uthiramerur|uppuvellore|madagadipattu|thirukoilur|kiliyanoor|nadukuppam|kilpennathur|rettanai|thellar|cheyyur|chengalpattu|tindivanam|villupuram)/)) {
            return this.getBusResponse(message, uniInfo);
        }
        
        // TAKSHASHILA UNIVERSITY QUESTIONS - Priority check
        if (message.match(/(takshashila|university|college|admission|course|program|faculty|school|department|location|address|contact|website|vision|mission|facilities|hostel|library|lab|research|accreditation|ugc|established|founder|promoting|group|manakula|vinayagar|club|clubs|arts club|media club|innopreneur|iq club|nature club|innovation club|coding club|manasso|robotics club|photography club|health club)/)) {
            return this.getUniversityResponse(message, uniInfo);
        }
        
        // Greetings
        if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste)/)) {
            const greetings = [
                `Hello! I'm ${this.aiName}, your AI assistant. How can I help you today?`,
                `Hi there! I'm ${this.aiName}. What would you like to know?`,
                `Hey! Great to meet you! I'm ${this.aiName}, ready to assist you.`,
                `Good day! I'm ${this.aiName}. How may I help you?`
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Name questions
        if (message.match(/(what.*your name|who are you|your name|name|introduce yourself)/)) {
            return `I'm ${this.aiName}, your friendly AI assistant! I'm here to help you with anything you need. I can answer questions about Takshashila University, have general conversations, help with math, and much more. What would you like to know?`;
        }
        
        // How are you
        if (message.match(/(how are you|how.*doing|how.*feeling|how.*going)/)) {
            const responses = [
                `I'm doing great, thank you for asking! I'm always here and ready to chat. How about you?`,
                `I'm excellent! Always ready to help. How are you doing today?`,
                `I'm fantastic! Thanks for asking. How can I assist you?`,
                `I'm doing wonderful! I enjoy helping people. What's on your mind?`
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Help requests
        if (message.match(/(help|what can you do|what.*help|assist|capabilities|features)/)) {
            return `I can help you with many things! I can:\n• Answer questions about Takshashila University\n• Have general conversations\n• Help with basic math calculations\n• Provide information on various topics\n• Discuss technology, education, sports, music, and more\n• Answer questions about time, dates, and general knowledge\n\nWhat would you like to know?`;
        }
        
        // Questions about capabilities
        if (message.match(/(what.*you|can you|do you|your capabilities|what.*know)/)) {
            return `I'm ${this.aiName}, and I'm quite knowledgeable! I can:\n• Provide detailed information about Takshashila University\n• Have engaging conversations on various topics\n• Answer questions and provide information\n• Help with calculations\n• Discuss current topics and general knowledge\n\nFeel free to ask me anything!`;
        }
        
        // Time/Date questions
        if (message.match(/(what.*time|current time|what.*date|today.*date|day|time now)/)) {
            const now = new Date();
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = dayNames[now.getDay()];
            return `Today is ${dayName}, ${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.\nThe current time is ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}.`;
        }
        
        // Weather (general response)
        if (message.match(/(weather|temperature|rain|sunny|cloudy|hot|cold|climate)/)) {
            return `I don't have access to real-time weather data, but I'd be happy to chat about weather in general! The campus of Takshashila University is located in Tamil Nadu, which typically has a tropical climate. What would you like to know?`;
        }
        
        // Math questions
        if (message.match(/(calculate|what is|what's|math|solve|compute|\+|\-|\*|\/|\d+\s*[\+\-\*\/]\s*\d+|square|root|power|percentage)/)) {
            try {
                // Simple math evaluation (safe)
                const mathMatch = message.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
                if (mathMatch) {
                    const num1 = parseInt(mathMatch[1]);
                    const op = mathMatch[2];
                    const num2 = parseInt(mathMatch[3]);
                    let result;
                    switch(op) {
                        case '+': result = num1 + num2; break;
                        case '-': result = num1 - num2; break;
                        case '*': result = num1 * num2; break;
                        case '/': result = num2 !== 0 ? (num1 / num2).toFixed(2) : 'undefined (division by zero)'; break;
                        default: result = 'I can help with basic math!';
                    }
                    return `The answer is ${result}! ${op === '+' ? 'Great addition!' : op === '-' ? 'Subtraction done!' : op === '*' ? 'Multiplication complete!' : 'Division calculated!'}`;
                }
                
                // Percentage calculation
                const percentMatch = message.match(/(\d+)\s*(percent|%)\s*(of|from)\s*(\d+)/);
                if (percentMatch) {
                    const percent = parseInt(percentMatch[1]);
                    const total = parseInt(percentMatch[4]);
                    const result = (percent / 100) * total;
                    return `${percent}% of ${total} is ${result}!`;
                }
            } catch(e) {
                // Fall through to default response
            }
            return `I can help with basic math operations like addition (+), subtraction (-), multiplication (*), and division (/). Try asking something like "5 + 3" or "10 * 4"!`;
        }
        
        // Thank you responses
        if (message.match(/(thank|thanks|appreciate|grateful|thank you)/)) {
            const responses = [
                `You're very welcome! I'm glad I could help. Is there anything else you'd like to know?`,
                `My pleasure! Happy to assist. Feel free to ask me anything else!`,
                `You're welcome! I'm here whenever you need help. What else can I do for you?`,
                `Anytime! I enjoy helping. Is there something else you'd like to know?`
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Goodbye
        if (message.match(/(bye|goodbye|see you|farewell|exit|quit|later|take care)/)) {
            const responses = [
                `Goodbye! It was nice chatting with you. Feel free to come back anytime!`,
                `See you later! Have a great day ahead!`,
                `Take care! I'll be here whenever you need me.`,
                `Goodbye! It was a pleasure talking with you. Come back soon!`
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Compliments
        if (message.match(/(good|great|nice|awesome|wonderful|amazing|excellent|fantastic|brilliant|smart|intelligent|clever)/)) {
            return `Thank you so much! I really appreciate that. I'm here to help you with anything you need. What would you like to know?`;
        }
        
        // Questions (what, why, how, when, where, who)
        if (message.match(/^(what|why|how|when|where|who|which|can|will|should|is|are|do|does|did|tell me about|explain|describe)/)) {
            return this.getContextualResponse(message);
        }
        
        // Default conversational response
        return this.getContextualResponse(message);
    }

    // Get University-specific responses
    getUniversityResponse(message, uniInfo) {
        const msg = message.toLowerCase();
        
        // University name
        if (msg.match(/(what.*takshashila|tell.*about.*university|university.*name|what.*university)/)) {
            return `${uniInfo.name} is a modern multidisciplinary private university located near Tindivanam, in Villupuram District, Tamil Nadu, India. It was established in ${uniInfo.established} under the Tamil Nadu Private Universities Act. The university is named after the ancient Takshashila (Taxila) — symbolizing excellence in higher learning.`;
        }
        
        // Location/Address
        if (msg.match(/(where|location|address|place|located|find|reach|how to reach|directions)/)) {
            return `📍 ${uniInfo.name} is located at:\n\n${uniInfo.address}\n\nThe campus is conveniently located along the Chennai–Trichy Highway (NH-45), making it easily accessible from Chennai, Puducherry, and Villupuram.\n\nWebsite: ${uniInfo.website}`;
        }
        
        // Established/Year
        if (msg.match(/(when.*established|established|founded|started|year|when.*founded|since when)/)) {
            return `${uniInfo.name} was established in ${uniInfo.established} under the Tamil Nadu Private Universities Act (Tamil Nadu Act No. 19 of 2023).`;
        }
        
        // Vision
        if (msg.match(/(vision|goal|aim|aspiration)/)) {
            return `🔹 Vision of ${uniInfo.name}:\n\n"${uniInfo.vision}"`;
        }
        
        // Mission
        if (msg.match(/(mission|purpose|objective)/)) {
            return `🔹 Mission of ${uniInfo.name}:\n\n${uniInfo.mission.map((m, i) => `${i + 1}. ${m}`).join('\n')}`;
        }
        
        // Courses/Programs/Schools
        if (msg.match(/(course|program|degree|school|department|faculty|btech|bca|mca|bba|mba|bcom|mcom|what.*courses|what.*programs|available.*courses|offer)/)) {
            return `🔹 ${uniInfo.name} offers Undergraduate, Postgraduate, and Doctoral (Ph.D.) programs across various disciplines:\n\n${uniInfo.schools.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nThe university focuses heavily on industry collaboration, AI-based learning, and research incubation centers.`;
        }
        
        // Facilities
        if (msg.match(/(facilities|facility|infrastructure|amenities|hostel|library|lab|laboratory|sports|wifi|accommodation|transport)/)) {
            return `🔹 Facilities at ${uniInfo.name}:\n\nThe campus features:\n${uniInfo.facilities.map((f, i) => `• ${f}`).join('\n')}\n\nThe campus is built with a blend of modern architecture and green environment.`;
        }
        
        // Research
        if (msg.match(/(research|innovation|incubation|startup|hackathon|industry.*partnership|academia)/)) {
            return `🔹 Research and Innovation at ${uniInfo.name}:\n\nThe university promotes:\n${uniInfo.research.map((r, i) => `• ${r}`).join('\n')}`;
        }
        
        // Accreditation/Recognition
        if (msg.match(/(accreditation|recognized|recognition|ugc|aicte|approved|affiliated|accredited)/)) {
            return `🔹 Accreditation and Recognition:\n\n${uniInfo.accreditation}`;
        }
        
        // Website/Contact
        if (msg.match(/(website|url|contact|email|phone|online|visit|link)/)) {
            return `🌐 Official Website: ${uniInfo.website}\n\nFor more information, admissions, or inquiries, please visit the official website or contact the university directly.`;
        }
        
        // Founders/Promoting Body
        if (msg.match(/(founder|promoting|group|manakula|vinayagar|who.*founded|who.*owns|management)/)) {
            return `🔹 ${uniInfo.name} is promoted by ${uniInfo.promotingBody}, which also manages:\n• Sri Manakula Vinayagar Engineering College\n• Mailam Engineering College\n• Rajiv Gandhi College of Engineering & Technology\n• Sri Manakula Vinayagar Medical College & Hospital\n\nThe group has decades of experience in education, healthcare, and research in South India.`;
        }
        
        // Symbolism/Name meaning
        if (msg.match(/(name.*meaning|why.*takshashila|symbolism|taxila|ancient|gandhara|history.*name)/)) {
            return `🔹 ${uniInfo.symbolism}`;
        }
        
        // Clubs information
        if (msg.match(/(club|clubs|arts|media|innopreneur|iq|nature|innovation|coding|manasso|robotics|photography|health|room.*club|club.*room|club.*time|when.*club|where.*club)/)) {
            return this.getClubResponse(msg, uniInfo);
        }
        
        // General university info
        return `🔹 About ${uniInfo.name}:\n\n${uniInfo.name} is a modern multidisciplinary private university established in ${uniInfo.established}. Located at ${uniInfo.address}, it offers various programs across multiple disciplines.\n\nMotto: "${uniInfo.motto}"\n\nWebsite: ${uniInfo.website}\n\nWhat specific information would you like to know about the university?`;
    }

    // Get Club-specific responses
    getClubResponse(message, uniInfo) {
        const msg = message.toLowerCase();
        const clubs = uniInfo.clubs;
        
        // Check for specific club mentions
        const clubKeywords = {
            'arts': 'Arts Club',
            'media': 'Media Club',
            'innopreneur': 'Innopreneur Club',
            'iq': 'IQ Club',
            'nature': 'Nature Club',
            'innovation': 'Innovation Club',
            'coding': 'Coding Club',
            'manasso': 'Manasso Club',
            'robotics': 'Robotics Club',
            'photography': 'Photography Club',
            'health': 'Health Club'
        };
        
        // Check if asking about a specific club
        for (const [keyword, clubName] of Object.entries(clubKeywords)) {
            if (msg.includes(keyword) && msg.match(/(club|room|where|location|when|time)/)) {
                const club = clubs.list.find(c => c.name === clubName);
                if (club) {
                    const roomInfo = club.rooms.length > 1 
                        ? `Rooms ${club.rooms.join(' and ')}` 
                        : `Room ${club.rooms[0]}`;
                    return `🔹 ${clubName}:\n\n📍 Location: ${roomInfo}\n⏰ Meeting Time: ${clubs.commonTime}\n\nAll clubs at Takshashila University meet on ${clubs.commonTime}.`;
                }
            }
        }
        
        // Check for room number queries
        const roomMatch = msg.match(/room\s*(no|number)?\s*(\d+)/);
        if (roomMatch) {
            const roomNum = roomMatch[2];
            const club = clubs.list.find(c => c.rooms.includes(roomNum));
            if (club) {
                return `🔹 Room ${roomNum} is used by the ${club.name}.\n\n⏰ Meeting Time: ${clubs.commonTime}`;
            }
        }
        
        // Check for lab queries (Phase 1 lab, Phase 2 lab)
        if (msg.match(/(phase\s*[12]\s*lab|lab\s*phase\s*[12])/)) {
            return `🔹 Coding Club uses Phase 1 lab and Phase 2 lab.\n\n⏰ Meeting Time: ${clubs.commonTime}`;
        }
        
        // Check for time/schedule queries
        if (msg.match(/(when|time|schedule|timing|meet|meeting).*club/)) {
            return `🔹 Club Meeting Schedule:\n\n⏰ All clubs meet on: ${clubs.commonTime}\n\nThis is the common time slot for all clubs at Takshashila University.`;
        }
        
        // List all clubs
        if (msg.match(/(list|all|what|which|available|show).*club/)) {
            let response = `🔹 Clubs at ${uniInfo.name}:\n\n⏰ Common Meeting Time: ${clubs.commonTime}\n\n`;
            clubs.list.forEach((club, index) => {
                const roomInfo = club.rooms.length > 1 
                    ? `Rooms ${club.rooms.join(' and ')}` 
                    : `Room ${club.rooms[0]}`;
                response += `${index + 1}. ${club.name} - ${roomInfo}\n`;
            });
            return response;
        }
        
        // General club information
        return `🔹 Clubs at ${uniInfo.name}:\n\n⏰ All clubs meet on: ${clubs.commonTime}\n\nAvailable clubs:\n${clubs.list.map((c, i) => `${i + 1}. ${c.name}`).join('\n')}\n\nWould you like to know more about a specific club or their room numbers?`;
    }

    // Get Bus Route-specific responses
    getBusResponse(message, uniInfo) {
        const msg = message.toLowerCase();
        const routes = uniInfo.busRoutes;
        
        // Create a map of all stops with their routes for quick lookup
        const stopToRoutes = {};
        routes.forEach(route => {
            route.stops.forEach(stop => {
                const stopName = stop.stage.toLowerCase();
                if (!stopToRoutes[stopName]) {
                    stopToRoutes[stopName] = [];
                }
                stopToRoutes[stopName].push({
                    route: route,
                    stop: stop
                });
            });
        });
        
        // Check for specific route name queries
        const routeKeywords = {
            'thiruvennainallur': 1,
            'villiyanur': 2,
            'koovathur': 3,
            'codallore': 4,
            'panruti': 5,
            'kadapakkam': 6,
            'vandavasi': 7,
            'melmaiyanoor': 8,
            'melmalaiyanoor': 8,
            'setharapattu': 9,
            'ananthamangalam': 10,
            'kottakuppam': 11,
            'uthiramerur': 12,
            'uppuvellore': 13,
            'madagadipattu': 14,
            'thirukoilur': 15,
            'thirukovilore': 15,
            'kiliyanoor': 16,
            'nadukuppam': 17,
            'kilpennathur': 18,
            'rettanai': 19,
            'rettani': 19,
            'thellar': 20,
            'cheyyur': 21,
            'chengalpattu': 22,
            'tindivanam': 23,
            'villupuram': 25
        };
        
        // Check for route number query
        const routeNumMatch = msg.match(/route\s*(\d+)/);
        if (routeNumMatch) {
            const routeNum = parseInt(routeNumMatch[1]);
            const route = routes.find(r => r.routeNumber === routeNum);
            if (route) {
                return this.formatRouteDetails(route);
            }
        }
        
        // Check for specific route name
        for (const [keyword, routeNum] of Object.entries(routeKeywords)) {
            if (msg.includes(keyword)) {
                const route = routes.find(r => r.routeNumber === routeNum);
                if (route) {
                    return this.formatRouteDetails(route);
                }
            }
        }
        
        // Check for bus stop/location queries
        for (const [stopName, routeStops] of Object.entries(stopToRoutes)) {
            // Check if message contains this stop name (with some flexibility)
            const stopWords = stopName.split(/\s+/);
            let matchCount = 0;
            for (const word of stopWords) {
                if (word.length > 3 && msg.includes(word)) {
                    matchCount++;
                }
            }
            
            // If at least one significant word matches, consider it a match
            if (matchCount > 0 || msg.includes(stopName.substring(0, Math.min(8, stopName.length)))) {
                if (routeStops.length === 1) {
                    const { route, stop } = routeStops[0];
                    return this.formatStopDetails(route, stop, routeStops);
                } else {
                    // Multiple routes serve this stop
                    let response = `🚌 Bus Stop: ${routeStops[0].stop.stage}\n\n`;
                    response += `This stop is served by ${routeStops.length} route(s):\n\n`;
                    routeStops.forEach(({ route, stop }, index) => {
                        response += `${index + 1}. Route ${route.routeNumber} - ${route.routeName}\n`;
                        response += `   ⏰ Pickup Time: ${stop.time}\n`;
                        if (route.driver) {
                            response += `   👤 Driver: ${route.driver} (${route.driverMobile})\n`;
                        }
                        response += `\n`;
                    });
                    return response;
                }
            }
        }
        
        // Check for driver/incharge queries
        if (msg.match(/(driver|incharge|contact|mobile|phone)/)) {
            const driverMatch = routes.find(route => 
                route.driver && msg.includes(route.driver.toLowerCase())
            );
            if (driverMatch) {
                return this.formatRouteDetails(driverMatch);
            }
            
            const inchargeMatch = routes.find(route => 
                route.incharge && msg.includes(route.incharge.toLowerCase().replace(/mr\.|mrs\.|ms\.|dr\./g, '').trim())
            );
            if (inchargeMatch) {
                return this.formatRouteDetails(inchargeMatch);
            }
        }
        
        // List all routes
        if (msg.match(/(list|all|what|which|available|show).*(bus|route|transport)/)) {
            let response = `🚌 Bus Routes at ${uniInfo.name}:\n\n`;
            response += `There are ${routes.length} bus routes available:\n\n`;
            routes.forEach((route, index) => {
                response += `${route.routeNumber}. ${route.routeName}\n`;
                if (route.stops.length > 0) {
                    response += `   First Stop: ${route.stops[0].stage} at ${route.stops[0].time}\n`;
                    response += `   University: ${route.stops[route.stops.length - 1].time}\n`;
                }
                response += `\n`;
            });
            response += `\nYou can ask about a specific route, bus stop, or location for detailed information!`;
            return response;
        }
        
        // General bus information
        return `🚌 Bus Transportation at ${uniInfo.name}:\n\nWe have ${routes.length} bus routes serving various locations. You can ask me about:\n• Specific routes (e.g., "Route 1" or "Thiruvennainallur route")\n• Bus stops or pickup locations\n• Route timings and schedules\n• Driver and incharge contact information\n\nWhich route or location would you like to know about?`;
    }
    
    // Format route details
    formatRouteDetails(route) {
        let response = `🚌 Route ${route.routeNumber} - ${route.routeName}\n\n`;
        
        if (route.driver) {
            response += `👤 Driver: ${route.driver}`;
            if (route.driverMobile) {
                response += ` (${route.driverMobile})`;
            }
            response += `\n`;
        }
        
        if (route.incharge) {
            response += `👨‍💼 Incharge: ${route.incharge}`;
            if (route.inchargeMobile) {
                response += ` (${route.inchargeMobile})`;
            }
            response += `\n`;
        }
        
        response += `\n📍 Route Stops and Timings:\n\n`;
        route.stops.forEach((stop, index) => {
            response += `${index + 1}. ${stop.stage} - ${stop.time}\n`;
        });
        
        return response;
    }
    
    // Format stop details
    formatStopDetails(route, stop, routeStops) {
        let response = `🚌 Bus Stop: ${stop.stage}\n\n`;
        response += `📍 Route: ${route.routeNumber} - ${route.routeName}\n`;
        response += `⏰ Pickup Time: ${stop.time}\n\n`;
        
        // Show nearby stops
        const stopIndex = route.stops.findIndex(s => s.stage === stop.stage);
        if (stopIndex !== -1) {
            response += `Nearby Stops:\n`;
            if (stopIndex > 0) {
                response += `• Previous: ${route.stops[stopIndex - 1].stage} (${route.stops[stopIndex - 1].time})\n`;
            }
            if (stopIndex < route.stops.length - 1) {
                response += `• Next: ${route.stops[stopIndex + 1].stage} (${route.stops[stopIndex + 1].time})\n`;
            }
        }
        
        if (route.driver && route.driverMobile) {
            response += `\n👤 Driver: ${route.driver} (${route.driverMobile})\n`;
        }
        if (route.incharge && route.inchargeMobile) {
            response += `👨‍💼 Incharge: ${route.incharge} (${route.inchargeMobile})\n`;
        }
        
        return response;
    }

    // Get contextual response based on message content
    getContextualResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        // Education/Study topics
        if (lowerMsg.match(/(education|study|learn|student|teacher|college|university|degree|exam|test|assignment|homework|academic)/)) {
            return `Education is incredibly important! I can help you with information about Takshashila University, or we can discuss education in general. What would you like to know?`;
        }
        
        // Technology topics
        if (lowerMsg.match(/(computer|programming|code|software|app|website|internet|ai|technology|coding|developer|software engineering|data science|cybersecurity|iot|machine learning)/)) {
            return `Technology is fascinating! I'm an AI myself, so I find these topics very interesting. Takshashila University offers programs in Computer Science, AI & Data Science, and has AI and IoT laboratories. What specifically would you like to know about technology?`;
        }
        
        // Career/Job topics
        if (lowerMsg.match(/(career|job|employment|work|profession|salary|interview|resume|cv|future|career path)/)) {
            return `Career planning is important! Takshashila University focuses on industry-oriented programs and skill development to prepare students for their careers. What career path interests you?`;
        }
        
        // Food topics
        if (lowerMsg.match(/(food|eat|restaurant|recipe|cooking|meal|hungry|pizza|burger|cuisine|dish|taste|delicious)/)) {
            return `Food is wonderful! I don't eat, but I find culinary topics interesting. What's your favorite food? Have you tried any local Tamil cuisine?`;
        }
        
        // Sports topics
        if (lowerMsg.match(/(sport|football|soccer|basketball|game|play|team|match|cricket|tennis|badminton|volleyball|athletics)/)) {
            return `Sports are exciting! Takshashila University has indoor/outdoor sports complexes for students. What sport interests you? Do you play any sports?`;
        }
        
        // Music topics
        if (lowerMsg.match(/(music|song|sing|artist|band|listen|melody|rhythm|genre|instrument|concert|album)/)) {
            return `Music is beautiful! I appreciate discussions about music and different genres. What kind of music do you like? Do you play any instruments?`;
        }
        
        // Travel topics
        if (lowerMsg.match(/(travel|trip|vacation|tour|visit|place|destination|journey|adventure|explore)/)) {
            return `Travel is exciting! Have you visited Tamil Nadu? Takshashila University is located near Tindivanam, which is easily accessible from Chennai and Puducherry. Where would you like to travel?`;
        }
        
        // Health/Fitness topics
        if (lowerMsg.match(/(health|fitness|exercise|gym|workout|yoga|meditation|wellness|healthy|diet|nutrition)/)) {
            return `Health and fitness are important! Takshashila University has schools for Physiotherapy, Paramedical Sciences, and Allied Health Sciences. How do you stay healthy?`;
        }
        
        // Science topics
        if (lowerMsg.match(/(science|physics|chemistry|biology|research|experiment|discovery|scientist|laboratory|lab)/)) {
            return `Science is fascinating! Takshashila University promotes research and innovation with incubation centers and industry partnerships. What area of science interests you?`;
        }
        
        // Business/Management topics
        if (lowerMsg.match(/(business|management|entrepreneurship|startup|company|corporate|marketing|finance|economics|commerce)/)) {
            return `Business and management are crucial! Takshashila University offers BBA, MBA, B.Com, and M.Com programs, and encourages innovation and entrepreneurship. Are you interested in business?`;
        }
        
        // Books/Reading topics
        if (lowerMsg.match(/(book|read|reading|novel|author|literature|library|story|fiction|non-fiction)/)) {
            return `Reading is wonderful! Takshashila University has a central library and digital learning center. What kind of books do you enjoy reading?`;
        }
        
        // Movies/Entertainment topics
        if (lowerMsg.match(/(movie|film|cinema|entertainment|watch|actor|actress|director|hollywood|bollywood|series|netflix)/)) {
            return `Movies are great entertainment! What's your favorite movie or genre? Do you prefer action, drama, comedy, or something else?`;
        }
        
        // Hobbies topics
        if (lowerMsg.match(/(hobby|hobbies|interest|passion|enjoy|like to do|free time|leisure)/)) {
            return `Hobbies make life more enjoyable! What are your hobbies? I'd love to hear about what you enjoy doing in your free time.`;
        }
        
        // Future/Goals topics
        if (lowerMsg.match(/(future|goal|dream|aspiration|plan|ambition|want to be|become|achieve)/)) {
            return `Having goals and dreams is important! Takshashila University helps students achieve their aspirations through quality education and skill development. What are your goals?`;
        }
        
        // General positive response
        if (lowerMsg.match(/(good|great|nice|awesome|wonderful|amazing|excellent|fantastic|brilliant|perfect)/)) {
            return `I'm glad you think so! I enjoy our conversation. What else would you like to talk about?`;
        }
        
        // Questions about India/Tamil Nadu
        if (lowerMsg.match(/(india|indian|tamil nadu|tamil|chennai|south india|culture|tradition|festival)/)) {
            return `India is a diverse and beautiful country! Tamil Nadu, where Takshashila University is located, is known for its rich culture, traditions, and educational institutions. What would you like to know?`;
        }
        
        // Default friendly response with suggestions
        const defaultResponses = [
            `That's interesting! Tell me more about that. I can also help you with information about Takshashila University if you're interested.`,
            `I see! That's a good point. What else is on your mind? Feel free to ask me anything!`,
            `I understand. How can I help you further? I can answer questions about education, technology, or Takshashila University.`,
            `That's a great topic! I'd love to hear more. What would you like to discuss?`,
            `Interesting perspective! What would you like to discuss next? I'm here to help with any questions.`,
            `I appreciate you sharing that with me. Is there anything specific you'd like to know? I can help with various topics!`,
            `That's fascinating! Would you like to know more about Takshashila University, or shall we continue this conversation?`,
            `Great to hear! I'm here to help with information about Takshashila University or any other questions you might have.`
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Show welcome message from Gopal
    showWelcomeMessage() {
        // Check if this is first time (no messages) and no user name is set
        if (this.messages.length === 0 && !this.userName) {
            const welcomeMessage = {
                id: 'welcome-' + Date.now().toString(),
                text: `Hello! I'm ${this.aiName}, your AI assistant. I'm here to help you with anything you need! 🎓\n\nBefore we start, could you please tell me your name?`,
                sender: 'ai',
                timestamp: new Date().toISOString()
            };
            this.messages.push(welcomeMessage);
            this.saveMessages();
            this.displayMessages();
        } else if (this.messages.length === 0 && this.userName) {
            const welcomeMessage = {
                id: 'welcome-' + Date.now().toString(),
                text: `Hello ${this.userName}! I'm ${this.aiName}, your AI assistant. I'm here to help you with anything you need! 🎓\n\nI can help you with:\n• Information about Takshashila University\n• Bus route details and timings\n• Club information\n• General questions and conversations\n• Math calculations\n• Various topics like technology, education, sports, and more\n\nFeel free to ask me anything! What would you like to know?`,
                sender: 'ai',
                timestamp: new Date().toISOString()
            };
            this.messages.push(welcomeMessage);
            this.saveMessages();
            this.displayMessages();
        }
    }

    // READ - Display all messages
    displayMessages() {
        if (this.messages.length === 0) {
            this.chatMessages.innerHTML = `
                <div class="empty-state">
                    <p>No messages yet. Start chatting!</p>
                </div>
            `;
            return;
        }

        this.chatMessages.innerHTML = this.messages.map(message => {
            const date = new Date(message.timestamp);
            const timeString = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            const dateString = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
            });

            const isAI = message.sender === 'ai';
            const senderName = isAI ? this.aiName : (this.userName || 'You');
            const messageClass = isAI ? 'message ai-message' : 'message user-message';

            return `
                <div class="${messageClass}" data-id="${message.id}">
                    <div class="message-avatar">
                        ${isAI ? '🤖' : '👤'}
                    </div>
                    <div class="message-content">
                        <div class="message-sender">${senderName}</div>
                        <div class="message-text">${this.escapeHtml(message.text)}</div>
                        <div class="message-time">${dateString} at ${timeString}</div>
                    </div>
                    ${!isAI ? `
                    <div class="message-actions">
                        <button class="btn edit-btn" onclick="chatApp.editMessage('${message.id}')">Edit</button>
                        <button class="btn delete-btn" onclick="chatApp.deleteMessage('${message.id}')">Delete</button>
                    </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        this.scrollToBottom();
    }

    // UPDATE - Edit existing message
    editMessage(id) {
        const message = this.messages.find(msg => msg.id === id);
        if (!message || message.sender === 'ai') return; // Can't edit AI messages

        this.editingMessageId = id;
        this.editInput.value = message.text;
        this.editModal.classList.add('show');
        this.editInput.focus();
        this.editInput.select();
    }

    updateMessage() {
        if (!this.editingMessageId) return;

        const text = this.editInput.value.trim();
        if (text === '') {
            alert('Message cannot be empty!');
            return;
        }

        const messageIndex = this.messages.findIndex(msg => msg.id === this.editingMessageId);
        if (messageIndex !== -1) {
            this.messages[messageIndex].text = text;
            this.messages[messageIndex].timestamp = new Date().toISOString();
            this.saveMessages();
            this.displayMessages();
        }

        this.closeEditModal();
    }

    closeEditModal() {
        this.editModal.classList.remove('show');
        this.editingMessageId = null;
        this.editInput.value = '';
    }

    // DELETE - Remove message
    deleteMessage(id) {
        if (confirm('Are you sure you want to delete this message?')) {
            this.messages = this.messages.filter(msg => msg.id !== id);
            this.saveMessages();
            this.displayMessages();
        }
    }

    // Save messages to localStorage
    saveMessages() {
        localStorage.setItem('letsChatMessages', JSON.stringify(this.messages));
    }

    // Load messages from localStorage
    loadMessages() {
        const saved = localStorage.getItem('letsChatMessages');
        return saved ? JSON.parse(saved) : [];
    }

    // Scroll to bottom of chat
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Theme Management
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme(this.currentTheme);
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        const themeIcon = this.themeToggle.querySelector('.theme-icon');
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }

    saveTheme(theme) {
        localStorage.setItem('letsChatTheme', theme);
    }

    loadTheme() {
        const saved = localStorage.getItem('letsChatTheme');
        return saved || 'light';
    }

    // User Name Management
    saveUserName() {
        if (this.userName) {
            localStorage.setItem('letsChatUserName', this.userName);
        }
    }

    loadUserName() {
        const saved = localStorage.getItem('letsChatUserName');
        return saved || null;
    }
}

// Initialize the chat app when page loads
let chatApp;
document.addEventListener('DOMContentLoaded', () => {
    chatApp = new ChatApp();
});

