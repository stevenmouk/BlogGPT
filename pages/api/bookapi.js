export default async function handler(req, res) {
  console.log(req.body.toString().replace(/"/g, ""));
  const response = await fetch(
    `http://library.lol/scimag/${req.body.toString().replace(/"/g, "")}`
  );

  const html = await response.text();

  res.status(200).json({ result: html });
}
