export interface UserInterface {
    avatar: string;
    gender: string;
    thumbnails: {
        avatar: {
            [key: string]: string;
        };
    };
}

export interface ContactUser {
    full_address: string;
    address: string;
    city: string;
    district: string;
    id: number;
    is_default: 0 | 1;
    name: string;
    phone: string;
    zip3: string;
}
