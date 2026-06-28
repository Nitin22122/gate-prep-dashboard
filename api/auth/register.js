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
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const client = await clientPromise;
        const db = client.db('gate_prep');
        const collection = db.collection('users');

        // Check if user already exists
        const existingUser = await collection.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await collection.insertOne({
            name: name,
            email: email.toLowerCase(),
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            userId: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        });

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            userId: result.insertedId
        });

    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ error: error.message });
    }
}