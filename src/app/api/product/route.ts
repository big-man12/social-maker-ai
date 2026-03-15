import { NextResponse } from 'next/server';
import { getLatestProduct } from '@/lib/product-api';

export async function GET() {
  const product = getLatestProduct();
  if (!product) {
    return NextResponse.json({ error: "상품 데이터를 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json(product);
}
