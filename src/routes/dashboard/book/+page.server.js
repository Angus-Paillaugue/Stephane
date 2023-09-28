import { coiffeursRef, prestationsRef, ratingsRef } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
    if(!locals.user) throw redirect(303, "/auth");
    
    const coiffeurs = await coiffeursRef.find({  }).project({ _id:0 }).toArray();
    const prestations = await prestationsRef.find({  }).project({ _id:0 }).toArray();
    const ratings = await ratingsRef.find({  }).project({ _id:0 }).toArray();

    return { coiffeurs, prestations, ratings };
};