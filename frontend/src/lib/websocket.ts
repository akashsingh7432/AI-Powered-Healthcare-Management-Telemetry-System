/**
 * Utility to manage WebSocket connections for real-time telemetry data.
 */

type TelemetryCallback = (data: any) => void;

export class TelemetryWebSocket {
  private socket: WebSocket | null = null;
  private url: string;
  private onMessageCallback: TelemetryCallback;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(url: string, onMessage: TelemetryCallback) {
    this.url = url;
    this.onMessageCallback = onMessage;
  }

  public connect() {
    console.log(`Connecting to WebSocket at ${this.url}...`);
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected successfully.');
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.onMessageCallback(data);
      } catch (err) {
        console.error('Failed to parse telemetry data:', err);
      }
    };

    this.socket.onclose = () => {
      console.warn('WebSocket disconnected. Attempting to reconnect...');
      this.handleReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error observed:', error);
      this.socket?.close();
    };
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const timeout = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
      console.log(`Reconnecting in ${timeout / 1000} seconds...`);
      setTimeout(() => this.connect(), timeout);
    } else {
      console.error('Max WebSocket reconnect attempts reached.');
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
