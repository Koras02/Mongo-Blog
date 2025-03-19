## Update (수정)

기존 문서를 수정합니다.

```
<!-- 특정 문서 수정 -->
db.myCollection.updateOne(
  { name: "Sakamoto"}, // 조건
  { $set: { age: 32} }
);

<!-- 여러문서 수정  -->
db.myCollection.updateMany(
    { city: "Seoul"}, // 조건
    { $set: { city: "서울 특별시"} }
);
```
