/* GitHub Pages Deployment Fix - Force rebuild to clear caches - December 2024 */
/**
 * AI Chat Functionality for Fernly Health - Self-Improving Pattern-Based AI Implementation
 * 
 * SELF-IMPROVEMENT CAPABILITIES:
 * 
 * 1. LEARNING FROM USER INTERACTIONS:
 *    - Collects user feedback after each response ("Was this helpful?")
 *    - Stores user-suggested better responses in localStorage
 *    - Learns new intent patterns when users categorize unrecognized messages
 *    - Tracks engagement metrics to optimize response selection
 * 
 * 2. ADAPTIVE PATTERN MATCHING:
 *    - Expands intent recognition with user-provided examples
 *    - Supports multi-intent detection in single messages
 *    - Handles misspellings, slang, and informal language variations
 *    - Continuously improves through user feedback
 * 
 * 3. PERSONALIZATION:
 *    - Remembers user preferences and communication styles
 *    - Prioritizes responses that have received positive feedback
 *    - Adapts to individual user's language patterns over time
 * 
 * 4. LOCAL STORAGE LEARNING (Browser-Specific):
 *    - All learning is stored locally in the user's browser
 *    - Data persists across sessions but is lost if browser cache is cleared
 *    - No external APIs or servers required - fully client-side
 * 
 * 5. FUTURE BACKEND INTEGRATION:
 *    - Code is structured for easy addition of backend sync (Firebase/Supabase)
 *    - Learning data can be easily migrated to cloud storage
 *    - Designed with API-ready data structures
 * 
 * LIMITATIONS:
 * - Learning is per-browser and resets when cache is cleared
 * - No cross-device synchronization (until backend is added)
 * - Privacy-focused: all data stays on user's device
 * 
 * EXTENDING WITH BACKEND:
 * To add backend sync, implement the syncLearningData() function and 
 * update saveLearningData()/loadLearningData() to use your chosen backend.
 */

// Smart AI Variables - no external model dependencies
let isAILoaded = false;
let isFallbackMode = false;
let conversationStarted = false;

// SELF-LEARNING AI DATA STRUCTURES
// All learning data is stored locally in the browser
let learningData = {
  // User-trained patterns for each intent
  learnedPatterns: {
    anxiety: [],
    depression: [],
    ptsd: [],
    adhd: [],
    bipolar: [],
    ocd: [],
    sleep: [],
    general: []
  },
  
  // User-suggested responses with feedback scores
  learnedResponses: {
    anxiety: [],
    depression: [],
    ptsd: [],
    adhd: [],
    bipolar: [],
    ocd: [],
    sleep: [],
    general: []
  },
  
  // Response effectiveness tracking
  responseMetrics: {
    // responseId: { helpfulCount: 0, notHelpfulCount: 0, engagementScore: 0 }
  },
  
  // User feedback and preferences
  userProfile: {
    preferredResponseStyle: 'supportive', // supportive, clinical, casual
    communicationPreferences: [],
    engagementHistory: [],
    lastFeedbackDate: null
  },
  
  // Unrecognized messages for learning opportunities
  unrecognizedMessages: [],
  
  // Version for future compatibility
  version: '1.0',
  lastUpdated: null
};

// Flag to track if we're waiting for user feedback
let awaitingFeedback = false;
let lastResponseId = null;


// Enhanced Conversation Context for intelligent responses
const conversationContext = {
  messages: [],
  questionCount: 0,
  mentalHealthTopics: [],
  crisisKeywords: [],
  detectedSymptoms: {},
  topicCounts: {},
  assessmentInProgress: false,
  assessmentStage: 0,
  assessmentResponses: {},
  assessmentPrompted: false,
  userPreferences: {
    communicationStyle: 'supportive', // supportive, clinical, casual
    previousTopics: [],
    needsUrgentCare: false
  },
  conversationFlow: {
    stage: 'greeting', // greeting, exploring, supporting, concluding
    lastResponseType: null,
    empathyLevel: 'high',
    lastAIQuestion: null, // Track the last question/intent the AI asked about
    lastAIIntent: null, // Track the intent of the last AI message
    shortResponseCount: 0, // Track consecutive short responses
    lastTopicDiscussed: null // Track the last substantial topic discussed
  }
};

// LEARNING DATA MANAGEMENT FUNCTIONS

/**
 * Save learning data to localStorage
 */
function saveLearningData() {
  try {
    learningData.lastUpdated = new Date().toISOString();
    localStorage.setItem('fernly_ai_learning', JSON.stringify(learningData));
    console.log('Learning data saved to localStorage');
    return true;
  } catch (error) {
    console.warn('Failed to save learning data:', error);
    return false;
  }
}

/**
 * Load learning data from localStorage
 */
function loadLearningData() {
  try {
    const stored = localStorage.getItem('fernly_ai_learning');
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // Merge with default structure to handle version updates
      learningData = {
        ...learningData,
        ...parsed,
        // Ensure all required properties exist
        learnedPatterns: { ...learningData.learnedPatterns, ...(parsed.learnedPatterns || {}) },
        learnedResponses: { ...learningData.learnedResponses, ...(parsed.learnedResponses || {}) },
        responseMetrics: { ...learningData.responseMetrics, ...(parsed.responseMetrics || {}) },
        userProfile: { ...learningData.userProfile, ...(parsed.userProfile || {}) }
      };
      
      console.log('Learning data loaded from localStorage');
      return true;
    }
  } catch (error) {
    console.warn('Failed to load learning data:', error);
  }
  return false;
}

/**
 * Reset learning data to defaults (when localStorage is cleared)
 */
function resetLearningData() {
  const defaultData = {
    learnedPatterns: {
      anxiety: [],
      depression: [],
      ptsd: [],
      adhd: [],
      bipolar: [],
      ocd: [],
      sleep: [],
      general: []
    },
    learnedResponses: {
      anxiety: [],
      depression: [],
      ptsd: [],
      adhd: [],
      bipolar: [],
      ocd: [],
      sleep: [],
      general: []
    },
    responseMetrics: {},
    userProfile: {
      preferredResponseStyle: 'supportive',
      communicationPreferences: [],
      engagementHistory: [],
      lastFeedbackDate: null
    },
    unrecognizedMessages: [],
    version: '1.0',
    lastUpdated: null
  };
  
  learningData = defaultData;
  saveLearningData();
  console.log('Learning data reset to defaults');
}

/**
 * Placeholder for future backend sync
 * To implement backend sync, replace this with actual API calls
 */
async function syncLearningData() {
  // Future implementation for backend sync
  // Example structure:
  // try {
  //   const response = await fetch('/api/sync-learning', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(learningData)
  //   });
  //   return response.ok;
  // } catch (error) {
  //   console.warn('Backend sync failed:', error);
  //   return false;
  // }
  return Promise.resolve(true);
}

// Advanced response templates with multiple variations
const responseTemplates = {
  greeting: [
    "Hello! I'm here to support you with your mental health journey. How are you feeling today?",
    "Hi there! I'm glad you reached out. What's on your mind today?",
    "Welcome! I'm here to listen and provide support. What would you like to talk about?",
    "Hello! I'm your mental health support assistant. How can I help you today?"
  ],
  
  anxiety: {
    initial: [
      "I understand you're feeling anxious. Anxiety can feel overwhelming, but you're not alone. Can you tell me more about what's triggering these feelings?",
      "I hear that you're dealing with anxiety. That takes courage to share. What situations or thoughts seem to make the anxiety worse?",
      "Anxiety can be really challenging. You're taking a positive step by talking about it. Are there specific times or situations when you feel most anxious?"
    ],
    followUp: [
      "Since anxiety is still bothering you, let's explore some coping strategies. Have you tried any breathing exercises or grounding techniques?",
      "I want to help you manage this anxiety. Some people find the 4-7-8 breathing technique helpful: breathe in for 4, hold for 7, exhale for 8. Would you like to try it?",
      "Let's work on some practical anxiety management. The 5-4-3-2-1 grounding technique can help: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste."
    ]
  },
  
  depression: {
    initial: [
      "I'm sorry you're going through this difficult time. Depression can make everything feel heavy and overwhelming. Thank you for sharing this with me.",
      "It takes strength to reach out when you're feeling depressed. These feelings are real and valid, and you don't have to face them alone.",
      "I understand that you're struggling with depression. It's like carrying an invisible weight, isn't it? I'm here to support you through this."
    ],
    followUp: [
      "Depression is a real medical condition, not a personal failing. Have you been able to maintain any daily routines or activities, even small ones?",
      "I'm concerned about how depression is affecting you. Have you considered speaking with a healthcare provider about treatment options?",
      "Let's focus on small, manageable steps. Sometimes just getting through each day is an accomplishment when you're dealing with depression."
    ]
  },
  
  // NEW MENTAL HEALTH TOPIC RESPONSES
  ocd: {
    initial: [
      "I understand you're dealing with OCD. Those intrusive thoughts and compulsions can be really overwhelming and exhausting.",
      "OCD can feel like your mind is stuck in a loop. It's a real condition that affects many people, and you're not alone in this struggle.",
      "Thank you for sharing about your OCD. Those repetitive thoughts and behaviors can be incredibly distressing, and it takes courage to talk about them."
    ],
    followUp: [
      "OCD responds well to treatment, especially exposure and response prevention therapy. Have you been able to work with a therapist who specializes in OCD?",
      "I know the compulsions might feel like they provide relief, but they often make OCD stronger. Have you learned any techniques to resist the urges?",
      "OCD can be very treatable. The key is learning to tolerate the anxiety without performing the compulsions. Are you working with anyone on this?"
    ]
  },
  
  sleep: {
    initial: [
      "Sleep problems can really impact every area of your life. I'm glad you're reaching out about this - good sleep is so important for mental health.",
      "I understand you're having trouble with sleep. Whether it's falling asleep, staying asleep, or sleeping too much, it can be really frustrating.",
      "Sleep issues and mental health are closely connected. When we don't sleep well, everything else becomes harder to manage."
    ],
    followUp: [
      "Sleep hygiene can make a big difference. Things like keeping a consistent bedtime, avoiding screens before bed, and creating a calming routine can help.",
      "Sometimes sleep problems are symptoms of other conditions like anxiety or depression. Have you noticed any patterns with your mood and sleep?",
      "If sleep problems persist, it might be worth talking to a healthcare provider. There are effective treatments available for various sleep disorders."
    ]
  },
  
  bipolar: {
    initial: [
      "I hear that you're dealing with bipolar disorder. Those mood swings between highs and lows can be really challenging to navigate.",
      "Bipolar disorder affects many people, and it's completely manageable with the right support and treatment. Thank you for sharing this with me.",
      "The extreme mood changes in bipolar disorder can feel overwhelming. It's important to know that you're not alone and that effective treatments are available."
    ],
    followUp: [
      "Mood tracking can be really helpful with bipolar disorder. Have you been able to identify any triggers or patterns in your mood cycles?",
      "Bipolar disorder typically requires ongoing treatment. Are you working with a psychiatrist or therapist who understands bipolar disorder?",
      "Managing bipolar disorder often involves medication, therapy, and lifestyle strategies. Having a good support system is also crucial."
    ]
  },
  
  crisis: [
    "🚨 I'm very concerned about what you're going through. If you're having thoughts of harming yourself, please reach out for immediate help: Call 988 (Suicide & Crisis Lifeline) - available 24/7, or text 'HELLO' to 741741. You're not alone.",
    "This sounds like you're in a lot of pain right now. Please know that help is available. The 988 Suicide & Crisis Lifeline is available 24/7, and they have trained counselors who understand what you're going through.",
    "I'm worried about you. If you're having thoughts of suicide or self-harm, please call 988 immediately. These feelings can change with the right support - you don't have to go through this alone."
  ],
  
  // Responses for simple acknowledgments - Enhanced with more empathy and human warmth
  acknowledgment: [
    "I appreciate you letting me know. What would you like to talk about next?",
    "Thanks for sharing that with me. How are you feeling right now?",
    "I understand. Is there anything specific you'd like to explore or discuss?",
    "Got it. What's most important to you right now?",
    "I hear you. What would be most helpful for us to focus on?",
    "Thank you for that. What else is on your mind?"
  ],

  // New empathetic templates for short/ambiguous responses
  empathetic_acknowledgment: [
    "Sometimes it's hard to know what to say, and that's okay—I'm here for you.",
    "Take your time, I'm listening. There's no pressure to say anything specific.",
    "I can sense you might be processing things. Would it help if I shared more about something we discussed?",
    "It's totally fine to give short responses—everyone communicates differently. I'm here whenever you're ready.",
    "No need to feel like you have to elaborate. Sometimes a simple response says everything.",
    "I appreciate you being here with me. What feels right to talk about in this moment?",
    "You don't have to have all the words right now. I'm patient and here to support you however feels comfortable."
  ],
  
  // Responses for clarification requests
  clarification: [
    "I'd be happy to explain. What specifically would you like me to clarify?",
    "Let me help clarify that for you. What part would you like me to explain more?",
    "Of course! I want to make sure I'm being clear. What would be most helpful for me to explain?",
    "I'm glad you asked. Let me explain. What aspect would you like me to break down further?",
    "Absolutely - let me explain that better. What would you like to understand more about?",
    "Good question! What specifically can I help you understand better?"
  ],
  
  // Mental health services responses
  services: [
    "I can provide information about various mental health treatment services and programs. What specific service would you like to learn about?",
    "There are different levels of mental health care available depending on your needs. Which service or program are you interested in learning about?",
    "I'm here to help explain different treatment options and services. What would you like to know more about?",
    "Mental health services range from outpatient to inpatient care. Is there a particular program you'd like me to explain?"
  ],
  
  // Service walkthrough responses  
  service_walkthrough: [
    "I'd be happy to walk you through what to expect. Which specific program or service would you like me to explain step by step?",
    "I can provide a detailed overview of the process. What service are you interested in learning about?",
    "Let me break that down for you step by step. Which program would you like me to explain?",
    "I can guide you through what a typical experience looks like. What service are you curious about?"
  ]
};

// Enhanced pattern matching with fuzzy matching and synonyms
const intentPatterns = {
  greeting: [
    /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
    /^(how are you|what's up|sup|whats up|wassup)/i,
    /^(hiya|heya|hallo|helo|hai)/i, // Common misspellings
    /^(howdy|greetings|salutations)/i
  ],
  
  anxiety: [
    /(anxious|anxiety|worried|worry|panic|fear|nervous|stress|overwhelm|tense)/i,
    /(on edge|restless|can't relax|uptight|freaking out|scared|frightened)/i,
    /(heart racing|can't breathe|shaking|trembling|sweating)/i,
    /(GAD|general anxiety|social anxiety|performance anxiety)/i,
    /(catastrophic thinking|worst case scenario|what if)/i
  ],
  
  depression: [
    /(depress|sad|down|low|hopeless|empty|worthless|despair)/i,
    /(can't get out of bed|no motivation|don't care|numb|disconnected)/i,
    /(crying|tears|weeping|melancholy|blue|gloomy)/i,
    /(suicidal|end it all|better off dead|no point|give up)/i,
    /(major depression|clinical depression|seasonal depression)/i
  ],
  
  adhd: [
    /(adhd|add|attention deficit|hyperactive|can't focus|can't concentrate)/i,
    /(easily distracted|scattered|forgetful|procrastinate|disorganized)/i,
    /(restless|fidgety|impulsive|interrupt|can't sit still)/i,
    /(hyperfocus|zoning out|daydreaming|mind wandering)/i
  ],
  
  ptsd: [
    /(ptsd|trauma|flashback|nightmare|triggered|hypervigilant)/i,
    /(can't forget|haunted|reliving|vivid memories|startled)/i,
    /(avoidance|numb|detached|on guard|jumpy)/i,
    /(combat|assault|accident|abuse|violence|disaster)/i
  ],
  
  bipolar: [
    /(bipolar|manic|mania|mood swings|high and low|up and down)/i,
    /(grandiose|racing thoughts|no sleep|euphoric|irritable)/i,
    /(spending spree|risky behavior|hypomanic|mixed episode)/i,
    /(mood disorder|cyclothymia)/i
  ],
  
  ocd: [
    /(ocd|obsessive|compulsive|ritual|checking|counting)/i,
    /(intrusive thoughts|contamination|germs|symmetry|order)/i,
    /(can't stop|have to do|over and over|perfect|exactly)/i,
    /(hand washing|door checking|hoarding|trichotillomania)/i
  ],
  
  sleep: [
    /(insomnia|can't sleep|trouble sleeping|sleepless|restless)/i,
    /(nightmares|night terrors|sleep paralysis|sleepwalking)/i,
    /(tired|exhausted|fatigue|drowsy|sleep deprived)/i,
    /(sleep schedule|circadian|melatonin|sleep hygiene)/i
  ],
  
  medication: [
    /(medication|pills|drugs|prescription|side effects)/i,
    /(ssri|snri|antidepressant|mood stabilizer|antipsychotic)/i,
    /(prozac|zoloft|lexapro|xanax|adderall|lithium)/i,
    /(dosage|withdrawal|tapering|stopping|starting)/i
  ],
  
  crisis: [
    /(suicide|kill myself|end my life|better off dead|no point living)/i,
    /(self harm|cutting|hurt myself|overdose|jump|gun)/i,
    /(can't go on|give up|hopeless|no way out|emergency)/i,
    /(crisis|help me|save me|dying|planning to)/i
  ],
  
  // Simple acknowledgments and responses
  acknowledgment: [
    /^(ok|okay|kay|k)$/i,
    /^(yes|yeah|yep|yup|sure|alright|right)$/i,
    /^(no|nope|nah|not really)$/i,
    /^(maybe|perhaps|i guess|sort of|kinda)$/i,
    /^(thanks|thank you|thx)$/i
  ],
  
  // Simple questions needing clarification
  clarification: [
    /^(why|what|how|when|where)$/i,
    /^(what's that|whats that)$/i,
    /^(what does that mean|what do you mean)$/i,
    /^(i don't understand|i dont understand|huh|what)$/i,
    /^(can you explain|explain|tell me more)$/i
  ],
  
  // Mental health services and programs
  services: [
    /(php|partial hospitalization program|partial hospitalization)/i,
    /(iop|intensive outpatient program|intensive outpatient)/i,
    /(outpatient program|outpatient treatment|op\b)/i,
    /(crisis stabilization|crisis intervention|crisis support)/i,
    /(inpatient program|inpatient treatment|inpatient care)/i,
    /(residential treatment|residential care|residential program)/i,
    /(mat|medication assisted treatment|medication-assisted)/i,
    /(telehealth|teletherapy|online therapy|virtual therapy)/i,
    /(aftercare|relapse prevention|continuing care)/i
  ],
  
  // Service walkthroughs and process questions  
  service_walkthrough: [
    /(walk me through|how does.*work|what happens in|what to expect)/i,
    /(step by step|process|procedure|what's it like)/i,
    /(daily schedule|typical day|routine)/i,
    /(admissions|intake|getting started)/i
  ]
};

// Fuzzy matching function for more flexible pattern recognition
function fuzzyMatch(text, pattern) {
  const words = text.toLowerCase().split(/\s+/);
  const patternWords = pattern.toLowerCase().split(/\s+/);
  
  let matchScore = 0;
  for (const word of words) {
    for (const pWord of patternWords) {
      // Exact match
      if (word === pWord) {
        matchScore += 1;
      }
      // Partial match (contains)
      else if (word.includes(pWord) || pWord.includes(word)) {
        matchScore += 0.7;
      }
      // Levenshtein distance for typos
      else if (levenshteinDistance(word, pWord) <= 2 && Math.min(word.length, pWord.length) > 3) {
        matchScore += 0.5;
      }
    }
  }
  
  return matchScore / Math.max(words.length, patternWords.length);
}

// Simple Levenshtein distance function for typo detection
function levenshteinDistance(str1, str2) {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
}

// Enhanced synonym matching using fallback data
function checkSynonyms(message, intent) {
  if (!window.fallbackData || !window.fallbackData.dsm5) return false;
  
  const lowerMessage = message.toLowerCase();
  for (const condition in window.fallbackData.dsm5) {
    const conditionData = window.fallbackData.dsm5[condition];
    if (conditionData.synonyms) {
      for (const synonym of conditionData.synonyms) {
        if (lowerMessage.includes(synonym.toLowerCase())) {
          // Map condition to intent
          const conditionToIntent = {
            'ADHD': 'adhd',
            'Depression': 'depression', 
            'Anxiety': 'anxiety',
            'PTSD': 'ptsd',
            'Bipolar': 'bipolar',
            'OCD': 'ocd',
            'Insomnia': 'sleep'
          };
          if (conditionToIntent[condition] === intent) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

// Retrieve quick DSM-5 disorder details
function getDisorderInfo(query) {
  if (!window.dsm5Disorders) return null;
  const lowerQuery = query.toLowerCase();

  // Match against synonyms first for better accuracy
  for (const info of Object.values(window.dsm5Disorders)) {
    if (info.synonyms && info.synonyms.some(s => lowerQuery.includes(s.toLowerCase()))) {
      return info;
    }
  }

  // Match against full disorder names
  for (const info of Object.values(window.dsm5Disorders)) {
    if (info.name && lowerQuery.includes(info.name.toLowerCase())) {
      return info;
    }
  }

  // Fallback: match by key substring
  const key = Object.keys(window.dsm5Disorders).find(d => lowerQuery.includes(d));
  return key ? window.dsm5Disorders[key] : null;
}

// Fuzzy matching function for more flexible pattern recognition
function fuzzyMatch(text, pattern) {
  const words = text.toLowerCase().split(/\s+/);
  const patternWords = pattern.toLowerCase().split(/\s+/);
  
  let matchScore = 0;
  for (const word of words) {
    for (const pWord of patternWords) {
      // Exact match
      if (word === pWord) {
        matchScore += 1;
      }
      // Partial match (contains)
      else if (word.includes(pWord) || pWord.includes(word)) {
        matchScore += 0.7;
      }
      // Levenshtein distance for typos
      else if (levenshteinDistance(word, pWord) <= 2 && Math.min(word.length, pWord.length) > 3) {
        matchScore += 0.5;
      }
    }
  }
  
  return matchScore / Math.max(words.length, patternWords.length);
}

// Simple Levenshtein distance function for typo detection
function levenshteinDistance(str1, str2) {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
}

// Enhanced synonym matching using fallback data
function checkSynonyms(message, intent) {
  if (!window.fallbackData || !window.fallbackData.dsm5) return false;
  
  const lowerMessage = message.toLowerCase();
  for (const condition in window.fallbackData.dsm5) {
    const conditionData = window.fallbackData.dsm5[condition];
    if (conditionData.synonyms) {
      for (const synonym of conditionData.synonyms) {
        if (lowerMessage.includes(synonym.toLowerCase())) {
          // Map condition to intent
          const conditionToIntent = {
            'ADHD': 'adhd',
            'Depression': 'depression', 
            'Anxiety': 'anxiety',
            'PTSD': 'ptsd',
            'Bipolar': 'bipolar',
            'OCD': 'ocd',
            'Insomnia': 'sleep'
          };
          if (conditionToIntent[condition] === intent) {
            return true;
          }
        }
      }
    }
  }
  return false;
}
const extraIntentPatterns = {
  anxiety: [
    /(can't stop thinking|racing thoughts|catastrophizing|overthinking)/i,
    /(heart racing|shortness of breath|sweating|trembling)/i,
    // Variations and misspellings
    /(anxios|anxitey|panik|stres|overwelm|overwelmed)/i,
    /(freaking out|stressed out|wound up|on edge|butterflies)/i,
    /(cant sleep|tossing and turning|mind racing|spiraling)/i,
    // Slang and informal
    /(buggin|bugging|trippin|tripping|losing it|going crazy)/i
  ],
  
  depression: [
    /(depressed|depression|sad|hopeless|empty|numb|worthless|guilty)/i,
    /(no energy|tired|fatigue|sleep problems|can't sleep|sleeping too much)/i,
    /(no interest|no pleasure|don't enjoy|nothing matters)/i,
    /(want to die|better off dead|no point|can't go on)/i,
    // Variations and misspellings
    /(depresed|depress|hopless|worthles|exausted|exhasted)/i,
    /(feeling down|down in dumps|blue|low|rock bottom)/i,
    /(dont care|nothing matters|whats the point|why bother)/i,
    // Slang and informal
    /(bummed out|super down|really low|feeling like crap|hate myself)/i
  ],
  
  crisis: [
    /(suicide|kill myself|want to die|end it all|better off dead)/i,
    /(can't go on|no point|hurt myself|self harm|overdose)/i,
    /(suicidal|suicidal thoughts|ending my life|not worth living)/i,
    // Variations and coded language
    /(dont want to be here|tired of living|ready to go|cant take it)/i,
    /(everyone would be better without me|burden|waste of space)/i
  ],
  
  medication: [
    /(medication|medicine|pill|drug|prescription|antidepressant)/i,
    /(side effect|dose|dosage|taking|prescribed)/i,
    // Variations and misspellings
    /(meds|medicaton|perscription|prescripion|anti-depressant)/i,
    /(pills|tablets|capsules|pharma|pharmacy)/i
  ],
  
  ptsd: [
    /(ptsd|trauma|flashback|nightmare|triggered|hypervigilant)/i,
    /(can't forget|keeps happening|reliving|avoidance)/i,
    // Variations and informal language
    /(post traumatic|traumatic stress|flash back|night mare)/i,
    /(cant get it out of my head|haunts me|keeps replaying)/i,
    /(jumpy|startled|on guard|cant relax|hyperaware)/i
  ],
  
  adhd: [
    /(adhd|add|attention deficit|hyperactive|can't focus|distracted)/i,
    /(fidgeting|restless|impulsive|disorganized|forgetful)/i,
    // Variations and informal language
    /(a\.d\.d|a\.d\.h\.d|cant focus|cant concentrate|scattered)/i,
    /(hyper|bouncing off walls|all over the place|spacey)/i,
    /(procrastinating|putting things off|cant sit still)/i
  ],
  
  // NEW MENTAL HEALTH TOPICS
  ocd: [
    /(ocd|obsessive|compulsive|rituals|checking|counting)/i,
    /(intrusive thoughts|unwanted thoughts|contamination|germs)/i,
    /(have to do|cant stop|over and over|perfectly|exactly right)/i,
    // Variations and informal language
    /(o\.c\.d|obsesive|compulsiv|ritualistic|repetitive)/i,
    /(checking locks|washing hands|counting|organizing)/i,
    /(thoughts stuck|cant get thoughts out|bothering me)/i
  ],
  
  sleep: [
    /(insomnia|can't sleep|sleep problems|sleeping too much)/i,
    /(tired|exhausted|fatigue|no energy|sleepy)/i,
    /(nightmares|night terrors|sleep walking|restless sleep)/i,
    // Variations and informal language
    /(cant fall asleep|tossing turning|up all night|sleep schedule)/i,
    /(wiped out|drained|burnt out|running on empty)/i,
    /(bad dreams|scary dreams|waking up tired|never rested)/i
  ],
  
  bipolar: [
    /(bipolar|manic|mood swings|elevated mood|grandiose)/i,
    /(up and down|high and low|mood changes|euphoric)/i,
    /(racing thoughts|talking fast|impulsive|reckless)/i,
    // Variations and informal language
    /(bi-polar|mood disorder|manic depressive|mixed episodes)/i,
    /(feeling invincible|on top of world|crash|coming down)/i,
    /(emotional rollercoaster|all over the place emotionally)/i
  ]
};

for (const [intent, patterns] of Object.entries(extraIntentPatterns)) {
  if (!intentPatterns[intent]) {
    intentPatterns[intent] = [];
  }
  intentPatterns[intent].push(...patterns);
}

// Initialize Smart AI System with Learning Data
async function initializeAI() {
  try {
    updateAIStatusIndicator('loading', 'Initializing Smart AI System...');
    showAILoading();
    updateProgress(20, 'Loading AI patterns...');
    
    // Load learning data from localStorage
    const learningLoaded = loadLearningData();
    if (learningLoaded) {
      console.log('Previous learning data loaded successfully');
      updateProgress(35, 'Learning data loaded...');
    } else {
      console.log('No previous learning data found, starting fresh');
      updateProgress(35, 'Initializing learning systems...');
    }
    
    // Simulate initialization time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateProgress(50, 'Configuring mental health database...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateProgress(80, 'Optimizing response generation...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateProgress(100, 'Smart AI Ready!');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    hideAILoading();
    isAILoaded = true;
    console.log('Smart AI System initialized successfully!');
    updateAIStatusIndicator('ai-active', 'Smart AI Active');
    showAISuccessNotification();
    
    // Show learning status if data was loaded
    if (learningLoaded) {
      showLearningDataNotification();
    }
    
  } catch (error) {
    console.error('Smart AI initialization failed:', error);
    hideAILoading();
    isFallbackMode = true;
    updateAIStatusIndicator('fallback-active', 'Enhanced Support Mode Active');
    showAIErrorNotification('AI system is running in enhanced support mode with full mental health capabilities.');
    showFallbackModeNotification();
  }
}

/**
 * Show notification about loaded learning data
 */
function showLearningDataNotification() {
  const totalLearned = Object.values(learningData.learnedPatterns).reduce((sum, patterns) => sum + patterns.length, 0);
  const totalResponses = Object.values(learningData.learnedResponses).reduce((sum, responses) => sum + responses.length, 0);
  
  if (totalLearned > 0 || totalResponses > 0) {
    console.log(`AI loaded with ${totalLearned} learned patterns and ${totalResponses} improved responses`);
    
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
      const learningDiv = document.createElement('div');
      learningDiv.className = 'message bot learning-info';
      learningDiv.innerHTML = `
        <div class="message-content">
          <div class="message-text">
            <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
              <strong>🎓 Learning Data Loaded!</strong><br>
              <small style="color: #2e7d32;">
                I've remembered ${totalLearned} patterns and ${totalResponses} improved responses from our previous conversations. I'm getting smarter!
              </small>
            </div>
            <small style="color: #666;"><em>Note: This learning data is stored locally in your browser and will be lost if you clear your browser cache.</em></small>
          </div>
        </div>
      `;
      chatMessages.appendChild(learningDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
}

// Advanced Intent Recognition with Multi-Intent Detection and Learning
function recognizeIntent(message) {
  const lowerMessage = message.toLowerCase();
  const detectedIntents = [];
  
  // Crisis detection has highest priority - always check first
  for (const pattern of intentPatterns.crisis) {
    if (pattern.test(lowerMessage)) {
      return 'crisis'; // Crisis overrides all other intents
    }
  }
  
  // Check built-in patterns for all intents with enhanced matching
  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    if (intent === 'crisis') continue; // Already checked
    
    for (const pattern of patterns) {
      if (pattern.test(lowerMessage)) {
        detectedIntents.push(intent);
        break; // One match per intent type is enough
      }
    }
    
    // Additional fuzzy matching and synonym checking
    if (!detectedIntents.includes(intent)) {
      if (checkSynonyms(message, intent)) {
        detectedIntents.push(intent);
      }
    }
  }
  
  // Check learned patterns from user training
  for (const [intent, learnedPatterns] of Object.entries(learningData.learnedPatterns)) {
    if (learnedPatterns.length === 0) continue;
    
    for (const learnedPattern of learnedPatterns) {
      try {
        const regex = new RegExp(learnedPattern.pattern, 'i');
        if (regex.test(lowerMessage)) {
          if (!detectedIntents.includes(intent)) {
            detectedIntents.push(intent);
          }
          // Track successful use of learned pattern
          learnedPattern.useCount = (learnedPattern.useCount || 0) + 1;
          learnedPattern.lastUsed = new Date().toISOString();
          saveLearningData();
          break;
        }
      } catch (error) {
        console.warn('Invalid learned pattern:', learnedPattern.pattern);
      }
    }
  }
  
  // Return primary intent (most specific or most recently learned)
  if (detectedIntents.length === 0) {
    // Store unrecognized message for learning opportunity
    storeUnrecognizedMessage(message);
    return 'general';
  }
  
  // If multiple intents detected, prioritize based on specificity and user interaction history
  if (detectedIntents.length > 1) {
    // Store multi-intent information for context
    conversationContext.multiIntents = detectedIntents;
    
    // Prioritize mental health conditions and medication questions
    // Medication is checked right after crisis to ensure users get drug information when requested
    const priorityOrder = ['crisis', 'medication', 'ptsd', 'ocd', 'bipolar', 'depression', 'anxiety', 'adhd', 'sleep', 'greeting', 'acknowledgment', 'clarification', 'general'];
    for (const priority of priorityOrder) {
      if (detectedIntents.includes(priority)) {
        return priority;
      }
    }
  }
  
  return detectedIntents[0];
}

/**
 * Store unrecognized messages for learning opportunities
 */
function storeUnrecognizedMessage(message) {
  // Don't store very short messages or repeated messages
  if (message.length < 5) return;
  
  const existing = learningData.unrecognizedMessages.find(m => 
    m.message.toLowerCase() === message.toLowerCase()
  );
  
  if (existing) {
    existing.count = (existing.count || 1) + 1;
    existing.lastSeen = new Date().toISOString();
  } else {
    learningData.unrecognizedMessages.push({
      message: message,
      count: 1,
      firstSeen: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      needsCategorization: true
    });
  }
  
  // Limit storage to prevent bloat
  if (learningData.unrecognizedMessages.length > 100) {
    learningData.unrecognizedMessages = learningData.unrecognizedMessages
      .sort((a, b) => b.count - a.count)
      .slice(0, 100);
  }
  
  saveLearningData();
}

/**
 * Enhanced clarification logic for uncertain matches
 */
function handleUncertainMatch(message, potentialIntents) {
  if (potentialIntents.length === 0) {
    return generateClarificationResponse(message);
  }
  
  if (potentialIntents.length === 1) {
    const confidence = calculateMatchConfidence(message, potentialIntents[0]);
    if (confidence < 0.6) {
      return generateClarificationResponse(message, potentialIntents[0]);
    }
  }
  
  // Multiple potential matches - ask for clarification
  if (potentialIntents.length > 1) {
    return generateMultiOptionResponse(potentialIntents);
  }
  
  return null; // No clarification needed
}

/**
 * Calculate confidence score for a match
 */
function calculateMatchConfidence(message, intent) {
  const patterns = intentPatterns[intent] || [];
  let maxScore = 0;
  
  for (const pattern of patterns) {
    if (pattern.test(message.toLowerCase())) {
      maxScore = Math.max(maxScore, 0.8); // Regex match
    }
  }
  
  // Check synonym matches
  if (checkSynonyms(message, intent)) {
    maxScore = Math.max(maxScore, 0.7);
  }
  
  return maxScore;
}

/**
 * Generate clarification response for uncertain matches
 */
function generateClarificationResponse(message, suggestedIntent = null) {
  const clarificationPrompts = [
    "I want to make sure I understand what you're going through. Could you tell me a bit more about what you're experiencing?",
    "I'm here to help, and I want to give you the most relevant support. Can you share more details about what's on your mind?",
    "To better assist you, could you help me understand what specific area you'd like to focus on?",
    "I'm listening and want to provide the best support. Could you elaborate on what you're feeling or experiencing?"
  ];
  
  let response = clarificationPrompts[Math.floor(Math.random() * clarificationPrompts.length)];
  
  if (suggestedIntent) {
    const intentLabels = {
      'anxiety': 'anxiety or worry',
      'depression': 'depression or low mood',
      'adhd': 'attention or focus issues',
      'ptsd': 'trauma or difficult memories',
      'bipolar': 'mood changes',
      'ocd': 'repetitive thoughts or behaviors',
      'sleep': 'sleep problems',
      'medication': 'medication questions'
    };
    
    const label = intentLabels[suggestedIntent] || suggestedIntent;
    response += ` Are you perhaps dealing with ${label}?`;
  }
  
  return response;
}

/**
 * Generate response when multiple intents are possible
 */
function generateMultiOptionResponse(intents) {
  const intentLabels = {
    'anxiety': 'anxiety or worry',
    'depression': 'depression or sadness',
    'adhd': 'attention or focus challenges',
    'ptsd': 'trauma or difficult memories',
    'bipolar': 'mood swings',
    'ocd': 'repetitive thoughts or behaviors',
    'sleep': 'sleep issues',
    'medication': 'medication questions'
  };
  
  const labels = intents.map(intent => intentLabels[intent] || intent).slice(0, 3);
  
  if (labels.length === 2) {
    return `I can help with both ${labels[0]} and ${labels[1]}. Which would you like to focus on first, or would you like to discuss both?`;
  } else {
    return `I noticed you might be dealing with multiple things - possibly ${labels.slice(0, -1).join(', ')} or ${labels[labels.length - 1]}. What feels most important to talk about right now?`;
  }
}

// Contextual Response Selection with Learning Integration
function selectResponse(intent, context) {
  const templates = responseTemplates[intent];
  let selectedResponse = '';
  let responseId = '';
  
  // Handle acknowledgment with context awareness
  if (intent === 'acknowledgment') {
    return generateContextualAcknowledgment(context);
  }
  
  // First, check for learned responses that have positive feedback
  const learnedResponses = learningData.learnedResponses[intent] || [];
  const highQualityLearned = learnedResponses.filter(r => 
    (r.helpfulCount || 0) > (r.notHelpfulCount || 0) && 
    (r.helpfulCount || 0) >= 2
  );
  
  if (highQualityLearned.length > 0) {
    // Sort by effectiveness (helpful ratio and usage count)
    highQualityLearned.sort((a, b) => {
      const aRatio = (a.helpfulCount || 0) / Math.max((a.helpfulCount || 0) + (a.notHelpfulCount || 0), 1);
      const bRatio = (b.helpfulCount || 0) / Math.max((b.helpfulCount || 0) + (b.notHelpfulCount || 0), 1);
      return bRatio - aRatio; // Higher ratio first
    });
    
    selectedResponse = highQualityLearned[0].response;
    responseId = highQualityLearned[0].id;
  }
  
  // Fall back to built-in templates if no good learned responses
  if (!selectedResponse) {
    if (!templates) {
      selectedResponse = generateGeneralResponse(context);
      responseId = 'general_' + Date.now();
    } else if (typeof templates === 'string') {
      selectedResponse = templates;
      responseId = intent + '_string_' + Date.now();
    } else if (Array.isArray(templates)) {
      selectedResponse = templates[Math.floor(Math.random() * templates.length)];
      responseId = intent + '_array_' + Date.now();
    } else {
      // For complex intent objects (like anxiety, depression)
      const count = conversationContext.topicCounts[intent] || 0;
      
      if (count === 0 && templates.initial) {
        selectedResponse = templates.initial[Math.floor(Math.random() * templates.initial.length)];
        responseId = intent + '_initial_' + Date.now();
      } else if (templates.followUp) {
        selectedResponse = templates.followUp[Math.floor(Math.random() * templates.followUp.length)];
        responseId = intent + '_followup_' + Date.now();
      } else {
        selectedResponse = templates.initial?.[0] || "I'm here to support you. Can you tell me more about what you're experiencing?";
        responseId = intent + '_default_' + Date.now();
      }
    }
  }
  
  // Store response ID for feedback tracking
  lastResponseId = responseId;
  
  // Handle multi-intent responses
  if (conversationContext.multiIntents && conversationContext.multiIntents.length > 1) {
    const additionalIntents = conversationContext.multiIntents.filter(i => i !== intent).slice(0, 2);
    if (additionalIntents.length > 0) {
      selectedResponse += ` I also noticed you mentioned ${additionalIntents.join(' and ')}. Feel free to talk about any of these topics.`;
    }
  }
  
  return selectedResponse;
}

/**
 * Generate contextual acknowledgment responses that reference previous AI questions and conversation context
 */
function generateContextualAcknowledgment(context) {
  const lastAIQuestion = conversationContext.conversationFlow.lastAIQuestion;
  const lastAIIntent = conversationContext.conversationFlow.lastAIIntent;
  const lastTopicDiscussed = conversationContext.conversationFlow.lastTopicDiscussed;
  const recentMessages = conversationContext.messages.slice(-6);
  const userMessages = recentMessages.filter(m => m.role === 'user');
  const lastUserMessage = userMessages[userMessages.length - 1]?.content?.toLowerCase().trim();
  
  // Track consecutive short responses
  if (lastUserMessage && lastUserMessage.length <= 10) {
    conversationContext.conversationFlow.shortResponseCount++;
  } else {
    conversationContext.conversationFlow.shortResponseCount = 0;
  }
  
  let responseId = 'contextual_ack_' + Date.now();
  lastResponseId = responseId;
  
  // FIRST: Handle consecutive short responses - this takes priority over specific response handling
  if (conversationContext.conversationFlow.shortResponseCount >= 3) {
    const recentTopics = conversationContext.userPreferences.previousTopics.slice(-2);
    
    // Empathetic responses that acknowledge the communication style
    const empathetic_short_responses = [
      "I can tell you're keeping things brief today, and that's completely okay. Sometimes fewer words say more than we realize.",
      "No need to feel like you have to elaborate—I appreciate whatever you're comfortable sharing.",
      "Short responses are perfectly fine with me. I'm here to listen, whether you want to say a lot or a little.",
      "I notice you're being concise, which is totally valid. Everyone processes and communicates differently."
    ];
    
    if (recentTopics.length > 0) {
      const topicLabels = recentTopics.map(topic => {
        const labels = {
          'anxiety': 'anxiety and worry',
          'depression': 'your mood and feelings', 
          'sleep': 'sleep challenges',
          'ptsd': 'some difficult experiences',
          'adhd': 'focus and attention',
          'bipolar': 'mood changes',
          'ocd': 'repetitive thoughts and behaviors'
        };
        return labels[topic] || topic;
      });
      
      const empathetic_start = empathetic_short_responses[Math.floor(Math.random() * empathetic_short_responses.length)];
      
      return `${empathetic_start} Earlier in our conversation, you opened up about ${topicLabels.join(' and ')}. Would it feel right to explore any of those areas a bit more, or is there something else that would be more helpful to focus on right now?`;
    }
    
    // Also check detected symptoms if no previous topics
    const detectedTopics = Object.keys(conversationContext.detectedSymptoms).filter(topic => 
      conversationContext.detectedSymptoms[topic] && conversationContext.detectedSymptoms[topic].length > 0
    );
    
    if (detectedTopics.length > 0) {
      const topicLabels = detectedTopics.slice(0, 2).map(topic => {
        const labels = {
          'anxiety': 'anxiety and worry',
          'depression': 'your mood and emotional state',
          'sleep': 'sleep concerns',
          'ptsd': 'some challenging experiences',
          'adhd': 'focus and attention',
          'bipolar': 'mood fluctuations',
          'ocd': 'repetitive thoughts'
        };
        return labels[topic] || topic;
      });
      
      const empathetic_start = empathetic_short_responses[Math.floor(Math.random() * empathetic_short_responses.length)];
      
      return `${empathetic_start} I remember you mentioning things related to ${topicLabels.join(' and ')}. If any of those feel important to talk about right now, I'm here. Or we can explore whatever else feels right for you.`;
    }
    
    // Use new empathetic acknowledgment templates for cases with no topic context
    const fallback_responses = [
      "I notice you're keeping things simple today, and that's perfectly okay with me. Sometimes it's hard to know what to say, and there's no pressure to fill the silence. What feels most comfortable for you right now?",
      "Short responses are completely fine—I appreciate whatever you're willing to share. Would it help if I suggested a gentle topic, or would you prefer to sit with whatever you're thinking about?",
      "I can sense you might be processing things internally, which is so normal. Take your time. I'm here whenever you're ready, whether that's now or in a few moments.",
      "You know what? Sometimes the most honest response is a brief one. I'm grateful you're here with me, however you choose to communicate. What would feel most supportive right now?"
    ];
    
    return fallback_responses[Math.floor(Math.random() * fallback_responses.length)];
  }
  
  // Handle positive acknowledgments (yes, sure, okay) with specific context
  if (lastUserMessage && /^(yes|yeah|yep|yup|sure|okay|ok|alright|right)$/i.test(lastUserMessage)) {
    
    // If the last AI message was asking about a specific topic, continue with that topic
    if (lastAIIntent && lastAIIntent !== 'general' && lastAIIntent !== 'greeting') {
      return generateTopicContinuation(lastAIIntent, 'positive');
    }
    
    // If the last AI question was about assessment, start it
    if (lastAIQuestion && (lastAIQuestion.includes('assessment') || lastAIQuestion.includes('wellness check'))) {
      return startWellnessAssessment();
    }
    
    // If AI was asking about talking about something specific
    if (lastAIQuestion && lastAIQuestion.includes('talk about')) {
      const topicMatch = lastAIQuestion.match(/talk about (\w+)/i);
      if (topicMatch) {
        const topic = topicMatch[1].toLowerCase();
        return generateTopicContinuation(topic, 'positive');
      }
    }
    
    // If there was a recent topic discussed, continue with it using varied responses
    if (lastTopicDiscussed) {
      return generateTopicContinuation(lastTopicDiscussed, 'positive');
    }
    
    // Fallback positive acknowledgments with more variation and warmth
    const positive_fallbacks = [
      "I'm glad you're open to that. What feels most important for you to focus on right now?",
      "Great! I appreciate your willingness to engage. Where would you like to start?",
      "Wonderful. What's been weighing on your mind that we could explore together?",
      "I'm here for whatever direction feels right to you. What would be most helpful?",
      "Thank you for being so open. What topic feels most pressing or interesting to you today?"
    ];
    
    return positive_fallbacks[Math.floor(Math.random() * positive_fallbacks.length)];
  }
  
  // Handle negative acknowledgments (no, nope, not really) with more empathy
  if (lastUserMessage && /^(no|nope|nah|not really|not now)$/i.test(lastUserMessage)) {
    
    // If the last AI was asking about something specific, acknowledge and redirect
    if (lastAIIntent && lastAIIntent !== 'general') {
      const empathetic_redirects = [
        "I completely understand—that doesn't feel right for you right now. What would feel more comfortable or helpful to talk about instead?",
        "That's perfectly okay. Sometimes we need to focus on different things. Is there something else that feels more important to you at the moment?",
        "No worries at all. I want to go where it feels most natural for you. What's on your heart or mind that we could explore?",
        "Absolutely fine—I'm here to follow your lead. What direction would feel most supportive for you right now?"
      ];
      
      return empathetic_redirects[Math.floor(Math.random() * empathetic_redirects.length)];
    }
    
    // If there were recent topics, reference them warmly
    if (lastTopicDiscussed || conversationContext.userPreferences.previousTopics.length > 0) {
      const recentTopics = conversationContext.userPreferences.previousTopics.slice(-2);
      if (recentTopics.length > 0) {
        const topicLabels = recentTopics.map(topic => {
          const labels = {
            'anxiety': 'anxiety',
            'depression': 'your mood',
            'sleep': 'sleep',
            'ptsd': 'some difficult experiences',
            'adhd': 'focus challenges',
            'bipolar': 'mood changes',
            'ocd': 'repetitive thoughts'
          };
          return labels[topic] || topic;
        });
        
        const warm_topic_redirects = [
          `That's totally understandable. Earlier you shared about ${topicLabels.join(' and ')}—would any of those feel right to revisit, or is there something completely different on your mind?`,
          `I hear you. We touched on ${topicLabels.join(' and ')} before. Would you like to continue with any of those, or would something else be more helpful right now?`,
          `Of course, no pressure at all. Since you mentioned ${topicLabels.join(' and ')} earlier, I'm happy to explore those or go in whatever direction feels right for you.`
        ];
        
        return warm_topic_redirects[Math.floor(Math.random() * warm_topic_redirects.length)];
      }
    }
    
    const general_negative_responses = [
      "That's perfectly fine—I'm here to support you with whatever feels most important. What would you like to focus on instead?",
      "No problem at all. What feels most comfortable or helpful for you to talk about right now?",
      "Absolutely okay. I want this to feel right for you. What's on your mind that we could explore together?",
      "I completely understand. Is there something else that would feel more supportive or interesting to discuss?"
    ];
    
    return general_negative_responses[Math.floor(Math.random() * general_negative_responses.length)];
  }
  
  // Handle maybe/uncertain responses with more empathy and validation
  if (lastUserMessage && /^(maybe|perhaps|i guess|sort of|kinda|not sure)$/i.test(lastUserMessage)) {
    
    if (lastAIIntent && lastAIIntent !== 'general') {
      const uncertainty_responses = [
        "I can hear the uncertainty in your response, and that's completely okay. Uncertainty often means we're exploring something important. Would it feel helpful to talk through this a bit more, or would you prefer to focus on something that feels clearer?",
        "Uncertainty can actually be really valuable—it often means you're being thoughtful and honest with yourself. We can explore this tentatively, or we can shift to whatever feels more solid for you right now.",
        "I appreciate that honest response. Sometimes 'maybe' is the most truthful answer we have. Would it help to explore this gently, or is there something else that feels more certain for you?",
        "That uncertainty sounds really human and real. We don't have to figure everything out right now. What would feel most comfortable—exploring this a bit more, or talking about something else?"
      ];
      
      return uncertainty_responses[Math.floor(Math.random() * uncertainty_responses.length)];
    }
    
    const general_uncertainty_responses = [
      "I understand that feeling of not being quite sure. Sometimes uncertainty is exactly where we need to start. What feels most pressing for you right now, even if you're not completely sure about it?",
      "Uncertainty can be really tough to sit with. I'm here to explore whatever feels important, even if it's unclear. What's on your mind, even in a vague way?",
      "That 'maybe' or 'not sure' feeling is so relatable. Sometimes we're processing things that don't have clear answers yet. What feels most alive or present for you right now?",
      "I appreciate that honest uncertainty. We don't need to have everything figured out. What draws your attention most, even if it's fuzzy or unclear?"
    ];
    
    return general_uncertainty_responses[Math.floor(Math.random() * general_uncertainty_responses.length)];
  }
  
  // Default contextual acknowledgment with enhanced warmth and variety
  const varied_acknowledgeAndContinue = [
    `Thanks for sharing that with me. What's been on your heart lately?`,
    `I appreciate you letting me know. How are you doing with everything today?`,
    `Thank you for that. What feels most important for us to talk about right now?`,
    `I hear you. What's weighing on you or what would be most helpful to explore?`,
    `Got it. What's been occupying your thoughts recently?`,
    `I understand. What would feel most supportive or interesting to focus on?`,
    `Thanks for being here with me. What direction feels right for our conversation today?`
  ];
  
  return varied_acknowledgeAndContinue[Math.floor(Math.random() * varied_acknowledgeAndContinue.length)];
}

/**
 * Generate topic continuation responses based on user's acknowledgment
 */
function generateTopicContinuation(topic, responseType) {
  const isPositive = responseType === 'positive';
  
  const continuations = {
    anxiety: {
      positive: [
        "I'm really glad you want to explore this with me. Anxiety can feel so overwhelming sometimes, but talking about it is such a brave step. What specific situations or thoughts tend to bring up the most anxiety for you?",
        "Thank you for trusting me with this. Anxiety affects everyone differently, and I want to understand your unique experience. Can you tell me about when you tend to feel most anxious—is it in certain situations, or does it seem to come out of nowhere?",
        "I appreciate you wanting to dive into this together. Anxiety can be like this constant background hum, can't it? What does it feel like for you, both physically and emotionally, when anxiety shows up?"
      ]
    },
    depression: {
      positive: [
        "I'm honored that you want to share about this with me. Depression can feel like carrying this invisible weight that others can't see. Can you help me understand what your experience with depression feels like day-to-day?",
        "Thank you for being willing to open up about something so personal. Depression can be incredibly isolating, and I want you to know you're not alone in this. What aspects of depression have been the most challenging for you lately?",
        "I'm here to walk through this with you, at whatever pace feels right. When you think about your mood and energy levels, are there patterns you've noticed? Maybe times when things feel a little lighter, or when everything feels especially heavy?"
      ]
    },
    sleep: {
      positive: [
        "Sleep is so foundational to everything else we deal with, so I'm really glad we're talking about this. Are you struggling more with falling asleep, staying asleep, or maybe both? I know how frustrating sleep issues can be.",
        "Yes, let's definitely focus on your sleep. There's such a strong connection between sleep and mental health—when one is off, it affects everything else. What does a typical night look like for you? When do you usually try to wind down?",
        "I'm so glad you want to address this. Poor sleep can make every other challenge feel so much harder to manage. Have you noticed any patterns in what might be affecting your sleep, or does it feel pretty unpredictable?"
      ]
    },
    ptsd: {
      positive: [
        "I really appreciate your courage in wanting to discuss this. Trauma can be incredibly difficult to talk about, and I want you to know that you're completely in control of how much you share and at what pace. What feels most important for you to talk about regarding your experiences?",
        "Thank you for trusting me with something so significant. PTSD can affect people in so many different ways, and everyone's experience is unique. Are there particular symptoms or experiences that feel most present or challenging for you right now?",
        "I'm honored that you're willing to explore this with me. With trauma, it's so important that we go at your pace and follow your lead. What aspects of your PTSD experience have been most difficult to manage lately?"
      ]
    },
    adhd: {
      positive: [
        "I'm really glad we're diving into this. ADHD can be so frustrating when your brain feels like it's constantly going in different directions. What areas of your life do you find ADHD affects most—is it work, relationships, daily tasks, or maybe a combination of things?",
        "Yes, let's explore this together. ADHD can show up so differently for different people. Do you find you struggle more with the attention and focus piece, the hyperactivity and impulsiveness, or is it kind of a mix of both for you?",
        "Thank you for wanting to discuss this openly. Managing ADHD can feel like you're fighting against your own brain sometimes. What specific ADHD symptoms have been giving you the most trouble lately, or making daily life feel harder?"
      ]
    },
    bipolar: {
      positive: [
        "I appreciate you being open about this with me. Bipolar disorder can feel like riding an emotional rollercoaster that you can't get off of sometimes. Are you currently experiencing mood swings, or is this something you're managing with treatment and looking for additional support?",
        "Thank you for bringing this up—it takes courage to talk about bipolar disorder. The mood changes can be so intense and unpredictable. Can you help me understand your experience with mood episodes? What do your highs and lows typically look like for you?",
        "I'm glad we can discuss this together. Managing bipolar disorder often involves recognizing patterns and identifying triggers, which can be really empowering. Have you noticed certain things that tend to trigger mood episodes for you, or do they feel pretty unpredictable?"
      ]
    },
    ocd: {
      positive: [
        "I'm really glad you want to talk about this with me. OCD can be so exhausting when your mind gets stuck in these loops, and the compulsions can take up so much time and energy. What types of obsessions or compulsions are you dealing with most right now?",
        "Thank you for being willing to share about this. OCD can feel very isolating because the thoughts and behaviors can seem so strange to others, but they're very real and distressing for you. Are you currently experiencing more intrusive thoughts, compulsive behaviors, or kind of both?",
        "I appreciate you trusting me with this. OCD can be incredibly treatable with the right approach, which is hopeful. What aspects of your OCD are interfering most with your daily life right now, or causing you the most distress?"
      ]
    }
  };
  
  if (continuations[topic] && continuations[topic][responseType]) {
    const responses = continuations[topic][responseType];
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Update conversation context to track this as the current topic
    conversationContext.conversationFlow.lastTopicDiscussed = topic;
    conversationContext.conversationFlow.lastAIIntent = topic;
    
    return selectedResponse;
  }
  
  // Fallback for topics not specifically handled
  if (isPositive) {
    const general_positive_responses = [
      `I'm so glad you want to talk about that with me. Let's explore this together at whatever pace feels right for you. Can you tell me more about what you're experiencing?`,
      `Thank you for being open to discussing this. I'm here to listen and support you however I can. What would feel most helpful for you to share about this?`,
      `I appreciate your willingness to dive into this topic. Let's take it step by step. What feels most important or pressing for you to talk about?`
    ];
    
    return general_positive_responses[Math.floor(Math.random() * general_positive_responses.length)];
  } else {
    const general_redirect_responses = [
      `That's completely okay—I want to focus on whatever feels right for you. What would you like to explore instead? I'm here to support you with whatever feels most important.`,
      `No worries at all. I'm here to go wherever feels most comfortable and helpful for you. What else is on your mind that we could talk about?`,
      `Absolutely fine. Let's shift to something that feels better for you right now. What would be most supportive or interesting to discuss?`
    ];
    
    return general_redirect_responses[Math.floor(Math.random() * general_redirect_responses.length)];
  }
}

// Enhanced AI Response Generation with Learning, Feedback, and Natural Delays
async function generateAIResponse(userMessage) {
  // Occasionally add a brief "thinking" delay for more natural conversation flow
  // 25% chance for responses that aren't crisis-related
  const shouldAddThinkingDelay = Math.random() < 0.25;
  let thinkingMessage = null;
  
  if (shouldAddThinkingDelay && !recognizeIntent(userMessage).includes('crisis')) {
    const thinkingMessages = [
      "Let me think about that for a moment...",
      "Hmm, let me consider how to best respond to that...",
      "Give me just a second to process what you've shared...",
      "I want to give you a thoughtful response, one moment...",
      "Let me reflect on what you've said..."
    ];
    
    thinkingMessage = thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
    
    // Add thinking message to chat
    if (typeof window !== 'undefined' && window.addThinkingMessage) {
      window.addThinkingMessage(thinkingMessage);
      
      // Wait 1-3 seconds before continuing with actual response
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    }
  }
  
  // Check if user is providing feedback on previous response
  if (awaitingFeedback && lastResponseId) {
    return handleUserFeedback(userMessage);
  }
  
  // Check if user is categorizing an unrecognized message
  if (userMessage.toLowerCase().startsWith('category:') || userMessage.toLowerCase().startsWith('intent:')) {
    return handleMessageCategorization(userMessage);
  }
  
  // Add message to conversation context
  conversationContext.messages.push({
    role: 'user',
    content: userMessage,
    timestamp: new Date().toISOString()
  });
  conversationContext.questionCount = (conversationContext.questionCount || 0) + 1;
  
  // Clear previous multi-intent data
  conversationContext.multiIntents = null;
  
  // Recognize intent (now with multi-intent support and learning)
  const intent = recognizeIntent(userMessage);
  
  // Update conversation context
  if (intent !== 'general' && intent !== 'greeting') {
    conversationContext.topicCounts[intent] = (conversationContext.topicCounts[intent] || 0) + 1;
    
    // Also track in previousTopics for better contextual awareness
    if (intent !== 'acknowledgment' && intent !== 'clarification') {
      if (!conversationContext.userPreferences.previousTopics.includes(intent)) {
        conversationContext.userPreferences.previousTopics.push(intent);
        if (conversationContext.userPreferences.previousTopics.length > 10) {
          conversationContext.userPreferences.previousTopics.shift();
        }
      }
    }
  }
  
  // Handle crisis immediately
  if (intent === 'crisis') {
    conversationContext.userPreferences.needsUrgentCare = true;
    const crisisResponse = selectResponse('crisis');
    
    // Add to conversation context without feedback prompt for crisis
    conversationContext.messages.push({
      role: 'assistant',
      content: crisisResponse,
      timestamp: new Date().toISOString(),
      intent: intent,
      responseId: lastResponseId
    });
    
    // Track AI context for crisis responses
    updateAIContextTracking(crisisResponse, intent);
    
    return crisisResponse;
  }

  // Provide quick info on DSM-5 disorders
  const disorder = getDisorderInfo(userMessage);
  if (disorder) {
    const info = `${disorder.name}: ${disorder.description}\n\nCommon symptoms include: ${disorder.symptoms.join(', ')}\n\nLearn more: ${disorder.resources[0].url}`;
    conversationContext.messages.push({
      role: 'assistant',
      content: info,
      timestamp: new Date().toISOString(),
      intent: 'disorder_info',
      responseId: 'disorder_' + Date.now()
    });
    updateAIContextTracking(info, 'disorder_info');
    return info + addFeedbackPrompt();
  }
  
  // Check for medication questions
  const medicationInfo = getMedicationInfoFromMessage(userMessage);
  if (medicationInfo) {
    const medResponse = generateMedicationResponse(medicationInfo);
    
    conversationContext.messages.push({
      role: 'assistant',
      content: medResponse,
      timestamp: new Date().toISOString(),
      intent: 'medication',
      responseId: 'medication_' + Date.now()
    });
    
    updateAIContextTracking(medResponse, 'medication');
    return medResponse + addFeedbackPrompt();
  }
  
  // Check for mental health services questions
  const serviceResponse = getServiceInfoFromMessage(userMessage);
  if (serviceResponse) {
    conversationContext.messages.push({
      role: 'assistant',
      content: serviceResponse,
      timestamp: new Date().toISOString(),
      intent: 'service_info',
      responseId: 'service_' + Date.now()
    });
    
    updateAIContextTracking(serviceResponse, 'service_info');
    return serviceResponse + addFeedbackPrompt();
  }
  
  // Check if wellness assessment is in progress or being requested
  if (isWellnessAssessmentRequest(userMessage)) {
    const assessmentResponse = startWellnessAssessment();
    updateAIContextTracking(assessmentResponse, 'assessment');
    return assessmentResponse;
  } else if (conversationContext.assessmentInProgress) {
    const assessmentResponse = continueWellnessAssessment(userMessage);
    updateAIContextTracking(assessmentResponse, 'assessment');
    return assessmentResponse;
  }
  
  // Analyze for symptoms
  analyzeForSymptoms(userMessage);

  const assessmentPrompt = maybeOfferAssessment();
  if (assessmentPrompt) {
    conversationContext.assessmentPrompted = true;
    conversationContext.messages.push({
      role: 'assistant',
      content: assessmentPrompt,
      timestamp: new Date().toISOString(),
      intent: 'assessment_offer',
      responseId: 'assessment_offer_' + Date.now()
    });
    updateAIContextTracking(assessmentPrompt, 'assessment_offer');
    return assessmentPrompt;
  }
  
  // Generate contextual response
  let response = selectResponse(intent, conversationContext);
  
  // Add personalization based on conversation history
  if (conversationContext.messages.length > 1) {
    response = personalizeResponse(response, intent);
  }
  
  // Add to conversation context
  conversationContext.messages.push({
    role: 'assistant',
    content: response,
    timestamp: new Date().toISOString(),
    intent: intent,
    responseId: lastResponseId
  });
  
  // Track the AI question and intent for contextual responses
  updateAIContextTracking(response, intent);
  
  // Add feedback prompt and learning opportunities
  const responseWithFeedback = response + addFeedbackPrompt();
  
  // Check for learning opportunities
  const learningPrompt = checkForLearningOpportunities();
  if (learningPrompt) {
    return responseWithFeedback + learningPrompt;
  }
  
  return responseWithFeedback;
}

/**
 * Update AI context tracking for future conversational awareness
 */
function updateAIContextTracking(response, intent) {
  // Extract questions from the response
  const questionMatch = response.match(/[^.!]*\?[^.!]*/g);
  if (questionMatch && questionMatch.length > 0) {
    conversationContext.conversationFlow.lastAIQuestion = questionMatch[questionMatch.length - 1].trim();
  }
  
  // Track the intent of the AI's response
  conversationContext.conversationFlow.lastAIIntent = intent;
  
  // Update last topic discussed if it's a mental health topic
  if (intent && ['anxiety', 'depression', 'ptsd', 'adhd', 'bipolar', 'ocd', 'sleep'].includes(intent)) {
    conversationContext.conversationFlow.lastTopicDiscussed = intent;
  }
  
  // Only reset short response count when AI provides substantial content (not just acknowledging short responses)
  // Don't reset if this is a contextual acknowledgment response
  if (questionMatch && questionMatch.length > 0 && intent !== 'acknowledgment') {
    conversationContext.conversationFlow.shortResponseCount = 0;
  }
}

/**
 * Add feedback prompt to responses
 */
function addFeedbackPrompt() {
  // Only prompt every 20 user questions
  if ((conversationContext.questionCount || 0) % 20 !== 0) {
    return '';
  }

  const recentMessages = conversationContext.messages.slice(-6);
  const hasFeedbackPrompt = recentMessages.some(m =>
    m.content && m.content.includes('Was this helpful?')
  );
  
  if (hasFeedbackPrompt) {
    return '';
  }
  
  awaitingFeedback = true;
  
  // Create unique IDs for this feedback prompt
  const feedbackId = 'feedback_' + Date.now();
  
  setTimeout(() => {
    // Add event listeners after the HTML is rendered
    const helpfulBtn = document.getElementById(feedbackId + '_helpful');
    const notHelpfulBtn = document.getElementById(feedbackId + '_not_helpful');
    
    if (helpfulBtn) {
      helpfulBtn.addEventListener('click', () => provideFeedback('helpful'));
    }
    if (notHelpfulBtn) {
      notHelpfulBtn.addEventListener('click', () => provideFeedback('not_helpful'));
    }
  }, 100);
  
  return `

<div class="feedback-prompt" style="background: #f0f8ff; border: 1px solid #b3d9ff; border-radius: 8px; padding: 12px; margin-top: 10px;">
  <strong>Was this helpful?</strong> 
  <div style="margin-top: 8px;">
    <span id="${feedbackId}_helpful" style="cursor: pointer; background: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px; margin-right: 8px;">Yes</span>
    <span id="${feedbackId}_not_helpful" style="cursor: pointer; background: #f44336; color: white; padding: 4px 8px; border-radius: 4px;">👎 No</span>
  </div>
  <small style="color: #666; margin-top: 8px; display: block;">Your feedback helps me improve my responses.</small>
</div>`;
}

/**
 * Handle user feedback on AI responses
 */
function handleUserFeedback(feedbackMessage) {
  awaitingFeedback = false;
  const feedback = feedbackMessage.toLowerCase().trim();
  
  if (!lastResponseId) {
    return "Thank you for the feedback! I'll continue to improve.";
  }
  
  // Initialize metrics if not exists
  if (!learningData.responseMetrics[lastResponseId]) {
    learningData.responseMetrics[lastResponseId] = {
      helpfulCount: 0,
      notHelpfulCount: 0,
      engagementScore: 0
    };
  }
  
  let responseText = '';
  
  if (feedback.includes('helpful') || feedback.includes('yes') || feedback.includes('good')) {
    learningData.responseMetrics[lastResponseId].helpfulCount++;
    learningData.userProfile.engagementHistory.push({
      responseId: lastResponseId,
      feedback: 'positive',
      timestamp: new Date().toISOString()
    });
    
    // More grateful and warm responses
    const gratefulResponses = [
      "Thank you so much! That really means a lot to me. I'm learning and getting better at supporting people like you through our conversations.",
      "I'm genuinely grateful for that feedback—it helps me understand what's most helpful for you and others. Thank you for taking the time to let me know.",
      "That's wonderful to hear! Your feedback is so valuable in helping me learn how to be more supportive. I really appreciate you teaching me.",
      "Thank you for helping me get better! Every piece of feedback like yours helps me understand how to be more helpful in future conversations.",
      "I'm so glad that resonated with you. Thank you for letting me know—it helps me learn what works and what feels supportive."
    ];
    
    responseText = gratefulResponses[Math.floor(Math.random() * gratefulResponses.length)];
  } else if (feedback.includes('not helpful') || feedback.includes('no') || feedback.includes('bad') || feedback.includes('👎')) {
    learningData.responseMetrics[lastResponseId].notHelpfulCount++;
    learningData.userProfile.engagementHistory.push({
      responseId: lastResponseId,
      feedback: 'negative',
      timestamp: new Date().toISOString()
    });
    
    responseText = "I'm sorry that wasn't helpful. Could you tell me what would have been more helpful? I'll learn from this for future responses.";
    
    // Prompt for better response
    awaitingFeedback = true; // Keep waiting for the better response suggestion
    
    return responseText + `
    
<div class="improvement-prompt" style="background: #fff3e0; border: 1px solid #ffcc80; border-radius: 8px; padding: 12px; margin-top: 10px;">
  <strong>Help me improve:</strong> What would have been a better response?
  <br><small style="color: #666;">Your suggestion will help me respond better to similar situations in the future.</small>
</div>`;
  } else {
    // Check if this is a suggested improvement
    if (conversationContext.messages.length > 0) {
      const lastAssistantMessage = conversationContext.messages
        .filter(m => m.role === 'assistant')
        .slice(-1)[0];
      
      if (lastAssistantMessage && lastAssistantMessage.content.includes('what would have been a better response')) {
        return handleResponseImprovement(feedbackMessage);
      }
    }
    
    responseText = "Thank you for the feedback! I'll continue to learn and improve.";
  }
  
  learningData.userProfile.lastFeedbackDate = new Date().toISOString();
  saveLearningData();
  
  return responseText;
}

/**
 * Handle user suggestions for better responses
 */
function handleResponseImprovement(suggestedResponse) {
  awaitingFeedback = false;
  
  if (!lastResponseId || suggestedResponse.length < 10) {
    return "Thank you for trying to help me improve. I'll keep learning from our conversations.";
  }
  
  // Find the original response to get its intent
  const originalMessage = conversationContext.messages.find(m => 
    m.responseId === lastResponseId
  );
  
  if (originalMessage && originalMessage.intent) {
    const intent = originalMessage.intent;
    
    // Store the improved response
    const improvedResponseId = 'improved_' + Date.now();
    learningData.learnedResponses[intent].push({
      id: improvedResponseId,
      response: suggestedResponse,
      userSuggested: true,
      originalResponseId: lastResponseId,
      dateAdded: new Date().toISOString(),
      helpfulCount: 1, // Start with positive score since user suggested it
      notHelpfulCount: 0,
      source: 'user_improvement'
    });
    
    saveLearningData();
    
    const improvementResponses = [
      `Thank you so much for taking the time to teach me! I've learned from your suggestion and will use similar approaches for ${intent} topics in the future. Your patience in helping me improve means a lot.`,
      `This is incredibly helpful—thank you for showing me a better way to respond. I've saved your suggestion and will remember this for similar conversations. I really appreciate you helping me grow.`,
      `Wow, that's so much better! Thank you for teaching me. I've learned from your example and will use similar language when talking about ${intent} in the future. You're helping me become more supportive.`,
      `I'm genuinely grateful for your guidance. Your suggestion helps me understand what feels more helpful and human. I've saved this to improve future conversations about ${intent}.`,
      `Thank you for being so thoughtful in helping me improve! I've learned from your example and will use similar approaches going forward. Your feedback makes me better at supporting others.`
    ];
    
    return improvementResponses[Math.floor(Math.random() * improvementResponses.length)];
  }
  
  return "Thank you for the suggestion. I'll keep improving based on your feedback.";
}

/**
 * Check for learning opportunities
 */
function checkForLearningOpportunities() {
  // Occasionally ask users to categorize unrecognized messages
  if (learningData.unrecognizedMessages.length > 0 && Math.random() < 0.1) {
    const unrecognized = learningData.unrecognizedMessages.find(m => m.needsCategorization);
    
    if (unrecognized) {
      return `

<div class="learning-prompt" style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 12px; margin-top: 15px;">
  <strong>Help me learn:</strong> I didn't fully understand this message: "${unrecognized.message}"
  <br><br>
  <strong>Is this about:</strong> anxiety, depression, PTSD, ADHD, bipolar, OCD, sleep, medication, or something else?
  <br><small style="color: #666;">Type "Category: [topic]" to help me learn. This helps me understand similar messages better.</small>
</div>`;
    }
  }
  
  return '';
}

/**
 * Handle user categorization of unrecognized messages
 */
function handleMessageCategorization(categorizationMessage) {
  const parts = categorizationMessage.split(':');
  if (parts.length < 2) {
    return "I didn't understand the categorization. Please use the format 'Category: [topic]' like 'Category: anxiety'.";
  }
  
  const category = parts[1].trim().toLowerCase();
  const validCategories = ['anxiety', 'depression', 'ptsd', 'adhd', 'bipolar', 'ocd', 'sleep', 'medication', 'general'];
  
  if (!validCategories.includes(category)) {
    return `I don't recognize "${category}" as a category. Please use one of: ${validCategories.join(', ')}.`;
  }
  
  // Find the unrecognized message that needs categorization
  const unrecognizedIndex = learningData.unrecognizedMessages.findIndex(m => m.needsCategorization);
  
  if (unrecognizedIndex === -1) {
    return "Thank you! I don't have any messages waiting for categorization right now.";
  }
  
  const messageToLearn = learningData.unrecognizedMessages[unrecognizedIndex];
  
  // Create a learned pattern from the message
  const learnedPattern = {
    pattern: escapeRegExp(messageToLearn.message.toLowerCase()),
    userProvided: true,
    dateAdded: new Date().toISOString(),
    useCount: 0,
    source: 'user_categorization'
  };
  
  // Add to learned patterns
  if (!learningData.learnedPatterns[category]) {
    learningData.learnedPatterns[category] = [];
  }
  learningData.learnedPatterns[category].push(learnedPattern);
  
  // Mark as categorized
  learningData.unrecognizedMessages[unrecognizedIndex].needsCategorization = false;
  learningData.unrecognizedMessages[unrecognizedIndex].categorizedAs = category;
  learningData.unrecognizedMessages[unrecognizedIndex].categorizedDate = new Date().toISOString();
  
  saveLearningData();
  
  return `Perfect! I've learned that "${messageToLearn.message}" relates to ${category}. I'll recognize similar messages better in the future. Thank you for helping me improve!`;
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Personalize responses based on conversation history
// Enhanced personalization based on conversation history and context
function personalizeResponse(response, intent) {
  const recentMessages = conversationContext.messages.slice(-10);
  const userMessages = recentMessages.filter(m => m.role === 'user');
  const previousTopics = conversationContext.userPreferences.previousTopics || [];
  
  // Track this topic for future reference
  if (intent && intent !== 'general' && intent !== 'greeting' && intent !== 'acknowledgment' && intent !== 'clarification') {
    if (!previousTopics.includes(intent)) {
      conversationContext.userPreferences.previousTopics.push(intent);
      if (conversationContext.userPreferences.previousTopics.length > 10) {
        conversationContext.userPreferences.previousTopics.shift();
      }
    }
  }
  
  // Check for recurring topics to provide continuity
  const topicHistory = {};
  recentMessages.forEach(m => {
    if (m.intent && m.intent !== 'general' && m.intent !== 'greeting') {
      topicHistory[m.intent] = (topicHistory[m.intent] || 0) + 1;
    }
  });
  
  // Add personalization based on conversation patterns
  let personalizedResponse = response;
  
  // Reference previous conversations about similar topics
  if (previousTopics.includes(intent) && userMessages.length > 3) {
    const continuityPhrases = [
      "I remember we've talked about this before. ",
      "Building on our previous conversation about this, ",
      "As we discussed earlier, ",
      "Following up on what you shared before, "
    ];
    
    // Add continuity phrase 30% of the time to avoid being repetitive
    if (Math.random() < 0.3) {
      const phrase = continuityPhrases[Math.floor(Math.random() * continuityPhrases.length)];
      personalizedResponse = phrase + personalizedResponse.charAt(0).toLowerCase() + personalizedResponse.slice(1);
    }
  }
  
  // Add empathetic acknowledgment based on conversation length
  if (userMessages.length > 4) {
    const empathyPhrases = [
      "I've been listening to what you've shared, and ",
      "Thank you for continuing to trust me with this. ",
      "I can see this is important to you. "
    ];
    
    if (Math.random() < 0.2) {
      const phrase = empathyPhrases[Math.floor(Math.random() * empathyPhrases.length)];
      personalizedResponse = phrase + personalizedResponse.charAt(0).toLowerCase() + personalizedResponse.slice(1);
    }
  }
  
  return personalizedResponse;
}

// Generate general supportive response
function generateGeneralResponse(context) {
  const generalResponses = [
    "I'm here to listen and support you. What's on your mind?",
    "Thank you for sharing that with me. How are you feeling right now?",
    "I appreciate you opening up. What would be most helpful for you to talk about?",
    "I'm here to help however I can. What's been weighing on your mind lately?",
    "It sounds like you have something important to share. I'm listening."
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

// All existing helper functions remain the same...
function getMedicationInfoFromMessage(message) {
  const lowerMessage = message.toLowerCase();

  // First, look for specific medication names or their generic equivalents
  for (const [key, med] of Object.entries(window.medicationDatabase || {})) {
    const medName = med.name.toLowerCase();
    if (lowerMessage.includes(key) || lowerMessage.includes(medName)) {
      return med;
    }

    // Check for generic name within parentheses, e.g. "Prozac (Fluoxetine)"
    const genericMatch = medName.match(/\(([^)]+)\)/);
    if (genericMatch && lowerMessage.includes(genericMatch[1].toLowerCase())) {
      return med;
    }

    // Check individual words from the medication name for partial matches
    const medWords = medName.replace(/[()]/g, ' ').split(/\s+/);
    if (medWords.some(word => word.length > 3 && lowerMessage.includes(word))) {
      return med;
    }
  }

  // Then look for medication-related keywords with context
  const medicationKeywords = [
    'medication', 'medicine', 'pill', 'drug', 'prescription', 'antidepressant',
    'taking', 'prescribed', 'side effect', 'dose', 'dosage'
  ];

  const hasMedicationContext = medicationKeywords.some(keyword =>
    lowerMessage.includes(keyword)
  );

  if (hasMedicationContext) {
    // Look for medication names in context using partial word matching
    for (const [key, med] of Object.entries(window.medicationDatabase || {})) {
      const medWords = med.name.toLowerCase().replace(/[()]/g, ' ').split(/\s+/);
      if (medWords.some(word => word.length > 3 && lowerMessage.includes(word))) {
        return med;
      }
    }
  }

  return null;
}

function generateMedicationResponse(medicationInfo) {
  return `
    <div class="medication-info">
      <h3>${medicationInfo.name}</h3>
      <p><strong>Type:</strong> ${medicationInfo.type}</p>
      <p><strong>Common Uses:</strong> ${medicationInfo.commonUses.join(', ')}</p>
      <p><strong>Common Side Effects:</strong> ${medicationInfo.commonSideEffects.join(', ')}</p>
      <p><strong>Important Notes:</strong> ${medicationInfo.importantNotes}</p>
      <div class="medication-warning">
        <strong>⚠️ Important:</strong> ${medicationInfo.warning}
      </div>
      <p><small><em>This information is for educational purposes only. Always consult with your healthcare provider about your medications.</em></small></p>
    </div>
  `;
}

// Mental Health Services Information Functions
function getServiceInfoFromMessage(userMessage) {
  if (!window.fallbackData || !window.fallbackData.dictionary) return null;
  
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for service walkthrough requests
  const walkthroughKeywords = [
    'walk me through', 'how does', 'what happens in', 'what to expect',
    'step by step', 'process', 'procedure', 'what\'s it like', 'typical day'
  ];
  
  const isWalkthroughRequest = walkthroughKeywords.some(keyword => 
    lowerMessage.includes(keyword)
  );
  
  // Check for specific services mentioned
  const services = {
    'php': ['php', 'partial hospitalization program', 'partial hospitalization'],
    'iop': ['iop', 'intensive outpatient program', 'intensive outpatient'],
    'op': ['op', 'outpatient program', 'outpatient treatment'],
    'crisis stabilization': ['crisis stabilization', 'crisis intervention', 'crisis support'],
    'inpatient program': ['inpatient program', 'inpatient treatment', 'inpatient care'],
    'residential treatment': ['residential treatment', 'residential care', 'residential program'],
    'mat': ['mat', 'medication assisted treatment', 'medication-assisted treatment'],
    'telehealth': ['telehealth', 'teletherapy', 'online therapy', 'virtual therapy'],
    'aftercare': ['aftercare', 'continuing care'],
    'relapse prevention': ['relapse prevention']
  };
  
  for (const [serviceKey, serviceTerms] of Object.entries(services)) {
    for (const term of serviceTerms) {
      if (lowerMessage.includes(term)) {
        if (isWalkthroughRequest && window.fallbackData.walkthroughs && window.fallbackData.walkthroughs[serviceKey]) {
          return generateServiceWalkthrough(serviceKey);
        } else if (window.fallbackData.dictionary[serviceKey]) {
          return generateServiceDefinition(serviceKey);
        }
      }
    }
  }
  
  // Handle single service acronyms or names with no other context
  const singleServicePattern = /^(php|iop|op|mat)$/i;
  const match = lowerMessage.trim().match(singleServicePattern);
  if (match) {
    const service = match[1].toLowerCase();
    return generateServiceDefinition(service);
  }
  
  return null;
}

function generateServiceDefinition(serviceKey) {
  const definition = window.fallbackData.dictionary[serviceKey];
  if (!definition) return null;
  
  const serviceName = serviceKey.toUpperCase() === serviceKey ? serviceKey : 
    serviceKey.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const hasWalkthrough = window.fallbackData.walkthroughs && window.fallbackData.walkthroughs[serviceKey];
  const walkthroughOffer = hasWalkthrough ? 
    `\n\nWould you like me to walk you through what to expect in a ${serviceName} step by step?` : '';
  
  return `**${serviceName}:**\n\n${definition}${walkthroughOffer}\n\nI can also answer questions about admissions, daily schedules, insurance coverage, or other aspects of ${serviceName}. What would you like to know more about?`;
}

function generateServiceWalkthrough(serviceKey) {
  const walkthrough = window.fallbackData.walkthroughs[serviceKey];
  if (!walkthrough) return null;
  
  const serviceName = serviceKey === 'php' || serviceKey === 'iop' || serviceKey === 'op' || serviceKey === 'mat' ? 
    serviceKey.toUpperCase() : 
    serviceKey.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const steps = walkthrough.map((step, idx) => `${idx + 1}. ${step}`).join('\n\n');
  
  return `**Here's what you can expect in a ${serviceName}:**\n\n${steps}\n\nThis gives you a general overview of the process. Each program may vary slightly, and your treatment team will work with you to personalize your experience. Do you have any specific questions about any of these steps?`;
}

function generateMedicationResponse(medicationInfo) {
  return `
    <div class="medication-info">
      <h3>${medicationInfo.name}</h3>
      <p><strong>Type:</strong> ${medicationInfo.type}</p>
      <p><strong>Common Uses:</strong> ${medicationInfo.commonUses.join(', ')}</p>
      <p><strong>Common Side Effects:</strong> ${medicationInfo.commonSideEffects.join(', ')}</p>
      <p><strong>Important Notes:</strong> ${medicationInfo.importantNotes}</p>
      <div class="medication-warning">
        <strong>⚠️ Important:</strong> ${medicationInfo.warning}
      </div>
      <p><small><em>This information is for educational purposes only. Always consult with your healthcare provider about your medications.</em></small></p>
    </div>
  `;
}

// Wellness Assessment Functions (keeping all existing logic)
function isWellnessAssessmentRequest(message) {
  const lowerMessage = message.toLowerCase();
  const assessmentKeywords = [
    'assessment', 'evaluate', 'check', 'test', 'screening', 'questionnaire',
    'how am i doing', 'mental health check', 'wellness check'
  ];
  
  return assessmentKeywords.some(keyword => lowerMessage.includes(keyword));
}

function startWellnessAssessment() {
  conversationContext.assessmentInProgress = true;
  conversationContext.assessmentStage = 1;
  
  return `
    <div class="wellness-assessment">
      <h3>Mental Health Wellness Check</h3>
      <p>I'll ask you a few questions to better understand how you're feeling. This is not a diagnostic tool, but it can help identify areas where you might benefit from support.</p>
      <p><strong>Question 1 of 5:</strong> Over the past two weeks, how often have you felt down, depressed, or hopeless?</p>
      <p>Please respond with: Never, Several days, More than half the days, or Nearly every day</p>
    </div>
  `;
}

function continueWellnessAssessment(userResponse) {
  conversationContext.assessmentResponses[conversationContext.assessmentStage] = userResponse;
  conversationContext.assessmentStage++;
  
  switch (conversationContext.assessmentStage) {
    case 2:
      return `
        <div class="wellness-assessment">
          <p><strong>Question 2 of 5:</strong> Over the past two weeks, how often have you had little interest or pleasure in doing things?</p>
          <p>Please respond with: Never, Several days, More than half the days, or Nearly every day</p>
        </div>
      `;
    case 3:
      return `
        <div class="wellness-assessment">
          <p><strong>Question 3 of 5:</strong> Over the past two weeks, how often have you felt nervous, anxious, or on edge?</p>
          <p>Please respond with: Never, Several days, More than half the days, or Nearly every day</p>
        </div>
      `;
    case 4:
      return `
        <div class="wellness-assessment">
          <p><strong>Question 4 of 5:</strong> Over the past two weeks, how often have you had trouble falling asleep, staying asleep, or sleeping too much?</p>
          <p>Please respond with: Never, Several days, More than half the days, or Nearly every day</p>
        </div>
      `;
    case 5:
      return `
        <div class="wellness-assessment">
          <p><strong>Question 5 of 5:</strong> Over the past two weeks, how often have you had trouble concentrating on things?</p>
          <p>Please respond with: Never, Several days, More than half the days, or Nearly every day</p>
        </div>
      `;
    default:
      conversationContext.assessmentInProgress = false;
      return generateAssessmentResults();
  }
}

function generateAssessmentResults() {
  const responses = conversationContext.assessmentResponses;
  let score = 0;
  
  for (let i = 1; i <= 5; i++) {
    const response = responses[i]?.toLowerCase() || '';
    if (response.includes('several days')) score += 1;
    if (response.includes('more than half')) score += 2;
    if (response.includes('nearly every day')) score += 3;
  }
  
  let interpretation = '';
  let resources = '';
  
  if (score <= 4) {
    interpretation = 'Your responses suggest you may be experiencing minimal symptoms. This is positive!';
    resources = 'Continue with self-care practices like regular exercise, good sleep hygiene, and maintaining social connections.';
  } else if (score <= 9) {
    interpretation = 'Your responses suggest you may be experiencing mild symptoms that could benefit from attention.';
    resources = 'Consider talking to a mental health professional, practicing stress management techniques, and maintaining healthy lifestyle habits.';
  } else if (score <= 14) {
    interpretation = 'Your responses suggest you may be experiencing moderate symptoms.';
    resources = 'I recommend speaking with a mental health professional. Consider therapy, support groups, and ensure you have a strong support system.';
  } else {
    interpretation = 'Your responses suggest you may be experiencing significant symptoms.';
    resources = 'Please consider reaching out to a mental health professional soon. If you\'re having thoughts of self-harm, contact 988 (Suicide & Crisis Lifeline) immediately.';
  }
  
  return `
    <div class="wellness-assessment">
      <h3>Assessment Results</h3>
      <p><strong>Interpretation:</strong> ${interpretation}</p>
      <p><strong>Recommendations:</strong> ${resources}</p>
      <p><em>This assessment is not a diagnostic tool and should not replace professional evaluation.</em></p>
      <p><strong>Crisis Resources:</strong> If you're having thoughts of self-harm, please call 988 (Suicide & Crisis Lifeline).</p>
    </div>
  `;
}

function analyzeForSymptoms(message) {
  const lowerMessage = message.toLowerCase();
  
  const symptomPatterns = {
    depression: ['sad', 'depressed', 'hopeless', 'worthless', 'empty', 'numb', 'tired', 'fatigue'],
    anxiety: ['anxious', 'worried', 'nervous', 'panic', 'fear', 'restless', 'racing thoughts'],
    ptsd: ['trauma', 'flashback', 'nightmare', 'triggered', 'hypervigilant'],
    adhd: ['can\'t focus', 'distracted', 'fidgeting', 'impulsive', 'disorganized'],
    bipolar: ['manic', 'mood swings', 'elevated mood', 'grandiose'],
    ocd: ['obsessive', 'compulsive', 'rituals', 'checking', 'intrusive thoughts', 'contamination'],
    sleep: ['insomnia', 'can\'t sleep', 'nightmares', 'tired', 'exhausted', 'sleep problems']
  };
  
  for (const [condition, symptoms] of Object.entries(symptomPatterns)) {
    symptoms.forEach(symptom => {
      if (lowerMessage.includes(symptom)) {
        if (!conversationContext.detectedSymptoms[condition]) {
          conversationContext.detectedSymptoms[condition] = [];
        }
        if (!conversationContext.detectedSymptoms[condition].includes(symptom)) {
          conversationContext.detectedSymptoms[condition].push(symptom);
        }
      }
    });
  }
}

function getTherapyQuestion(condition) {
  if (!window.therapySpeech) return '';
  const data = window.therapySpeech[condition] || window.therapySpeech.general;
  if (!data || !Array.isArray(data.diagnosticQuestions)) return '';
  const questions = data.diagnosticQuestions;
  return questions[Math.floor(Math.random() * questions.length)];
}

function maybeOfferAssessment() {
  if (conversationContext.assessmentInProgress || conversationContext.assessmentPrompted) {
    return '';
  }

  for (const [cond, symptoms] of Object.entries(conversationContext.detectedSymptoms)) {
    if (symptoms && symptoms.length >= 2) {
      const question = getTherapyQuestion(cond);
      const prompt = question ? `${question} Would you like to do a quick wellness assessment?` :
        'Would you like to do a quick wellness assessment to check in on how you\'re feeling?';
      return prompt;
    }
  }
  return '';
}

// UI Helper Functions
function showAILoading() {
  const loadingDiv = document.getElementById('aiLoading');
  if (loadingDiv) {
    loadingDiv.style.display = 'flex';
  }
}

function hideAILoading() {
  const loadingDiv = document.getElementById('aiLoading');
  if (loadingDiv) {
    loadingDiv.style.display = 'none';
  }
}

function updateProgress(percent, text) {
  const progressFill = document.getElementById('progressFill');
  const loadingText = document.getElementById('loadingText');
  
  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }
  
  if (loadingText) {
    loadingText.textContent = text || 'Loading...';
  }
}

function showAIErrorNotification(message) {
  console.warn('AI Error:', message);
}

function showAISuccessNotification() {
  console.log('Smart AI loaded successfully');
}

function updateAIStatusIndicator(status, message) {
  const statusIndicator = document.getElementById('aiStatusIndicator');
  if (statusIndicator) {
    statusIndicator.className = `ai-status ${status}`;
    statusIndicator.textContent = message;
  }
}

function hideAIStatusIndicator() {
  const statusIndicator = document.getElementById('aiStatusIndicator');
  if (statusIndicator) {
    statusIndicator.style.display = 'none';
  }
}

function showFallbackModeNotification() {
  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages) {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'message bot smart-ai-info';
    infoDiv.innerHTML = `
      <div class="message-content">
        <div class="message-text">
          <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
            <strong>Smart AI Ready!</strong><br>
            <small style="color: #2e7d32;">
              I'm powered by advanced pattern recognition and have comprehensive knowledge about mental health conditions, medications, and therapeutic approaches. I can provide personalized support and guidance.
            </small>
          </div>
          Hello! I'm your smart mental health assistant. I'm here to provide personalized support, answer questions about mental health conditions and medications, and help you navigate your wellness journey. What would you like to talk about today?
        </div>
      </div>
    `;
    chatMessages.appendChild(infoDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Initialize Smart AI when the page loads
async function initializeAIChat() {
  try {
    console.log('Starting Smart AI initialization...');
    updateAIStatusIndicator('loading', 'Initializing Smart AI...');
    
    // Initialize the smart AI system
    await initializeAI();
    
  } catch (error) {
    console.log('Smart AI initialization encountered an issue:', error.message);
    
    // Even if there's an error, the system should work
    hideAILoading();
    isAILoaded = true; // Set to true because our smart system doesn't depend on external resources
    updateAIStatusIndicator('ai-active', 'Smart AI Active');
    showFallbackModeNotification();
  }
}

// Export functions for global access
window.initializeAIChat = initializeAIChat;
window.generateAIResponse = generateAIResponse;
window.showAILoading = showAILoading;
window.hideAILoading = hideAILoading;
window.updateProgress = updateProgress;
window.showAIErrorNotification = showAIErrorNotification;
window.showAISuccessNotification = showAISuccessNotification;
window.updateAIStatusIndicator = updateAIStatusIndicator;
window.hideAIStatusIndicator = hideAIStatusIndicator;

// Export new learning functions
window.provideFeedback = provideFeedback;
window.saveLearningData = saveLearningData;
window.loadLearningData = loadLearningData;
window.resetLearningData = resetLearningData;
window.maybeOfferAssessment = maybeOfferAssessment;
window.conversationContext = conversationContext;

/**
 * Add a temporary thinking message to show AI is processing
 */
window.addThinkingMessage = function(message) {
  // Only work in browser environment
  if (typeof document === 'undefined') {
    return;
  }
  
  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages) {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'message bot thinking-message';
    thinkingDiv.innerHTML = `
      <div class="message-content">
        <div class="message-text" style="font-style: italic; color: #666; opacity: 0.8;">
          ${message}
        </div>
      </div>
    `;
    chatMessages.appendChild(thinkingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Remove thinking message after delay to replace with actual response
    setTimeout(() => {
      if (thinkingDiv.parentNode) {
        thinkingDiv.remove();
      }
    }, 2500);
  }
};

/**
 * Global function for providing feedback (called from HTML)
 */
function provideFeedback(feedbackType) {
  // Process the feedback
  const feedbackMessage = feedbackType === 'helpful' ? 'helpful' : 'not helpful';
  
  // Handle the feedback in the AI system
  const response = handleUserFeedback(feedbackMessage);
  
  // Only update chat interface in browser environment
  if (typeof document !== 'undefined') {
    // Update the chat interface to show the feedback was received
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
      // Add user feedback message
      const feedbackDiv = document.createElement('div');
      feedbackDiv.className = 'message user feedback-response';
      feedbackDiv.innerHTML = `
        <div class="message-content">
          <div class="message-text">
            ${feedbackType === 'helpful' ? 'This was helpful' : 'This was not helpful'}
          </div>
        </div>
      `;
      chatMessages.appendChild(feedbackDiv);
      
      // Add AI response to the feedback
      const aiResponseDiv = document.createElement('div');
      aiResponseDiv.className = 'message bot';
      aiResponseDiv.innerHTML = `
        <div class="message-content">
          <div class="message-text">${response}</div>
        </div>
      `;
      chatMessages.appendChild(aiResponseDiv);
      
      // Remove the feedback prompt by finding and hiding it
      const feedbackPrompts = chatMessages.querySelectorAll('.feedback-prompt');
      feedbackPrompts.forEach(prompt => {
        prompt.style.display = 'none';
      });
      
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
  
  return response;
}
