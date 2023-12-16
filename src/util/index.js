export  function transformData(data, code) {
  if (!data || data.length === 0) {
    return []; // 如果数据为空，返回空数组
  }
  const result = [];
  data.forEach((item) => {
    const newItem = { ...item };
    // 复制原始对象
    if (item.introducer_code == code) {
      newItem.itemStyle = {
              color: "#2fea6d",
            };
      console.log(newItem,"newItem",item.code,code);
      // 如果传入的code与introducer_code相等，添加itemStyle键
    }
    if (item.l) {
      newItem.children = transformData(item.l, code); // 处理l属性的子级数据
    }
    if (item.r) {
      newItem.children = (newItem.children || []).concat(
        transformData(item.r, code)
      );
      // 处理r属性的子级数据，并将其添加到children数组中
    }
    result.push(newItem);
  });
  console.log(result,"result");
  return result;
}