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
    - 핵심 목표: m-maker-ai.vercel.app 사이트 노출 및 고단가 수익 모델 홍보
    - 카테고리별 특화 전략:
      1. SaaS: 구독형 소프트웨어의 업무 효율성과 지속적인 비즈니스 성장을 강조할 것
      2. 호스팅: 웹사이트의 안정성과 빠른 속도, 전문적인 지원 체계를 부각할 것
      3. AI 도구: 미래 지향적인 생산성 혁신과 작업 시간 단축을 제안할 것
      4. 금융/보험: 높은 신뢰도와 전문성, 그리고 명확한 경제적 혜택을 수치로 제시할 것
    - 필수 포함 사항: 하단에 '상세 정보는 프로필 링크 또는 m-maker-ai.vercel.app 에서 확인하세요' 문구 포함
    - 절대 준수 규칙: 이모지나 특수 기호를 절대 사용하지 말 것. 부드럽고 전문적인 텍스트로만 구성할 것
    - 구성: 공감 문구 + 카테고리별 솔루션 + 사이트 주소 CTA + 해시태그

    [응답 형식]
    ### 인스타그램 캡션
    (고단가 모델에 특화된 부드러운 광고 문구, 이모지 및 기호 금지)

    ### 유튜브 쇼츠 대본
    (15초 분량, 논리적 흐름 중심)

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
