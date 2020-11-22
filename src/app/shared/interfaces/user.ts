import { IBase } from './base';

export interface IUser extends IBase {
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