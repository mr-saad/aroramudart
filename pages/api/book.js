import { google } from "googleapis"

export default async (req, res) => {
  const { client_email, private_key } = JSON.parse(
    Buffer.from(process.env.credentials, "base64").toString()
  )
  const auth = new google.auth.GoogleAuth({
    scopes: "https://www.googleapis.com/auth/spreadsheets",
    credentials: {
      client_email,
      private_key,
    },
  })

  const client = await auth.getClient()
  const sheets = google.sheets({ version: "v4", auth: client })

  try {
    const data = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: process.env.spreadsheetID,
      range: "Sheet1!A3:F3",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [req.body],
      },
    })
    res.json(data)
  } catch (err) {
    throw new Error(err)
  }
}
