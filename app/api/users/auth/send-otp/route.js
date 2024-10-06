import dbConn from "@/config/dbconn";
import User from "@/models/users"; // Ensure this path is correct
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const POST = async (req) => {
    try {
        await dbConn(); // Ensure database connection

        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required!" }, { status: 400 });
        }

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found!" }, { status: 404 });
        }

        // Generate a random OTP
        const otp = Math.floor(1000 + Math.random() * 9000);

        // Send the OTP using Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // You can use any email service provider like Outlook, etc.
            auth: {
                user: "dhritimanforevents1@gmail.com", // Your email address
                pass: "pxbz qetn kavn tldv", // Your email password (use App password if 2FA is enabled)
            },
        });

        const mailOptions = {
            from: "dhritimanforevents1@gmail.com", // Sender address
            to: email, // Recipient email address
            subject: 'OTP for password reset',
            text: `Your OTP for resetting your password is ${otp}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        const token = jwt.sign({ user: user._id, otp: otp }, process.env.NEXT_JWT_SECRET, { expiresIn: '5m' });

        // Return a success message
        return NextResponse.json({ message: "OTP sent successfully!",token }, { status: 200 });

    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};
