// // src/routes/+page.server.ts


// import type { PageServerLoad } from './$types';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);

// export const load: PageServerLoad = async () => {
//     // Fetch properties from the 'properties' table
//     const { data: properties, error } = await supabase
//         .from('properties')
//         .select('*'); // Adjust fields if needed

//     if (error) {
//         console.error('Error fetching properties:', error);
//         return {
//             props: {
//                 properties: []
//             }
//         };
//     }

//     // Format properties for the frontend
//     const formattedProperties = properties.map((property) => ({
//         lat: property.latitude, // Ensure these fields match your table schema
//         lng: property.longitude,
//         title: property.title || 'No Title'
//     }));

//     return {
//         props: {
//             properties: formattedProperties
//         }
//     };
// };
