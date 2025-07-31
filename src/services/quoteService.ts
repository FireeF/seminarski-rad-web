export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface QuoteResponse {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: Quote[];
}

export class QuoteService {
  private static readonly API_BASE = 'https://api.quotable.io';
  private static cache = new Map<string, any>();

  static async getRandomQuote(tag?: string): Promise<Quote | null> {
    try {
      const url = tag 
        ? `${this.API_BASE}/quotes/random?tags=${tag}`
        : `${this.API_BASE}/quotes/random`;
      
      const response = await fetch(url);
      if (!response.ok) return null;
      
      const data = await response.json();
      return Array.isArray(data) ? data[0] : data;
    } catch (error) {
      console.error('Error fetching quote:', error);
      return null;
    }
  }

  static async getMotivationalQuotes(page: number = 1, limit: number = 10): Promise<QuoteResponse | null> {
    const cacheKey = `motivational_${page}_${limit}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(
        `${this.API_BASE}/quotes?tags=motivational,inspirational&page=${page}&limit=${limit}`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching motivational quotes:', error);
      return null;
    }
  }

  static async getLanguageLearningQuotes(): Promise<Quote[]> {
    const cacheKey = 'language_learning_quotes';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(
        `${this.API_BASE}/quotes?tags=education,learning,knowledge&limit=20`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      const quotes = data.results || [];
      this.cache.set(cacheKey, quotes);
      return quotes;
    } catch (error) {
      console.error('Error fetching language learning quotes:', error);
      return [];
    }
  }

  static async searchQuotes(query: string, page: number = 1): Promise<QuoteResponse | null> {
    try {
      const response = await fetch(
        `${this.API_BASE}/search/quotes?query=${encodeURIComponent(query)}&page=${page}`
      );
      
      if (!response.ok) return null;
      
      return await response.json();
    } catch (error) {
      console.error('Error searching quotes:', error);
      return null;
    }
  }

  static async getQuotesByAuthor(authorSlug: string, page: number = 1): Promise<QuoteResponse | null> {
    try {
      const response = await fetch(
        `${this.API_BASE}/quotes?author=${authorSlug}&page=${page}`
      );
      
      if (!response.ok) return null;
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching quotes by author:', error);
      return null;
    }
  }

  static clearCache() {
    this.cache.clear();
  }
}

export default QuoteService;