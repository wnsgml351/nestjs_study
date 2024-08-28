import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

// 미들웨어
// get 요청 뒤에 있으면 get 실행 후 아무것도 찾지못할때 실행
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next();
});

// 이렇게 하면 som 요청시 먼저 여기를 거치고 뒤에 som을 실행
app.get("/cats/som", (req, res, next) => {
  console.log("this is som middleware");
  next();
});

const port: number = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
});

app.get("/cats/blue", (req: express.Request, res: express.Response) => {
  res.send({ blue: Cat[0] });
});

app.get("/cats/som", (req: express.Request, res: express.Response) => {
  res.send({ som: Cat[1] });
});

app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
