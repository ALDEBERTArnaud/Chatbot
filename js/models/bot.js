// Model de l'objet Bot
export const createBot = (name, description, actions, profilePicture, apiEndpoint, secondaryApiEndpoint = null, thirdApiEndpoint = null) => ({
    name,
    description,
    actions,
    profilePicture,
    apiEndpoint,
    secondaryApiEndpoint,
    thirdApiEndpoint
});
