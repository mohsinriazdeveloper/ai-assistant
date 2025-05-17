import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing startDate or endDate query parameter" },
      { status: 400 }
    );
  }

  const url = `https://www.bankofcanada.ca/stats/results/csv?rangeType=dates&lP=lookup_us_interest.php&sR=${startDate}&dF=${startDate}&dT=${endDate}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch US data: ${response.status}` },
        { status: response.status }
      );
    }

    const csv = await response.text();

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error fetching US data" },
      { status: 500 }
    );
  }
}
