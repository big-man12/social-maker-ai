import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSocialContent(input: string) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
      return "콘텐츠 생성 오류: 서버 환경 변수에서 API 키를 찾을 수 없습니다. (GOOGLE_API_KEY missing)";
  }
  
  // 진단 결과 gemini-flash-latest는 v1beta에서만 유효하므로 apiVersion 지정을 제거(기본 v1beta 사용)합니다.
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `
    당신은 세계 최고의 소셜 미디어 성장 해킹(Growth Hacking) 전문가이자 바이럴 마케터입니다. 
    아래 내용을 바탕으로 인스타그램에서 '폭발적인 조회수'와 '전환(구매)'을 유도하는 콘텐츠를 생성하세요.

    내용: ${input}

    [인스타그램 바이럴 전략]
    - 첫 줄은 무조건 '스크롤을 멈추게 하는' 강력한 후킹 문구(Hook)로 시작할 것 (예: "이거 모르면 손해", "역대급 가성비 발견", "품절되기 전에 보세요")
    - 혜택과 공포(FOMO)를 적절히 섞어 지금 당장 구매해야 하는 이유를 강조할 것
    - 친근하면서도 전문적인 '신뢰감 있는' 말투 사용
    - 댓글 참여를 유도하는 질문 포함

    [응답 형식]
    1. 인스타그램 캡션: (강력한 Hook + 본문 + 바이럴 해시태그 10개 이상)
    2. 유튜브 쇼츠 대본: (15초 분량, 1초 내 시선 집중 오프닝, 급박한 정보 전달)
    3. 카드뉴스 테마: (강렬한 대조 색상, 시선을 끄는 폰트 추천)
    4. 이미지 생성용 프롬프트: (영문, Cinematic, Unreal Engine 5 render, Product Photography style)
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error("Content generation failed:", error);
    return `콘텐츠 생성 오류: ${error.message || "알 수 없는 에러"}. API 키가 올바른지, 할당량이 남았는지 확인해 주세요.`;
  }
}
