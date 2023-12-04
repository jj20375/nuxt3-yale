export interface UserInterface {
    avatar: string;
    gender: string;
    thumbnails: {
        avatar: {
            [key: string]: string;
        };
    };
}
