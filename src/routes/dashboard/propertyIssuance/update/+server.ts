import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

// Access environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type PropertyDetails = {
    latitude: string;
    longitude: string;
    areaCity: string;
    state: string;
    ownerPublicAddress: string;
    defaultBidAmount: number;
};

export const GET: RequestHandler = async ({ params }) => {
    const { propertyId } = params;

    try {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('id', propertyId)
            .single();

        if (error || !data) {
            return new Response(
                JSON.stringify({ message: 'Property not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify(data),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: 'Failed to fetch property details' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

export const PUT: RequestHandler = async ({ request, params }) => {
    const { propertyId } = params;
    const updatedDetails: PropertyDetails = await request.json();

    try {
        const { data, error } = await supabase
            .from('properties')
            .update(updatedDetails)
            .eq('id', propertyId);

        if (error || !data) {
            return new Response(
                JSON.stringify({ message: 'Property not found or failed to update' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ message: 'Property updated successfully' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: 'Failed to update property' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
