import { IUser } from './user';

export interface IProfile extends IUser {
    name: string;
    role: string;
    city: string;
    image: string;
    isOpen: boolean;
    links: string;
    position: string;
    slogan: string;
    education: string;
    experience: string;
    techSkills: string;
    softSkills: string;
    projects: string;
    languages: string;
    interests: string;
    about: string;
    rating: number;
    mentorship: string[];
};