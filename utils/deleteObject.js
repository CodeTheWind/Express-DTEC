exports.deleteObject = (obj, ids, data) => {

  return obj.deleteMany({ _id: { $in: ids } }).then(res => {
    if (res) {
      data.msg = '删除成功！';
      data.state = 200;
      return;
    } else {
      data.msg = '删除失败！';
      data.state = 202;
      return;
    }
  }).then(() => {
    return data;
  }).catch(error => {
    console.log(error);
  })
}