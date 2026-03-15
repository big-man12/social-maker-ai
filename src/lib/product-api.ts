import fs from 'fs';
import path from 'path';

export function getLatestProduct() {
  try {
    // 상품 데이터 경로는 root 기준 src/data/product.json
    // social-maker-ai 서브 디렉토리에서 접근하기 위해 상대 경로 계산
    const filePath = path.join(process.cwd(), '../src/data/product.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to read product data:", error);
    return null;
  }
}
