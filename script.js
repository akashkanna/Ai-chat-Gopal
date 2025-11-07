// Chat App with CRUD Operations and AI Assistant
class ChatApp {
    constructor() {
        this.messages = this.loadMessages();
        this.editingMessageId = null;
        this.aiName = 'Gopal';
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
                "School of Law",
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
            symbolism: "The name 'Takshashila' pays homage to the ancient world's first learning hub — the original Takshashila in Gandhara. It represents the institution's commitment to revive India's ancient educational excellence using modern technology and research"
        };
    }

    // Generate intelligent AI response
    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase().trim();
        const uniInfo = this.getUniversityInfo();
        
        // TAKSHASHILA UNIVERSITY QUESTIONS - Priority check
        if (message.match(/(takshashila|university|college|admission|course|program|faculty|school|department|location|address|contact|website|vision|mission|facilities|hostel|library|lab|research|accreditation|ugc|established|founder|promoting|group|manakula|vinayagar)/)) {
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
        
        // General university info
        return `🔹 About ${uniInfo.name}:\n\n${uniInfo.name} is a modern multidisciplinary private university established in ${uniInfo.established}. Located at ${uniInfo.address}, it offers various programs across multiple disciplines.\n\nMotto: "${uniInfo.motto}"\n\nWebsite: ${uniInfo.website}\n\nWhat specific information would you like to know about the university?`;
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
        // Check if this is first time (no messages)
        if (this.messages.length === 0) {
            const welcomeMessage = {
                id: 'welcome-' + Date.now().toString(),
                text: `Hello! I'm ${this.aiName}, your AI assistant. I'm here to help you with anything you need! 🎓\n\nI can help you with:\n• Information about Takshashila University\n• General questions and conversations\n• Math calculations\n• Various topics like technology, education, sports, and more\n\nFeel free to ask me anything! What would you like to know?`,
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
            const senderName = isAI ? this.aiName : 'You';
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
}

// Initialize the chat app when page loads
let chatApp;
document.addEventListener('DOMContentLoaded', () => {
    chatApp = new ChatApp();
});

