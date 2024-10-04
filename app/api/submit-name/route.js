import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

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
      bg: "#ffffff",
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

export async function PATCH(req) {
  try {
    const { id, bg } = await req.json();

    if (!id || !bg) {
      return NextResponse.json(
        { error: "Missing id or bg in the request body" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("tinytwinkles");

    const result = await db
      .collection("names")
      .updateOne({ _id: new ObjectId(id) }, { $set: { bg: bg } });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "No document found with the given id" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Background color updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (e) {
    console.error("Database error:", e);
    return NextResponse.json(
      { error: "Failed to update background color", details: e.message },
      { status: 500 }
    );
  }
}
