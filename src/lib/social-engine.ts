import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSocialContent(input: string) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
      return "콘텐츠 생성 오류: 서버 환경 변수에서 API 키를 찾을 수 없습니다. (GOOGLE_API_KEY missing)";
  }
  
  // 실제 진단 결과, 현재 키에서 404가 나지 않는 유일한 안정 모델 명칭인 gemini-flash-latest를 사용합니다.
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" }, { apiVersion: "v1" });

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
  } catch (error: any) {
    console.error("Content generation failed:", error);
    return `콘텐츠 생성 오류: ${error.message || "알 수 없는 에러"}. API 키가 올바른지, 할당량이 남았는지 확인해 주세요.`;
  }
}
