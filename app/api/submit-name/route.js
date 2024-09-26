import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(req) {
  try {
    const { userName, firstName, secondName, meaningOne, meaningTwo } =
      await req.json();

    const client = await clientPromise;
    const db = client.db("tinytwinkles");

    const result = await db.collection("names").insertOne({
      userName,
      firstName,
      secondName,
      meaningOne,
      meaningTwo,
    });

    return NextResponse.json({
      message: "Name submitted successfully",
      id: result.insertedId,
    });
  } catch (e) {
    console.error("Database error:", e);
    return NextResponse.json(
      { error: "Failed to submit name", details: e.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tinytwinkles");

    const names = await db.collection("names").find({}).toArray();

    return NextResponse.json(names);
  } catch (e) {
    console.error("Database error:", e);
    return NextResponse.json(
      { error: "Failed to fetch names", details: e.message },
      { status: 500 }
    );
  }
}
