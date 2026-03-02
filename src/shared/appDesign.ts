export const designs = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
      }

      body {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #667eea, #764ba2, #6B46C1);
        background-size: 400% 400%;
        animation: gradientMove 12s ease infinite;
      }

      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .container {
        text-align: center;
        padding: 50px 40px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        color: white;
        max-width: 600px;
        width: 90%;
      }

      .logo {
        font-size: 50px;
        margin-bottom: 10px;
      }

      h1 {
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 15px;
      }

      p {
        font-size: 16px;
        opacity: 0.9;
        margin-bottom: 30px;
      }

      .btn {
        display: inline-block;
        padding: 12px 28px;
        font-size: 16px;
        border-radius: 50px;
        border: none;
        cursor: pointer;
        background: linear-gradient(90deg, #A855F7, #6366F1);
        color: white;
        text-decoration: none;
        transition: 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
      }

      .btn:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      }

      .footer {
        margin-top: 25px;
        font-size: 13px;
        opacity: 0.7;
      }
    </style>
  </head>

  <body>

    <div class="container">

      <div class="logo">🚀</div>

      <h1>Welcome to Your API Server</h1>

      <p>
        Your backend is running successfully.  
        Ready to power your application with speed, security, and reliability.
      </p>

      <a href="#" class="btn">Explore API</a>

      <div class="footer">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </div>

    </div>

  </body>
  </html>
  `;
