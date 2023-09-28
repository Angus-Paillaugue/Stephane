import { usersRef } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AUTH_TOKEN_SECRET } from "$env/static/private";
import { randomUUID } from "crypto";

export async function load({ locals }) {
    if(locals.user)throw redirect(303, "/dashboard");

    return {  };
}

export const actions = {
    login: async ({ cookies, request, locals }) => {
        try{
            const formData = Object.fromEntries(await request.formData());
            const { email, password } = formData;
            
            const userExists = await usersRef.findOne({ email });
            if(!userExists) return { logIn:{success:false, formData, message:"Aucun compte avec cet email!"} };
            const compare = await bcrypt.compare(password, userExists.password);
            if(compare){
                cookies.set("token", generateAccessToken(email), { maxAge: 60 * 60 * 24 * 10, secure:false });
                locals.user = userExists;
                throw redirect(303, "/dashboard");
            }
            return { logIn:{success:false, formData, message:"Mt de passe incorrect!"} };
        }catch(err){
            console.log(err);
        }
    },
    register: async ({ cookies, request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        const { email, password, firstName, name } = formData;

        if(!email || !password || !firstName || !name) return { register:{success:false, formData, message:"Veuillez remplir tous les champs!"} };

        const userExists = await usersRef.findOne({ email:email });
        if(userExists) return { register:{success:false, formData, message:"Cet e-mail est deja associé à un compte!"} };

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await usersRef.insertOne({ email, password:hash, joined:new Date(), firstName, name, id:randomUUID() });

        cookies.set("token", generateAccessToken(email), { maxAge: 60 * 60 * 24 * 10, secure:false });
        locals.user = await usersRef.findOne({ email });
        throw redirect(301, "/dashboard");
    }
};

function generateAccessToken(email) {return jwt.sign(email, AUTH_TOKEN_SECRET);}