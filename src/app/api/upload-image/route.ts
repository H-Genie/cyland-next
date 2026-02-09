import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const name = formData.get("name") as string | null;

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
      imageBase64 = image.includes(",") ? image.split(",").pop() || image : image;
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

    // 성공 시 이미지 URL 반환
    return NextResponse.json({
      success: true,
      url: data.data.url,
      deleteUrl: data.data.delete_url,
      image: data.data.image
    });
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
