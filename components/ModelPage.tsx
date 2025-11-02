import React, { useState, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ModelTool } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';
import { runCodeTool } from '../services/geminiService';
import { CodeIcon, ExplainIcon, DebugIcon, OptimizeIcon, LoadingIcon, CopyIcon, CheckIcon } from './IconComponents';

const toolConfig = {
    [ModelTool.Generate]: { icon: <CodeIcon className="h-5 w-5 mr-2" />, placeholder: "e.g., a login form with validation" },
    [ModelTool.Explain]: { icon: <ExplainIcon className="h-5 w-5 mr-2" />, placeholder: "Paste your code here for an explanation..." },
    [ModelTool.Debug]: { icon: <DebugIcon className="h-5 w-5 mr-2" />, placeholder: "Paste your buggy code here..." },
    [ModelTool.Optimize]: { icon: <OptimizeIcon className="h-5 w-5 mr-2" />, placeholder: "Paste code to be optimized..." },
};

const ModelPage: React.FC = () => {
    const [activeTool, setActiveTool] = useState<ModelTool>(ModelTool.Generate);
    const [language, setLanguage] = useState<string>('JavaScript');
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleSubmit = useCallback(async () => {
        if (!input.trim()) return;
        setIsLoading(true);
        setOutput('');
        try {
            const result = await runCodeTool(activeTool, input, language);
            setOutput(result);
        } catch (error) {
            setOutput('An error occurred. Please check the console for details.');
        } finally {
            setIsLoading(false);
        }
    }, [activeTool, input, language]);

    const handleToolChange = (tool: ModelTool) => {
        setActiveTool(tool);
        setInput('');
        setOutput('');
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };
    
    const getLanguageForHighlighter = (lang: string) => {
        const langMap: { [key: string]: string } = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'C': 'c',
            'C++': 'cpp',
            'C#': 'csharp',
            'Go': 'go',
            'Rust': 'rust',
            'PHP': 'php',
            'Ruby': 'ruby',
            'Swift': 'swift',
            'Kotlin': 'kotlin',
            'HTML': 'html',
            'CSS': 'css',
            'SQL': 'sql',
            'Node.js': 'javascript',
            'React.js': 'jsx',
            'Kafka': 'text',
            'R': 'r',
            'Shell': 'shell',
        };
        return langMap[lang] || 'text';
    };

    const highlighterLanguage = getLanguageForHighlighter(language);

    return (
        <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-orbitron font-bold text-cyan-400">AI Model Tools</h1>
                <p className="text-gray-400 mt-2">Generate, Explain, Debug, and Optimize your code with Gemini.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                {Object.values(ModelTool).map(tool => (
                    <button
                        key={tool}
                        onClick={() => handleToolChange(tool)}
                        className={`flex-1 flex items-center justify-center p-3 rounded-md font-orbitron text-sm font-medium transition-all duration-300 ${
                            activeTool === tool
                                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {toolConfig[tool].icon}
                        {tool}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4 flex flex-col min-h-[50vh]">
                    <div className="flex justify-between items-center mb-3">
                        <label htmlFor="language-select" className="text-gray-300 font-medium">Language</label>
                        <select
                            id="language-select"
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        >
                            {SUPPORTED_LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                        </select>
                    </div>
                    <div className="relative w-full h-full flex-grow font-mono text-sm">
                        <textarea
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder={toolConfig[activeTool].placeholder}
                            className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white p-3 rounded-md resize-none focus:outline-none z-10"
                            spellCheck="false"
                        />
                        <SyntaxHighlighter
                            language={highlighterLanguage}
                            style={vscDarkPlus}
                            customStyle={{
                                margin: 0,
                                padding: '12px',
                                height: '100%',
                                width: '100%',
                                backgroundColor: '#111827',
                                border: '1px solid #374151',
                                borderRadius: '0.375rem',
                            }}
                            codeTagProps={{ style: { fontFamily: 'inherit', fontSize: 'inherit' } }}
                            className="!absolute !inset-0 !w-full !h-full"
                            wrapLongLines={true}
                        >
                            {input || ' '}
                        </SyntaxHighlighter>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !input.trim()}
                        className="w-full mt-4 bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-500 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? <LoadingIcon className="animate-spin h-5 w-5 mr-2" /> : toolConfig[activeTool].icon}
                        {isLoading ? 'Processing...' : `Run ${activeTool}`}
                    </button>
                </div>

                <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4 min-h-[50vh] flex flex-col">
                     <h2 className="text-gray-300 font-medium mb-3">Output</h2>
                     <div className="relative group w-full h-full flex-grow">
                        {output && !isLoading && (
                            <button
                                onClick={handleCopy}
                                className="absolute top-2 right-2 z-20 p-1.5 rounded-full text-gray-400 bg-gray-800/50 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 hover:text-white"
                                aria-label={isCopied ? "Copied" : "Copy code"}
                            >
                                {isCopied ? (
                                    <CheckIcon className="h-5 w-5 text-green-400" />
                                ) : (
                                    <CopyIcon className="h-5 w-5" />
                                )}
                            </button>
                        )}
                        <div className="w-full h-full bg-gray-900 rounded-md border border-gray-700 overflow-y-auto font-mono text-sm">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <LoadingIcon className="animate-spin h-10 w-10 text-cyan-400" />
                                </div>
                            ) : output ? (
                                <SyntaxHighlighter
                                    language={highlighterLanguage}
                                    style={vscDarkPlus}
                                    customStyle={{ margin: 0, backgroundColor: 'transparent', padding: '12px' }}
                                    codeTagProps={{ style: { fontFamily: 'inherit', fontSize: 'inherit' } }}
                                    wrapLongLines={true}
                                >
                                    {output}
                                </SyntaxHighlighter>
                            ) : (
                                <div className="p-3 text-gray-500">AI response will appear here...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelPage;