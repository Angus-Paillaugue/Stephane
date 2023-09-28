export async function load({ locals }) {
    const { user } = locals;
    if(user) {
        return { user };
    }
}