db.users.insertMany([
  { id: 1, name: "Alice", age: 25, city: "New York" },
  { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  { id: 3, name: "Charlie", age: 35, city: "Chicago" },
  { id: 4, name: "David", age: 28, city: "New York" },
]);

db.users.aggregate([{ $match: { city: "New York" } }]);

db.users.aggregate([
  {
    $group: {
      _id: "$city",
      totalAge: { $sum: { $multiply: ["$age", 1] } },
      averageAge: { $avg: "$age" },
      count: { $sum: 1 },
    },
  },
]);

// 정렬
db.users.aggregate([
  { $sort: { age: -1 } }, // 나이 내림차순 정렬
  { $sort: { age: 1 } }, // 나이 오름차순 정렬
]);

// 특정 필드만 보기
db.users.aggregate([
  {
    $project: {
      name: 1, // name 필드 포함
      totalAge: { $sum: ["$age", "$name"] },
      _id: 0, // _id 필드 제외
    },
  },
]);

// $limit, $skip
db.users.aggregate([
  { $sort: { age: -1 } }, // 나이 내림차순
  { $skip: 1 }, // 천 벗쨰 문서 건너뛰기
  { $limit: 2 }, // 두 개의 문서만 가져오기
]);
