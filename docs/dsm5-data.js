const dsm5Disorders = {
  adhd: {
    name: "Attention-Deficit/Hyperactivity Disorder (ADHD)",
    description: "ADHD is characterized by persistent inattention and/or hyperactivity-impulsivity that interferes with functioning.",
    symptoms: [
      "Difficulty sustaining attention",
      "Fidgeting",
      "Interrupting others"
    ],
    resources: [
      { name: "CDC ADHD", url: "https://www.cdc.gov/ncbddd/adhd/index.html" }
    ]
  },
  depression: {
    name: "Major Depressive Disorder",
    description: "Major depressive disorder involves persistent sadness and loss of interest in activities once enjoyed.",
    symptoms: [
      "Persistent sadness",
      "Loss of interest",
      "Fatigue"
    ],
    resources: [
      { name: "NIMH Depression", url: "https://www.nimh.nih.gov/health/topics/depression" }
    ]
  },
  anxiety: {
    name: "Generalized Anxiety Disorder",
    description: "Generalized anxiety disorder features excessive worry occurring more days than not for at least six months.",
    symptoms: [
      "Excessive worry",
      "Restlessness",
      "Fatigue"
    ],
    resources: [
      { name: "NIMH Anxiety", url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders" }
    ]
  },
  bipolar: {
    name: "Bipolar Disorder",
    description: "Bipolar disorder includes episodes of mania and depression with periods of normal mood.",
    symptoms: [
      "Manic episodes",
      "Depressive episodes",
      "Mood swings"
    ],
    resources: [
      { name: "NIMH Bipolar Disorder", url: "https://www.nimh.nih.gov/health/topics/bipolar-disorder" }
    ]
  }
};

window.dsm5Disorders = dsm5Disorders;

