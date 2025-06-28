// aiAssistant.js

// Persistent state for files and preferences
let aiState = {
  files: [],
  preferences: { showSources: true, chunkSize: 250, maxHistory: 50 }
};
if (localStorage.getItem('aiChatState')) try { aiState = JSON.parse(localStorage.getItem('aiChatState')); } catch {}
function saveAiState() { localStorage.setItem('aiChatState', JSON.stringify(aiState)); }
function chunkText(text, size) {
  const out = [];
  for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size));
  return out;
}

// File uploader
export async function aiHandleFileUpload(inputId, statusId) {
  const files = document.getElementById(inputId).files;
  const loaded = [];
  const skipped = [];
  for (let file of files) {
    // Skip very large files to avoid blocking the browser
    if (file.size > 1024 * 1024) {
      console.warn(`Skipping ${file.name}: file too large.`);
      skipped.push(file.name);
      continue;
    }
    let text = '';
    try {
      text = await file.text();
    } catch (err) {
      console.error('Failed to read file', err);
      skipped.push(file.name);
      continue;
    }
    const chunks = chunkText(text, aiState.preferences.chunkSize);
    aiState.files.push({
      name: file.name,
      type: file.type,
      content: text,
      chunks: chunks.map((txt, i) => ({ text: txt, start: i * aiState.preferences.chunkSize, end: (i + 1) * aiState.preferences.chunkSize }))
    });
    loaded.push(file.name);
  }
  if (loaded.length) {
    saveAiState();
  }
  const allNames = aiState.files.map(f => f.name).join(', ');
  const skippedMsg = skipped.length ? ` (skipped: ${skipped.join(', ')})` : '';
  document.getElementById(statusId).innerText =
    loaded.length || aiState.files.length
      ? `Loaded: ${allNames}${skippedMsg}`
      : 'No files loaded';
}

// Semantic Search (MiniLM)
let embedderModel;
async function ensureEmbedderLoaded() {
  if (!embedderModel) {
    try {
      embedderModel = await window.transformers.load('Xenova/all-MiniLM-L6-v2');
    } catch (e) {
      console.error('Failed to load embedder model', e);
      throw e;
    }
  }
}
async function embed(text) {
  await ensureEmbedderLoaded();
  try {
    const output = await embedderModel.embed(text);
    return output.data;
  } catch (e) {
    console.error('Embedding failed', e);
    throw e;
  }
}
function cosineSimilarity(a, b) {
  let sum = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; ++i) {
    sum += a[i] * b[i]; normA += a[i] ** 2; normB += b[i] ** 2;
  }
  return sum / (Math.sqrt(normA) * Math.sqrt(normB));
}

// LLM (Phi-3 Mini) setup
let llmModel, llmReady = false, llmError = false;
export async function ensureLlmLoaded(statusId) {
  if (!llmModel && !llmError) {
    document.getElementById(statusId).innerText = "Loading AI model…";
    try {
      llmModel = await window.transformers.load('Xenova/phi-3-mini-4k-instruct');
      llmReady = true;
      document.getElementById(statusId).innerText = "AI model ready!";
    } catch (e) {
      document.getElementById(statusId).innerText = "AI model failed to load. Showing best-matching file content only.";
      llmReady = false;
      llmError = true;
    }
  }
}

// Main AI answer logic
export async function aiGetAnswer(query, statusId) {
  document.getElementById(statusId).innerText = "Thinking…";
  try {
    await ensureEmbedderLoaded();
  } catch (e) {
    console.error('Embedder unavailable', e);
  }
  let hits = [];
  if (aiState.files.length && embedderModel) {
    try {
      const queryEmbedding = await embed(query);
      for (let f of aiState.files)
        for (let chunk of f.chunks)
          if (!chunk.embedding) chunk.embedding = await embed(chunk.text);
      let scored = [];
      for (let f of aiState.files) for (let chunk of f.chunks) {
        const score = cosineSimilarity(queryEmbedding, chunk.embedding);
        scored.push({ file: f.name, text: chunk.text, score, snippet: `${chunk.start}-${chunk.end}` });
      }
      scored.sort((a, b) => b.score - a.score);
      hits = scored.slice(0, 3).filter(x => x.score > 0.2);
    } catch (e) {
      console.error('Semantic search failed', e);
    }
  }
  await ensureLlmLoaded(statusId);
  let contextText = hits.length ? hits.map(h => `[From ${h.file} lines ${h.snippet}]:\n${h.text}`).join('\n---\n') : '';
  let answerText;
  if (!llmReady) {
    answerText = hits.length
      ? hits.map(h => h.text).join('\n---\n') + "<br><em>(AI model unavailable, showing best-matching file content.)</em>"
      : "Sorry, I couldn't find relevant information in your files.";
  } else {
    const systemPrompt = "You are an expert assistant. Use the provided context from the user's files to answer the question. If there is no relevant information, say so. Cite the file and snippet if you use it.";
    const prompt = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Context:\n${contextText}\n\nQuestion: ${query}` }
    ];
    try {
      answerText = await llmModel.generate(
        prompt.map(m => `<|${m.role}|>\n${m.content}`).join('\n'),
        { max_new_tokens: 256, temperature: 0.2, stop: ["<|user|>", "<|system|>"] }
      ).then(out => out.generated_text.trim());
    } catch (err) {
      console.error('LLM generation failed', err);
      llmReady = false;
      answerText = hits.length
        ? hits.map(h => h.text).join('\n---\n') + "<br><em>(AI model error, showing best-matching file content.)</em>"
        : "Sorry, I couldn't find relevant information in your files.";
    }
  }
  document.getElementById(statusId).innerText = '';
  return { text: answerText, sources: hits.map(h => ({ file: h.file, snippet: h.snippet })) };
}
