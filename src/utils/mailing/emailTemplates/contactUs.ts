import { EmailOptions } from "../../../interfaces";

export const contactUsTemplate = (
  { context }: Pick<EmailOptions, "context">,
) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Halal-dollars - Account created</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
        color: gray;
        margin-right: 20px;
      }
      .icons img {
        width: 25px;
        height: 25px;
      }
      .code {
        background: #4caf50;
        color: #fff;
        border-radius: 15px;
        padding: 10px;
        font-size: 1.2rem;
        font-weight: bold;
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
        <h1 class="title">A message from: ${context.email}</h1>
        <h1 class="title">Name: ${context.name}</h1>
      </section>
      <main>
        <p>
            The message is as follows:
        </p>

        <p>${context.message}</p>

        <p>
          If you have any complaints, please contact our <b>support</b> <br />
          or send us an email <b>support@halal-dollars.com</b>
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
            href="https://instagram.com/"
          >
            <img
              src=""
              alt=""
            />
          </a>
          <a class="icons" target="_blank" href="https://t.me/">
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
  </body>
</html>
`;
