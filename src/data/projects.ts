// Set appUrl only after a separate Streamlit app is deployed and its public sample data is reviewed.
// Empty URLs intentionally render plain availability text instead of broken or misleading links.
export const projects: { title: string; category: string; description: string; question: string; appUrl: string }[] = [
  { title: 'Marketing Performance Analyzer', category: 'Marketing analytics', description: 'A planned interactive view of campaign spend, clicks, conversions, and channel performance using a fictional campaign dataset.', question: 'Which campaigns deserve a closer look—and are their metrics comparable?', appUrl: '' },
  { title: 'E-commerce Analytics', category: 'Business intelligence', description: 'A planned demo connecting fictional orders, product performance, and revenue trends in a focused reporting experience.', question: 'What is driving changes in sales across products and time?', appUrl: '' },
  { title: 'Data Question Explorer', category: 'Data exploration', description: 'A planned guided question-and-answer experience over a controlled sample dataset, with visible definitions and traceable calculations.', question: 'How can a business question become a transparent, repeatable analysis?', appUrl: '' },
];
