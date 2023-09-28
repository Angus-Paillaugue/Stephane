import { redirect } from "@sveltejs/kit";

export const load = (({ cookies, url, locals }) => {
    cookies.delete("token");
    locals.user = undefined;

    if(url.searchParams.get("redirect")){
        throw redirect(303, url.searchParams.get("redirect"));
    }else{
        throw redirect(303, '/auth');
    }
});