
export async function makeAPICall() {
  const response = await fetch(
    "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata"
  );
  const data = await response.json();

  const themeRes = data.theme;
  document.documentElement.style.setProperty(
    "--color-background",
    themeRes["--background"].slice(4, -1)
  );
  document.documentElement.style.setProperty(
    "--color-foreground",
    themeRes["--foreground"].slice(4, -1)
  );
  document.documentElement.style.setProperty(
    "--color-primary",
    themeRes["--primary"].slice(4, -1)
  );
  document.documentElement.style.setProperty(
    "--color-primary-foreground",
    themeRes["--primary-foreground"].slice(4, -1)
  );
  document.body.style.backgroundColor = themeRes["--background"];
  return data;
}
