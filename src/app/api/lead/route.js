export async function POST(request) {
  try {
    const { name, phone, service, master, date, time, message } = await request.json();

    if (!name || !phone) {
      return Response.json({ error: "missing fields" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const text =
      "✨ Новая заявка — LUMIÈRE\n\n" +
      "Имя: " + name + "\n" +
      "Телефон: " + phone +
      (service ? "\nУслуга: " + service : "") +
      (master  ? "\nМастер: " + master  : "") +
      (date    ? "\nДата: "   + date    : "") +
      (time    ? "\nВремя: "  + time    : "") +
      (message ? "\nСообщение: " + message : "");

    const res = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const result = await res.json();
    if (!res.ok) return Response.json({ error: result }, { status: 500 });

    return Response.json({ ok: true });
  } catch (e) {
    console.error("ОШИБКА ЗАЯВКИ:", e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
