export interface CountryData {
    message: string;
    status: string;
    current_page: number;
    data: Country[];
    first_page_url: string;
    from: number;
    next_page_url: string;
    path: string;
    per_page: string;
    prev_page_url?: any;
    to: number;
  }
  
  export interface Country {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }