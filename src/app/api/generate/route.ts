import { generateSocialContent } from '@/lib/social-engine';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { input } = await request.json();
    
    if (!input) {
      return NextResponse.json({ error: "입력 내용이 없습니다." }, { status: 400 });
    }

    const content = await generateSocialContent(input);
    
    // social-engine.ts에서 에러 시 반환하는 문자열 체크
    if (content.includes("API 키를 확인해 주세요")) {
        return NextResponse.json({ error: content }, { status: 500 });
    }

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
