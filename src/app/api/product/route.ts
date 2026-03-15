import { NextResponse } from 'next/server';
import { getLatestProduct } from '@/lib/product-api';

export async function GET() {
  const product = await getLatestProduct();
  return Response.json(product || {});
}
