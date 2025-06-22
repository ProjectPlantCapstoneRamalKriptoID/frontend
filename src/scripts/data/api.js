// src\scripts\data\api.js

import {
  BACKEND_BASE_URL,
  COINDESK_BASE_URL,
  COINDESK_API_KEY,
} from "../config";

const ENDPOINTS = {
  // Articles
  ARTICLES_LIST: `${COINDESK_BASE_URL}/article/list`,

  // Authentication
  REGISTER: `${BACKEND_BASE_URL}/auth/signup`,
  LOGIN: `${BACKEND_BASE_URL}/auth/signin`,
  VERIFY_EMAIL: `${BACKEND_BASE_URL}/auth/verify-email`,
};

export async function getAllArticles(page = 1, limit = 12) {
  try {
    const url = new URL(ENDPOINTS.ARTICLES_LIST);
    url.searchParams.append("limit", limit);
    url.searchParams.append("apikey", COINDESK_API_KEY);

    if (page > 1) {
      url.searchParams.append("page", page);
    }

    const fetchResponse = await fetch(url.toString(), {
      headers: { "Content-Type": "application/json" },
    });

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const json = await fetchResponse.json();
    console.log("getAllArticles response:", json);

    return {
      success: fetchResponse.ok,
      ok: fetchResponse.ok,
      data: json.Data || [],
      message: json.message || "Data fetched successfully",
      total: json.total || (json.Data ? json.Data.length : 0),
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      success: false,
      ok: false,
      data: [],
      message: error.message || "Failed to fetch articles",
      total: 0,
    };
  }
}

export async function getArticle(page = 1, limit = 6) {
  try {
    const url = new URL(ENDPOINTS.ARTICLES_LIST);
    url.searchParams.append("limit", limit);
    url.searchParams.append("apikey", COINDESK_API_KEY);

    if (page > 1) {
      url.searchParams.append("page", page);
    }

    const fetchResponse = await fetch(url.toString(), {
      headers: { "Content-Type": "application/json" },
    });

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const json = await fetchResponse.json();
    console.log("getAllArticles response:", json);

    return {
      success: fetchResponse.ok,
      ok: fetchResponse.ok,
      data: json.Data || [],
      message: json.message || "Data fetched successfully",
      total: json.total || (json.Data ? json.Data.length : 0),
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      success: false,
      ok: false,
      data: [],
      message: error.message || "Failed to fetch articles",
      total: 0,
    };
  }
}

export async function getRegister({ name, email, password }) {
  try {
    // Validate input data
    if (!name || !email || !password) {
      throw new Error('Semua field harus diisi');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Format email tidak valid');
    }

    const requestData = { name: name.trim(), email: email.toLowerCase().trim(), password };
    
    // Log the data being sent (without password)
    console.log('Registration request data:', { 
      name: requestData.name, 
      email: requestData.email, 
      password: '***' 
    });
    console.log('Registration endpoint:', ENDPOINTS.REGISTER);

    const response = await fetch(ENDPOINTS.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    // Log response details
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    
    // Log the full response data
    console.log('Response data:', data);
    
    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 400) {
        if (data.message && data.message.toLowerCase().includes('email already exists')) {
          throw new Error('Email sudah terdaftar. Silakan gunakan email lain atau login jika Anda sudah memiliki akun.');
        }
        throw new Error(data.message || 'Data registrasi tidak valid');
      }
      
      if (response.status === 500) {
        throw new Error('Terjadi kesalahan server. Silakan coba lagi nanti.');
      }
      
      // Log more details about the error
      console.error('Registration failed with status:', response.status);
      console.error('Error response:', data);
      throw new Error(data.message || `Registrasi gagal dengan status ${response.status}`);
    }

    // Success case
    const successMessage = data.message || 'Registrasi berhasil! Silakan cek email Anda untuk verifikasi.';
    
    return {
      ok: true,
      success: true,
      message: successMessage,
      data: data.data || data,
      // Include any verification instructions
      instructions: 'Silakan cek email Anda (termasuk folder spam) dan klik link verifikasi untuk mengaktifkan akun.',
    };
  } catch (error) {
    console.error('Registration error:', error);
    
    // If it's a network error, provide more context
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        ok: false,
        success: false,
        message: 'Network error: Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
      };
    }
    
    return {
      ok: false,
      success: false,
      message: error.message || 'Terjadi kesalahan jaringan',
    };
  }
}

export async function getLogin({ email, password }) {
  try {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 400) {
        const errorMessage = data.message || "Login failed";

        // Check if it's email verification error
        if (
          errorMessage.toLowerCase().includes("email not verified") ||
          errorMessage.toLowerCase().includes("verify")
        ) {
          throw new Error(
            "Email belum diverifikasi. Silakan cek email Anda dan klik link verifikasi terlebih dahulu."
          );
        }

        throw new Error(errorMessage);
      }

      throw new Error(data.message || "Login failed");
    }

    return {
      ok: true,
      success: true,
      message: data.message || "Login successful",
      loginResult: {
        token: data.token,
      },
      data: data.data || data,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      ok: false,
      success: false,
      message: error.message || "Network error occurred",
    };
  }
}

export async function verifyEmail(token) {
  try {
    // Log the raw token
    console.log("Raw token received:", token);
    console.log("Token length:", token.length);
    console.log("Token type:", typeof token);

    const cleanToken = token.trim();
    console.log("Cleaned token:", cleanToken);

    // URL encode the token to handle special characters
    const encodedToken = encodeURIComponent(cleanToken);
    console.log("Encoded token:", encodedToken);

    const verifyUrl = `${ENDPOINTS.VERIFY_EMAIL}/${encodedToken}`;
    console.log("Full verification URL:", verifyUrl);

    const response = await fetch(verifyUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add user agent to avoid potential bot blocking
        "User-Agent": "RamalKripto-App/1.0",
      },
    });

    console.log("Verify response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    const data = await response.json();
    console.log("Verify response data:", data);

    if (!response.ok) {
      // Handle specific error cases with more detail
      if (response.status === 404) {
        console.error("Token not found or expired:", cleanToken);
        throw new Error(
          "Link verifikasi tidak valid atau sudah expired. Silakan minta link verifikasi baru."
        );
      }
      if (response.status === 400) {
        console.error("Bad request - invalid token format:", cleanToken);
        throw new Error("Format link verifikasi tidak valid");
      }
      throw new Error(
        data.message || `Verifikasi email gagal (Status: ${response.status})`
      );
    }

    return {
      ok: true,
      success: true,
      message: data.message || "Email berhasil diverifikasi",
      data: data.data || data,
    };
  } catch (error) {
    console.error("Email verification error:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        ok: false,
        success: false,
        message:
          "Network error: Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      };
    }

    return {
      ok: false,
      success: false,
      message: error.message || "Terjadi kesalahan jaringan",
    };
  }
}