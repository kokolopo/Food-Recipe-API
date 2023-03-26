import crypto from "crypto";
import Mailjet from "node-mailjet";

export const generateRandomPassword = (length) => {
  // Generate random bytes
  const buffer = crypto.randomBytes(length);

  // Convert bytes to string using base64 encoding
  const password = buffer.toString("base64");

  // Return password with specified length
  return password.substring(0, length);
};

export const htmlTemplate = (newPassword) => {
  const template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <style>
        table, td, div, h1, p {
          font-family: Arial, sans-serif;
        }
        @media screen and (max-width: 530px) {
          .unsub {
            display: block;
            padding: 8px;
            margin-top: 14px;
            border-radius: 6px;
            background-color: #555555;
            text-decoration: none !important;
            font-weight: bold;
          }
          .col-lge {
            max-width: 100% !important;
          }
        }
        @media screen and (min-width: 531px) {
          .col-sml {
            max-width: 27% !important;
          }
          .col-lge {
            max-width: 73% !important;
          }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;word-spacing:normal;background-color:#939297;">
      <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#939297;">
        <table role="presentation" style="width:100%;border:none;border-spacing:0;">
          <tr>
            <td align="center" style="padding:0;">
              <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                <tr>
                  <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;background-color:#ffffff;">
                    <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">[Food Recipes] Reset Your Password!</h1>
                    <p style="margin:0;">Hi user, welcome to Food Recipes.</p>
                    <p style="margin:0;">We heard that you lost your Food Recipes password. Sorry about that!</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:5px 30px 11px 30px;font-size:0;background-color:#ffffff;border-bottom:1px solid #f0f0f5;border-color:rgba(201,201,207,.35);">
                    <div class="col-lge" style="display:inline-block;width:100%;max-width:395px;vertical-align:top;padding-bottom:20px;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                      <p style="margin-top:0;margin-bottom:12px;">But don’t worry!</p>
                      <p style="margin-top:0;margin-bottom:18px;">Here the new password that you can use to login : </p>
                      <p style="margin:0;"><a style="background: #ff3884; text-decoration: none; padding: 10px 25px; color: #ffffff; border-radius: 4px; display:inline-block;"><span style="font-weight:bold;">${newPassword}</span></a></p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;background-color:#ffffff;">
                    <p style="margin:0;">Don't forget to change your password after you login to your Food Recipes account.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">
                    <p style="margin:0;font-size:14px;line-height:20px;">You're receiving this email because a password reset was requested for your account.<br></p>
                    <p style="margin:0;font-size:14px;line-height:20px;">&reg; Food Recipes, Indonesia 2023<br></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>`;

  return template;
};

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

export const request = (targetEmail, template) => {
  mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "hayatudin76@gmail.com",
          Name: "Mailjet Pilot",
        },
        To: [
          {
            Email: targetEmail,
            Name: "passenger 1",
          },
        ],
        Subject: "RESET PASSWORD",
        TextPart: "expired in 1 minute",
        HTMLPart: template,
      },
    ],
  });
};
