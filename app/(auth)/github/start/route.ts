export function GET() {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID as string,
    scope: "read:user user:email",
    allow_signup: "true",
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseUrl}?${formattedParams}`;
  return Response.redirect(finalUrl);
}
