import { EmailOptions } from "../../../interfaces";

export const pinChangeTemplate = (
  { context }: Pick<EmailOptions, "context">,
) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@100;200;300;500;700&display=swap");

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: "Poppins", sans-serif;
      }
      footer {
        margin-top: 2rem;
      }
      p {
        margin: 30px 0;
      }
      .main {
        width: 100%;
        background-color: #fff !important;
        padding: 20px;
        text-align: center;
        color: black !important;
      }

      .title {
        font-size: 1.5rem;
        margin: 30px auto 20px;
      }

      .subtitle {
        font-size: 1.2rem;
        margin: 10px auto 40px;
      }
      .logo {
        margin-bottom: 10px;
      }
      .image {
        height: 60px;
        width: 250px;
      }
      .line {
        width: 100%;
        height: 2px;
        border-width: 0;
        color: gray;
        background-color: #c0bfbf;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .icons {
        text-decoration: none;
        font-size: 2rem;
        color: gray;
        margin-right: 20px;
      }
      .icons {
        text-decoration: none;
        color: gray;
        margin-right: 20px;
      }
      .icons img {
        width: 25px;
        height: 25px;
      }
    </style>
  </head>

  <body>
    <div class="main">
      <div class="logo">
        <h2>Halal-dollars</h2>
      </div>
      <hr class="line" />

      <section>
        <h1 class="title">Dear ${context.name} </h1>
      </section>
      <main>
        <h3>Transaction Pin updated!</h3>
    
        <p>
            We’ve changed your transaction pin, as you asked. To view or change your account information,
            visit your account settings page.
        </p>
    
        <p>
            You are receiving this email because someone has change your transaction pin for your Halal-dollars account.
    
            If you feel this was an error please contact <b>Halal-dollars Team</b> immediately
        </p>
      </main>
      <hr class="line" />
      <footer>
        <p>
          If you need any help with your account <br />
          check the help center or <br />
          our team directly here
        </p>

        <p>
          <a
            class="icons"
            target="_blank"
            href="https://web.facebook.com/"
          >
            <img
              src=""
              alt=""
            />
          </a>
          <a
            class="icons"
            target="_blank"
            href="https://twitter.com/"
          >
            <img
              src=""
              alt=""
            />
          </a>
          <a
            class="icons"
            target="_blank"
            href="https://instagram.com"
          >
            <img
              src=""
              alt=""
            />
          </a>
          <a class="icons" target="_blank" href="https://t.me">
            <img
              src=""
              alt=""
            />
          </a>
          <a
            class="icons"
            target="_blank"
            href="https://www.linkedin.com/company/"
          >
            <img
              src=""
              alt=""
            />
          </a>
        </p>

        <p>🖤 The Halal-dollars Team</p>
      </footer>
    </div>

    <script
      src="https://kit.fontawesome.com/37f4fd33b5.js"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`;
