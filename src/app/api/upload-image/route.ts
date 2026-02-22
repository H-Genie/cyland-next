import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminFromRequest } from "utils/auth";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/upload-image:
 *   post:
 *     tags:
 *       - Upload
 *     summary: 이미지 업로드
 *     description: 관리자 인증 필요. FormData(image, name)로 imgBB에 업로드 후 URL 반환.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image: { type: "string", format: "binary" }
 *               name: { type: "string" }
 *     responses:
 *       200:
 *         description: 업로드 성공 (url, deleteUrl, image)
 *       400:
 *         description: 이미지 미제공 또는 잘못된 형식
 *       401:
 *         description: 인증 필요
 *       500:
 *         description: 서버 또는 ImgBB API 에러
 */
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const admin = await getAdminFromRequest(req, cookieStore);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const image = formData.get("image");
    let name = formData.get("name") as string | null;
    if (!name && image instanceof File && image.name) {
      name = image.name;
    }
    // imgBB는 name에 확장자가 있으면 "cyland.jpg" → "cyland-jpg.jpg"처럼 중복 저장함. 확장자 제거 후 전달
    if (name && name.includes(".")) {
      name = name.replace(/\.[^.]+$/, "");
    }

    if (!image) {
      return NextResponse.json(
        { error: "이미지가 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    const imgbbKey = process.env.IMGBB_KEY;

    if (!imgbbKey) {
      return NextResponse.json(
        { error: "IMGBB API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // 이미지가 File 객체인 경우 base64로 변환
    let imageBase64: string;

    if (image instanceof File) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageBase64 = buffer.toString("base64");
    } else if (typeof image === "string") {
      // 이미 base64 문자열인 경우
      imageBase64 = image.includes(",")
        ? image.split(",").pop() || image
        : image;
    } else {
      return NextResponse.json(
        { error: "잘못된 이미지 형식입니다." },
        { status: 400 }
      );
    }

    // imgbb.com API로 업로드
    const uploadFormData = new FormData();
    uploadFormData.append("key", imgbbKey);
    uploadFormData.append("image", imageBase64);
    if (name) {
      uploadFormData.append("name", name);
    }

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: uploadFormData
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("ImgBB API 오류:", errorData);
      return NextResponse.json(
        { error: "이미지 업로드에 실패했습니다.", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { error: "이미지 업로드에 실패했습니다.", details: data },
        { status: 500 }
      );
    }

    // 성공 시 직접 링크(display_url)와 삭제 URL 반환
    return NextResponse.json({
      success: true,
      url: data.data.display_url ?? data.data.url,
      deleteUrl: data.data.delete_url,
      image: data.data.image
    });
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    return NextResponse.json(
      {
        error: "서버 오류가 발생했습니다.",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
