
    import React, { useState, useRef, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Player } from '@lottiefiles/react-lottie-player';
    import { useData } from '@/contexts/DataContext';
    import { Send, X, Bot } from 'lucide-react';

    const ChatWidget = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [messages, setMessages] = useState([]);
      const [input, setInput] = useState('');
      const { aiKnowledge } = useData();
      const messagesEndRef = useRef(null);

      useEffect(() => {
        if (isOpen) {
          setMessages([
            {
              id: 1,
              text: 'Yo, ada yang bisa dibantuin? Tanya aja, santai.',
              sender: 'bot',
            },
          ]);
        }
      }, [isOpen]);

      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

      const getBotResponse = (userInput) => {
        const lowerCaseInput = userInput.toLowerCase();
        
        const slangResponses = [
          "Waduh, kurang tau nih. Coba tanya yang lain, siapa tau aku ngerti.",
          "Gak mudeng euy, bisa tolong jelasin lagi pertanyaannya?",
          "Wah, pertanyaannya sulit banget, Cuy. Aku cari info dulu ya.",
          "Hmm, kayaknya aku perlu belajar lagi soal ini. Nanti aku kabarin lagi ya!",
        ];

        if (!aiKnowledge || aiKnowledge.trim() === '') {
          return "Bro, sorry nih, otakku masih kosong. Tolong admin isi dulu ya, biar aku pinter.";
        }

        const sentences = aiKnowledge.toLowerCase().split(/[.!?]/);
        let bestMatch = { score: 0, sentence: slangResponses[Math.floor(Math.random() * slangResponses.length)] };

        const inputWords = new Set(lowerCaseInput.split(' '));

        sentences.forEach(sentence => {
          if (sentence.trim() === '') return;
          
          const sentenceWords = new Set(sentence.split(' '));
          const intersection = new Set([...inputWords].filter(x => sentenceWords.has(x)));
          const score = intersection.size;

          if (score > bestMatch.score) {
            bestMatch = { score, sentence: sentence.trim() };
          }
        });

        const finalResponse = bestMatch.sentence.charAt(0).toUpperCase() + bestMatch.sentence.slice(1);
        const slangGreeting = ["Santai aja, ini jawabannya: ", "Oke, jadi gini, ", "Nih, dengerin ya, "];

        if (bestMatch.score > 0) {
          return `${slangGreeting[Math.floor(Math.random() * slangGreeting.length)]}${finalResponse}.`;
        }

        return finalResponse;
      };

      const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage = {
          id: Date.now(),
          text: input,
          sender: 'user',
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        setTimeout(() => {
          const botResponse = {
            id: Date.now() + 1,
            text: getBotResponse(input),
            sender: 'bot',
          };
          setMessages((prev) => [...prev, botResponse]);
        }, 1000);
      };

      return (
        <>
          <div className="fixed bottom-5 right-5 z-[100]">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence>
                {isOpen ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <X size={32} />
                  </motion.div>
                ) : (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Player
                      autoplay
                      loop
                      src="/waving-robot.json"
                      style={{ height: '60px', width: '60px' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed bottom-24 right-5 w-80 h-[28rem] glass-effect rounded-2xl flex flex-col shadow-2xl z-[99]"
              >
                <div className="p-4 border-b border-white/10 flex items-center space-x-3">
                  <Bot className="text-indigo-400" />
                  <div>
                    <h3 className="font-bold gradient-text">Asisten Awan</h3>
                    <p className="text-xs text-gray-400">Online</p>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${
                        msg.sender === 'bot' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                          <Bot size={20} />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          msg.sender === 'bot'
                            ? 'bg-gray-700/50 rounded-bl-none'
                            : 'bg-indigo-600 text-white rounded-br-none'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t border-white/10">
                  <div className="flex items-center bg-gray-800/50 rounded-full">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Tanya sesuatu..."
                      className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
                    />
                    <button
                      onClick={handleSend}
                      className="p-2 text-indigo-400 hover:text-indigo-300"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      );
    };

    export default ChatWidget;
  