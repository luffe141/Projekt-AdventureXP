export async function alertBackendException(response) {
  if (response.ok) return;

  let errorResponse;
  try {
    errorResponse = await response.clone().json();
  } catch {
    return;
  }

  if (
    typeof errorResponse?.message === "string" &&
    errorResponse.message.trim()
  ) {
    window.alert(errorResponse.message);
  }
}
