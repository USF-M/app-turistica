import roles from "../mocks/roles";
import users from "../mocks/users";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
    async getRoles() {
        await sleep(200);
        return roles;
    },

    async getUsers() {
        await sleep(250);
        return users;
    },

    async getCurrentUser() {
        await sleep(250);
        return users.find((user) => user.current) || users[0];
    },

    async switchCurrentUser(userId) {
        await sleep(150);
        const selected = users.find((user) => user.id === userId);
        return selected || users[0];
    },
};

export default authService;