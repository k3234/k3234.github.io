// 清除本地存储中的用户信息
console.log('清除本地存储中的用户信息...');

// 清除localStorage中的用户信息
localStorage.removeItem('currentUser');
localStorage.removeItem('token');

console.log('本地存储已清除');
console.log('当前localStorage内容:', localStorage);

// 模拟清除后端数据库中的张三信息
console.log('\n模拟清除后端数据库中的张三信息...');
console.log('（实际操作需要在后端数据库中执行）');

console.log('\n清除完成！');
