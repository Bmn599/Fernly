/* Fallback Data for Fernly Health AI Assistant */
// DSM-5 and Dictionary fallback data for client-side AI functionality
// This ensures the AI can always respond even if WebLLM fails to load

window.fallbackData = {
  dsm5: {
    "ADHD": {
      description: "Attention-deficit/hyperactivity disorder is a neurodevelopmental disorder characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with functioning or development.",
      criteria: "Symptoms must be present before age 12, occur in multiple settings, and cause significant impairment in social, academic, or occupational functioning.",
      treatment: "Treatment typically includes behavioral therapy, medication (stimulants or non-stimulants), educational support, and lifestyle modifications including structure and routine."
    },
    "Depression": {
      description: "Major depressive disorder is a mood disorder characterized by persistent feelings of sadness, hopelessness, and loss of interest in activities that were once enjoyable.",
      criteria: "Five or more symptoms present for at least 2 weeks, including depressed mood or loss of interest, plus symptoms like sleep disturbance, fatigue, concentration problems, or thoughts of death.",
      treatment: "Treatment options include psychotherapy (cognitive behavioral therapy, interpersonal therapy), antidepressant medications, lifestyle changes, and in severe cases, electroconvulsive therapy."
    },
    "Anxiety": {
      description: "Generalized anxiety disorder involves excessive, uncontrollable worry about various aspects of life, occurring more days than not for at least 6 months.",
      criteria: "Excessive anxiety and worry, difficulty controlling worry, and at least three physical symptoms like restlessness, fatigue, concentration difficulties, irritability, muscle tension, or sleep disturbance.",
      treatment: "Treatment includes cognitive behavioral therapy, exposure therapy, relaxation techniques, and medications such as SSRIs, SNRIs, or benzodiazepines for short-term use."
    },
    "PTSD": {
      description: "Post-traumatic stress disorder develops after exposure to or witnessing a traumatic event, involving intrusive memories, avoidance, negative mood changes, and altered reactivity.",
      criteria: "Exposure to trauma, intrusive symptoms (flashbacks, nightmares), avoidance of trauma-related stimuli, negative mood changes, and hyperarousal symptoms lasting more than one month.",
      treatment: "Evidence-based treatments include trauma-focused cognitive behavioral therapy, EMDR (Eye Movement Desensitization and Reprocessing), and medications like SSRIs."
    },
    "Bipolar": {
      description: "Bipolar disorder is characterized by alternating episodes of mania (or hypomania) and depression, with periods of normal mood in between.",
      criteria: "At least one manic episode (elevated mood, increased energy, decreased need for sleep, grandiosity, poor judgment) and typically depressive episodes.",
      treatment: "Treatment involves mood stabilizers (lithium, anticonvulsants), antipsychotics, psychotherapy, and lifestyle management including sleep hygiene and stress reduction."
    },
    "OCD": {
      description: "Obsessive-compulsive disorder involves recurrent, intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) performed to reduce anxiety.",
      criteria: "Presence of obsessions, compulsions, or both that are time-consuming (more than 1 hour per day) or cause significant distress or impairment.",
      treatment: "First-line treatments include cognitive behavioral therapy with exposure and response prevention, and medications such as SSRIs or clomipramine."
    },
    "Panic Disorder": {
      description: "Panic disorder involves recurrent, unexpected panic attacks followed by persistent concern about having additional attacks or their consequences.",
      criteria: "Recurrent panic attacks with at least one attack followed by a month of worry about additional attacks or significant behavioral changes related to the attacks.",
      treatment: "Treatment includes cognitive behavioral therapy, panic control therapy, breathing retraining, and medications like SSRIs, SNRIs, or benzodiazepines."
    },
    "Social Anxiety": {
      description: "Social anxiety disorder involves marked fear or anxiety about social situations where the person may be scrutinized or judged by others.",
      criteria: "Fear of social situations, avoidance or endurance with intense distress, recognition that fear is excessive, and significant impairment in functioning.",
      treatment: "Treatment includes cognitive behavioral therapy, social skills training, exposure therapy, and medications such as SSRIs or beta-blockers for performance anxiety."
    }
  },
  dictionary: {
    "cognition": "The mental action or process of acquiring knowledge and understanding through thought, experience, and the senses. Includes processes like attention, memory, reasoning, and problem-solving.",
    "therapy": "A treatment intended to relieve or heal a disorder. In mental health, this often refers to psychotherapy or talk therapy, which involves working with a trained professional to address emotional and behavioral issues.",
    "mindfulness": "A mental state achieved by focusing one's awareness on the present moment, while calmly acknowledging and accepting one's feelings, thoughts, and bodily sensations. Often used as a therapeutic technique.",
    "resilience": "The ability to adapt and bounce back when things don't go as planned. In mental health, it refers to the capacity to recover from difficult experiences and maintain psychological well-being.",
    "neurotransmitter": "Chemical messengers in the brain that transmit signals between nerve cells. Imbalances in neurotransmitters like serotonin, dopamine, and norepinephrine are associated with various mental health conditions.",
    "trauma": "A deeply distressing or disturbing experience that can have lasting psychological effects. Trauma can result from single incidents or prolonged exposure to adverse conditions.",
    "stigma": "Negative attitudes, beliefs, or stereotypes about mental health conditions that can lead to discrimination and prevent people from seeking help.",
    "psychotherapy": "The treatment of mental health disorders through psychological techniques, involving communication between a patient and a trained therapist to explore thoughts, feelings, and behaviors.",
    "medication": "Pharmaceutical treatment for mental health conditions, including antidepressants, mood stabilizers, antipsychotics, and anti-anxiety medications that work by affecting brain chemistry.",
    "coping": "Strategies and techniques used to manage stress, difficult emotions, or challenging situations. Healthy coping mechanisms promote psychological well-being and resilience.",
    "self-care": "The practice of taking action to preserve or improve one's own health and well-being, including physical, emotional, and mental health maintenance activities.",
    "wellness": "A holistic approach to health that encompasses physical, mental, emotional, and social well-being, rather than merely the absence of disease or illness."
  }
};

// Fallback AI response logic
window.fallbackAI = {
  respond: function(input) {
    const lowerInput = input.toLowerCase();
    
    // First check for DSM-5 conditions
    for (let key in window.fallbackData.dsm5) {
      if (lowerInput.includes(key.toLowerCase()) || 
          (key === "ADHD" && (lowerInput.includes("attention deficit") || lowerInput.includes("hyperactivity"))) ||
          (key === "PTSD" && (lowerInput.includes("post traumatic") || lowerInput.includes("trauma"))) ||
          (key === "OCD" && (lowerInput.includes("obsessive") || lowerInput.includes("compulsive"))) ||
          (key === "Panic Disorder" && lowerInput.includes("panic")) ||
          (key === "Social Anxiety" && (lowerInput.includes("social anxiety") || lowerInput.includes("social phobia"))) ||
          (key === "Bipolar" && (lowerInput.includes("manic") || lowerInput.includes("bipolar")))) {
        
        const condition = window.fallbackData.dsm5[key];
        return `**${key} Information**\n\n**Description:** ${condition.description}\n\n**Criteria:** ${condition.criteria}\n\n**Treatment:** ${condition.treatment}\n\n*Please consult with a qualified mental health professional for personalized assessment and treatment recommendations.*`;
      }
    }
    
    // Then check dictionary terms
    for (let word in window.fallbackData.dictionary) {
      if (lowerInput.includes(word.toLowerCase())) {
        return `**${word}:** ${window.fallbackData.dictionary[word]}\n\nIs there anything specific about ${word} you'd like to know more about?`;
      }
    }
    
    // Check for common mental health keywords and provide supportive responses
    if (lowerInput.includes("help") || lowerInput.includes("support")) {
      return "I'm here to provide support and information about mental health. You can ask me about specific conditions, treatments, or mental health concepts. If you're in crisis, please call 988 (Suicide & Crisis Lifeline) for immediate help.";
    }
    
    if (lowerInput.includes("crisis") || lowerInput.includes("emergency") || lowerInput.includes("suicide")) {
      return "🚨 **Crisis Support** 🚨\n\nIf you're having thoughts of harming yourself or others, please seek immediate help:\n\n• **Call 988** - Suicide & Crisis Lifeline (24/7)\n• **Text HOME to 741741** - Crisis Text Line\n• **Call 911** for immediate emergency assistance\n• Go to your nearest emergency room\n\nYou're not alone, and help is available.";
    }
    
    if (lowerInput.includes("medication") || lowerInput.includes("pills") || lowerInput.includes("drugs")) {
      return "I can provide general information about psychiatric medications, but please consult with a healthcare provider or psychiatrist for specific medication questions. They can provide personalized advice based on your individual needs and medical history.";
    }
    
    // General fallback response
    return "I'm in fallback mode and can provide information about mental health conditions, treatments, and concepts. You can ask me about conditions like depression, anxiety, ADHD, PTSD, or mental health terms. For immediate crisis support, call 988. How can I help you today?";
  }
};