

import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"



export async function POST(req: NextRequest) {
    const { link, note, campaignId } = await req.json()

    try {
        let submission =await prisma.submission.create({
            data: {
                link,
                note,
                campaignId,
            }
        })
        return NextResponse.json({submission}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error })
    }
}
export async function PUT(req: NextRequest) {
    const body = await req.json()

    try {
        let submission =await prisma.submission.update({
            where:{
                id:body.id
            },
            data: {
                link:body.link??undefined,
                note:body.note??undefined,
                campaignId:body.campaignId??undefined,
                status:body.status??undefined,
            }
        })
        return NextResponse.json({submission}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error })
    }
}