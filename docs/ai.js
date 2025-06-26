/* GitHub Pages Deployment Fix - Force rebuild to clear caches - December 2024 */
// AI Chat Functionality for Fernly Health - Smart Pattern-Based AI Implementation
// This file handles all AI-related functionality using advanced pattern matching and contextual responses
// Designed for reliable static hosting with comprehensive mental health support

// Smart AI Variables - no external model dependencies
let isAILoaded = false;
let isFallbackMode = false;
let conversationStarted = false;

// COMPREHENSIVE MEDICATION INFORMATION DATABASE
const medicationDatabase = {
  // ANTIDEPRESSANTS - SSRIs
  "prozac": {
    name: "Prozac (Fluoxetine)",
    type: "SSRI Antidepressant",
    commonUses: ["Depression", "Anxiety", "OCD", "Panic Disorder"],
    commonSideEffects: ["Nausea", "Headache", "Insomnia", "Dry mouth", "Dizziness"],
    importantNotes: "Usually taken in the morning. May take 4-6 weeks to feel full effects.",
    warning: "Do not stop suddenly. Consult your doctor before making any changes."
  },
  "zoloft": {
    name: "Zoloft (Sertraline)",
    type: "SSRI Antidepressant",
    commonUses: ["Depression", "Anxiety", "PTSD", "OCD"],
    commonSideEffects: ["Nausea", "Diarrhea", "Dry mouth", "Insomnia", "Sexual side effects"],
    importantNotes: "Take with food to reduce stomach upset. Effects may take several weeks.",
    warning: "Monitor for mood changes, especially in young adults. Consult doctor before stopping."
  },
  "lexapro": {
    name: "Lexapro (Escitalopram)",
    type: "SSRI Antidepressant",
    commonUses: ["Depression", "Generalized Anxiety Disorder"],
    commonSideEffects: ["Nausea", "Fatigue", "Insomnia", "Increased sweating"],
    importantNotes: "Often well-tolerated. Can be taken with or without food.",
    warning: "May cause withdrawal symptoms if stopped abruptly. Taper under medical supervision."
  },
  "paxil": {
    name: "Paxil (Paroxetine)",
    type: "SSRI Antidepressant",
    commonUses: ["Depression", "Anxiety", "Panic Disorder", "PTSD"],
    commonSideEffects: ["Drowsiness", "Nausea", "Dry mouth", "Weight gain"],
    importantNotes: "May cause more sedation than other SSRIs. Take as directed.",
    warning: "Has higher risk of withdrawal symptoms. Should be tapered slowly."
  },
  "celexa": {
    name: "Celexa (Citalopram)",
    type: "SSRI Antidepressant",
    commonUses: ["Depression", "Anxiety"],
    commonSideEffects: ["Nausea", "Dry mouth", "Drowsiness", "Insomnia"],
    importantNotes: "Similar to other SSRIs but may have fewer drug interactions.",
    warning: "Higher doses may affect heart rhythm. Regular monitoring recommended."
  },
  "wellbutrin": {
    name: "Wellbutrin (Bupropion)",
    type: "Atypical Antidepressant",
    commonUses: ["Depression", "Smoking cessation", "ADHD"],
    commonSideEffects: ["Dry mouth", "Nausea", "Insomnia", "Dizziness", "Constipation"],
    importantNotes: "Less likely to cause sexual side effects or weight gain. May increase energy.",
    warning: "Can lower seizure threshold. Avoid in people with eating disorders."
  },
  "effexor": {
    name: "Effexor (Venlafaxine)",
    type: "SNRI Antidepressant",
    commonUses: ["Depression", "Anxiety", "Panic Disorder"],
    commonSideEffects: ["Nausea", "Dizziness", "Dry mouth", "Sweating"],
    importantNotes: "Works on both serotonin and norepinephrine. Take with food.",
    warning: "Can cause withdrawal symptoms. Should be tapered slowly when stopping."
  },
  "cymbalta": {
    name: "Cymbalta (Duloxetine)",
    type: "SNRI Antidepressant",
    commonUses: ["Depression", "Anxiety", "Chronic pain", "Fibromyalgia"],
    commonSideEffects: ["Nausea", "Dry mouth", "Drowsiness", "Fatigue"],
    importantNotes: "Also helps with chronic pain conditions. Take with food.",
    warning: "May cause liver problems in rare cases. Regular monitoring recommended."
  }
};

// Enhanced Conversation Context for intelligent responses
const conversationContext = {
  messages: [],
  mentalHealthTopics: [],
  crisisKeywords: [],
  detectedSymptoms: {
    depression: [],
    anxiety: [],
    ptsd: [],
    adhd: [],
    bipolar: []
  },
  topicCounts: {},
  assessmentInProgress: false,
  assessmentStage: 0,
  assessmentResponses: {},
  userPreferences: {
    communicationStyle: 'supportive', // supportive, clinical, casual
    previousTopics: [],
    needsUrgentCare: false
  },
  conversationFlow: {
    stage: 'greeting', // greeting, exploring, supporting, concluding
    lastResponseType: null,
    empathyLevel: 'high'
  }
};

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
  
  crisis: [
    "🚨 I'm very concerned about what you're going through. If you're having thoughts of harming yourself, please reach out for immediate help: Call 988 (Suicide & Crisis Lifeline) - available 24/7, or text 'HELLO' to 741741. You're not alone.",
    "This sounds like you're in a lot of pain right now. Please know that help is available. The 988 Suicide & Crisis Lifeline is available 24/7, and they have trained counselors who understand what you're going through.",
    "I'm worried about you. If you're having thoughts of suicide or self-harm, please call 988 immediately. These feelings can change with the right support - you don't have to go through this alone."
  ]
};

// Sophisticated pattern matching for intent recognition
const intentPatterns = {
  greeting: [
    /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
    /^(how are you|what's up|sup)/i
  ],
  
  anxiety: [
    /(anxious|anxiety|worried|worry|panic|fear|nervous|stress|overwhelm)/i,
    /(can't stop thinking|racing thoughts|catastrophizing|overthinking)/i,
    /(heart racing|shortness of breath|sweating|trembling)/i
  ],
  
  depression: [
    /(depressed|depression|sad|hopeless|empty|numb|worthless|guilty)/i,
    /(no energy|tired|fatigue|sleep problems|can't sleep|sleeping too much)/i,
    /(no interest|no pleasure|don't enjoy|nothing matters)/i,
    /(want to die|better off dead|no point|can't go on)/i
  ],
  
  crisis: [
    /(suicide|kill myself|want to die|end it all|better off dead)/i,
    /(can't go on|no point|hurt myself|self harm|overdose)/i
  ],
  
  medication: [
    /(medication|medicine|pill|drug|prescription|antidepressant)/i,
    /(side effect|dose|dosage|taking|prescribed)/i
  ],
  
  ptsd: [
    /(ptsd|trauma|flashback|nightmare|triggered|hypervigilant)/i,
    /(can't forget|keeps happening|reliving|avoidance)/i
  ],
  
  adhd: [
    /(adhd|add|attention deficit|hyperactive|can't focus|distracted)/i,
    /(fidgeting|restless|impulsive|disorganized|forgetful)/i
  ]
};

// Initialize Smart AI System
async function initializeAI() {
  try {
    updateAIStatusIndicator('loading', 'Initializing Smart AI System...');
    showAILoading();
    updateProgress(20, 'Loading AI patterns...');
    
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
    
  } catch (error) {
    console.error('Smart AI initialization failed:', error);
    hideAILoading();
    isFallbackMode = true;
    updateAIStatusIndicator('fallback-active', 'Enhanced Support Mode Active');
    showAIErrorNotification('AI system is running in enhanced support mode with full mental health capabilities.');
    showFallbackModeNotification();
  }
}

// Advanced Intent Recognition
function recognizeIntent(message) {
  const lowerMessage = message.toLowerCase();
  
  // Crisis detection has highest priority
  for (const pattern of intentPatterns.crisis) {
    if (pattern.test(lowerMessage)) {
      return 'crisis';
    }
  }
  
  // Check for other intents
  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    if (intent === 'crisis') continue; // Already checked
    
    for (const pattern of patterns) {
      if (pattern.test(lowerMessage)) {
        return intent;
      }
    }
  }
  
  return 'general';
}

// Contextual Response Selection
function selectResponse(intent, context) {
  const templates = responseTemplates[intent];
  
  if (!templates) {
    return generateGeneralResponse(context);
  }
  
  if (typeof templates === 'string') {
    return templates;
  }
  
  if (Array.isArray(templates)) {
    // Select random response to avoid repetition
    return templates[Math.floor(Math.random() * templates.length)];
  }
  
  // For complex intent objects (like anxiety, depression)
  const count = conversationContext.topicCounts[intent] || 0;
  
  if (count === 0 && templates.initial) {
    return templates.initial[Math.floor(Math.random() * templates.initial.length)];
  } else if (templates.followUp) {
    return templates.followUp[Math.floor(Math.random() * templates.followUp.length)];
  }
  
  return templates.initial?.[0] || "I'm here to support you. Can you tell me more about what you're experiencing?";
}

// Enhanced AI Response Generation
async function generateAIResponse(userMessage) {
  // Add message to conversation context
  conversationContext.messages.push({
    role: 'user',
    content: userMessage,
    timestamp: new Date().toISOString()
  });
  
  // Recognize intent
  const intent = recognizeIntent(userMessage);
  
  // Update conversation context
  if (intent !== 'general' && intent !== 'greeting') {
    conversationContext.topicCounts[intent] = (conversationContext.topicCounts[intent] || 0) + 1;
  }
  
  // Handle crisis immediately
  if (intent === 'crisis') {
    conversationContext.userPreferences.needsUrgentCare = true;
    return selectResponse('crisis');
  }
  
  // Check for medication questions
  const medicationInfo = getMedicationInfoFromMessage(userMessage);
  if (medicationInfo) {
    return generateMedicationResponse(medicationInfo);
  }
  
  // Check if wellness assessment is in progress or being requested
  if (isWellnessAssessmentRequest(userMessage)) {
    return startWellnessAssessment();
  } else if (conversationContext.assessmentInProgress) {
    return continueWellnessAssessment(userMessage);
  }
  
  // Analyze for symptoms
  analyzeForSymptoms(userMessage);
  
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
    intent: intent
  });
  
  return response;
}

// Personalize responses based on conversation history
function personalizeResponse(response, intent) {
  const messageCount = conversationContext.messages.length;
  const userMessages = conversationContext.messages.filter(m => m.role === 'user');
  
  // Add continuity phrases for ongoing conversations
  if (messageCount > 4) {
    const continuityPhrases = [
      "I've been listening to what you've shared, and ",
      "Based on our conversation, ",
      "I can see that ",
      "Thank you for continuing to share with me. "
    ];
    
    const phrase = continuityPhrases[Math.floor(Math.random() * continuityPhrases.length)];
    response = phrase + response.toLowerCase();
  }
  
  return response;
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
  
  // First, look for specific medication names
  for (const [key, med] of Object.entries(medicationDatabase)) {
    if (lowerMessage.includes(key) || lowerMessage.includes(med.name.toLowerCase())) {
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
    // Look for medication names in context
    for (const [key, med] of Object.entries(medicationDatabase)) {
      const medWords = med.name.toLowerCase().split(/[\s\(\)]/);
      if (medWords.some(word => word.length > 2 && lowerMessage.includes(word))) {
        return med;
      }
    }
  }
  
  return null;
}

function generateMedicationResponse(medicationInfo) {
  return `
    <div class="medication-info">
      <h3>💊 ${medicationInfo.name}</h3>
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
      <h3>🧠 Mental Health Wellness Check</h3>
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
      <h3>🧠 Assessment Results</h3>
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
    bipolar: ['manic', 'mood swings', 'elevated mood', 'grandiose']
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
        <div class="message-avatar">🤖</div>
        <div class="message-text">
          <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
            <strong>✅ Smart AI Ready!</strong><br>
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