const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;
const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "testdb";

app.use(express.json());

let usersCollection;

async function connectDB() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log("MongoDB Connect");
  const db = client.db(DB_NAME);
  usersCollection = db.collection("users");
}

connectDB().catch(console.error);

// 1) 데이터 삽입 - POST
app.post("/users", async (req, res) => {
  try {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res
      .status(201)
      .json({ message: "사용자 생성 완료", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2) 전체 조회 - GET
app.get("/users", async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3) 단일 조회 - Read
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // id가 유효한 ObjectID 문자열인지 확인
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "유효하지 않은 ID 형식입니다" });
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: "사용자가 없습니다" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 4) 업데이트 - Update (PUT: 전체조회)
app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const result = await usersCollection.replaceOne(
      { _id: new ObjectId(id) },
      newData
    );

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "유효하지 않은 ID 형식입니다" });
    }

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "사용자가 없습니다" });
    res.json({ message: "사용자 전체 수정 완료" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5) 일부 업데이트 - UPDATE (PATCH)
app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateFields = req.body;
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ message: "사용자가 없습니다" });
    res.json({ message: "사용자 일부 수정 완료" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6) 삭제 - Delete
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "사용자 없음" });
    res.json({ message: "사용자 삭제 완료" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server is running http://localhost:${PORT}`);
});
