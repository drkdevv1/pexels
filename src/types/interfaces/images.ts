export interface PexelsResponse {
    photos: Image[];
    next_page: string;
    page: number;
    per_page: number;
    total_results: number;
}


export interface ImageSource {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}

export interface Image {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: ImageSource;
    liked: boolean;
    alt: string;
}

export interface CardProps extends Image { }

export interface CardListProps {
    images: Image[];
}