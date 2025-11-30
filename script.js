/* --- JAVASCRIPT LOGIC --- */

// Translations Database
const translations = {
    en: {
        introTitle: "AI Library Assistant",
        introSubtitle: "Menofia University",
        supervisionLabel: "Under the Supervision of",
        supervisorName: "Prof. Dr. Rida Mohamed Tawfik",
        facultyName: "Faculty of Veterinary Medicine",
        uniName: "Menofia University",
        startBtn: "Enter Library Assistant",
        headerTitle: "AI Library Assistant",
        welcomeMessage: "Hello! I am your AI Library Assistant. <br><br>I can help you find book recommendations, summarize stories, or explain library classification systems. Please check the settings ⚙️ to configure your API key!",
        surpriseRead: "✨ Surprise Read",
        litQuiz: "✨ Lit Quiz",
        writePoem: "✨ Write Poem",
        quote: "✨ Quote",
        inputPlaceholder: "Ask for a book recommendation...",
        sendBtn: "Send",
        settingsTitle: "Settings",
        devOptions: "Developer Options",
        devDesc: "Enable advanced configuration",
        apiKeyLabel: "Gemini API Key",
        apiKeyDesc: "Your key is stored locally in your browser.",
        langBtn: "عربي"
    },
    ar: {
        introTitle: "المساعد المكتبي الذكي",
        introSubtitle: "جامعة المنوفية",
        supervisionLabel: "تحت إشراف",
        supervisorName: "أ.د/ رضا محمد توفيق",
        facultyName: "كلية الطب البيطري",
        uniName: "جامعة المنوفية",
        startBtn: "دخول المساعد الذكي",
        headerTitle: "المساعد المكتبي الذكي",
        welcomeMessage: "أهلاً بك! أنا مساعدك المكتبي الذكي.<br><br>يمكنني مساعدتك في العثور على توصيات للكتب، وتلخيص القصص، أو شرح أنظمة تصنيف المكتبات. يرجى التحقق من الإعدادات ⚙️ لتكوين مفتاح API الخاص بك!",
        surpriseRead: "✨ قراءة مفاجئة",
        litQuiz: "✨ مسابقة أدبية",
        writePoem: "✨ كتابة قصيدة",
        quote: "✨ اقتباس",
        inputPlaceholder: "اطلب توصية كتاب...",
        sendBtn: "إرسال",
        settingsTitle: "الإعدادات",
        devOptions: "خيارات المطور",
        devDesc: "تفعيل التكوين المتقدم",
        apiKeyLabel: "مفتاح Gemini API",
        apiKeyDesc: "مفتاحك مخزن محلياً في متصفحك.",
        langBtn: "English"
    }
};

const quickActionPrompts = {
    en: {
        surprise: "Recommend a random, highly-rated hidden gem book that isn't very famous. Include title, author, and a 1-sentence hook explaining why it's unique.",
        quiz: "Create a fun, 3-question multiple choice trivia quiz about famous literature. Do not reveal the answers in your first response, wait for me to guess.",
        poem: "Write a short, atmospheric poem about the magic of libraries, old books, and the smell of paper.",
        quote: "Share an inspiring or profound quote about reading, knowledge, or libraries from a famous author."
    },
    ar: {
        surprise: "رشح لي كتاباً عشوائياً مميزاً وغير مشهور (Hidden Gem). اذكر العنوان والمؤلف وجملة تشويقية تشرح سبب تميزه.",
        quiz: "أنشئ مسابقة أدبية ممتعة من 3 أسئلة اختيار من متعدد عن الأدب العالمي. لا تكشف الإجابات في الرد الأول، انتظر تخميني.",
        poem: "اكتب قصيدة قصيرة ذات طابع جوي عن سحر المكتبات، والكتب القديمة، ورائحة الورق.",
        quote: "شارك اقتباساً ملهماً أو عميقاً عن القراءة، أو المعرفة، أو المكتبات لمؤلف مشهور."
    }
};

// --- DOM Elements ---
const introScreen = document.getElementById('intro-screen');
const startBtn = document.getElementById('start-app-btn');
const appInterface = document.getElementById('app-interface');
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const loader = document.getElementById('loader');
const settingsBtn = document.getElementById('settings-btn');
const infoBtn = document.getElementById('info-btn');
const modal = document.getElementById('settings-modal');
const closeModal = document.querySelector('.close-modal');
const devModeToggle = document.getElementById('dev-mode-toggle');
const apiSection = document.getElementById('api-section');
const apiKeyInput = document.getElementById('api-key-input');

// Language Buttons
const introLangBtn = document.getElementById('intro-lang-btn');
const headerLangBtn = document.getElementById('header-lang-btn');

// Quick Actions
const quickActionBtns = {
    surprise: document.getElementById('btn-surprise'),
    quiz: document.getElementById('btn-quiz'),
    poem: document.getElementById('btn-poem'),
    quote: document.getElementById('btn-quote')
};

// State
let currentLang = 'en';

// --- Language Logic ---
function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // Toggle Body Class for RTL
    if (lang === 'ar') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }

    // Update Text Content
    document.getElementById('txt-intro-title').innerText = t.introTitle;
    document.getElementById('txt-intro-sub').innerText = t.introSubtitle;
    document.getElementById('txt-sup-label').innerText = t.supervisionLabel;
    document.getElementById('txt-sup-name').innerText = t.supervisorName;
    document.getElementById('txt-fac-name').innerText = t.facultyName;
    document.getElementById('txt-uni-name').innerText = t.uniName;
    document.getElementById('txt-start-btn').innerText = t.startBtn;
    document.getElementById('txt-header-title').innerText = t.headerTitle;
    document.getElementById('txt-welcome').innerHTML = t.welcomeMessage;
    
    // Buttons & Inputs
    userInput.placeholder = t.inputPlaceholder;
    sendBtn.innerText = t.sendBtn;
    quickActionBtns.surprise.innerText = t.surpriseRead;
    quickActionBtns.quiz.innerText = t.litQuiz;
    quickActionBtns.poem.innerText = t.writePoem;
    quickActionBtns.quote.innerText = t.quote;

    // Settings
    document.getElementById('txt-settings-title').innerText = t.settingsTitle;
    document.getElementById('txt-dev-opt').innerText = t.devOptions;
    document.getElementById('txt-dev-desc').innerText = t.devDesc;
    document.getElementById('txt-api-label').innerText = t.apiKeyLabel;
    document.getElementById('txt-api-desc').innerText = t.apiKeyDesc;

    // Update Lang Switch Buttons
    introLangBtn.innerText = t.langBtn;
    headerLangBtn.innerText = t.langBtn;
}

// Event Listeners for Language Switch
introLangBtn.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'ar' : 'en');
});
headerLangBtn.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'ar' : 'en');
});

// --- Intro Screen Logic ---
startBtn.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    setTimeout(() => {
        introScreen.style.display = 'none';
        appInterface.style.display = 'flex';
        setTimeout(() => {
            appInterface.classList.add('visible');
        }, 50); 
    }, 500);
});

infoBtn.addEventListener('click', () => {
    appInterface.classList.remove('visible');
    setTimeout(() => {
        appInterface.style.display = 'none';
        introScreen.style.display = 'flex';
        requestAnimationFrame(() => {
            introScreen.classList.remove('hidden');
        });
    }, 500);
});

// --- Quick Actions Logic ---
Object.keys(quickActionBtns).forEach(key => {
    quickActionBtns[key].addEventListener('click', () => {
        const prompt = quickActionPrompts[currentLang][key];
        const displayLabel = quickActionBtns[key].innerText;
        handleUserMessage(displayLabel, prompt);
    });
});

// --- Settings Logic ---
const savedKey = localStorage.getItem('gemini_api_key');
if (savedKey) apiKeyInput.value = savedKey;

const devModeEnabled = localStorage.getItem('dev_mode_enabled') === 'true';
devModeToggle.checked = devModeEnabled;
if (devModeEnabled) apiSection.style.display = 'flex';

settingsBtn.addEventListener('click', () => modal.classList.add('active'));
closeModal.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

devModeToggle.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    localStorage.setItem('dev_mode_enabled', isChecked);
    apiSection.style.display = isChecked ? 'flex' : 'none';
});

apiKeyInput.addEventListener('input', (e) => {
    localStorage.setItem('gemini_api_key', e.target.value.trim());
});

// --- Chat Logic ---
sendBtn.addEventListener('click', () => handleUserMessage());
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserMessage();
});

async function handleUserMessage(displayText = null, apiPrompt = null) {
    const textToShow = displayText || userInput.value.trim();
    const textToSend = apiPrompt || userInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    if (!textToShow) return;

    if (!apiKey) {
        const msg = currentLang === 'en' 
            ? "Please enter a valid Google Gemini API Key in the Settings ⚙️."
            : "يرجى إدخال مفتاح Google Gemini API صحيح في الإعدادات ⚙️.";
        addMessage('bot', msg);
        modal.classList.add('active');
        return;
    }

    addMessage('user', textToShow);
    userInput.value = '';
    showLoading(true);

    try {
        const response = await callGeminiAPI(textToSend, apiKey);
        addMessage('bot', response);
    } catch (error) {
        console.error('API Error:', error);
        const msg = currentLang === 'en'
            ? "Error connecting to library archives. Check your API key."
            : "حدث خطأ في الاتصال بأرشيف المكتبة. تحقق من مفتاح API.";
        addMessage('bot', msg);
    } finally {
        showLoading(false);
    }
}

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = `avatar ${sender}-avatar`;
    avatar.textContent = sender === 'bot' ? '🤓' : '👤';
    
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    
    bubble.innerHTML = formattedText;

    if (sender === 'user') {
        messageDiv.appendChild(bubble);
        messageDiv.appendChild(avatar);
    } else {
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubble);
    }

    chatContainer.insertBefore(messageDiv, loader);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showLoading(show) {
    loader.style.display = show ? 'flex' : 'none';
    if (show) chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function callGeminiAPI(userMessage, key) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${key}`;

    // Adjust system instruction based on language
    const langInstruction = currentLang === 'ar' 
        ? "You must reply in Arabic. Speak naturally and professionally." 
        : "You must reply in English.";

    const systemInstruction = `
        You are a helpful, polite, and knowledgeable Library Assistant. 
        Your goal is to assist users with finding books, understanding library rules, and general research.
        ${langInstruction}
        - If asked for recommendations, provide Title, Author, and a brief 1-sentence synopsis.
        - Keep your tone warm, inviting, and professional.
        - Keep answers concise (under 150 words).
    `;

    const payload = {
        contents: [{ parts: [{ text: userMessage }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || 'Unknown API Error');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response found.";
}