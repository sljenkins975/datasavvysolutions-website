// Keep live-demo details alongside the project so availability and disclosure stay consistent.
// Empty URLs intentionally render plain availability text instead of broken or misleading links.
export const projects: {
  title: string; category: string; description: string; question: string; appUrl: string;
  capabilities?: string[]; disclosure?: string; sourceUrl?: string;
  screenshot?: { src: string; alt: string };
}[] = [
  {
    title: 'Marketing Performance Analyzer',
    // Keep the real dashboard preview tied to its matching portfolio entry.
    screenshot: { src: 'images/marketing-performance-analyzer.png', alt: 'Marketing Performance Analyzer showing synthetic sample data, performance KPIs, and executive insights.' },
    category: 'Marketing analytics',
    description: 'Turn campaign activity into a clear view of marketing performance. Explore an interactive dashboard that brings spend, conversions, and reported revenue together to help identify questions worth investigating.',
    question: 'Which campaigns deserve a closer look—and are their metrics comparable?',
    capabilities: [
      'Track key measures, including return on ad spend and cost per acquisition, with plain-English definitions.',
      'Compare channels and campaigns, filter by date, and explore performance trends.',
      'Review explainable executive insights, upload a compatible CSV, and download filtered records.',
    ],
    disclosure: 'The live demo opens with synthetic data: fictional marketing activity, not client results or evidence of business impact.',
    appUrl: 'https://datasavvysolutions-marketing-analyzer-6rignvpchdeb2gyeurv3xt.streamlit.app/',
    sourceUrl: 'https://github.com/sljenkins975/datasavvysolutions-marketing-analyzer',
  },
  { title: 'E-commerce Analytics', category: 'Business intelligence', description: 'A planned demo connecting fictional orders, product performance, and revenue trends in a focused reporting experience.', question: 'What is driving changes in sales across products and time?', appUrl: '' },
  { title: 'Data Question Explorer', category: 'Data exploration', description: 'A planned guided question-and-answer experience over a controlled sample dataset, with visible definitions and traceable calculations.', question: 'How can a business question become a transparent, repeatable analysis?', appUrl: '' },
];
