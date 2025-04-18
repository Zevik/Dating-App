import { EventEmitter } from 'events';

export interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

export interface ConnectionOptions {
  url: string;
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
  debug?: boolean;
}

/**
 * WebSocket Service for managing connections across the application
 */
export class WebSocketService extends EventEmitter {
  private socket: WebSocket | null = null;
  private reconnectAttempts: number;
  private reconnectInterval: number;
  private heartbeatInterval: number;
  private url: string;
  private debug: boolean;
  private reconnectTimer: any = null;
  private heartbeatTimer: any = null;
  private reconnectCount = 0;
  private manualClose = false;
  private connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'failed' = 'disconnected';
  private lastError: string | null = null;

  constructor(options: ConnectionOptions) {
    super();
    this.url = options.url;
    this.reconnectAttempts = options.reconnectAttempts || 3;
    this.reconnectInterval = options.reconnectInterval || 5000;
    this.heartbeatInterval = options.heartbeatInterval || 30000;
    this.debug = options.debug || false;
  }

  /**
   * Connect to the WebSocket server
   */
  public connect(): void {
    this.cleanup();
    
    try {
      this.log(`Connecting to ${this.url}...`);
      this.connectionStatus = this.reconnectCount > 0 ? 'reconnecting' : 'connecting';
      this.emit('statusChange', this.connectionStatus);
      
      this.socket = new WebSocket(this.url);
      this.manualClose = false;
      
      this.socket.onopen = this.handleOpen.bind(this);
      this.socket.onmessage = this.handleMessage.bind(this);
      this.socket.onclose = this.handleClose.bind(this);
      this.socket.onerror = this.handleError.bind(this);
    } catch (error) {
      this.log('Error creating WebSocket connection:', error);
      this.connectionStatus = 'failed';
      this.lastError = `Failed to create connection: ${error}`;
      this.emit('statusChange', this.connectionStatus);
      this.emit('error', this.lastError);
    }
  }

  /**
   * Manually disconnect from the WebSocket server
   */
  public disconnect(): void {
    this.manualClose = true;
    this.cleanup();
    this.connectionStatus = 'disconnected';
    this.emit('statusChange', this.connectionStatus);
  }

  /**
   * Send a message through the WebSocket
   */
  public send(message: string | WebSocketMessage): boolean {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.log('Cannot send message, connection not open');
      return false;
    }

    try {
      const messageString = typeof message === 'string' ? message : JSON.stringify(message);
      this.socket.send(messageString);
      this.log('Sent message', message);
      return true;
    } catch (error) {
      this.log('Error sending message:', error);
      return false;
    }
  }

  /**
   * Get current connection status
   */
  public getStatus(): string {
    return this.connectionStatus;
  }

  /**
   * Get last error message
   */
  public getLastError(): string | null {
    return this.lastError;
  }

  /**
   * Manually attempt to reconnect
   */
  public reconnect(): void {
    this.reconnectCount = 0;
    this.lastError = null;
    this.connect();
  }

  /**
   * Clean up resources
   */
  private cleanup(): void {
    this.log('Cleaning up WebSocket resources');
    
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
      this.socket.close();
      this.socket = null;
    }
  }

  /**
   * Handle WebSocket open event
   */
  private handleOpen(event: Event): void {
    this.log('Connection established');
    this.connectionStatus = 'connected';
    this.lastError = null;
    this.reconnectCount = 0;
    this.emit('statusChange', this.connectionStatus);
    this.emit('open', event);
    
    // Set up heartbeat to keep connection alive
    this.heartbeatTimer = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.log('Sending heartbeat');
        this.send({ type: 'heartbeat' });
      }
    }, this.heartbeatInterval);
  }

  /**
   * Handle WebSocket message event
   */
  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      this.log('Received message', data);
      this.emit('message', data);
    } catch (error) {
      this.log('Error parsing WebSocket message:', error);
      this.emit('error', 'Failed to parse message');
    }
  }

  /**
   * Handle WebSocket close event
   */
  private handleClose(event: CloseEvent): void {
    this.log(`Connection closed: ${event.code} - ${event.reason || 'No reason provided'}`);
    
    // Clear heartbeat interval
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    
    if (!this.manualClose && this.reconnectCount < this.reconnectAttempts) {
      this.log(`Attempting to reconnect (${this.reconnectCount + 1}/${this.reconnectAttempts})`);
      this.connectionStatus = 'reconnecting';
      this.emit('statusChange', this.connectionStatus);
      this.reconnectCount++;
      
      // Set timeout for reconnection
      this.reconnectTimer = setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    } else if (!this.manualClose) {
      this.log('Max reconnection attempts reached or manually closed');
      this.connectionStatus = 'failed';
      this.lastError = `Connection failed after ${this.reconnectAttempts} attempts`;
      this.emit('statusChange', this.connectionStatus);
      this.emit('error', this.lastError);
    } else {
      this.connectionStatus = 'disconnected';
      this.emit('statusChange', this.connectionStatus);
    }
    
    this.emit('close', event);
  }

  /**
   * Handle WebSocket error event
   */
  private handleError(event: Event): void {
    this.log('WebSocket error:', event);
    this.lastError = 'Connection error occurred';
    this.emit('error', this.lastError);
  }

  /**
   * Log debug messages if debug mode is enabled
   */
  private log(message: string, ...args: any[]): void {
    if (this.debug) {
      console.log(`[WebSocketService] ${message}`, ...args);
    }
  }
} 