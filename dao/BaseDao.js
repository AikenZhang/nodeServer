export class BaseDao {
    //分页基类
    pageQuery (model,aggregate,page,pageSize) {
        return model.aggregate([
            ...aggregate,
            {
                $skip:(page-1)*pageSize
            },{
                $limit:pageSize
            }
        ])
        //return model.find(...find).limit(pageSize).skip((page-1)*pageSize)
    }
}