import submissions from "@/app/Submission/page";
import { prisma } from "@/lib/db";
import { Prisma, PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {

    let query = Object.fromEntries(req.nextUrl.searchParams)

    let page = Number(query.page! ?? 1)

    let campaign = await prisma.campaign.findMany({
        take: 20,
        skip: Number((page - 1) * 20),
        include: { submissions: true }
    })
    return NextResponse.json({ campaign }, { status: 200 })


}
export async function POST(req: NextRequest) {
    let body = await req.json()
    let { title, budget } = body
    let newCampaign = await prisma.campaign.create({
        data: {
            title,
            budget
        }
    })
    return NextResponse.json(newCampaign, { status: 201 })
}