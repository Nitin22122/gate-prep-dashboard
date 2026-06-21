import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'Missing userId' });
        }

        const client = await clientPromise;
        const db = client.db('gate_prep');
        const collection = db.collection('user_data');

        const result = await collection.findOne({ userId: userId });

        if (!result) {
            return res.status(200).json({ 
                success: true, 
                data: null,
                message: 'No data found for this user'
            });
        }

        return res.status(200).json({ 
            success: true, 
            data: result.data,
            updatedAt: result.updatedAt
        });

    } catch (error) {
        console.error('Load error:', error);
        return res.status(500).json({ error: error.message });
    }
}