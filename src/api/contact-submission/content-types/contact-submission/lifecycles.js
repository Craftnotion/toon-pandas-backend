'use strict'
module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: "admin@toonpandas.com",
          from: "noreply@toonpandas.com",
          subject: `🚀 New Project Request from ${result.name}`,
          text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            NEW PROJECT REQUEST RECEIVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Contact Information:
   Name:    ${result.name}
   Email:   ${result.email}
   Company: ${result.company || 'Not specified'}

📋 Project Details:
   ${result.summary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please review and respond promptly.
          `,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Project Request</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                    🚀 New Project Request
                  </h1>
                  <p style="color: #e8f0fe; margin: 10px 0 0 0; font-size: 16px;">
                    A new project inquiry has been submitted
                  </p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">                
                  <!-- Contact Information Section -->
                  <div style="margin-bottom: 35px;">
                    <h2 style="color: #2c3e50; font-size: 20px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #3498db;">
                      👤 Contact Information
                    </h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #34495e; width: 100px;">Name:</td>
                        <td style="padding: 12px 0; color: #2c3e50; font-size: 16px;">${result.name}</td>
                      </tr>
                      <tr style="background-color: #f8f9fa;">
                        <td style="padding: 12px 0; font-weight: 600; color: #34495e;">Email:</td>
                        <td style="padding: 12px 0;">
                          <a href="mailto:${result.email}" style="color: #3498db; text-decoration: none; font-size: 16px;">
                            ${result.email}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #34495e;">Company:</td>
                        <td style="padding: 12px 0; color: #2c3e50; font-size: 16px;">
                          ${result.company || '<em style="color: #7f8c8d;">Not specified</em>'}
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Project Details Section -->
                  <div style="margin-bottom: 35px;">
                    <h2 style="color: #2c3e50; font-size: 20px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e74c3c;">
                      📋 Project Summary
                    </h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #e74c3c;">
                      <p style="margin: 0; line-height: 1.6; color: #2c3e50; font-size: 15px;">
                        ${result.summary}
                      </p>
                    </div>
                  </div>

                  <!-- Call to Action -->
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="mailto:${result.email}" 
                       style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                              color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; 
                              font-weight: 600; font-size: 16px; box-shadow: 0 3px 8px rgba(0,0,0,0.2);">
                      📧 Reply to ${result.name}
                    </a>
                  </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
                  <p style="margin: 0; color: #bdc3c7; font-size: 14px;">
                    This email was automatically generated from your website's contact form.
                  </p>
                  <p style="margin: 5px 0 0 0; color: #95a5a6; font-size: 12px;">
                    © ${new Date().getFullYear()} ToonPandas - All rights reserved
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
         console.log('✅ Contact form notification email sent successfully');
    } catch (err) {
      console.error("Email sending failed:", err);
    }
  },
};
