/* GitHub Pages Deployment Fix - Force rebuild to clear caches - December 2024 */
// AI Chat Functionality for Fernly Health
// This file handles all AI-related functionality including model loading, response generation, and chat features
// Updated to use WebLLM with TinyLlama model for enhanced conversational AI

// WebLLM AI Model Variables
let webllmEngine = null;
let isAILoaded = false;
let isFallbackMode = false;

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

// Track conversation for wellness assessment and escalation
let conversationContext = {
  messages: [],
  detectedSymptoms: {},
  mentalHealthTopics: [],
  assessmentInProgress: false,
  assessmentStage: 0,
  assessmentResponses: {},
  topicCounts: {}, // Track how many times each topic has been discussed
  lastTopics: [], // Track recent topics for escalation
  crisisKeywords: []
};

// Check if WebLLM is loaded and available
// Returns a Promise that resolves when WebLLM is available or rejects after timeout
function checkWebLLMLoaded(maxWaitTime = 60000) { // 60 seconds timeout for better network tolerance
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (window.WebLLM) {
      console.log('WebLLM already loaded');
      resolve(true);
      return;
    }
    
    const startTime = Date.now();
    const checkInterval = 100; // Check every 100ms
    let retryCount = 0;
    const maxRetries = 3;
    
    const checkForWebLLM = () => {
      const elapsed = Date.now() - startTime;
      
      if (window.WebLLM) {
        console.log(`WebLLM loaded successfully after ${elapsed}ms`);
        resolve(true);
      } else if (elapsed > maxWaitTime) {
        retryCount++;
        if (retryCount < maxRetries) {
          console.warn(`WebLLM not loaded after ${elapsed}ms, retry ${retryCount}/${maxRetries}`);
          // Reset start time for retry
          const newStartTime = Date.now();
          const retryCheck = () => {
            const retryElapsed = Date.now() - newStartTime;
            if (window.WebLLM) {
              console.log(`WebLLM loaded successfully on retry ${retryCount} after ${retryElapsed}ms`);
              resolve(true);
            } else if (retryElapsed > 5000) { // 5 second retry timeout
              checkForWebLLM(); // Try next retry or fail
            } else {
              setTimeout(retryCheck, checkInterval);
            }
          };
          setTimeout(retryCheck, checkInterval);
        } else {
          console.error(`WebLLM not loaded - timeout after ${elapsed}ms with ${retryCount} retries. Loading can take up to 1 minute on slower connections.`);
          reject(new Error(`WebLLM loading timeout after ${elapsed}ms. This may be due to slow network conditions - loading can take up to 1 minute.`));
        }
      } else {
        // Continue checking
        setTimeout(checkForWebLLM, checkInterval);
      }
    };
    
    checkForWebLLM();
  });
}

// Legacy synchronous version for backward compatibility
function checkWebLLMLoadedSync() {
  if (!window.WebLLM) {
    console.error('WebLLM not loaded');
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

// Show fallback mode notification in chat
function showFallbackModeNotification() {
  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages) {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'message bot fallback-info';
    infoDiv.innerHTML = `
      <div class="message-content">
        <div class="message-avatar">🤖</div>
        <div class="message-text">
          <div style="background: #e3f2fd; border: 1px solid #bbdefb; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
            <strong>ℹ️ Enhanced Fallback Mode Active</strong><br>
            <small style="color: #1976d2;">
              I'm operating in fallback mode (AI model not loaded), but I'm still here to help with comprehensive mental health support, crisis detection, self-assessments, and resourceful advice. My responses may be less dynamic but are carefully crafted for your wellbeing.
            </small>
          </div>
          Hello! I'm here to support your mental health and wellbeing. I can help with anxiety, depression, stress, sleep issues, relationships, and more. I also offer mental health assessments and crisis support. How are you feeling today?
        </div>
      </div>
    `;
    chatMessages.appendChild(infoDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
function showAIErrorNotification(message) {
  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages) {
    const timestamp = new Date().toLocaleString();
    const webLLMStatus = window.WebLLM ? 'Available' : 'Not Available';
    const cdnError = window.webllmLoadError ? 'Yes' : 'No';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message bot error-notification';
    errorDiv.innerHTML = `
      <div class="message-content">
        <div class="message-avatar">⚠️</div>
        <div class="message-text">
          <strong>AI Chat Status</strong><br>
          ${message}<br>
          <small style="color: #666; margin-top: 8px; display: block;">
            Loading may take up to 1 minute on slower connections. You can still use the chat - I'll provide enhanced responses in fallback mode.
          </small>
          
          <details style="margin-top: 10px; font-size: 12px; color: #555;">
            <summary style="cursor: pointer; font-weight: bold;">📊 Diagnostics</summary>
            <div style="margin-top: 8px; padding: 8px; background: #f5f5f5; border-radius: 4px;">
              <strong>WebLLM Status:</strong> ${webLLMStatus}<br>
              <strong>CDN Load Error:</strong> ${cdnError}<br>
              <strong>Timestamp:</strong> ${timestamp}<br>
              <strong>User Agent:</strong> ${navigator.userAgent.substring(0, 100)}...
            </div>
          </details>
          
          <div style="margin-top: 10px;">
            <button onclick="location.reload()" style="margin-right: 10px; padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
              🔄 Retry Loading
            </button>
            <button onclick="this.parentElement.parentElement.parentElement.parentElement.parentElement.remove()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
              ✖ Dismiss
            </button>
          </div>
        </div>
      </div>
    `;
    chatMessages.appendChild(errorDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Also log to console for debugging
  console.warn('AI Error Notification:', message);
}

// Initialize WebLLM AI Model with TinyLlama
// WebLLM License: Apache 2.0 - Suitable for commercial use and redistribution
// TinyLlama Model License: Apache 2.0 - Suitable for commercial use and redistribution
async function initializeAI() {
  // OPTIONAL: Advanced Local LLM Fallback for Power Users
  // ====================================================
  // Developers can optionally implement a local LLM model as an advanced fallback
  // by uncommenting and implementing the code below. This requires:
  // 1. Hosting a local LLM model file (e.g., local-llm.js)
  // 2. Understanding of JavaScript ML frameworks
  // 3. Significant additional file size (models are typically 100MB+)
  // 
  // WARNING: This is for advanced users only and requires careful implementation
  // to avoid breaking the existing fallback system.
  //
  // if (window.localLLMEnabled && !checkWebLLMLoadedSync()) {
  //   try {
  //     console.log('Attempting to load local LLM model...');
  //     // Load your local model here (e.g., TensorFlow.js, ONNX.js, etc.)
  //     // const localModel = await loadLocalLLMModel();
  //     // if (localModel) {
  //     //   return initializeLocalLLM(localModel);
  //     // }
  //   } catch (error) {
  //     console.warn('Local LLM failed to load, continuing with enhanced fallback:', error);
  //   }
  // }
  
  if (!checkWebLLMLoadedSync()) {
    hideAILoading();
    isFallbackMode = true;
    showAIErrorNotification('The WebLLM library failed to load. The chat will operate in enhanced fallback mode.');
    showFallbackModeNotification();
    return;
  }

  try {
    showAILoading();
    updateProgress(10, 'Loading WebLLM...');
    
    // Initialize WebLLM engine
    webllmEngine = new window.WebLLM.Engine();
    
    updateProgress(30, 'Loading TinyLlama model...');
    
    // Load TinyLlama model - a small but capable model for in-browser use
    // Model: TinyLlama-1.1B-Chat-v1.0-q4f16_1 (quantized for efficiency)
    // License: Apache 2.0, suitable for commercial use
    await webllmEngine.reload("TinyLlama-1.1B-Chat-v1.0-q4f16_1", {
      progress_callback: (progress) => {
        const percent = Math.round(progress.progress * 50) + 30; // 30-80%
        const progressText = progress.text || `Loading model... ${Math.round(progress.progress * 100)}%`;
        updateProgress(percent, progressText);
      }
    });
    
    updateProgress(90, 'Initializing model...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateProgress(100, 'AI Ready!');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    hideAILoading();
    isAILoaded = true;
    console.log('WebLLM AI Model loaded successfully!');
    
  } catch (error) {
    console.error('WebLLM AI loading failed:', error);
    hideAILoading();
    isFallbackMode = true;
    showAIErrorNotification('Unable to load the WebLLM AI model. The chat will operate in enhanced fallback mode.');
    showFallbackModeNotification();
  }
}

// Check if message is about medications and extract info
function getMedicationInfoFromMessage(message) {
  const lowerMessage = message.toLowerCase();
  
  // First, look for specific medication names (even without keyword context)
  for (const medKey in medicationDatabase) {
    if (lowerMessage.includes(medKey)) {
      return medicationDatabase[medKey];
    }
  }
  
  // Then check if the message is asking about medications in general
  if (lowerMessage.includes('medication') || 
      lowerMessage.includes('medicine') || 
      lowerMessage.includes('drug') || 
      lowerMessage.includes('prescription') || 
      lowerMessage.includes('pill') ||
      lowerMessage.includes('dose') ||
      lowerMessage.includes('side effect') ||
      lowerMessage.includes('antidepressant') || 
      lowerMessage.includes('ssri')) {
    
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

// ENHANCED AI Response Generation with WebLLM conversation context
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
  
  // Regular AI response generation using WebLLM
  if (!isAILoaded || !webllmEngine) {
    const fallbackResponse = generateSmartResponse(userMessage);
    return "[Fallback Mode] " + fallbackResponse;
  }
  
  try {
    // Build conversation history for WebLLM chat API
    const chatMessages = [
      {
        role: "system",
        content: "You are a compassionate mental health support assistant. Provide empathetic, supportive, and helpful responses. Keep responses conversational and under 2-3 sentences. Focus on emotional support, active listening, and gentle guidance."
      }
    ];
    
    // Add recent conversation history (last 6 messages = 3 exchanges)
    const recentMessages = conversationContext.messages.slice(-6);
    for (const msg of recentMessages) {
      chatMessages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      });
    }
    
    // Generate AI response using WebLLM chat completion
    const response = await webllmEngine.chat.completions.create({
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 150,
      stream: false
    });
    
    const aiResponse = response.choices[0]?.message?.content?.trim();
    
    // Validate response quality
    if (!aiResponse || aiResponse.length < 10) {
      console.log('WebLLM response too short or empty, using fallback');
      const fallbackResponse = generateSmartResponse(userMessage);
      return "[Fallback Mode] " + fallbackResponse;
    }
    
    // Add to conversation context
    conversationContext.messages.push({
      role: 'assistant',
      content: aiResponse
    });
    
    return aiResponse;
    
  } catch (error) {
    console.error('WebLLM generation error:', error);
    const fallbackResponse = generateSmartResponse(userMessage);
    return "[Fallback Mode] " + fallbackResponse;
  }
}

// Enhanced smart response generation (fallback) with comprehensive mental health support
function generateSmartResponse(userMessage) {
  // First try to use the fallbackAI from fallback-data.js if available
  if (window.fallbackAI && typeof window.fallbackAI.respond === 'function') {
    try {
      const fallbackResponse = window.fallbackAI.respond(userMessage);
      if (fallbackResponse && fallbackResponse.trim() !== "I'm in fallback mode and can't answer in detail.") {
        return fallbackResponse;
      }
    } catch (error) {
      console.warn('Error using fallbackAI, falling back to built-in responses:', error);
    }
  }
  
  // Continue with existing comprehensive fallback logic
  const lowerMessage = userMessage.toLowerCase();
  
  // Track the current topic for escalation logic
  let currentTopic = null;
  
  // Enhanced crisis detection with more keywords
  const crisisKeywords = ['suicide', 'kill myself', 'want to die', 'end it all', 'no point', 'better off dead', 'can\'t go on', 'self harm', 'hurt myself', 'overdose'];
  if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
    conversationContext.crisisKeywords.push(...crisisKeywords.filter(k => lowerMessage.includes(k)));
    return "🚨 I'm very concerned about what you're going through. If you're having thoughts of harming yourself, please reach out for immediate help:\n\n• Call 988 (Suicide & Crisis Lifeline) - available 24/7\n• Text 'HELLO' to 741741 (Crisis Text Line)\n• Go to your nearest emergency room\n• Call 911\n\nYou're not alone, and help is available. These feelings can change with the right support.";
  }
  
  // Medication questions - detect and redirect
  const medicationInfo = getMedicationInfoFromMessage(userMessage);
  if (medicationInfo) {
    return generateMedicationResponse(medicationInfo);
  }
  
  // PTSD detection and support
  if (lowerMessage.includes('ptsd') || lowerMessage.includes('trauma') || lowerMessage.includes('flashback') || lowerMessage.includes('nightmare') || lowerMessage.includes('triggered')) {
    currentTopic = 'ptsd';
    const count = (conversationContext.topicCounts.ptsd || 0) + 1;
    conversationContext.topicCounts.ptsd = count;
    
    if (count === 1) {
      return "I understand you're dealing with trauma or PTSD. That takes incredible strength. Trauma can affect us in many ways - through flashbacks, nightmares, or feeling triggered by certain situations. You're not alone in this. Have you been able to connect with a trauma-informed therapist?";
    } else if (count >= 2) {
      return "I notice we've talked about trauma before. Since this is still weighing on you, I'd like to suggest some specific resources:\n\n• EMDR therapy is very effective for PTSD\n• The PTSD Coach app (free from the VA)\n• Grounding techniques like the 5-4-3-2-1 method\n• RAINN.org for trauma support\n\nWould you like me to walk you through a grounding exercise right now?";
    }
  }
  
  // Anxiety with escalation and coping strategies
  if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('panic') || lowerMessage.includes('racing thoughts')) {
    currentTopic = 'anxiety';
    const count = (conversationContext.topicCounts.anxiety || 0) + 1;
    conversationContext.topicCounts.anxiety = count;
    
    if (count === 1) {
      return "I hear you're dealing with anxiety. That can feel overwhelming, like your mind is racing or your body is on high alert. Anxiety is very treatable. Have you tried any breathing exercises? The 4-7-8 breathing technique can help: breathe in for 4, hold for 7, exhale for 8.";
    } else if (count >= 2) {
      return "Since anxiety continues to be challenging for you, let me suggest some advanced strategies:\n\n• Progressive muscle relaxation\n• Cognitive restructuring (challenging anxious thoughts)\n• Mindfulness apps like Headspace or Calm\n• Consider therapy - CBT is very effective for anxiety\n• If severe, talk to a doctor about medication options\n\nWould you like me to guide you through a quick anxiety relief technique?";
    }
  }
  
  // Depression with comprehensive support and escalation
  if (lowerMessage.includes('depression') || lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless') || lowerMessage.includes('empty') || lowerMessage.includes('numb')) {
    currentTopic = 'depression';
    const count = (conversationContext.topicCounts.depression || 0) + 1;
    conversationContext.topicCounts.depression = count;
    
    if (count === 1) {
      return "I'm sorry you're feeling this way. Depression can make everything feel heavy and overwhelming, like you're carrying an invisible weight. Remember that these feelings, while real and valid, can change with the right support. Have you been able to maintain any daily routines or activities you usually enjoy?";
    } else if (count >= 2) {
      return "Since depression is an ongoing struggle for you, I want to emphasize some important points:\n\n• Depression is a medical condition, not a personal failing\n• Treatment options include therapy, medication, or both\n• Small daily activities can help: sunlight, movement, connection\n• The National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n\nHave you considered reaching out to a mental health professional? I can help you think through next steps.";
    }
  }
  
  // Sleep issues with detailed guidance
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('can\'t sleep') || lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
    currentTopic = 'sleep';
    const count = (conversationContext.topicCounts.sleep || 0) + 1;
    conversationContext.topicCounts.sleep = count;
    
    if (count === 1) {
      return "Sleep problems can really impact our mental health and daily functioning. Good sleep hygiene includes: consistent bedtime/wake time, avoiding screens 1 hour before bed, keeping the room cool and dark, and avoiding caffeine after 2 PM. Are you having trouble falling asleep, staying asleep, or both?";
    } else {
      return "Since sleep continues to be an issue, consider these advanced strategies:\n\n• Keep a sleep diary to identify patterns\n• Try the 4-7-8 breathing technique before bed\n• Consider melatonin (consult a doctor first)\n• Address underlying anxiety or depression\n• If chronic, see a sleep specialist\n• CBT-I (Cognitive Behavioral Therapy for Insomnia) is very effective\n\nSleep disorders often require professional evaluation.";
    }
  }
  
  // Motivation and goal-setting support
  if (lowerMessage.includes('motivation') || lowerMessage.includes('unmotivated') || lowerMessage.includes('no energy') || lowerMessage.includes('can\'t get started') || lowerMessage.includes('procrastinating')) {
    currentTopic = 'motivation';
    return "Lack of motivation is often tied to our mental health and can be frustrating. Here are some strategies that can help:\n\n• Start with tiny steps (2-minute rule)\n• Set very small, achievable goals\n• Use the 'just show up' principle\n• Reward yourself for small wins\n• Consider if depression might be affecting your motivation\n• Connect with others for accountability\n\nWhat's one small thing you'd like to accomplish today?";
  }
  
  // Self-care with personalized suggestions
  if (lowerMessage.includes('self care') || lowerMessage.includes('self-care') || lowerMessage.includes('take care of myself')) {
    currentTopic = 'self-care';
    return "Self-care is essential for mental health! It's not selfish - it's necessary. Here are different types of self-care:\n\n• Physical: exercise, good nutrition, adequate sleep\n• Emotional: journaling, therapy, expressing feelings\n• Social: connecting with friends, setting boundaries\n• Mental: learning, reading, puzzles\n• Spiritual: meditation, nature, personal values\n\nWhat area of self-care feels most needed for you right now?";
  }
  
  // Relationship issues with different scenarios
  if (lowerMessage.includes('relationship') || lowerMessage.includes('partner') || lowerMessage.includes('family') || lowerMessage.includes('friend') || lowerMessage.includes('breakup') || lowerMessage.includes('divorce')) {
    currentTopic = 'relationships';
    const count = (conversationContext.topicCounts.relationships || 0) + 1;
    conversationContext.topicCounts.relationships = count;
    
    if (count === 1) {
      return "Relationships can be one of our greatest sources of joy and also significant stress. Every relationship has challenges. Are you dealing with communication issues, conflict, a breakup, or something else? Sometimes talking through relationship patterns can provide clarity.";
    } else {
      return "Since relationships continue to be on your mind, here are some deeper insights:\n\n• Healthy relationships require good boundaries\n• Communication skills can be learned and improved\n• Codependency and attachment styles affect relationships\n• Individual therapy can improve relationship skills\n• Couples therapy can help with specific conflicts\n• Sometimes ending relationships is the healthiest choice\n\nWould you like to explore what healthy relationships look like?";
    }
  }
  
  // Work/career stress with comprehensive support
  if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('boss') || lowerMessage.includes('burnout') || lowerMessage.includes('workplace')) {
    currentTopic = 'work';
    return "Work stress is incredibly common and can significantly impact mental health. Consider these strategies:\n\n• Set clear boundaries between work and personal time\n• Practice saying 'no' to unreasonable requests\n• Take regular breaks during the day\n• Build supportive relationships with colleagues\n• Address workplace bullying or harassment\n• Consider if the job aligns with your values\n\nIf work stress is severe, you might need to explore new opportunities or seek support from HR or a mental health professional.";
  }
  
  // Substance use awareness and support
  if (lowerMessage.includes('drinking') || lowerMessage.includes('alcohol') || lowerMessage.includes('drugs') || lowerMessage.includes('addiction') || lowerMessage.includes('substance') || lowerMessage.includes('recovery')) {
    return "Substance use often intersects with mental health. If you're concerned about your relationship with alcohol or drugs:\n\n• SAMHSA National Helpline: 1-800-662-4357 (free, 24/7)\n• AA, NA, or SMART Recovery meetings\n• Consider dual diagnosis treatment for mental health + addiction\n• Talk to a doctor about withdrawal safely\n• Address underlying mental health issues\n\nRecovery is possible, and there are many paths to healing.";
  }
  
  // Body image and eating concerns
  if (lowerMessage.includes('eating') || lowerMessage.includes('body image') || lowerMessage.includes('weight') || lowerMessage.includes('food') || lowerMessage.includes('appearance')) {
    return "Body image and our relationship with food can significantly impact mental health. If you're struggling:\n\n• Focus on health rather than appearance\n• Challenge negative self-talk about your body\n• Consider therapy specialized in eating disorders\n• NEDA Helpline: 1-800-931-2237\n• Practice intuitive eating principles\n• Limit social media if it triggers comparison\n\nYour worth is not determined by your appearance or weight.";
  }
  
  // Grief and loss support
  if (lowerMessage.includes('grief') || lowerMessage.includes('loss') || lowerMessage.includes('died') || lowerMessage.includes('death') || lowerMessage.includes('mourning')) {
    return "Grief is one of the most difficult human experiences, and everyone grieves differently. There's no 'right' timeline for grief. Consider:\n\n• Allow yourself to feel whatever emotions come up\n• Grief counseling or support groups\n• Honor your loved one's memory in meaningful ways\n• Take care of your physical health during this time\n• Be patient with yourself\n• Complicated grief may need professional support\n\nWould you like to talk about what you're experiencing?";
  }
  
  // Assessment requests
  if (lowerMessage.includes('assessment') || lowerMessage.includes('test') || lowerMessage.includes('evaluate') || lowerMessage.includes('questionnaire')) {
    return "I can guide you through a brief mental health screening questionnaire that covers mood, anxiety, and overall wellbeing. This isn't a diagnostic tool, but it can help you understand your current mental health status and identify areas where you might want to seek support.\n\nWould you like to start the assessment? It takes about 5 minutes.";
  }
  
  // Therapy questions with detailed information
  if (lowerMessage.includes('therapy') || lowerMessage.includes('counseling') || lowerMessage.includes('therapist') || lowerMessage.includes('counselor')) {
    return "Therapy can be incredibly beneficial! Here are different types:\n\n• CBT (Cognitive Behavioral Therapy): for anxiety, depression\n• DBT (Dialectical Behavior Therapy): for emotional regulation\n• EMDR: for trauma and PTSD\n• Psychodynamic: explores unconscious patterns\n• Humanistic: focuses on personal growth\n\nTo find a therapist: Psychology Today, your insurance website, or ask your doctor for referrals. Many therapists offer sliding scale fees.";
  }
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm here to provide mental health support and resources. I can help with anxiety, depression, stress, relationships, crisis support, and much more. I can also guide you through self-assessments. How are you feeling today?";
  }
  
  if (lowerMessage.includes('how are you')) {
    return "I'm doing well, thank you for asking! I'm here to focus on you and your wellbeing though. I'm equipped to help with a wide range of mental health concerns. How are you feeling today?";
  }
  
  // Help requests
  if (lowerMessage.includes('help') || lowerMessage.includes('need help')) {
    return "I'm here to help with comprehensive mental health support! I can assist with:\n\n• Crisis intervention and safety planning\n• Anxiety and depression support\n• Stress and coping strategies\n• Relationship guidance\n• Sleep and self-care advice\n• Mental health assessments\n• Resource recommendations\n\nWhat specific area would you like help with?";
  }
  
  // Track topic for future reference
  if (currentTopic) {
    conversationContext.lastTopics.push(currentTopic);
    if (conversationContext.lastTopics.length > 10) {
      conversationContext.lastTopics.shift(); // Keep only last 10 topics
    }
  }
  
  // General support responses
  if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
    return "You're very welcome! I'm glad I could help. Remember, taking care of your mental health is ongoing, and I'm here whenever you need support. You're taking an important step by reaching out.";
  }
  
  // Default empathetic response with assessment offer
  return "I hear you, and I want you to know that your feelings are valid. It sounds like you're going through something challenging. I'm here to provide support with whatever you're experiencing - whether it's anxiety, depression, stress, relationships, or anything else.\n\nWould you like to talk more about what's on your mind, or would you prefer I guide you through a brief mental health assessment?";
}

// Initialize AI when the page loads
// This function will be called from the main page after DOM is ready
async function initializeAIChat() {
  try {
    console.log('Starting WebLLM AI chat initialization...');
    // Wait for WebLLM to be loaded with extended timeout and retry logic
    await checkWebLLMLoaded();
    console.log('WebLLM confirmed loaded, initializing AI...');
    initializeAI();
  } catch (error) {
    // Enhanced error handling with more specific messages
    console.error('WebLLM AI chat initialization failed:', error.message);
    
    // Try to provide helpful error messages based on the error type
    let errorMessage = 'The WebLLM AI library failed to load. ';
    
    if (error.message.includes('timeout')) {
      errorMessage += 'Loading can take up to 1 minute on slower connections. Please be patient or try refreshing the page.';
    } else if (error.message.includes('network')) {
      errorMessage += 'There appears to be a network connectivity issue. Please check your internet connection and try again.';
    } else {
      errorMessage += 'Please refresh the page or try again later. The chat will operate in enhanced fallback mode with comprehensive mental health support.';
    }
    
    // Set fallback mode and show notification
    isFallbackMode = true;
    showAIErrorNotification(errorMessage);
    showFallbackModeNotification();
    
    // Log detailed error information for debugging
    console.error('Detailed error information:', {
      message: error.message,
      stack: error.stack,
      webLLMAvailable: !!window.WebLLM,
      timestamp: new Date().toISOString()
    });
  }
}

// Export functions for global access
window.initializeAIChat = initializeAIChat;
window.generateAIResponse = generateAIResponse;
window.showAILoading = showAILoading;
window.hideAILoading = hideAILoading;
window.updateProgress = updateProgress;
window.showAIErrorNotification = showAIErrorNotification;