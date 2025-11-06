// src/app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.TARGET_API || 'https://job.professionalacademyedu.com/api';

// دالة لقراءة الـ body مرة واحدة فقط وتخزينه
let requestBody: any = null;
let bodyRead = false;

async function readRequestBody(request: NextRequest) {
  // إذا الـ body اتعمل قراءة قبل كده، ارجع النسخة المخزنة
  if (bodyRead && requestBody !== null) {
    return requestBody;
  }

  const contentType = request.headers.get('content-type') || '';
  
  try {
    if (contentType.includes('multipart/form-data') || contentType.includes('boundary=')) {
      requestBody = await request.formData();
    } else if (contentType.includes('application/json')) {
      const text = await request.text();
      requestBody = text.trim() ? JSON.parse(text) : undefined;
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      requestBody = await request.formData();
    } else {
      // لأي نوع تاني، جرب كـ text
      requestBody = await request.text();
    }
    
    bodyRead = true;
    return requestBody;
  } catch (error) {
    console.error('❌ Error reading request body:', error);
    return undefined;
  }
}

// Reset function علشان نreset الـ body لكل request جديد
function resetBodyState() {
  requestBody = null;
  bodyRead = false;
}

async function proxyRequest(
  method: string,
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
  request?: NextRequest,
  token?: string,
  schoolId?: string
) {
  const url = `${baseUrl}/${endpoint}`;
  
  const headers: HeadersInit = {};

  // استخدام التوكن الممرر مباشرة أو استخراجه من الكوكيز
  let authToken = token;
  
  if (!authToken) {
    // استخراج التوكن من الكوكيز
    const cookies = request?.headers.get('cookie') || '';
    const tokenMatch = cookies.match(/token=([^;]+)/);
    
    if (tokenMatch) {
      authToken = decodeURIComponent(tokenMatch[1]);
    }
  }

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
    console.log('✅ Token added to headers');
  }

  // استخدام schoolId الممرر مباشرة أو استخراجه من الكوكيز
  let schoolID = schoolId;
  
  if (!schoolID) {
    // استخراج school_id من الكوكيز
    const cookies = request?.headers.get('cookie') || '';
    const schoolIdMatch = cookies.match(/school_id=([^;]+)/);
    
    if (schoolIdMatch) {
      schoolID = decodeURIComponent(schoolIdMatch[1]);
    }
  }

  // إضافة X-School-ID header إذا موجود
  if (schoolID) {
    headers['X-School-ID'] = schoolID;
    console.log('🏫 School ID added to headers:', schoolID);
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (body) {
    if (body instanceof FormData) {
      fetchOptions.body = body;
    } else {
      headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(body);
    }
  }

  console.log('🚀 Proxying request to:', url);
  console.log('📋 Method:', method);
  console.log('🔐 Headers:', headers);
  console.log('📦 Body type:', body ? (body instanceof FormData ? 'FormData' : 'JSON') : 'No body');

  try {
    const response = await fetch(url, fetchOptions);
    
    console.log('📡 Response status:', response.status);
    
    const responseContentType = response.headers.get('content-type') || '';
    const isJson = responseContentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    return { response, data };
  } catch (error) {
    console.error('❌ Fetch error:', error);
    throw error;
  }
}

// POST - مع دعم FormData
export async function POST(request: NextRequest) {
  // Reset الـ body state علشان كل request جديد
  resetBodyState();
  
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/api/proxy/')[1].split('/');
    const endpoint = path.join('/');
    
    const contentType = request.headers.get('content-type') || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = undefined;

    console.log('📨 Received POST request for:', endpoint);
    console.log('📧 Content-Type:', contentType);

    // استخراج التوكن و school_id من headers مخصصة إذا أرسلت
    const authHeader = request.headers.get('x-auth-token');
    const schoolHeader = request.headers.get('x-school-id');
    let token: string | undefined = authHeader || undefined;
    let schoolId: string | undefined = schoolHeader || undefined;

    // قراءة الـ body مرة واحدة فقط باستخدام الدالة الجديدة
    body = await readRequestBody(request);
    console.log('📄 Body read successfully, type:', body ? (body instanceof FormData ? 'FormData' : typeof body) : 'No body');

    const { response, data } = await proxyRequest('POST', endpoint, body, request, token, schoolId);

    // معالجة تسجيل الدخول - حفظ التوكن و school_id
    if ((endpoint === 'login/admin' || endpoint === 'user/login') && response.ok && data && data.token) {
      console.log('🔐 Login successful, returning token in response');
      
      // استخراج school_id من بيانات المستخدم
      const userSchoolId = data.data?.school_id || null;
      
      const responseData = {
        ...data,
        _token: data.token,
        _school_id: userSchoolId
      };
      
      const res = NextResponse.json(responseData, { status: response.status });
      
      // حفظ التوكن و school_id في الكوكيز
      res.cookies.set({
        name: 'token',
        value: data.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      if (userSchoolId) {
        res.cookies.set({
          name: 'school_id',
          value: userSchoolId.toString(),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
      }
      
      return res;
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Proxy POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    // Reset الـ body state بعد ما نخلص
    resetBodyState();
  }
}

// GET - مع إمكانية تمرير التوكن و school_id عبر headers
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/api/proxy/')[1].split('/');
    const endpoint = path.join('/');

    console.log('📨 Received GET request for:', endpoint);

    // استخراج التوكن و school_id من headers مخصصة
    const authHeader = request.headers.get('x-auth-token');
    const schoolHeader = request.headers.get('x-school-id');
    let token: string | undefined = authHeader || undefined;
    let schoolId: string | undefined = schoolHeader || undefined;

    const { response, data } = await proxyRequest('GET', endpoint, undefined, request, token, schoolId);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Proxy GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - بنفس المنطق
export async function PUT(request: NextRequest) {
  resetBodyState();
  
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/api/proxy/')[1].split('/');
    const endpoint = path.join('/');
    
    const contentType = request.headers.get('content-type') || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = undefined;

    const authHeader = request.headers.get('x-auth-token');
    const schoolHeader = request.headers.get('x-school-id');
    let token: string | undefined = authHeader || undefined;
    let schoolId: string | undefined = schoolHeader || undefined;

    // قراءة الـ body مرة واحدة فقط
    body = await readRequestBody(request);

    const { response, data } = await proxyRequest('PUT', endpoint, body, request, token, schoolId);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Proxy PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    resetBodyState();
  }
}

// PATCH - بنفس المنطق
export async function PATCH(request: NextRequest) {
  resetBodyState();
  
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/api/proxy/')[1].split('/');
    const endpoint = path.join('/');
    
    const contentType = request.headers.get('content-type') || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = undefined;

    const authHeader = request.headers.get('x-auth-token');
    const schoolHeader = request.headers.get('x-school-id');
    let token: string | undefined = authHeader || undefined;
    let schoolId: string | undefined = schoolHeader || undefined;

    // قراءة الـ body مرة واحدة فقط
    body = await readRequestBody(request);

    const { response, data } = await proxyRequest('PATCH', endpoint, body, request, token, schoolId);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Proxy PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    resetBodyState();
  }
}

// DELETE - بنفس المنطق
export async function DELETE(request: NextRequest) {
  resetBodyState();
  
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/api/proxy/')[1].split('/');
    const endpoint = path.join('/');

    const authHeader = request.headers.get('x-auth-token');
    const schoolHeader = request.headers.get('x-school-id');
    let token: string | undefined = authHeader || undefined;
    let schoolId: string | undefined = schoolHeader || undefined;

    let body = undefined;
    
    try {
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        body = await readRequestBody(request);
      }
    } catch (parseError) {
      console.error('❌ JSON parse error in DELETE:', parseError);
    }

    const { response, data } = await proxyRequest('DELETE', endpoint, body, request, token, schoolId);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Proxy DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    resetBodyState();
  }
}