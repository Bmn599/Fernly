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
      treatment: "Treatment options include psychotherapy (cognitive behavioral therapy, interpersonal therapy), antidepressant medications, lifestyle changes, and in severe cases, electroconvulsive therapy.",
      symptoms: ["Persistent sadness", "Loss of interest in activities", "Fatigue or low energy", "Sleep disturbances", "Appetite changes", "Concentration difficulties", "Feelings of worthlessness", "Thoughts of death or suicide"],
      medications: ["SSRIs (fluoxetine, sertraline, escitalopram)", "SNRIs (venlafaxine, duloxetine)", "Atypical antidepressants (bupropion)", "Tricyclic antidepressants", "MAOIs"]
    },
    "Anxiety": {
      description: "Generalized anxiety disorder involves excessive, uncontrollable worry about various aspects of life, occurring more days than not for at least 6 months.",
      criteria: "Excessive anxiety and worry, difficulty controlling worry, and at least three physical symptoms like restlessness, fatigue, concentration difficulties, irritability, muscle tension, or sleep disturbance.",
      treatment: "Treatment includes cognitive behavioral therapy, exposure therapy, relaxation techniques, and medications such as SSRIs, SNRIs, or benzodiazepines for short-term use.",
      symptoms: ["Excessive worry", "Restlessness", "Fatigue", "Difficulty concentrating", "Irritability", "Muscle tension", "Sleep disturbances", "Physical symptoms (rapid heartbeat, sweating)"],
      medications: ["SSRIs (escitalopram, paroxetine)", "SNRIs (venlafaxine)", "Benzodiazepines (short-term use)", "Buspirone", "Pregabalin"]
    },
    "PTSD": {
      description: "Post-traumatic stress disorder develops after exposure to or witnessing a traumatic event, involving intrusive memories, avoidance, negative mood changes, and altered reactivity.",
      criteria: "Exposure to trauma, intrusive symptoms (flashbacks, nightmares), avoidance of trauma-related stimuli, negative mood changes, and hyperarousal symptoms lasting more than one month.",
      treatment: "Evidence-based treatments include trauma-focused cognitive behavioral therapy, EMDR (Eye Movement Desensitization and Reprocessing), and medications like SSRIs.",
      symptoms: ["Intrusive memories/flashbacks", "Nightmares", "Avoidance of trauma reminders", "Negative mood changes", "Hypervigilance", "Exaggerated startle response", "Difficulty sleeping", "Emotional numbness"],
      medications: ["SSRIs (sertraline, paroxetine)", "SNRIs (venlafaxine)", "Prazosin for nightmares", "Anticonvulsants for mood symptoms"]
    },
    "Bipolar": {
      description: "Bipolar disorder is characterized by alternating episodes of mania (or hypomania) and depression, with periods of normal mood in between.",
      criteria: "At least one manic episode (elevated mood, increased energy, decreased need for sleep, grandiosity, poor judgment) and typically depressive episodes.",
      treatment: "Treatment involves mood stabilizers (lithium, anticonvulsants), antipsychotics, psychotherapy, and lifestyle management including sleep hygiene and stress reduction.",
      symptoms: ["Manic episodes (elevated mood, increased energy, decreased sleep)", "Depressive episodes", "Rapid speech during mania", "Grandiosity", "Poor judgment during mania", "Mood swings", "Irritability"],
      medications: ["Mood stabilizers (lithium, valproate, lamotrigine)", "Atypical antipsychotics (quetiapine, aripiprazole)", "Anticonvulsants (carbamazepine)"]
    },
    "OCD": {
      description: "Obsessive-compulsive disorder involves recurrent, intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) performed to reduce anxiety.",
      criteria: "Presence of obsessions, compulsions, or both that are time-consuming (more than 1 hour per day) or cause significant distress or impairment.",
      treatment: "First-line treatments include cognitive behavioral therapy with exposure and response prevention, and medications such as SSRIs or clomipramine.",
      symptoms: ["Intrusive, unwanted thoughts (obsessions)", "Repetitive behaviors or mental acts (compulsions)", "Significant time spent on rituals", "Distress when unable to perform compulsions", "Recognition that obsessions/compulsions are excessive"],
      medications: ["SSRIs (fluoxetine, sertraline, fluvoxamine)", "Clomipramine", "Antipsychotics as augmentation"]
    },
    "Panic Disorder": {
      description: "Panic disorder involves recurrent, unexpected panic attacks followed by persistent concern about having additional attacks or their consequences.",
      criteria: "Recurrent panic attacks with at least one attack followed by a month of worry about additional attacks or significant behavioral changes related to the attacks.",
      treatment: "Treatment includes cognitive behavioral therapy, panic control therapy, breathing retraining, and medications like SSRIs, SNRIs, or benzodiazepines.",
      symptoms: ["Sudden intense fear", "Rapid heartbeat", "Sweating", "Trembling", "Shortness of breath", "Chest pain", "Nausea", "Dizziness", "Fear of losing control", "Fear of dying"],
      medications: ["SSRIs (paroxetine, sertraline)", "SNRIs", "Benzodiazepines (alprazolam, clonazepam)", "Tricyclic antidepressants"]
    },
    "Social Anxiety": {
      description: "Social anxiety disorder involves marked fear or anxiety about social situations where the person may be scrutinized or judged by others.",
      criteria: "Fear of social situations, avoidance or endurance with intense distress, recognition that fear is excessive, and significant impairment in functioning.",
      treatment: "Treatment includes cognitive behavioral therapy, social skills training, exposure therapy, and medications such as SSRIs or beta-blockers for performance anxiety.",
      symptoms: ["Intense fear of social situations", "Blushing or sweating", "Trembling or shaking", "Nausea or stomach upset", "Avoiding social situations", "Difficulty making eye contact"],
      medications: ["SSRIs (sertraline, paroxetine)", "Beta-blockers for performance anxiety", "Benzodiazepines (short-term use)", "SNRIs (venlafaxine)"]
    },
    "Schizophrenia": {
      description: "Schizophrenia is a chronic mental disorder characterized by delusions, hallucinations, disorganized thinking, and abnormal motor behavior.",
      criteria: "Two or more psychotic symptoms (delusions, hallucinations, disorganized speech) for at least one month, with functional impairment for at least 6 months.",
      treatment: "Treatment includes antipsychotic medications, psychosocial therapy, family therapy, and rehabilitation services to improve functioning.",
      symptoms: ["Delusions", "Hallucinations", "Disorganized speech", "Disorganized or abnormal motor behavior", "Negative symptoms (reduced emotional expression)"],
      medications: ["Antipsychotics (risperidone, olanzapine, quetiapine)", "Long-acting injectable antipsychotics", "Clozapine for treatment-resistant cases"]
    },
    "Eating Disorders": {
      description: "Eating disorders are serious mental health conditions characterized by persistent disturbances in eating behaviors and related thoughts and emotions.",
      criteria: "Varies by type: Anorexia involves restriction leading to low weight; Bulimia involves binge-purge cycles; Binge eating involves recurrent episodes without compensatory behaviors.",
      treatment: "Treatment includes nutritional rehabilitation, psychotherapy (CBT, family therapy), medical monitoring, and sometimes medications.",
      symptoms: ["Restriction of food intake", "Binge eating episodes", "Compensatory behaviors (vomiting, laxatives)", "Preoccupation with weight/shape", "Social withdrawal"],
      medications: ["Fluoxetine for bulimia", "Lisdexamfetamine for binge eating disorder", "Olanzapine for anorexia (in some cases)"]
    },
    "Substance Use Disorders": {
      description: "Substance use disorders involve the recurrent use of alcohol and/or drugs causing clinically significant impairment and distress.",
      criteria: "Pattern of use leading to impairment or distress, with criteria including tolerance, withdrawal, using more than intended, and continued use despite problems.",
      treatment: "Treatment includes detoxification, behavioral therapies, medications for specific substances, support groups, and long-term recovery planning.",
      symptoms: ["Tolerance", "Withdrawal symptoms", "Using more than intended", "Unsuccessful efforts to cut down", "Continued use despite problems"],
      medications: ["Naltrexone for alcohol/opioids", "Buprenorphine for opioid use", "Methadone for opioid use", "Disulfiram for alcohol use"]
    },
    "Autism Spectrum Disorder": {
      description: "Autism spectrum disorder is a neurodevelopmental condition characterized by persistent deficits in social communication and interaction, plus restricted, repetitive behaviors.",
      criteria: "Deficits in social communication and interaction across contexts, plus restricted, repetitive patterns of behavior, interests, or activities, present from early development.",
      treatment: "Treatment includes behavioral interventions, social skills training, communication therapy, educational support, and sometimes medications for co-occurring symptoms.",
      symptoms: ["Difficulty with social communication", "Repetitive behaviors", "Restricted interests", "Sensory sensitivities", "Need for routine and predictability"],
      medications: ["Risperidone for irritability", "Aripiprazole for irritability", "Stimulants for ADHD symptoms", "SSRIs for anxiety/depression"]
    },
    "Borderline Personality Disorder": {
      description: "Borderline personality disorder involves a pervasive pattern of instability in interpersonal relationships, self-image, emotions, and marked impulsivity.",
      criteria: "Five or more criteria including fear of abandonment, unstable relationships, identity disturbance, impulsivity, suicidal behavior, emotional instability, and chronic emptiness.",
      treatment: "Treatment includes dialectical behavior therapy (DBT), cognitive behavioral therapy, mentalization-based therapy, and medications for specific symptoms.",
      symptoms: ["Fear of abandonment", "Unstable relationships", "Identity disturbance", "Impulsivity", "Suicidal/self-harm behaviors", "Emotional instability", "Chronic emptiness"],
      medications: ["Mood stabilizers (lamotrigine, lithium)", "Antipsychotics for psychotic symptoms", "Antidepressants for depression", "Anxiolytics (short-term)"]
    },
    "Insomnia": {
      description: "Insomnia disorder involves dissatisfaction with sleep quantity or quality, with difficulty initiating or maintaining sleep, occurring at least 3 nights per week for at least 3 months.",
      criteria: "Sleep difficulty occurring at least 3 nights per week for at least 3 months, causing significant distress or impairment in functioning.",
      treatment: "Treatment includes cognitive behavioral therapy for insomnia (CBT-I), sleep hygiene education, and sometimes short-term sleep medications.",
      symptoms: ["Difficulty falling asleep", "Frequent awakenings", "Early morning awakening", "Unrefreshing sleep", "Daytime fatigue", "Irritability"],
      medications: ["Zolpidem (short-term)", "Eszopiclone (short-term)", "Melatonin", "Trazodone (off-label)", "Ramelteon"]
    },
    "ADHD": {
      description: "Attention-deficit/hyperactivity disorder is a neurodevelopmental disorder characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with functioning or development.",
      criteria: "Symptoms must be present before age 12, occur in multiple settings, and cause significant impairment in social, academic, or occupational functioning.",
      treatment: "Treatment typically includes behavioral therapy, medication (stimulants or non-stimulants), educational support, and lifestyle modifications including structure and routine.",
      symptoms: ["Inattention (difficulty focusing, forgetfulness)", "Hyperactivity (fidgeting, restlessness)", "Impulsivity (interrupting, difficulty waiting)", "Disorganization", "Difficulty with time management"],
      medications: ["Stimulants (methylphenidate, amphetamines)", "Non-stimulants (atomoxetine, guanfacine)", "Antidepressants (bupropion)"]
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

// Enhanced Fallback AI response logic - conversational and context-aware
window.fallbackAI = {
  respond: function(input) {
    const lowerInput = input.toLowerCase();
    
    // Helper function to determine what the user is asking about
    const getUserIntent = (input) => {
      const intentions = {
        symptoms: ['symptom', 'sign', 'what are', 'how do i know', 'recognize', 'identify', 'feel like', 'experience'],
        criteria: ['criteria', 'diagnosis', 'diagnose', 'diagnostic', 'qualify', 'requirement'],
        treatment: ['treatment', 'therapy', 'help', 'cure', 'treat', 'fix', 'healing', 'recover'],
        medication: ['medication', 'medicine', 'drug', 'pill', 'prescription', 'med', 'pharmaceutical'],
        description: ['what is', 'define', 'explain', 'about', 'describe', 'tell me about']
      };
      
      for (let intent in intentions) {
        if (intentions[intent].some(keyword => input.includes(keyword))) {
          return intent;
        }
      }
      return 'general';
    };

    // Check for crisis situations first
    if (lowerInput.includes("crisis") || lowerInput.includes("emergency") || 
        lowerInput.includes("suicide") || lowerInput.includes("kill myself") ||
        lowerInput.includes("hurt myself") || lowerInput.includes("end it all")) {
      return "🚨 **Crisis Support** 🚨\n\nIf you're having thoughts of harming yourself or others, please seek immediate help:\n\n• **Call 988** - Suicide & Crisis Lifeline (24/7)\n• **Text HOME to 741741** - Crisis Text Line\n• **Call 911** for immediate emergency assistance\n• Go to your nearest emergency room\n\nYou're not alone, and help is available.";
    }

    // Enhanced condition matching with user intent analysis
    for (let key in window.fallbackData.dsm5) {
      const condition = window.fallbackData.dsm5[key];
      let isMatch = false;
      
      // Check for condition name and common aliases
      if (lowerInput.includes(key.toLowerCase()) || 
          (key === "ADHD" && (lowerInput.includes("attention deficit") || lowerInput.includes("hyperactivity") || lowerInput.includes("add"))) ||
          (key === "PTSD" && (lowerInput.includes("post traumatic") || lowerInput.includes("trauma") || lowerInput.includes("ptsd"))) ||
          (key === "OCD" && (lowerInput.includes("obsessive") || lowerInput.includes("compulsive") || lowerInput.includes("ocd"))) ||
          (key === "Panic Disorder" && (lowerInput.includes("panic attack") || lowerInput.includes("panic disorder"))) ||
          (key === "Social Anxiety" && (lowerInput.includes("social anxiety") || lowerInput.includes("social phobia"))) ||
          (key === "Anxiety" && (lowerInput.includes("anxiety") || lowerInput.includes("anxious") || lowerInput.includes("worry"))) ||
          (key === "Depression" && (lowerInput.includes("depression") || lowerInput.includes("depressed") || lowerInput.includes("depressive"))) ||
          (key === "Bipolar" && (lowerInput.includes("manic") || lowerInput.includes("bipolar") || lowerInput.includes("mania"))) ||
          (key === "Eating Disorders" && (lowerInput.includes("anorexia") || lowerInput.includes("bulimia") || lowerInput.includes("binge eating") || lowerInput.includes("eating disorder"))) ||
          (key === "Substance Use Disorders" && (lowerInput.includes("addiction") || lowerInput.includes("substance") || lowerInput.includes("alcohol") || lowerInput.includes("drug abuse"))) ||
          (key === "Autism Spectrum Disorder" && (lowerInput.includes("autism") || lowerInput.includes("autistic") || lowerInput.includes("asperger"))) ||
          (key === "Borderline Personality Disorder" && (lowerInput.includes("borderline") || lowerInput.includes("bpd"))) ||
          (key === "Schizophrenia" && (lowerInput.includes("schizophrenia") || lowerInput.includes("psychosis") || lowerInput.includes("hallucination"))) ||
          (key === "Insomnia" && (lowerInput.includes("insomnia") || lowerInput.includes("sleep") || lowerInput.includes("sleeping")))) {
        isMatch = true;
      }
      
      if (isMatch) {
        const intent = getUserIntent(lowerInput);
        
        // Provide conversational, targeted responses based on user intent
        switch (intent) {
          case 'symptoms':
            if (condition.symptoms) {
              return `Common symptoms of ${key} include:\n\n${condition.symptoms.map(symptom => `• ${symptom}`).join('\n')}\n\nRemember, everyone experiences these conditions differently. If you're noticing several of these symptoms, consider speaking with a mental health professional for a proper evaluation.`;
            }
            break;
            
          case 'criteria':
            return `The diagnostic criteria for ${key} include:\n\n${condition.criteria}\n\nOnly a qualified mental health professional can make an official diagnosis. If you're concerned about these symptoms, I'd recommend speaking with a healthcare provider.`;
            
          case 'treatment':
            return `Treatment options for ${key} typically include:\n\n${condition.treatment}\n\nTreatment is most effective when tailored to your specific needs. A mental health professional can help determine the best approach for your situation.`;
            
          case 'medication':
            if (condition.medications) {
              return `Medications commonly used for ${key} include:\n\n${condition.medications.map(med => `• ${med}`).join('\n')}\n\n⚠️ **Important:** Only a psychiatrist or other qualified healthcare provider should prescribe and monitor psychiatric medications. They'll consider your specific symptoms, medical history, and other factors to determine the best option for you.`;
            } else {
              return `For specific medication information about ${key}, I'd recommend consulting with a psychiatrist or healthcare provider. They can discuss medication options that might be appropriate for your individual situation.`;
            }
            
          case 'description':
          default:
            return `${condition.description}\n\nWould you like to know more about the symptoms, treatment options, or diagnostic criteria for ${key}?`;
        }
      }
    }
    
    // Check dictionary terms with conversational response
    for (let word in window.fallbackData.dictionary) {
      if (lowerInput.includes(word.toLowerCase())) {
        return `**${word.charAt(0).toUpperCase() + word.slice(1)}:** ${window.fallbackData.dictionary[word]}\n\nIs there anything specific about ${word} you'd like to explore further?`;
      }
    }
    
    // General medication questions
    if (lowerInput.includes("medication") || lowerInput.includes("pills") || lowerInput.includes("drugs") || lowerInput.includes("prescription")) {
      return "I can provide general information about psychiatric medications, but for specific medication questions, please consult with a healthcare provider or psychiatrist. They can give you personalized advice based on your individual needs and medical history.\n\nIs there a particular condition you'd like to know about medication options for?";
    }
    
    // Support and help requests
    if (lowerInput.includes("help") || lowerInput.includes("support") || lowerInput.includes("struggling")) {
      return "I'm here to provide information and support about mental health. You can ask me about:\n\n• Specific mental health conditions\n• Symptoms and warning signs\n• Treatment options\n• Medication information\n• Mental health concepts and terms\n\nIf you're in crisis, please call 988 (Suicide & Crisis Lifeline) for immediate help. What would you like to know more about?";
    }
    
    // General conversational fallback
    const commonConditions = ["depression", "anxiety", "ADHD", "PTSD", "bipolar disorder", "OCD", "panic disorder"];
    return `I'm operating in fallback mode and can provide detailed information about mental health conditions and treatments. I can help you learn about ${commonConditions.slice(0, -1).join(', ')}, and ${commonConditions.slice(-1)[0]}, as well as various mental health concepts.\n\nYou can ask me about symptoms, treatments, medications, or diagnostic criteria for any condition. What would you like to know about?`;
  }
};