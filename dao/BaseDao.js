export class BaseDao {
    //分页基类
    pageQuery (model,find,page,pageSize) {
        return model.find(...find).limit(pageSize).skip((page-1)*pageSize)
    }
}