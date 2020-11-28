export default interface IProfile {
    id?: string,
    userEmail: string,
    main: {
        name: string,
        image: string,
        role: boolean,
        position: string,
        slogan: string,
        status: boolean,
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
    education: string[],
    experience: string[],
    projects: string[],
    // rating?: number,
    // mentorship?: string[]
}

