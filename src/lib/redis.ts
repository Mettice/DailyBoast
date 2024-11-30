import Redis from 'ioredis';

class RedisClient {
  private static instance: Redis | null = null;
  private static isConnecting = false;

  static async getInstance(): Promise<Redis | null> {
    if (this.isConnecting) {
      return null;
    }

    if (!this.instance) {
      try {
        this.isConnecting = true;
        this.instance = new Redis({
          host: '127.0.0.1',
          port: 6379,
          retryStrategy: (times: number) => {
            if (times > 3) {
              console.error('Redis connection failed after 3 retries');
              return null; // stop retrying
            }
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
          maxRetriesPerRequest: 3,
          enableOfflineQueue: false,
          showFriendlyErrorStack: true,
          lazyConnect: true,
        });

        this.instance.on('error', (error: Error) => {
          console.error('Redis connection error:', error);
          this.instance = null;
        });

        this.instance.on('connect', () => {
          console.log('Successfully connected to Redis');
        });

        // Test the connection
        await this.instance.ping();
      } catch (error) {
        console.error('Failed to create Redis client:', error);
        this.instance = null;
      } finally {
        this.isConnecting = false;
      }
    }

    return this.instance;
  }

  static async disconnect(): Promise<void> {
    if (this.instance) {
      await this.instance.quit();
      this.instance = null;
    }
  }
}

export default RedisClient; 