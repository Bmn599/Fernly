/* Fallback Data for Fernly Health AI Assistant */
// DSM-5 and Dictionary fallback data for client-side AI functionality
// This ensures the AI can always respond even if WebLLM fails to load

window.fallbackData = {
  dsm5: {
    "ADHD": {
      description: "Attention-deficit/hyperactivity disorder is a neurodevelopmental disorder characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with functioning or development.",
      criteria: "Symptoms must be present before age 12, occur in multiple settings, and cause significant impairment in social, academic, or occupational functioning.",
      treatment: "Treatment typically includes behavioral therapy, medication (stimulants or non-stimulants), educational support, and lifestyle modifications including structure and routine.",
      symptoms: ["Difficulty paying attention to details", "Trouble staying focused on tasks", "Difficulty organizing tasks and activities", "Frequently losing things", "Easily distracted by external stimuli", "Forgetfulness in daily activities", "Fidgeting or squirming", "Difficulty staying seated", "Excessive talking", "Acting without thinking", "Interrupting others", "Difficulty waiting turns"],
      medications: ["Stimulants (methylphenidate, amphetamines)", "Non-stimulants (atomoxetine, guanfacine)", "Antidepressants (bupropion)", "Alpha agonists (clonidine)"]
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
    "Specific Phobias": {
      description: "Specific phobias involve marked fear or anxiety about a specific object or situation, such as flying, heights, animals, or medical procedures.",
      criteria: "Fear or anxiety triggered by a specific object or situation, with the phobic situation almost always provoking immediate fear and being actively avoided or endured with intense fear.",
      treatment: "Treatment primarily involves exposure therapy, cognitive behavioral therapy, and in some cases, short-term use of anti-anxiety medications for specific situations.",
      symptoms: ["Intense fear of specific objects/situations", "Immediate anxiety response", "Avoidance behaviors", "Physical symptoms (sweating, rapid heartbeat)", "Recognition that fear is excessive", "Significant distress or impairment"],
      medications: ["Benzodiazepines (short-term, situational use)", "Beta-blockers for performance anxiety", "SSRIs for severe cases", "Propranolol for specific situations"]
    },
    "Agoraphobia": {
      description: "Agoraphobia involves fear of being in situations where escape might be difficult or help unavailable, leading to avoidance of multiple situations like public transportation, open spaces, or enclosed places.",
      criteria: "Fear or anxiety about two or more situations including public transportation, open spaces, enclosed places, standing in line, or being outside the home alone.",
      treatment: "Treatment includes cognitive behavioral therapy with gradual exposure, systematic desensitization, and medications such as SSRIs or benzodiazepines.",
      symptoms: ["Fear of open or enclosed spaces", "Fear of crowds or public transportation", "Anxiety about being alone outside home", "Panic attacks in feared situations", "Avoidance of multiple situations", "Dependency on companions"],
      medications: ["SSRIs (sertraline, escitalopram)", "SNRIs (venlafaxine)", "Benzodiazepines (short-term)", "Tricyclic antidepressants"]
    },
    "Seasonal Affective Disorder": {
      description: "Seasonal Affective Disorder (SAD) is a type of depression that occurs at specific times of the year, most commonly during fall and winter months when daylight hours are reduced.",
      criteria: "Recurrent episodes of major depression with seasonal pattern, with onset and remission at characteristic times of the year, for at least 2 consecutive years.",
      treatment: "Treatment includes light therapy, cognitive behavioral therapy, antidepressant medications, and lifestyle modifications including regular exercise and maintaining social connections.",
      symptoms: ["Seasonal depression (usually fall/winter)", "Increased sleep and fatigue", "Carbohydrate cravings and weight gain", "Social withdrawal", "Difficulty concentrating", "Feelings of hopelessness"],
      medications: ["SSRIs (fluoxetine, sertraline)", "SNRIs (duloxetine)", "Bupropion (may prevent seasonal episodes)", "Light therapy as primary treatment"]
    },
    "Body Dysmorphic Disorder": {
      description: "Body Dysmorphic Disorder involves preoccupation with one or more perceived defects or flaws in physical appearance that are not observable or appear minor to others.",
      criteria: "Preoccupation with perceived defects in appearance, repetitive behaviors or mental acts in response to appearance concerns, causing significant distress or impairment.",
      treatment: "Treatment includes cognitive behavioral therapy, exposure and response prevention therapy, and medications such as SSRIs with higher doses often needed.",
      symptoms: ["Preoccupation with imagined appearance flaws", "Repetitive mirror checking or avoidance", "Excessive grooming behaviors", "Comparing appearance with others", "Seeking reassurance about appearance", "Social avoidance due to appearance concerns"],
      medications: ["SSRIs (higher doses: fluoxetine, sertraline)", "Clomipramine", "SNRIs (venlafaxine)", "Antipsychotics as augmentation for severe cases"]
    },
    "Hoarding Disorder": {
      description: "Hoarding Disorder involves persistent difficulty discarding possessions regardless of their actual value, leading to accumulation that congests living areas and substantially compromises their intended use.",
      criteria: "Persistent difficulty discarding possessions, distress associated with discarding, accumulation of possessions that congest active living areas, and significant distress or impairment in functioning.",
      treatment: "Treatment includes specialized cognitive behavioral therapy for hoarding, motivational interviewing, skills training, and medications such as SSRIs.",
      symptoms: ["Difficulty discarding possessions", "Excessive acquisition of items", "Cluttered living spaces", "Distress when discarding items", "Impaired functioning due to clutter", "Social isolation"],
      medications: ["SSRIs (paroxetine, fluoxetine, sertraline)", "SNRIs (venlafaxine)", "Cognitive enhancers in some cases", "Treatment focuses primarily on therapy"]
    },
    "Trichotillomania": {
      description: "Trichotillomania (Hair-Pulling Disorder) involves recurrent pulling out of one's hair, resulting in hair loss, despite repeated attempts to decrease or stop the behavior.",
      criteria: "Recurrent pulling out of hair resulting in hair loss, repeated attempts to decrease or stop hair pulling, and significant distress or impairment in functioning.",
      treatment: "Treatment includes habit reversal training, cognitive behavioral therapy, acceptance and commitment therapy, and medications such as SSRIs or N-acetylcysteine.",
      symptoms: ["Recurrent hair pulling", "Visible hair loss", "Tension before pulling", "Relief or gratification when pulling", "Failed attempts to stop", "Distress or impairment"],
      medications: ["N-acetylcysteine (NAC)", "SSRIs (fluoxetine, sertraline)", "Clomipramine", "Antipsychotics for severe cases (olanzapine)"]
    },
    "Dissociative Identity Disorder": {
      description: "Dissociative Identity Disorder involves the presence of two or more distinct personality states or identities, with marked discontinuity in sense of self and agency.",
      criteria: "Two or more distinct personality states, recurrent gaps in recall of everyday events or personal information, significant distress or impairment, not attributable to substance use or cultural practices.",
      treatment: "Treatment focuses on psychotherapy including trauma-focused therapy, cognitive behavioral therapy, dialectical behavior therapy, and EMDR. Medications target co-occurring symptoms.",
      symptoms: ["Multiple distinct identities", "Memory gaps for daily events", "Depersonalization", "Derealization", "Identity confusion", "Trauma history typically present"],
      medications: ["Antidepressants for depression", "Mood stabilizers for mood symptoms", "Antipsychotics for psychotic symptoms", "Anti-anxiety medications for anxiety"]
    },
    "Adjustment Disorders": {
      description: "Adjustment Disorders involve emotional or behavioral symptoms in response to identifiable stressors, occurring within 3 months of the stressor and causing significant distress or impairment.",
      criteria: "Development of emotional or behavioral symptoms within 3 months of identifiable stressors, symptoms are clinically significant and exceed what would be expected, and resolve within 6 months after stressor ends.",
      treatment: "Treatment includes supportive psychotherapy, cognitive behavioral therapy, stress management techniques, and short-term medications for specific symptoms if needed.",
      symptoms: ["Marked distress out of proportion to stressor", "Significant impairment in functioning", "Depressed mood", "Anxiety", "Behavioral disturbances", "Mixed emotional and behavioral symptoms"],
      medications: ["Short-term anxiolytics if needed", "Antidepressants for prolonged symptoms", "Sleep aids for insomnia", "Treatment focuses primarily on therapy and coping strategies"]
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
    "wellness": "A holistic approach to health that encompasses physical, mental, emotional, and social well-being, rather than merely the absence of disease or illness.",
    "anxiety": "A feeling of worry, nervousness, or unease about something with an uncertain outcome. In clinical contexts, anxiety can become a disorder when it significantly interferes with daily functioning.",
    "depression": "A mental health condition characterized by persistent sadness and loss of interest in activities, affecting how you feel, think, and behave and leading to emotional and physical problems.",
    "triggers": "Specific situations, events, or stimuli that can cause symptoms of mental health conditions to occur or worsen. Identifying triggers is an important part of managing mental health.",
    "boundaries": "Limits and rules we set for ourselves within relationships and situations. Healthy boundaries are essential for mental health and maintaining positive relationships.",
    "grounding": "Techniques used to help someone focus on the present moment and reconnect with their immediate environment, often used to manage anxiety, panic attacks, or dissociation.",
    "flashback": "A vivid, intrusive re-experiencing of a traumatic event, often accompanied by intense emotions and physical sensations as if the event were happening again.",
    "compulsion": "An irresistible urge to behave in a certain way, often to reduce anxiety or distress. In OCD, compulsions are repetitive behaviors performed in response to obsessive thoughts."
  }
};

// Enhanced Fallback AI response logic - conversational and context-aware
window.fallbackAI = {
  respond: function(input) {
    const lowerInput = input.toLowerCase();
    
    // Handle natural conversation starters and acknowledgments
    const conversationalResponses = {
      'hello': "Hello! I'm here to support you with any mental health questions or concerns. How are you feeling today?",
      'hi': "Hi there! I'm ready to help with information about mental health conditions, treatments, or just to listen. What's on your mind?",
      'okay': "I'm glad to hear that. Is there anything specific about mental health or wellbeing you'd like to discuss?",
      'ok': "Good to hear. Feel free to ask me about any mental health topics, symptoms, or treatments you're curious about.",
      'thanks': "You're very welcome! I'm here whenever you need support or have questions about mental health.",
      'thank you': "My pleasure! Remember, I'm always here to help with mental health information and support.",
      'good': "That's wonderful to hear! If you ever want to learn more about mental health or have questions, I'm here to help.",
      'fine': "I'm glad you're doing well. If you'd like to discuss anything about mental health or just want to chat, I'm here.",
      'how are you': "I'm doing well and ready to help! I'm here to provide information about mental health conditions, treatments, and support. How can I assist you today?",
      'what can you do': "I can help you with detailed information about 20+ mental health conditions like depression, anxiety, ADHD, PTSD, and more. I can discuss symptoms, treatments, medications, and provide supportive guidance. What would you like to know about?",
      'help': "I'm here to help! I can provide information about mental health conditions, discuss symptoms and treatments, answer questions about medications, and offer supportive guidance. What specific area would you like to explore?"
    };
    
    // Check for exact conversational matches first
    for (let phrase in conversationalResponses) {
      if (lowerInput.trim() === phrase || lowerInput.includes(phrase)) {
        return conversationalResponses[phrase];
      }
    }
    
    // Handle "what is" questions more naturally
    if (lowerInput.startsWith('what is') || lowerInput.startsWith('what are')) {
      const questionPart = lowerInput.replace(/^what (is|are)\s+/, '').trim();
      
      // Check dictionary first for mental health terms
      for (let term in window.fallbackData.dictionary) {
        if (questionPart.includes(term)) {
          return `${term.charAt(0).toUpperCase() + term.slice(1)} refers to: ${window.fallbackData.dictionary[term]}. Would you like to know more about this or explore related mental health topics?`;
        }
      }
    }
    
    // Handle "do I have" questions
    if (lowerInput.includes('do i have') || lowerInput.includes('am i') || lowerInput.includes('could i have')) {
      return "I can't diagnose conditions, but I can help you understand symptoms and when it might be helpful to speak with a healthcare professional. What symptoms or concerns would you like to discuss? Remember, only a qualified healthcare provider can provide a proper diagnosis.";
    }
    
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
      
      // Check for condition name and common aliases (more specific matches first)
      if ((key === "Trichotillomania" && (lowerInput.includes("hair pulling") || lowerInput.includes("trichotillomania") || lowerInput.includes("pull my hair"))) ||
          (key === "Bipolar" && (lowerInput.includes("manic") || lowerInput.includes("bipolar") || (lowerInput.includes("mania") && !lowerInput.includes("trichotillomania")))) ||
          (key === "ADHD" && (lowerInput.includes("attention deficit") || lowerInput.includes("hyperactivity") || lowerInput.includes("add"))) ||
          (key === "PTSD" && (lowerInput.includes("post traumatic") || lowerInput.includes("trauma") || lowerInput.includes("ptsd"))) ||
          (key === "OCD" && (lowerInput.includes("obsessive") || lowerInput.includes("compulsive") || lowerInput.includes("ocd"))) ||
          (key === "Panic Disorder" && (lowerInput.includes("panic attack") || lowerInput.includes("panic disorder"))) ||
          (key === "Social Anxiety" && (lowerInput.includes("social anxiety") || lowerInput.includes("social phobia"))) ||
          (key === "Specific Phobias" && (lowerInput.includes("phobia") || lowerInput.includes("afraid of") || lowerInput.includes("fear of"))) ||
          (key === "Agoraphobia" && (lowerInput.includes("agoraphobia") || lowerInput.includes("crowded places") || lowerInput.includes("public spaces"))) ||
          (key === "Seasonal Affective Disorder" && (lowerInput.includes("seasonal depression") || lowerInput.includes("winter depression") || lowerInput.includes("sad"))) ||
          (key === "Body Dysmorphic Disorder" && (lowerInput.includes("body dysmorphic") || lowerInput.includes("appearance") || lowerInput.includes("body image"))) ||
          (key === "Hoarding Disorder" && (lowerInput.includes("hoarding") || lowerInput.includes("collecting") || lowerInput.includes("cluttered"))) ||
          (key === "Dissociative Identity Disorder" && (lowerInput.includes("multiple personality") || lowerInput.includes("dissociative identity") || lowerInput.includes("did"))) ||
          (key === "Adjustment Disorders" && (lowerInput.includes("adjustment") || lowerInput.includes("life changes") || lowerInput.includes("stressful events"))) ||
          (key === "Eating Disorders" && (lowerInput.includes("anorexia") || lowerInput.includes("bulimia") || lowerInput.includes("binge eating") || lowerInput.includes("eating disorder"))) ||
          (key === "Substance Use Disorders" && (lowerInput.includes("addiction") || lowerInput.includes("substance") || lowerInput.includes("alcohol") || lowerInput.includes("drug abuse"))) ||
          (key === "Autism Spectrum Disorder" && (lowerInput.includes("autism") || lowerInput.includes("autistic") || lowerInput.includes("asperger"))) ||
          (key === "Borderline Personality Disorder" && (lowerInput.includes("borderline") || lowerInput.includes("bpd"))) ||
          (key === "Schizophrenia" && (lowerInput.includes("schizophrenia") || lowerInput.includes("psychosis") || lowerInput.includes("hallucination"))) ||
          (key === "Insomnia" && (lowerInput.includes("insomnia") || lowerInput.includes("sleep") || lowerInput.includes("sleeping"))) ||
          (key === "Anxiety" && (lowerInput.includes("anxiety") || lowerInput.includes("anxious") || lowerInput.includes("worry"))) ||
          (key === "Depression" && (lowerInput.includes("depression") || lowerInput.includes("depressed") || lowerInput.includes("depressive"))) ||
          lowerInput.includes(key.toLowerCase())) {
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
    const commonConditions = ["depression", "anxiety", "ADHD", "PTSD", "bipolar disorder", "OCD", "panic disorder", "phobias", "eating disorders", "autism", "schizophrenia", "borderline personality disorder", "seasonal affective disorder", "body dysmorphic disorder", "hoarding disorder", "trichotillomania", "dissociative identity disorder", "adjustment disorders", "substance use disorders", "insomnia", "social anxiety"];
    return `I'm operating in fallback mode and can provide detailed information about mental health conditions and treatments. I can help you learn about over 20 different conditions including ${commonConditions.slice(0, 5).join(', ')}, and many others, as well as various mental health concepts.\n\nYou can ask me about symptoms, treatments, medications, or diagnostic criteria for any condition. What would you like to know about?`;
  }
};