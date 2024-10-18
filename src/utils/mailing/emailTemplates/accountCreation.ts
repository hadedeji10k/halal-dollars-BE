import { EmailOptions } from "../../../interfaces";

export const accountCreationTemplate = (
  { context }: Pick<EmailOptions, "context">,
) => `<!DOCTYPE html>
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

    footer p {
      width: 50%;
      margin: 50px auto;

    }

      span{
        color: #285489;
      }

      .main {
        width: 100%;
        background-color: #EDEDED !important;
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
        background: #D90429;
        color: #fff;
        border-radius: 15px;
        padding: 10px;
        font-size: 1.2rem;
        font-weight: bold;
      }

      .container{
        width: 50%;
        margin: 0 auto;
        padding: 20px 0;
        background-color: #FFF !important;
      }

      @media screen and (max-width: 968px) {
        .container{
          width: 100%;
        }

        .iconContainer{
          width: 100%;
        }

        .condition{
          font-size: 12px;
          width: 80%;
          margin: 0 auto;
        }

        
        .text{
          font-size: 14px;
        }
        
        footer p {
          width: 100%;
        }
      }
    </style>
  </head>

  <body>
    <div class="main">
      <div class="logo">
        <img
          src=""
          alt=""
        />
      </div>
      
        <div class="container">

            <section>
                <h1 class="title">Welcome to Halal-dollars, ${context.name}</h1>
            </section>
            <main>
                <p>
                    Your OTP code from halal-dollars is
                </p>

                <p><span class="code">${context.activationCode}</span></p>

                <p class="condition">
                  <b>If you didn’t request for an OTP you can safely ignore this email.</b>
                </p>
            </main>
        </div>



      <footer>
        <div>
          <img
            src=""
            alt=""
          />
        </div>
        
        <p>
          If you have any complaints, please contact our support or send us an email <span>support@halal-dollarsapp.co</span>
        </p>

        
        <p class="iconContainer">
          <a
            class="icons"
            target="_blank"
            href="https://www.facebook.com/myhalal-dollarsapp/"
          >
            <img
              src=""
              alt=""
            />
          </a>
          <a
            class="icons"
            target="_blank"
            href=" https://twitter.com/myhalal-dollarsapp"
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
          <a class="icons" target="_blank" href=" https://t.me/halal-dollarsapp">
            <img
              src=""
              alt=""
            />
          </a>
          <a
            class="icons"
            target="_blank"
            href="https://www.linkedin.com/company/halal-dollarsapp/"
          >
            <img
              src=""
              alt=""
            />
          </a>
        </p>
      </footer>
    </div>
  </body>
</html>
`;
