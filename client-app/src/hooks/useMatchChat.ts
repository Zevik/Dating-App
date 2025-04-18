import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWebSocketService } from './useWebSocketService';
import axios from 'axios';

export interface Message {
  id: number;
  match_id: number;
  sender_id: number;
  content: string;
  created_at: string;
}

export interface MatchDetails {
  id: number;
  user1_id: number;
  user2_id: number;
  other_user: {
    id: number;
    username: string;
    profile_picture?: string;
  };
}

interface UseMatchChatReturn {
  match: MatchDetails | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  connectionStatus: string;
  connectionError: string | null;
  sendMessage: (content: string) => boolean;
  reconnect: () => void;
}

export const useMatchChat = (matchId: string | undefined): UseMatchChatReturn => {
  const { user, token } = useAuth();
  const [match, setMatch] = useState<MatchDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  const wsUrl = `${process.env.REACT_APP_WS_URL || 'ws://localhost:3001'}/ws?matchId=${matchId}&token=${token}`;

  // WebSocket connection using our service
  const { 
    status: connectionStatus, 
    error: connectionError,
    lastMessage,
    sendMessage: wsSendMessage,
    reconnect 
  } = useWebSocketService({
    url: wsUrl,
    reconnectAttempts: 3,
    reconnectInterval: 5000,
    debug: process.env.NODE_ENV === 'development'
  });

  // Process incoming WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === 'message') {
        // Add the new message to our state
        addMessage({
          id: lastMessage.id,
          match_id: lastMessage.matchId,
          sender_id: lastMessage.sender_id,
          content: lastMessage.content,
          created_at: lastMessage.timestamp
        });
      }
    }
  }, [lastMessage]);

  // Function to load match details
  const loadMatchDetails = useCallback(async () => {
    if (!matchId || !token) {
      setError('Match ID or authentication token is missing');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(`${apiUrl}/api/matches/${matchId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMatch(response.data);
    } catch (err: any) {
      console.error('Error loading match details:', err);
      setError(err.response?.data?.message || 'Failed to load match details');
    } finally {
      setIsLoading(false);
    }
  }, [matchId, token, apiUrl]);

  // Function to load messages
  const loadMessages = useCallback(async () => {
    if (!matchId || !token) {
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/api/matches/${matchId}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessages(response.data);
    } catch (err: any) {
      console.error('Error loading messages:', err);
      // Don't set error here to prevent UI from showing error state
      // if match details loaded successfully but messages failed
    }
  }, [matchId, token, apiUrl]);

  // Initial data loading
  useEffect(() => {
    if (matchId && token) {
      loadMatchDetails();
      loadMessages();
    }
  }, [matchId, token, loadMatchDetails, loadMessages]);

  // Add a message to the messages array (for new incoming messages)
  const addMessage = useCallback((message: Message) => {
    setMessages(prevMessages => {
      // Check if message already exists to prevent duplicates
      if (prevMessages.some(msg => msg.id === message.id)) {
        return prevMessages;
      }
      return [...prevMessages, message];
    });
  }, []);

  // Send a new message
  const sendMessage = useCallback((content: string): boolean => {
    if (!content.trim() || !matchId || connectionStatus !== 'connected' || isSending) {
      return false;
    }
    
    setIsSending(true);
    
    try {
      // Send message through WebSocket
      const result = wsSendMessage({
        type: 'message:send',
        content: content.trim()
      });
      
      setIsSending(false);
      return result;
    } catch (err) {
      console.error('Error sending message:', err);
      setIsSending(false);
      return false;
    }
  }, [matchId, connectionStatus, isSending, wsSendMessage]);

  return {
    match,
    messages,
    isLoading,
    error,
    connectionStatus,
    connectionError,
    sendMessage,
    reconnect
  };
}; 