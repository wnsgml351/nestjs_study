import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();

// 미들웨어
// get 요청 뒤에 있으면 get 실행 후 아무것도 찾지못할때 실행
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next();
});

//* json middleware
app.use(express.json());

app.use(catsRouter);

const port: number = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hello world");
});

// 404 미들웨어
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
