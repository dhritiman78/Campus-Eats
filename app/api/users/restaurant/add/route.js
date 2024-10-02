import dbConn from "@/config/dbconn";
import Restaurant from "@/models/restaurants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        // Parse the request body
        const { name, description, location, photo, phone, cuisine, rating, website, email, openingHours } = await req.json();

        // Ensure database connection
        await dbConn();  

        // Add restaurant to the database
        const addRestaurant = new Restaurant({ name, description, location, photo, phone, cuisine, rating, website, email, openingHours });
        await addRestaurant.save();

        // Return success response
        return NextResponse.json({ message: "Restaurant added successfully!" });
    } catch (error) {
        console.error("Error adding restaurant:", error);
        // Return error response
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};
