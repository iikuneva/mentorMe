export default interface IProfile {
    id?: string,
    userEmail?: string,
    main: {
        name: string,
        image: string,
        role: string,
        position: string,
        slogan: string,
        status: string,
    },
    contact: {
        email: string,
        city: string,
        links: string,
    },
    description: {
        about: string,
        techSkills: string,
        softSkills: string,
        languages: string,
        interests: string,
    },
    mentorship?: Mentorship,
    education: string[],
    experience: string[],
    projects: string[],
    // rating?: number,
    // mentorship?: string[]
}

export interface Mentorship{
    profileId: string;
    isAccepted: boolean
}

