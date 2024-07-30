import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const bidAmount = formData.get('bidAmount');
        const propertyId = formData.get('propertyId');

        if (!bidAmount || isNaN(Number(bidAmount)) || Number(bidAmount) <= 0) {
            return { message: 'Please enter a valid bid amount.' };
        }

        try {
            const { data, error } = await supabase
                .from('bids')
                .insert([{ property_id: propertyId, bid_amount: Number(bidAmount) }]);

            if (error) {
                throw error;
            }

            return { message: 'Bid placed successfully.' };
        } catch (err) {
            console.error(err);
            throw error(500, 'Failed to place bid.');
        }
    }
};
