import clientPromise from '../_lib/mongodb.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Missing email or password' });
        }

        const client = await clientPromise;
        const db = client.db('gate_prep');
        const collection = db.collection('users');

        // Find user
        const user = await collection.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Get or create user ID for data
        let userId = user.userId;
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            await collection.updateOne(
                { _id: user._id },
                { $set: { userId: userId } }
            );
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            userId: userId,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: error.message });
    }
}