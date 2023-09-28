import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    const { url, cookies, locals } = event;

    const token = cookies.get('token');
    if(!token || !locals.user) {
        if(token){
            const user = await auth(token);
            if(!user?.error) {
                locals.user = user;
            }else {
                cookies.delete("token"); 
                throw redirect(303, "/");
            }
        }
    }
    
    if(url.pathname.startsWith("/dashboard") && !locals.user){
        cookies.delete("token"); 
        throw redirect(303, `/auth`);
    }

    return resolve(event);
}