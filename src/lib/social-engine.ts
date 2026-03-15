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

    [인스타그램 바이럴 광고 및 SEO 전략]
    - 핵심 목표: m-maker-ai.vercel.app 사이트의 검색 엔진 노출 순위 상승 및 방문 유도
    - 필수 포함 사항: 모든 인스타그램 캡션 하단에 '상세 정보는 프로필 링크 또는 m-maker-ai.vercel.app 에서 확인하세요' 문구를 포함할 것
    - 문구 스타일: 강압적이지 않고 부드러운 권유형 어조 사용. 사업자의 고민에 공감하고 해결책을 제시하는 스토리텔링 방식
    - 절대 준수 규칙: 문구 내에 이모지, 별표, 화살표 등 모든 장식용 기호를 절대 사용하지 말 것. 순수 텍스트로만 구성할 것
    - 구성: 공감 문구 + 서비스 장점 + 사이트 주소 포함 CTA + 관련 해시태그

    [응답 형식]
    ### 인스타그램 캡션
    (사이트 주소가 포함된 부드러운 광고 문구, 기호 및 이모지 사용 금지)

    ### 유튜브 쇼츠 대본
    (15초 분량, 텍스트 위주 설명)

    ### 이미지 생성용 프롬프트
    (Professional Minimalist Product Photography)
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
