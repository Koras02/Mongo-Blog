## Create(생성)

데이터 베이스와 컬렉션을 만들고 문서를 추가함 <br>

```
use myDatabase

<!-- 문서 추가 -->
db.myCollection.insertOne({
    name: "James",
    age: 25,
    city: "New York"
});

<!-- 여러 문서 추가 -->
db.myCollection.insertMany([
    { name: "Sakamoto", age: 24, city: "Tokyo"},
    { name: "Ji yun", age: 28, city: "Seoul"}
]);
```
