import { useState, useEffect, useRef, useCallback } from 'react';
import { WebSocketService, ConnectionOptions, WebSocketMessage } from '../services/WebSocketService';

interface UseWebSocketServiceReturn {
  status: string;
  error: string | null;
  lastMessage: any;
  sendMessage: (message: string | WebSocketMessage) => boolean;
  reconnect: () => void;
  disconnect: () => void;
}

/**
 * Hook for using WebSocketService in React components
 */
export const useWebSocketService = (options: ConnectionOptions): UseWebSocketServiceReturn => {
  const [status, setStatus] = useState<string>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);
  
  // Use ref to maintain a single instance across renders
  const serviceRef = useRef<WebSocketService | null>(null);
  
  // Initialize the service
  useEffect(() => {
    // Create a new WebSocketService instance if it doesn't exist
    if (!serviceRef.current) {
      serviceRef.current = new WebSocketService(options);
    } else {
      // If URL changes, cleanup and reinitialize
      if (serviceRef.current && options.url !== serviceRef.current['url']) {
        serviceRef.current.disconnect();
        serviceRef.current = new WebSocketService(options);
      }
    }
    
    const service = serviceRef.current;
    
    // Set up event handlers
    const onStatusChange = (newStatus: string) => {
      setStatus(newStatus);
    };
    
    const onError = (errorMessage: string) => {
      setError(errorMessage);
    };
    
    const onMessage = (data: any) => {
      setLastMessage(data);
    };
    
    // Register event listeners
    service.on('statusChange', onStatusChange);
    service.on('error', onError);
    service.on('message', onMessage);
    
    // Connect to WebSocket server
    service.connect();
    
    // Cleanup function
    return () => {
      if (service) {
        service.removeListener('statusChange', onStatusChange);
        service.removeListener('error', onError);
        service.removeListener('message', onMessage);
        service.disconnect();
      }
    };
  }, [options.url]); // Only reinitialize if URL changes
  
  // Send message through the WebSocket
  const sendMessage = useCallback((message: string | WebSocketMessage): boolean => {
    if (serviceRef.current) {
      return serviceRef.current.send(message);
    }
    return false;
  }, []);
  
  // Reconnect to the WebSocket server
  const reconnect = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.reconnect();
    }
  }, []);
  
  // Disconnect from the WebSocket server
  const disconnect = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.disconnect();
    }
  }, []);
  
  return {
    status,
    error,
    lastMessage,
    sendMessage,
    reconnect,
    disconnect
  };
}; 