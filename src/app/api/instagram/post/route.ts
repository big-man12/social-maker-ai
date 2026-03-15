import { NextResponse } from 'next/server';
import { postToInstagram } from '@/lib/instagram';

export async function POST(request: Request) {
  try {
    const { imageUrl, caption } = await request.json();

    if (!imageUrl || !caption) {
      return NextResponse.json({ error: "이미지 URL과 캡션이 필요합니다." }, { status: 400 });
    }

    const result = await postToInstagram(imageUrl, caption);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error("Instagram API Route Error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
