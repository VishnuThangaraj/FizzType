import router, { type Application } from "express";

const app: Application = router();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).json({ message: "done" });
});

app.listen(6969, () => {
  console.log("Server started");
});
