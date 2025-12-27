
import { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
   
    let query = Object.fromEntries(req.nextUrl.searchParams)
    let page = Number(query.page! ?? 1)

    let walletLedger = await prisma.walletLedger.findMany({
        take: 20,
        skip: Number((page - 1) * 20),

    })
    return NextResponse.json({ walletLedger }, { status: 200 })


}

export async function POST(req: NextRequest) {

    let { campaignId, submissionId } = await req.json()

    try {

        let walletLedge = await prisma.walletLedger.create({
            data: {
                amount: new Prisma.Decimal(5),
                campaignId,
                submissionId,
            }
        })
        return NextResponse.json({ walletLedge }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ error })
    }





}

