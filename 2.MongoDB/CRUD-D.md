## Delete(삭제)

- 특정 문서를 삭제합니다.

```
<!-- 특정 문서 삭제 -->
db.myCollection.deleteOne({ name: "Sakamoto" });

<!-- 여러 문서 삭제 -->
db.myCollection.deleteMany({ age: { $lt: 30 } });

```
