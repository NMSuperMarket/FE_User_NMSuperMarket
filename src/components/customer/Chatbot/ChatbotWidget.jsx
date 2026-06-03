import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, RefreshCw, Loader2, Trash2 } from 'lucide-react';
import client from '@/api/client';
import useAuthStore from '@/store/authStore';
import ProductCard from '../ProductCard';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const storageKey = `chat_history_${user?.id || 'guest'}`;
  const prevStorageKeyRef = useRef(storageKey);

  const [messages, setMessages] = useState(() => {
    const currentUser = useAuthStore.getState().user;
    const initialKey = `chat_history_${currentUser?.id || 'guest'}`;
    const saved = localStorage.getItem(initialKey);
    return saved ? JSON.parse(saved) : [
      { role: 'model', content: 'Xin chào! Tôi có thể giúp bạn tìm sản phẩm hoặc trả lời câu hỏi về NMSuperMarket.', products: [] }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Nạp lại lịch sử chat khi thay đổi tài khoản đăng nhập (user thay đổi)
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        { role: 'model', content: 'Xin chào! Tôi có thể giúp bạn tìm sản phẩm hoặc trả lời câu hỏi về NMSuperMarket.', products: [] }
      ]);
    }
    // Cập nhật lại ref để đồng bộ khóa lưu lịch sử đang hoạt động
    prevStorageKeyRef.current = storageKey;
  }, [user, storageKey]);

  // 2. Lưu lịch sử chat khi danh sách tin nhắn thay đổi
  useEffect(() => {
    scrollToBottom();
    // Tránh lưu đè lịch sử của tài khoản này sang tài khoản khác khi vừa chuyển đổi
    if (prevStorageKeyRef.current === storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey, isOpen]);

  const handleClearHistory = () => {
    const defaultMessages = [
      { role: 'model', content: 'Xin chào! Tôi có thể giúp bạn tìm sản phẩm hoặc trả lời câu hỏi về NMSuperMarket.', products: [] }
    ];
    setMessages(defaultMessages);
    localStorage.setItem(storageKey, JSON.stringify(defaultMessages));
  };

  const callApi = async (userMessage, history) => {
    try {
      // Bỏ tin nhắn chào mừng (đầu tiên) và tin nhắn mới đang gửi (cuối cùng) để tránh trùng lặp
      const chatHistory = history.slice(1, -1);
      // Giới hạn chỉ lấy tối đa 14 tin nhắn gần nhất để không vượt quá giới hạn hệ thống
      const recentHistory = chatHistory.slice(-14);
      // Gửi tin nhắn đến API chatbot
      const response = await client.post('/chatbot', {
        message: userMessage,
        history: recentHistory.map(m => ({ role: m.role, content: m.content }))
      });
      // Lấy câu trả lời và các sản phẩm được gợi ý
      const { reply, suggested_products } = response.data.data;
      // Kiểm tra xem có sản phẩm nào được gợi ý không
      if (suggested_products && suggested_products.length > 0) {
        // Gợi ý sản phẩm có thể chứa nhiều hơn 5 sản phẩm, giới hạn chỉ lấy 5 sản phẩm
        const limitedProducts = suggested_products.slice(0, 5);
        return { success: true, reply, products: limitedProducts };
      } else {
        return { success: true, reply, products: [] };
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      return { success: false };
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() && !isRetrying) return;
// Xử lý tin nhắn
    const userMessage = isRetrying ? lastUserMessage : input.trim();
    if (!isRetrying) {
      setInput('');
      setLastUserMessage(userMessage);
      setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    }
    
    setIsLoading(true);
    setIsRetrying(false);

    // Xóa tin nhắn lỗi cũ nếu đang retry
    const currentHistory = isRetrying ? messages.filter(m => !m.isError) : [...messages, { role: 'user', content: userMessage }];
    if (isRetrying) {
      setMessages(currentHistory);
    }

    const result = await callApi(userMessage, currentHistory);

    if (result.success) {
      setMessages(prev => [...prev, { role: 'model', content: result.reply, products: result.products }]);
    } else {
      setMessages(prev => [...prev, { role: 'model', content: 'Mất kết nối với máy chủ. Vui lòng thử lại.', isError: true }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-110 group"
        >
          <MessageSquare size={24} className="group-hover:animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-4rem)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-green-600 text-white px-5 py-4 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">NMS Assistant</h3>
                <span className="text-xs text-green-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                  Luôn sẵn sàng
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={handleClearHistory} 
                title="Xóa lịch sử trò chuyện" 
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Trash2 size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-5 overflow-y-auto bg-gray-50 flex flex-col gap-5 scroll-smooth">
            {messages.map((msg, index) => (
              <div key={index} className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={16} className="text-green-600" />
                  </div>
                )}
                
                <div className="flex flex-col gap-2">
                  <div className={`p-3.5 rounded-2xl text-[15px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-green-600 text-white rounded-tr-sm shadow-md' 
                      : msg.isError
                        ? 'bg-red-50 border border-red-100 text-red-600 rounded-tl-sm'
                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                  
                  {msg.isError && (
                    <button 
                      onClick={() => {
                        setIsRetrying(true);
                        handleSend();
                      }}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium self-start bg-white px-2 py-1 rounded shadow-sm border border-red-100 transition-colors"
                    >
                      <RefreshCw size={12} /> Thử lại
                    </button>
                  )}

                   {msg.products && msg.products.length > 0 && (
                    <div className="mt-1 flex gap-3 overflow-x-auto pb-2 max-w-[280px] scrollbar-thin">
                      {msg.products.slice(0, 5).map(p => (
                        <div key={p.id} className="w-[200px] flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                          <ProductCard product={p} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading / Typing indicator */}
            {isLoading && (
              <div className="flex max-w-[85%] gap-2 self-start animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-green-600" />
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[48px]">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full pr-1.5 pl-4 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi trợ lý AI..." 
                className="flex-1 py-3 bg-transparent focus:outline-none text-[15px] text-gray-800 placeholder:text-gray-400"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-green-600 hover:bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:hover:bg-green-600 transition-colors"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400">Được hỗ trợ bởi AI - Có thể mắc sai lầm</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
