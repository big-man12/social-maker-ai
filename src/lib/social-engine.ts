import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function generateSocialContent(input: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    당신은 소셜 미디어 마케팅 전문가입니다. 아래 내용을 분석하여 인스타그램과 유튜브 쇼츠 용 콘텐츠를 생성해 주세요.
    내용: ${input}

    [응답 형식]
    1. 인스타그램 캡션: (해시태그 포함, 감성적이고 클릭을 부르는 스타일)
    2. 유튜브 쇼츠 대본: (15초 분량, 오프닝 후킹 필수, 속도감 있는 전개)
    3. 카드뉴스 테마: (추천 색상 및 폰트 느낌)
    4. 이미지 생성용 프롬프트: (영문으로 작성, 초고화질 광고 느낌)
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Content generation failed:", error);
    return "콘텐츠 생성 중 오류가 발생했습니다. API 키를 확인해 주세요.";
  }
}
