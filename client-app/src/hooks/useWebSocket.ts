import { useState, useEffect, useRef, useCallback } from 'react';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'failed';

interface WebSocketHookOptions {
  url: string;
  onOpen?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
  debug?: boolean;
}

interface WebSocketHookReturn {
  status: ConnectionStatus;
  sendMessage: (data: any) => void;
  lastMessage: any;
  connectionError: string | null;
  reconnect: () => void;
}

export const useWebSocket = (options: WebSocketHookOptions): WebSocketHookReturn => {
  const {
    url,
    onOpen,
    onMessage,
    onClose,
    onError,
    reconnectAttempts = 3,
    reconnectInterval = 5000,
    heartbeatInterval = 30000,
    debug = false
  } = options;

  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartbeatTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reconnectCountRef = useRef(0);
  const manualClose = useRef(false);

  const logDebug = useCallback((message: string, ...args: any[]) => {
    if (debug) {
      console.log(`[WebSocket] ${message}`, ...args);
    }
  }, [debug]);

  // Cleanup function to properly close connections and clear timers
  const cleanup = useCallback(() => {
    logDebug('Cleaning up WebSocket resources');
    
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
    
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, [logDebug]);

  // Function to establish connection
  const connect = useCallback(() => {
    // Clean up existing connection first
    cleanup();
    
    try {
      logDebug(`Connecting to ${url}...`);
      setStatus(reconnectCountRef.current > 0 ? 'reconnecting' : 'connecting');
      
      // Create new WebSocket connection
      const ws = new WebSocket(url);
      wsRef.current = ws;
      manualClose.current = false;
      
      // Connection opened
      ws.onopen = (event) => {
        logDebug('Connection established');
        setStatus('connected');
        setConnectionError(null);
        reconnectCountRef.current = 0;
        
        // Set up heartbeat to keep connection alive
        heartbeatTimerRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            logDebug('Sending heartbeat');
            ws.send(JSON.stringify({ type: 'heartbeat' }));
          }
        }, heartbeatInterval);
        
        // Call custom onOpen handler if provided
        if (onOpen) onOpen(event);
      };
      
      // Listen for messages
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          logDebug('Received message', data);
          setLastMessage(data);
          
          // Call custom onMessage handler if provided
          if (onMessage) onMessage(event);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      // Connection closed
      ws.onclose = (event) => {
        logDebug(`Connection closed: ${event.code} ${event.reason}`);
        
        // Clear heartbeat interval
        if (heartbeatTimerRef.current) {
          clearInterval(heartbeatTimerRef.current);
          heartbeatTimerRef.current = null;
        }
        
        if (!manualClose.current && reconnectCountRef.current < reconnectAttempts) {
          logDebug(`Attempting to reconnect (${reconnectCountRef.current + 1}/${reconnectAttempts})`);
          setStatus('reconnecting');
          reconnectCountRef.current += 1;
          
          // Set timeout for reconnection
          reconnectTimerRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        } else if (!manualClose.current) {
          logDebug('Max reconnection attempts reached or manually closed');
          setStatus('failed');
          setConnectionError(`Connection failed after ${reconnectAttempts} attempts`);
        } else {
          setStatus('disconnected');
        }
        
        // Call custom onClose handler if provided
        if (onClose) onClose(event);
      };
      
      // Connection error
      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setConnectionError('Connection error occurred');
        
        // Call custom onError handler if provided
        if (onError) onError(event);
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      setStatus('failed');
      setConnectionError(`Failed to create connection: ${error}`);
    }
  }, [url, reconnectAttempts, reconnectInterval, heartbeatInterval, cleanup, onOpen, onMessage, onClose, onError, logDebug]);

  // Send message through the WebSocket
  const sendMessage = useCallback((data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      wsRef.current.send(message);
      logDebug('Sent message', data);
      return true;
    } else {
      logDebug('Cannot send message, connection not open');
      return false;
    }
  }, [logDebug]);

  // Manual reconnect function
  const reconnect = useCallback(() => {
    logDebug('Manual reconnection requested');
    reconnectCountRef.current = 0;
    setConnectionError(null);
    connect();
  }, [connect, logDebug]);

  // Initialize connection on mount and clean up on unmount
  useEffect(() => {
    logDebug('Initializing WebSocket');
    connect();
    
    return () => {
      logDebug('Component unmounting, cleaning up');
      manualClose.current = true;
      cleanup();
    };
  }, [url, connect, cleanup, logDebug]);

  return {
    status,
    sendMessage,
    lastMessage,
    connectionError,
    reconnect
  };
}; 