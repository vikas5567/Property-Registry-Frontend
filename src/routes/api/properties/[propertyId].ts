import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

// Access environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
