import { bookingsRef, prestationsRef, usersRef } from "$lib/server/db";
import jwt from "jsonwebtoken";
import { AUTH_TOKEN_SECRET } from "$env/static/private";

export async function load({ locals }) {
    const user = locals.user;

    let bookings = await bookingsRef.find({ by:user.id }).project({ _id:0 }).toArray();

    bookings = await Promise.all(bookings.map(async (booking) => {
        let prestation = structuredClone(await prestationsRef.findOne({ id:booking.prestation }));
        return { ...booking, prestation }
    }));

    return { bookings };
};

export const actions = {
    save: async({ cookies, request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        const { firstName, name, email } = formData;

        await usersRef.updateOne({ id:locals.user.id }, { $set:{ firstName, name, email } });

        cookies.set("token", generateAccessToken(email), { maxAge: 60 * 60 * 24 * 10, secure:false });
        locals.user = await usersRef.findOne({ email });

        return { err:false, msg:"Saved modifications", formData:{ firstName, name, email } };
    }
};

function generateAccessToken(email) {return jwt.sign(email, AUTH_TOKEN_SECRET);}