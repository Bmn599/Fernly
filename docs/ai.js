/* GitHub Pages Deployment Fix - Force rebuild to clear caches - December 2024 */
// AI Chat Functionality for Fernly Health
// This file handles all AI-related functionality including model loading, response generation, and chat features

// AI Model Variables
let pipeline = null;
let isAILoaded = false;

// MEDICATION INFORMATION DATABASE
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
    importantNotes: "Generally well-tolerated. Take at the same time each day.",
    warning: "May affect heart rhythm at higher doses. Regular monitoring recommended."
  },
  
  // ANTIDEPRESSANTS - SNRIs
  "effexor": {
    name: "Effexor (Venlafaxine)",
    type: "SNRI Antidepressant",
    commonUses: ["Depression", "Anxiety", "Panic Disorder"],
    commonSideEffects: ["Nausea", "Dizziness", "Insomnia", "Dry mouth"],
    importantNotes: "Take with food. Extended-release version taken once daily.",
    warning: "Discontinuation syndrome common. Must taper gradually under medical supervision."
  },
  "cymbalta": {
    name: "Cymbalta (Duloxetine)",
    type: "SNRI Antidepressant",
    commonUses: ["Depression", "Anxiety", "Fibromyalgia", "Chronic pain"],
    commonSideEffects: ["Nausea", "Dry mouth", "Constipation", "Fatigue"],
    importantNotes: "Can help with both mood and pain symptoms.",
    warning: "May cause liver problems in rare cases. Monitor liver function."
  },
  
  // ANTIDEPRESSANTS - Atypical
  "wellbutrin": {
    name: "Wellbutrin (Bupropion)",
    type: "Atypical Antidepressant",
    commonUses: ["Depression", "Smoking cessation", "ADHD (off-label)"],
    commonSideEffects: ["Dry mouth", "Nausea", "Insomnia", "Dizziness"],
    importantNotes: "Less likely to cause sexual side effects. May help with energy.",
    warning: "Can lower seizure threshold. Avoid in people with eating disorders."
  },
  "trazodone": {
    name: "Trazodone",
    type: "Atypical Antidepressant",
    commonUses: ["Depression", "Insomnia", "Anxiety"],
    commonSideEffects: ["Drowsiness", "Dizziness", "Dry mouth", "Nausea"],
    importantNotes: "Often used for sleep due to sedating effects. Take with food.",
    warning: "Can cause dangerous drop in blood pressure. Rise slowly from sitting/lying."
  },
  
  // ANTI-ANXIETY MEDICATIONS
  "xanax": {
    name: "Xanax (Alprazolam)",
    type: "Benzodiazepine",
    commonUses: ["Panic Disorder", "Anxiety"],
    commonSideEffects: ["Drowsiness", "Dizziness", "Memory problems", "Confusion"],
    importantNotes: "Fast-acting but short duration. Highly effective for panic attacks.",
    warning: "High potential for dependence. Avoid alcohol. Can be dangerous to stop suddenly."
  },
  "ativan": {
    name: "Ativan (Lorazepam)",
    type: "Benzodiazepine",
    commonUses: ["Anxiety", "Insomnia", "Seizures"],
    commonSideEffects: ["Sedation", "Dizziness", "Weakness", "Memory impairment"],
    importantNotes: "Intermediate-acting benzodiazepine. Often used in medical settings.",
    warning: "Risk of dependence and withdrawal. Taper gradually under medical supervision."
  },
  "klonopin": {
    name: "Klonopin (Clonazepam)",
    type: "Benzodiazepine",
    commonUses: ["Panic Disorder", "Seizures", "Anxiety"],
    commonSideEffects: ["Drowsiness", "Dizziness", "Coordination problems"],
    importantNotes: "Longer-acting than Xanax. Good for preventing panic attacks.",
    warning: "High potential for dependence. Dangerous to combine with alcohol or opioids."
  },
  "buspar": {
    name: "Buspar (Buspirone)",
    type: "Anti-anxiety medication",
    commonUses: ["Generalized Anxiety Disorder"],
    commonSideEffects: ["Dizziness", "Nausea", "Headache", "Nervousness"],
    importantNotes: "Non-addictive alternative to benzodiazepines. Takes 2-4 weeks to work.",
    warning: "Less immediately effective than benzodiazepines. Requires consistent daily use."
  },
  
  // MOOD STABILIZERS
  "lithium": {
    name: "Lithium",
    type: "Mood Stabilizer",
    commonUses: ["Bipolar Disorder", "Depression (augmentation)"],
    commonSideEffects: ["Nausea", "Diarrhea", "Tremor", "Increased urination"],
    importantNotes: "Requires regular blood level monitoring. Very effective for mania prevention.",
    warning: "Narrow therapeutic window. Toxic at high levels. Stay hydrated and maintain steady salt intake."
  },
  "depakote": {
    name: "Depakote (Valproic Acid)",
    type: "Mood Stabilizer/Anticonvulsant",
    commonUses: ["Bipolar Disorder", "Seizures", "Migraine prevention"],
    commonSideEffects: ["Nausea", "Weight gain", "Hair loss", "Tremor"],
    importantNotes: "Effective for both manic and depressive episodes.",
    warning: "Can cause liver damage and birth defects. Regular blood monitoring required."
  },
  "lamictal": {
    name: "Lamictal (Lamotrigine)",
    type: "Mood Stabilizer/Anticonvulsant",
    commonUses: ["Bipolar Disorder", "Seizures"],
    commonSideEffects: ["Dizziness", "Headache", "Nausea", "Fatigue"],
    importantNotes: "Particularly effective for bipolar depression. Must start with low dose.",
    warning: "Can cause serious skin reactions. Report any rash immediately."
  },
  
  // ANTIPSYCHOTICS
  "abilify": {
    name: "Abilify (Aripiprazole)",
    type: "Atypical Antipsychotic",
    commonUses: ["Schizophrenia", "Bipolar Disorder", "Depression (augmentation)"],
    commonSideEffects: ["Nausea", "Vomiting", "Constipation", "Headache"],
    importantNotes: "Works differently than other antipsychotics. May cause less weight gain.",
    warning: "Can cause movement disorders. Monitor for unusual movements or muscle stiffness."
  },
  "seroquel": {
    name: "Seroquel (Quetiapine)",
    type: "Atypical Antipsychotic",
    commonUses: ["Schizophrenia", "Bipolar Disorder", "Depression (augmentation)"],
    commonSideEffects: ["Sedation", "Dizziness", "Dry mouth", "Weight gain"],
    importantNotes: "Often sedating. May be taken at bedtime for sleep.",
    warning: "Can cause metabolic changes. Monitor blood sugar and weight regularly."
  },
  "risperdal": {
    name: "Risperdal (Risperidone)",
    type: "Atypical Antipsychotic",
    commonUses: ["Schizophrenia", "Bipolar Disorder", "Autism spectrum disorder"],
    commonSideEffects: ["Drowsiness", "Dizziness", "Nausea", "Weight gain"],
    importantNotes: "Available as tablets, liquid, and long-acting injection.",
    warning: "Can cause movement disorders and hormonal changes. Regular monitoring needed."
  },
  
  // ADHD MEDICATIONS
  "adderall": {
    name: "Adderall (Amphetamine salts)",
    type: "Stimulant",
    commonUses: ["ADHD", "Narcolepsy"],
    commonSideEffects: ["Decreased appetite", "Insomnia", "Increased heart rate", "Nervousness"],
    importantNotes: "Take early in day to avoid sleep problems. May suppress growth in children.",
    warning: "High potential for abuse. Can cause serious heart problems. Avoid with heart conditions."
  },
  "ritalin": {
    name: "Ritalin (Methylphenidate)",
    type: "Stimulant",
    commonUses: ["ADHD", "Narcolepsy"],
    commonSideEffects: ["Decreased appetite", "Trouble sleeping", "Stomach pain", "Headache"],
    importantNotes: "Shorter-acting than Adderall. Multiple doses per day may be needed.",
    warning: "Monitor height and weight in children. Can worsen anxiety or tics."
  },
  "concerta": {
    name: "Concerta (Methylphenidate ER)",
    type: "Extended-release Stimulant",
    commonUses: ["ADHD"],
    commonSideEffects: ["Decreased appetite", "Insomnia", "Abdominal pain", "Headache"],
    importantNotes: "Once-daily dosing. Swallow whole, do not crush or chew.",
    warning: "Monitor for mood changes and growth in children. Avoid late-day dosing."
  },
  "vyvanse": {
    name: "Vyvanse (Lisdexamfetamine)",
    type: "Stimulant",
    commonUses: ["ADHD", "Binge eating disorder"],
    commonSideEffects: ["Decreased appetite", "Insomnia", "Dry mouth", "Irritability"],
    importantNotes: "Prodrug that's converted to active form in the body. Less abuse potential.",
    warning: "Can cause serious heart and mental health problems. Monitor blood pressure."
  },
  "strattera": {
    name: "Strattera (Atomoxetine)",
    type: "Non-stimulant ADHD medication",
    commonUses: ["ADHD"],
    commonSideEffects: ["Nausea", "Decreased appetite", "Dizziness", "Fatigue"],
    importantNotes: "Non-controlled substance. Good alternative when stimulants aren't suitable.",
    warning: "May increase suicidal thoughts in children and teens. Monitor mood closely."
  }
};

// DSM-5 CONDITIONS AND SYMPTOMS DATABASE
const mentalHealthConditions = {
  "depression": {
    name: "Major Depressive Disorder",
    symptoms: [
      "Persistent sad, anxious, or 'empty' mood",
      "Feelings of hopelessness or pessimism",
      "Irritability",
      "Feelings of guilt, worthlessness, or helplessness",
      "Loss of interest or pleasure in hobbies and activities",
      "Decreased energy or fatigue",
      "Moving or talking more slowly",
      "Difficulty concentrating, remembering, or making decisions",
      "Difficulty sleeping, early-morning awakening, or oversleeping",
      "Appetite and/or weight changes",
      "Thoughts of death or suicide, or suicide attempts",
      "Aches or pains, headaches, cramps, or digestive problems without clear physical cause"
    ],
    referenceLink: "https://www.nimh.nih.gov/health/topics/depression"
  },
  "anxiety": {
    name: "Generalized Anxiety Disorder",
    symptoms: [
      "Persistent and excessive worry about various things",
      "Overthinking plans and solutions to all possible worst-case scenarios",
      "Perceiving situations and events as threatening, even when they aren't",
      "Difficulty handling uncertainty",
      "Indecisiveness and fear of making the wrong decision",
      "Inability to set aside or let go of a worry",
      "Inability to relax, feeling restless, and feeling keyed up or on edge",
      "Difficulty concentrating, or the feeling that your mind 'goes blank'"
    ],
    physicalSymptoms: [
      "Fatigue",
      "Trouble sleeping",
      "Muscle tension or muscle aches",
      "Trembling, feeling twitchy",
      "Nervousness or being easily startled",
      "Sweating",
      "Nausea, diarrhea or irritable bowel syndrome",
      "Irritability"
    ],
    referenceLink: "https://www.nimh.nih.gov/health/topics/anxiety-disorders"
  },
  "bipolar": {
    name: "Bipolar Disorder",
    symptoms: {
      "manic": [
        "Abnormally upbeat, jumpy or wired",
        "Increased activity, energy or agitation",
        "Exaggerated sense of well-being and self-confidence (euphoria)",
        "Decreased need for sleep",
        "Unusual talkativeness",
        "Racing thoughts",
        "Distractibility",
        "Poor decision-making (excessive spending, risky sexual behavior, etc.)"
      ],
      "depressive": [
        "Depressed mood (feeling sad, empty, hopeless or tearful)",
        "Marked loss of interest or feeling no pleasure in activities",
        "Significant weight loss, weight gain, or decrease or increase in appetite",
        "Insomnia or sleeping too much",
        "Restlessness or slowed behavior",
        "Fatigue or loss of energy",
        "Feelings of worthlessness or excessive guilt",
        "Decreased ability to think or concentrate",
        "Thinking about, planning or attempting suicide"
      ]
    },
    referenceLink: "https://www.nimh.nih.gov/health/topics/bipolar-disorder"
  },
  "ptsd": {
    name: "Post-Traumatic Stress Disorder",
    symptoms: [
      "Intrusive memories (recurrent, unwanted memories, flashbacks, nightmares)",
      "Avoidance (avoiding thinking or talking about the traumatic event, avoiding places, people or activities that remind you of the event)",
      "Negative changes in thinking and mood (negative thoughts about yourself or others, hopelessness about the future, memory problems, difficulty maintaining close relationships, feeling detached from family and friends, lack of interest in activities you once enjoyed, difficulty experiencing positive emotions)",
      "Changes in physical and emotional reactions (being easily startled or frightened, always being on guard, self-destructive behavior, trouble sleeping, trouble concentrating, irritability, aggressive behavior, overwhelming guilt or shame)"
    ],
    referenceLink: "https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd"
  },
  "adhd": {
    name: "Attention-Deficit/Hyperactivity Disorder",
    symptoms: {
      "inattention": [
        "Often fails to give close attention to details or makes careless mistakes",
        "Often has difficulty sustaining attention in tasks or activities",
        "Often does not seem to listen when spoken to directly",
        "Often does not follow through on instructions and fails to finish duties",
        "Often has difficulty organizing tasks and activities",
        "Often avoids, dislikes, or is reluctant to engage in tasks that require sustained mental effort",
        "Often loses things necessary for tasks or activities",
        "Is often easily distracted by extraneous stimuli",
        "Is often forgetful in daily activities"
      ],
      "hyperactivity": [
        "Often fidgets or taps hands or feet, or squirms in seat",
        "Often leaves seat in situations when remaining seated is expected",
        "Often runs about or climbs in situations where it is inappropriate",
        "Often unable to play or engage in leisure activities quietly",
        "Is often 'on the go,' acting as if 'driven by a motor'",
        "Often talks excessively",
        "Often blurts out answers before questions have been completed",
        "Often has difficulty waiting their turn",
        "Often interrupts or intrudes on others"
      ]
    },
    referenceLink: "https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd"
  }
};

// Track conversation for wellness assessment
let conversationContext = {
  messages: [],
  detectedSymptoms: {},
  mentalHealthTopics: [],
  assessmentInProgress: false,
  assessmentStage: 0,
  assessmentResponses: {}
};

// Check if Transformers.js is loaded and available
// Returns a Promise that resolves when transformers is available or rejects after timeout
function checkTransformersLoaded(maxWaitTime = 10000) {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (window.transformers) {
      console.log('Transformers.js already loaded');
      resolve(true);
      return;
    }
    
    const startTime = Date.now();
    const checkInterval = 100; // Check every 100ms
    
    const checkForTransformers = () => {
      if (window.transformers) {
        console.log('Transformers.js loaded successfully');
        resolve(true);
      } else if (Date.now() - startTime > maxWaitTime) {
        console.error('Transformers.js not loaded - timeout after', maxWaitTime, 'ms');
        reject(new Error('Transformers.js loading timeout'));
      } else {
        // Continue checking
        setTimeout(checkForTransformers, checkInterval);
      }
    };
    
    checkForTransformers();
  });
}

// Legacy synchronous version for backward compatibility
function checkTransformersLoadedSync() {
  if (!window.transformers) {
    console.error('Transformers.js not loaded');
    return false;
  }
  return true;
}

// Show AI loading indicator
function showAILoading() {
  const loadingElement = document.getElementById('aiLoading');
  if (loadingElement) {
    loadingElement.classList.remove('hidden');
  }
}

// Update loading progress
function updateProgress(percent, text) {
  const progressFill = document.getElementById('progressFill');
  const loadingText = document.getElementById('loadingText');
  if (progressFill) progressFill.style.width = percent + '%';
  if (loadingText) loadingText.textContent = text;
}

// Hide AI loading indicator
function hideAILoading() {
  const loadingElement = document.getElementById('aiLoading');
  if (loadingElement) {
    loadingElement.classList.add('hidden');
  }
}

// Show error notification in chat area
function showAIErrorNotification(message) {
  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message bot error-notification';
    errorDiv.innerHTML = `
      <div class="message-content">
        <div class="message-avatar">⚠️</div>
        <div class="message-text">
          <strong>AI Chat Temporarily Unavailable</strong><br>
          ${message}
        </div>
      </div>
    `;
    chatMessages.appendChild(errorDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Initialize AI Model
async function initializeAI() {
  if (!checkTransformersLoadedSync()) {
    hideAILoading();
    showAIErrorNotification('The AI library failed to load. Please refresh the page or try again later.');
    return;
  }

  try {
    showAILoading();
    updateProgress(10, 'Loading transformers.js...');
    
    updateProgress(30, 'Loading DistilGPT-2 model...');
    
    // Load the text generation pipeline
    pipeline = await window.transformers.pipeline('text-generation', 'Xenova/distilgpt2', {
      progress_callback: (progress) => {
        const percent = Math.round(progress * 50) + 30; // 30-80%
        updateProgress(percent, `Downloading model... ${Math.round(progress * 100)}%`);
      }
    });
    
    updateProgress(90, 'Initializing model...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateProgress(100, 'AI Ready!');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    hideAILoading();
    isAILoaded = true;
    console.log('AI Model loaded successfully!');
    
  } catch (error) {
    console.error('AI loading failed:', error);
    hideAILoading();
    showAIErrorNotification('Unable to load the AI model. The chat will use a basic response system instead.');
    // Add a subtle notification that fallback mode is active
    console.log('Using fallback response system');
    if (typeof addMessage === 'function') {
      addMessage("I'm operating in standard mode today. How can I support you?", 'bot');
    }
  }
}

// Check if message is about medications and extract info
function getMedicationInfoFromMessage(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check if the message is asking about medications
  if (!lowerMessage.includes('medication') && 
      !lowerMessage.includes('medicine') && 
      !lowerMessage.includes('drug') && 
      !lowerMessage.includes('prescription') && 
      !lowerMessage.includes('pill') &&
      !lowerMessage.includes('dose') &&
      !lowerMessage.includes('side effect')) {
    return null;
  }
  
  // Look for specific medication names
  for (const medKey in medicationDatabase) {
    if (lowerMessage.includes(medKey)) {
      return medicationDatabase[medKey];
    }
  }
  
  // If asking generally about medications without a specific name
  if (lowerMessage.includes('antidepressant') || lowerMessage.includes('ssri')) {
    return {
      name: "Antidepressant Medications",
      type: "General Information",
      commonUses: ["Depression", "Anxiety", "Other mood disorders"],
      commonSideEffects: ["Nausea", "Headache", "Changes in appetite", "Sleep changes"],
      importantNotes: "There are many types available. SSRIs are commonly prescribed first-line treatments.",
      warning: "Always consult with your doctor before starting, stopping, or changing medications."
    };
  }
  
  return null;
}

// Generate medication response
function generateMedicationResponse(medicationInfo) {
  return `
    <div class="medication-info">
      <h3>${medicationInfo.name}</h3>
      <p><strong>Type:</strong> ${medicationInfo.type}</p>
      <p><strong>Common Uses:</strong> ${medicationInfo.commonUses.join(', ')}</p>
      <p><strong>Common Side Effects:</strong> ${medicationInfo.commonSideEffects.join(', ')}</p>
      <p><strong>Important Notes:</strong> ${medicationInfo.importantNotes}</p>
      <p><strong>⚠️ Warning:</strong> ${medicationInfo.warning}</p>
      <p><em>This information is for educational purposes only. Always consult with your healthcare provider for medical advice.</em></p>
    </div>
  `;
}

// Check if user is requesting wellness assessment
function isWellnessAssessmentRequest(message) {
  const lowerMessage = message.toLowerCase();
  const assessmentKeywords = [
    'assessment', 'evaluate', 'check', 'test', 'screening', 'questionnaire',
    'how am i doing', 'mental health check', 'wellness check', 'evaluate my mood',
    'check my mental health', 'assess my', 'screen me for'
  ];
  
  return assessmentKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Start wellness assessment
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

// Continue wellness assessment
function continueWellnessAssessment(userResponse) {
  // Store the response
  conversationContext.assessmentResponses[conversationContext.assessmentStage] = userResponse;
  
  // Move to next stage
  conversationContext.assessmentStage++;
  
  // Questions for the assessment
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
      // Assessment complete
      conversationContext.assessmentInProgress = false;
      return generateAssessmentResults();
  }
}

// Generate assessment results
function generateAssessmentResults() {
  conversationContext.assessmentInProgress = false;
  
  const responses = conversationContext.assessmentResponses;
  let score = 0;
  
  // Calculate basic score (this is simplified)
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
      <p><em>This assessment is not a diagnostic tool and should not replace professional evaluation. If you're concerned about your mental health, please consult with a qualified healthcare provider.</em></p>
      <p><strong>Crisis Resources:</strong> If you're having thoughts of self-harm, please call 988 (Suicide & Crisis Lifeline) or text "HELLO" to 741741 (Crisis Text Line).</p>
    </div>
  `;
}

// Analyze message for mental health symptoms
function analyzeForSymptoms(message) {
  const lowerMessage = message.toLowerCase();
  
  // Depression symptoms
  const depressionSymptoms = [
    'sad', 'depressed', 'hopeless', 'worthless', 'guilty', 'empty', 'numb',
    'no interest', 'no pleasure', 'tired', 'fatigue', 'sleep problems',
    'appetite changes', 'concentration problems', 'death thoughts'
  ];
  
  // Anxiety symptoms
  const anxietySymptoms = [
    'anxious', 'worried', 'nervous', 'panic', 'fear', 'restless', 'on edge',
    'racing thoughts', 'can\'t stop worrying', 'catastrophizing', 'overthinking'
  ];
  
  depressionSymptoms.forEach(symptom => {
    if (lowerMessage.includes(symptom)) {
      if (!conversationContext.detectedSymptoms.depression) {
        conversationContext.detectedSymptoms.depression = [];
      }
      conversationContext.detectedSymptoms.depression.push(symptom);
    }
  });
  
  anxietySymptoms.forEach(symptom => {
    if (lowerMessage.includes(symptom)) {
      if (!conversationContext.detectedSymptoms.anxiety) {
        conversationContext.detectedSymptoms.anxiety = [];
      }
      conversationContext.detectedSymptoms.anxiety.push(symptom);
    }
  });
  
  // Track topics
  if (lowerMessage.includes('depression') || lowerMessage.includes('depressed')) {
    if (!conversationContext.mentalHealthTopics.includes("depression")) {
      conversationContext.mentalHealthTopics.push("depression");
    }
  }
  
  if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious')) {
    if (!conversationContext.mentalHealthTopics.includes("anxiety")) {
      conversationContext.mentalHealthTopics.push("anxiety");
    }
  }
}

// Determine if wellness assessment should be suggested
function shouldSuggestAssessment() {
  const depressionCount = conversationContext.detectedSymptoms.depression?.length || 0;
  const anxietyCount = conversationContext.detectedSymptoms.anxiety?.length || 0;
  
  return (depressionCount >= 3 || anxietyCount >= 3) && 
         !conversationContext.assessmentInProgress && 
         conversationContext.messages.length >= 4;
}

// Suggest wellness assessment
function suggestWellnessAssessment() {
  return "I notice you've mentioned several symptoms that might be worth exploring further. Would you like me to walk you through a brief wellness assessment? It's not a diagnostic tool, but it might help us understand what kind of support could be most helpful for you.";
}

// ENHANCED AI Response Generation with conversation context
async function generateAIResponse(userMessage) {
  // Add message to conversation context
  conversationContext.messages.push({
    role: 'user',
    content: userMessage
  });
  
  // Check for crisis indicators first
  const lowerMessage = userMessage.toLowerCase();
  if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || lowerMessage.includes('want to die')) {
    return "I'm very concerned about what you're going through. If you're having thoughts of harming yourself, please call 988 (the Suicide & Crisis Lifeline) right now. They have trained counselors available 24/7. You're not alone, and help is available.";
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
  
  // Analyze the message for mental health symptoms
  analyzeForSymptoms(userMessage);
  
  // If we detect multiple significant symptoms, suggest assessment
  if (shouldSuggestAssessment()) {
    return suggestWellnessAssessment();
  }
  
  // Regular AI response generation
  if (!isAILoaded || !pipeline) {
    return generateSmartResponse(userMessage); // Fallback
  }
  
  try {
    // Build conversation history string (last 3-4 exchanges)
    let conversationHistory = "";
    // Get last few messages (limiting to avoid token issues)
    const recentMessages = conversationContext.messages.slice(-6); // Last 3 exchanges (6 messages)
    
    for (const msg of recentMessages) {
      if (msg.role === 'user') {
        conversationHistory += `User: ${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        conversationHistory += `Assistant: ${msg.content}\n`;
      }
    }
    
    // Create context-aware prompt with conversation history
    const prompt = `Mental health support conversation.\n${conversationHistory}Assistant:`;
    
    // Generate AI response
    const result = await pipeline(prompt, {
      max_new_tokens: 100,
      temperature: 0.7,
      do_sample: true,
      pad_token_id: 50256
    });
    
    let aiResponse = result[0].generated_text;
    
    // Extract only the AI response part (after the last "Assistant:")
    aiResponse = aiResponse.split('Assistant:').pop() || aiResponse;
    aiResponse = aiResponse.trim();
    
    // Clean up the response
    aiResponse = aiResponse.replace(/User:.*$/s, '').trim();
    
    // Ensure response is appropriate and helpful
    if (aiResponse.length < 10 || aiResponse.includes('User:')) {
      return generateSmartResponse(userMessage); // Fallback
    }
    
    // Add to conversation context
    conversationContext.messages.push({
      role: 'assistant',
      content: aiResponse
    });
    
    return aiResponse;
    
  } catch (error) {
    console.error('AI generation error:', error);
    return generateSmartResponse(userMessage); // Fallback
  }
}

// Smart response generation (fallback)
function generateSmartResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Crisis detection
  if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || lowerMessage.includes('want to die')) {
    return "I'm very concerned about what you're going through. If you're having thoughts of harming yourself, please call 988 (the Suicide & Crisis Lifeline) right now. They have trained counselors available 24/7. You're not alone, and help is available.";
  }
  
  // Medication questions - detect and redirect
  const medicationInfo = getMedicationInfoFromMessage(userMessage);
  if (medicationInfo) {
    return generateMedicationResponse(medicationInfo);
  }
  
  // Emotional state detection
  if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
    return "I hear you're dealing with anxiety. That can be really overwhelming. Have you tried any breathing exercises? Sometimes taking slow, deep breaths can help calm your nervous system. Would you like to talk more about what's causing your anxiety?";
  }
  
  if (lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless')) {
    return "I'm sorry you're feeling this way. Depression can make everything feel heavy and overwhelming. Remember that these feelings are temporary, even if they don't feel that way right now. Have you considered talking to a mental health professional? They can provide support and treatment options.";
  }
  
  if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
    return "Stress can really take a toll on our mental health. It sounds like you're carrying a lot right now. What's one small thing you could do today to take care of yourself? Even something simple like taking a walk or calling a friend can help.";
  }
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm here to listen and support you. How are you feeling today?";
  }
  
  if (lowerMessage.includes('how are you')) {
    return "I'm doing well, thank you for asking! I'm here to focus on you though - how are you feeling?";
  }
  
  // Help requests
  if (lowerMessage.includes('help') || lowerMessage.includes('need help')) {
    return "I'm here to help! I can listen, offer support, and provide information about mental health resources. What specific help do you need right now?";
  }
  
  // Therapy and treatment questions
  if (lowerMessage.includes('therapy') || lowerMessage.includes('counseling')) {
    return "Therapy can be incredibly helpful for many people. It provides a safe space to talk through challenges with a trained professional. Would you like to know more about different types of therapy or how to find a therapist?";
  }
  
  // Self-care suggestions
  if (lowerMessage.includes('self care') || lowerMessage.includes('self-care')) {
    return "Self-care is so important! Some ideas: take a warm bath, go for a walk, call a friend, practice deep breathing, or do something creative. What activities usually help you feel better?";
  }
  
  // Sleep issues
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
    return "Sleep problems can really impact our mental health. Some tips: try to go to bed and wake up at the same time, avoid screens before bed, and create a relaxing bedtime routine. Are you having trouble falling asleep or staying asleep?";
  }
  
  // Relationship issues
  if (lowerMessage.includes('relationship') || lowerMessage.includes('partner') || lowerMessage.includes('family')) {
    return "Relationships can be complex and challenging. It's normal to have difficulties sometimes. Would you like to talk more about what's happening in your relationship? Sometimes just talking it through can help clarify things.";
  }
  
  // Work stress
  if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
    return "Work stress is really common and can affect our mental health significantly. What specifically about work is causing you stress? Sometimes setting boundaries or talking to a supervisor can help.";
  }
  
  // General support responses
  if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
    return "You're very welcome! I'm glad I could help. Remember, I'm here whenever you need to talk.";
  }
  
  // Default empathetic response
  return "I hear you, and I want you to know that your feelings are valid. It sounds like you're going through a difficult time. Would you like to talk more about what's on your mind? I'm here to listen.";
}

// Initialize AI when the page loads
// This function will be called from the main page after DOM is ready
async function initializeAIChat() {
  try {
    // Wait for transformers to be loaded with timeout
    await checkTransformersLoaded();
    console.log('Transformers.js confirmed loaded, initializing AI...');
    initializeAI();
  } catch (error) {
    // Show error message if transformers failed to load
    console.error('Transformers.js not loaded - AI chat initialization failed:', error.message);
    showAIErrorNotification('The AI library failed to load. Please refresh the page or try again later.');
  }
}

// Export functions for global access
window.initializeAIChat = initializeAIChat;
window.generateAIResponse = generateAIResponse;
window.showAILoading = showAILoading;
window.hideAILoading = hideAILoading;
window.updateProgress = updateProgress;
window.showAIErrorNotification = showAIErrorNotification;