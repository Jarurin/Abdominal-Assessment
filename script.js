
 // script.js
// บันทึกจำนวนครั้งที่ผู้เล่นกดปุ่มเขย่ากล่อง
// ใช้ Google Apps Script Web App และ Google Sheets ชีต Events เดิม

const STATS_URL =
  "https://script.google.com/macros/s/AKfycbyB4Ydw1c16MFGyTBcKXJti64OyyDf13Ma24Q7ywvkgwNChCHhEubCdkNKUuUilJRuZMw/exec";

const SHAKE_GAME_NAMES = {
  fluid: "Abdominal Assessment - Fluid thrill",
  shifting: "Abdominal Assessment - Shifting dullness"
};

function recordShake(gameKey) {
  const gameName = SHAKE_GAME_NAMES[gameKey];

  if (!gameName) {
    console.warn("ไม่พบเกมสำหรับบันทึกสถิติ:", gameKey);
    return;
  }

  const sessionId =
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const payload = {
    game: gameName,
    event: "shake",
    count: 1,
    session: sessionId
  };

  fetch(STATS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch((error) => {
    console.error("ส่งสถิติการเขย่ากล่องไม่สำเร็จ:", error);
  });
}
