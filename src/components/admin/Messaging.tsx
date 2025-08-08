import React, { useState } from 'react';
import { Send, Paperclip, Search, Users } from 'lucide-react';
import { Message } from '../../types';

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    subject: 'Schedule Change',
    content: 'Please note that tomorrow\'s shift starts at 9 AM instead of 8 AM.',
    timestamp: new Date('2024-01-15T10:30:00'),
    isRead: false,
    senderName: 'Admin'
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    subject: 'Time Entry Correction',
    content: 'I forgot to clock out yesterday. Can you please add the missing time entry?',
    timestamp: new Date('2024-01-14T15:45:00'),
    isRead: true,
    senderName: 'John Smith'
  }
];

const Messaging: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: ''
  });
  const [showCompose, setShowCompose] = useState(false);

  const employees = [
    { id: '2', name: 'John Smith' },
    { id: '3', name: 'Sarah Johnson' },
    { id: '4', name: 'Mike Wilson' }
  ];

  const sendMessage = () => {
    const message: Message = {
      id: Date.now().toString(),
      senderId: '1', // Admin ID
      receiverId: newMessage.recipient || undefined,
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date(),
      isRead: false,
      senderName: 'Admin'
    };

    setMessages([message, ...messages]);
    setNewMessage({ recipient: '', subject: '', content: '' });
    setShowCompose(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Internal Messaging</h1>
        <button
          onClick={() => setShowCompose(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send className="h-4 w-4 mr-2" />
          New Message
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                    {message.senderName}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className={`text-sm ${!message.isRead ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                  {message.subject}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {message.content}
                </p>
                {!message.isRead && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{selectedMessage.subject}</h2>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-600">From: {selectedMessage.senderName}</p>
                  <p className="text-sm text-gray-500">
                    {selectedMessage.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <div className="prose prose-sm max-w-none">
                  {selectedMessage.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Type your reply..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">New Message</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                <select
                  value={newMessage.recipient}
                  onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select recipient...</option>
                  <option value="">All Employees (Broadcast)</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex items-center px-3 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach File
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCompose(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendMessage}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messaging;