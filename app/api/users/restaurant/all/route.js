import { NextResponse } from "next/server";
import Restaurant from "@/models/restaurants";
import dbConn from "@/config/dbconn";

export async function GET (req, res) {
   await dbConn();
    const allRestaurants = await Restaurant.find({});
    return NextResponse.json(allRestaurants);
    
}