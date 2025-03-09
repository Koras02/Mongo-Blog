## 데이터베이스 컬렉션

- **컬렉션 생성**

```bash
 use myDatabase; // 데이터베이스 선택
 db.createCollection('myCollection')
 # { ok: 1}
```

- **데이터 삽입**

```bash
db.myCollection.insertOne({ name: "Alice", age: 25 });
db.myCollection.insertMany([
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
])
```

- **데이터 조회**

```javascript
// 모든 문서 조회
db.myCollection.find();

// 특정 조건에 맞는 문서 조회
db.myCollection.find({ age: { $gt: 30 } });
```

- **데이터 업데이트**

```javascript
// 하나의 문서 업데이트
db.myCollection.updateOne(
  { name: "Alice" }, // 조건
  { $set: { age: 27 } } // 업데이트 내용
);

// 여러문서 업데이트
db.myCollection.updateMany(
  { age: { $lt: 30 } }, // 조건
  { $set: { status: "young" } } // 업데이트 내용
);
```

- 데이터 삭제

```javascript
// 하나의 문서 삭제
db.myCollection.deleteOne({ name: "Bob" });

// 여러 문서 삭제
db.myCollection.deleteMany({ age: { $lt: 30 } }); // 나이가 30 미만인 문서 삭제
```
