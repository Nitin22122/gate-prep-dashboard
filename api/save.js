import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { userId, data } = req.body;

        if (!userId || !data) {
            return res.status(400).json({ error: 'Missing userId or data' });
        }

        const client = await clientPromise;
        const db = client.db('gate_prep');
        const collection = db.collection('user_data');

        const result = await collection.updateOne(
            { userId: userId },
            { 
                $set: { 
                    data: data,
                    updatedAt: new Date().toISOString()
                } 
            },
            { upsert: true }
        );

        return res.status(200).json({ 
            success: true, 
            message: 'Data saved successfully'
        });

    } catch (error) {
        console.error('Save error:', error);
        return res.status(500).json({ error: error.message });
    }
}