import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, Tag, Copy, Check } from 'lucide-react';

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    date: string;
    readTime: string;
    tags: string[];
    author: string;
  };
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(`${language}-${code.substring(0, 50)}`);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const CodeBlock = ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const code = String(children).replace(/\n$/, '');
    const codeId = `${language}-${code.substring(0, 50)}`;
    const isCopied = copiedCode === codeId;

    return match ? (
      <div className="relative group">
        <button
          onClick={() => copyToClipboard(code, language)}
          className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100 z-10"
          title="Copy code"
        >
          {isCopied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} className="text-gray-300" />
          )}
        </button>
        <SyntaxHighlighter
          style={oneDark}
          language={language}
          PreTag="div"
          className="rounded-lg !bg-gray-900 !mt-0 !mb-6"
          customStyle={{
            padding: '1.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm" {...props}>
        {children}
      </code>
    );
  };

  const components = {
    code: CodeBlock,
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-white mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-white mb-4 mt-8 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-blue-400 mb-4 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-blue-300 mb-3 mt-4">
        {children}
      </h4>
    ),
    p: ({ children }: any) => (
      <p className="text-gray-300 leading-relaxed mb-4 text-lg">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-none space-y-2 mb-6 ml-4">
        {children}
      </ul>
    ),
    li: ({ children }: any) => (
      <li className="text-gray-300 flex items-start">
        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
        <span>{children}</span>
      </li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-gray-800/50 rounded-r-lg">
        <div className="text-gray-300 italic">
          {children}
        </div>
      </blockquote>
    ),
    strong: ({ children }: any) => (
      <strong className="text-blue-300 font-semibold">
        {children}
      </strong>
    ),
    a: ({ children, href }: any) => (
      <a 
        href={href}
        className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  };

  return (
    <section className="py-20 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Blog</span>
          </button>

          {/* Article header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
              
              <span>by {post.author}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article content */}
          <article className="prose prose-lg max-w-none">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Article footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-2">Written by</p>
                <p className="text-white font-semibold">{post.author}</p>
              </div>
              
              <button
                onClick={onBack}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Back to Blog</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;