import fs from 'fs';
import path from 'path';

export async function getLatestProduct() {
  try {
    // 1. 로컬 파일 시도 (개발 환경)
    const filePath = path.join(process.cwd(), '../src/data/product.json');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    }
    
    // 2. 공개 API 시도 (Vercel 배포 환경)
    // 메인 사이트의 product API를 직접 호출합니다.
    const PUBLIC_DATA_URL = "https://m-maker-ai.vercel.app/api/product";
    const res = await fetch(PUBLIC_DATA_URL, { next: { revalidate: 3600 } });
    if (res.ok) {
        const product = await res.json();
        // 이미지 URL이 로컬 상대경로인 경우 절대 경로로 변환
        if (product.image && product.image.startsWith('/')) {
          product.image = `https://m-maker-ai.vercel.app${product.image}`;
        }
        return product;
    }
    
    return null;
  } catch (error) {
    console.error("Failed to fetch product data from any source:", error);
    return null;
  }
}
