import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface MessageQuery {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface MessagesContextType {
  queries: MessageQuery[];
  addQuery: (query: Omit<MessageQuery, 'id' | 'createdAt' | 'isRead'>) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  unreadCount: number;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [queries, setQueries] = useState<MessageQuery[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/messages');
        if (res.ok) {
          const data = await res.json();
          setQueries(data);
        }
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };
    fetchMessages();
  }, []);

  const addQuery = async (query: Omit<MessageQuery, 'id' | 'createdAt' | 'isRead'>) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      });
      if (res.ok) {
        const newMessage = await res.json();
        setQueries(prev => [newMessage, ...prev]);
      }
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
      });
      if (res.ok) {
        setQueries(prev => prev.map(q => q.id === id ? { ...q, isRead: true } : q));
      }
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const unreadCount = queries.filter(q => !q.isRead).length;

  return (
    <MessagesContext.Provider value={{ queries, addQuery, markAsRead, unreadCount }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
}
