const MODEL_ENDPOINT =
  "https://router.huggingface.co/hf-inference/models/Qwen/Qwen-Image";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: "Method not allowed",
    };
  }

  const token = process.env.HF_TOKEN;
  if (!token) {
    return { statusCode: 503, body: "Image generation is not configured." };
  }

  let prompt;
  try {
    ({ prompt } = JSON.parse(event.body || "{}"));
  } catch {
    return { statusCode: 400, body: "Invalid request." };
  }

  if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 2000) {
    return {
      statusCode: 400,
      body: "Please provide a prompt under 2,000 characters.",
    };
  }

  try {
    const response = await fetch(MODEL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt.trim() }),
    });

    if (!response.ok) {
      return {
        statusCode: 502,
        body: "The image service could not complete the request.",
      };
    }

    const image = Buffer.from(await response.arrayBuffer()).toString("base64");
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-Type": response.headers.get("content-type") || "image/png",
        "Cache-Control": "no-store",
      },
      body: image,
    };
  } catch {
    return {
      statusCode: 502,
      body: "The image service is temporarily unavailable.",
    };
  }
};
