const inputBox = document.getElementById("description");

document.getElementById("descForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const chatBox = document.getElementById("outputLatex");
  const userCode = inputBox.value.trim();
  console.log(userCode);
  if (!userCode) return;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userCode }),
  });

  const data = await res.json();
  chatBox.innerHTML = data.reply;

  const renderedLatex = document.getElementById("renderedLatex");

  renderedLatex.innerHTML = `\\(${data.reply}\\)`;
  const sanitizedLatex = data.reply.replace(/\$/g, "");

  renderedLatex.innerHTML = `\\(${sanitizedLatex}\\)`;
  MathJax.typeset();
});
