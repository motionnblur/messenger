export async function auth(sessionID: string): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:8080/auth", {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        cookie: `SESSION_ID=${sessionID}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
