import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const token = req.headers.get('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error logging out:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}