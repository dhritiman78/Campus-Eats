import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';
import User from '@/models/users';
import dbConn from '@/config/dbconn';

// Connect to the database
dbConn();

export const GET = async (req) => {
    try {
        const token = req.headers.get('Authorization')?.replace('Bearer ', '');
        if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    
        const decoded = jwt.verify(token, process.env.NEXT_JWT_SECRET);
        const user = await User.findById(decoded.user);
    
        if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
     
        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
    }

