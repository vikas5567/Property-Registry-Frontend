import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const POST: RequestHandler = async ({ request, params }) => {
    const { propertyId } = params;
    const { bidAmount } = await request.json();

    if (!bidAmount || isNaN(Number(bidAmount)) || Number(bidAmount) <= 0) {
        return json({ message: 'Please enter a valid bid amount.' }, { status: 400 });
    }

    try {
        const { data, error: supabaseError } = await supabase
            .from('bids')
            .insert([{ property_id: propertyId, bid_amount: Number(bidAmount) }]);

        if (supabaseError) {
            throw supabaseError;
        }

        return json({ message: 'Bid placed successfully.' });
    } catch (err) {
        console.error(err);
        throw error(500, 'Failed to place bid.');
    }
};
